<script lang="ts">
  import { onMount } from 'svelte';
  import { Pause, Play, RotateCcw } from '@lucide/svelte';
  import RubikCubie from './RubikCubie.svelte';
  import { ALGORITHM, REPETITIONS, applyMove, belongsToMove, createSolvedCube, isSolved, moveDefinition } from '../lib/rubiks-cube';

  const TURN_DURATION = 580;
  const BETWEEN_MOVES = 150;
  const BETWEEN_LOOPS = 1100;
  let cubies = $state(createSolvedCube());
  let completedTurns = $state(0);
  let angle = $state(0);
  let paused = $state(true);
  let cycles = $state(0);
  let figure: HTMLElement;
  const move = $derived(ALGORITHM[completedTurns % ALGORITHM.length]);
  const definition = $derived(moveDefinition(move));
  const repetition = $derived(Math.min(REPETITIONS, Math.floor(completedTurns / ALGORITHM.length) + 1));
  const solved = $derived(isSolved(cubies) && angle === 0);
  let syncPlayback = () => {};
  let resetTiming = () => {};

  function togglePlayback() {
    paused = !paused;
    syncPlayback();
  }

  function restart() {
    cubies = createSolvedCube();
    completedTurns = 0;
    angle = 0;
    cycles = 0;
    resetTiming();
    syncPlayback();
  }

  onMount(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    paused = preference.matches;
    let frame = 0;
    let lastTime = 0;
    let turnTime = 0;
    let holdTime = 0;
    let inView = false;

    const canPlay = () => !paused && inView && !document.hidden;
    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
    };

    const tick = (time: number) => {
      frame = 0;
      if (!canPlay()) { lastTime = 0; return; }
      const delta = lastTime ? Math.min(time - lastTime, 40) : 0;
      lastTime = time;

      if (holdTime > 0) {
        holdTime -= delta;
        if (holdTime <= 0 && completedTurns === ALGORITHM.length * REPETITIONS) {
          // The integer model is solved here; no visual reset or snap is needed.
          completedTurns = 0;
          cycles++;
        }
      } else {
        turnTime += delta;
        const progress = Math.min(turnTime / TURN_DURATION, 1);
        const eased = .5 - Math.cos(progress * Math.PI) / 2;
        angle = definition.direction * 90 * eased;
        if (progress === 1) {
          cubies = applyMove(cubies, move);
          angle = 0;
          completedTurns++;
          turnTime = 0;
          holdTime = completedTurns === ALGORITHM.length * REPETITIONS ? BETWEEN_LOOPS : BETWEEN_MOVES;
        }
      }
      frame = requestAnimationFrame(tick);
    };

    syncPlayback = () => {
      if (canPlay()) {
        if (!frame) { lastTime = 0; frame = requestAnimationFrame(tick); }
      } else stop();
    };
    resetTiming = () => { turnTime = 0; holdTime = 0; lastTime = 0; };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    }, { threshold: .08 });
    observer.observe(figure);

    const motionChanged = () => { paused = preference.matches; syncPlayback(); };
    document.addEventListener('visibilitychange', syncPlayback);
    preference.addEventListener('change', motionChanged);
    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      preference.removeEventListener('change', motionChanged);
      syncPlayback = () => {};
      resetTiming = () => {};
    };
  });
</script>

<figure class="rubik" bind:this={figure} data-turns={completedTurns} data-angle={Math.round(angle)} data-repetitions={Math.floor(completedTurns / ALGORITHM.length)} data-solved={solved} data-paused={paused} data-cycles={cycles}>
  <div class="rubik-stage" role="img" aria-label="3D Rubik's cube performing R, U, R prime, U prime six times, returning to solved, then looping.">
    <div class="ground" aria-hidden="true"></div>
    <div class="cube-view" aria-hidden="true">
      {#each cubies as cubie (cubie.id)}
        <RubikCubie {cubie} axis={definition.axis} angle={belongsToMove(cubie, move) ? angle : 0} />
      {/each}
    </div>
  </div>
  <figcaption>
    <div class="rubik-toolbar">
      <div class="sequence" aria-hidden="true">
        {#each ALGORITHM as notation}
          <span class:active={!paused && completedTurns < ALGORITHM.length * REPETITIONS && notation === move}>{notation.replace("'", '′')}</span>
        {/each}
      </div>
      <span class="repetition" aria-label={`Repetition ${repetition} of ${REPETITIONS}`}>{repetition}<span aria-hidden="true"> / </span>{REPETITIONS}</span>
      <div class="controls">
        <button type="button" class="animation-control" aria-label={paused ? 'Play Rubik animation' : 'Pause Rubik animation'} title={paused ? 'Play animation' : 'Pause animation'} onclick={togglePlayback}>
          {#if paused}<Play size={16} strokeWidth={1.7} />{:else}<Pause size={16} strokeWidth={1.7} />{/if}
        </button>
        <button type="button" class="animation-control" aria-label="Restart Rubik animation" title="Restart animation" onclick={restart}><RotateCcw size={16} strokeWidth={1.7} /></button>
      </div>
    </div>
    <p class="loop-note">Six repetitions. Back to the beginning.</p>
  </figcaption>
</figure>

<style>
  .rubik { --piece-size: 62px; --piece-step: calc(var(--piece-size) + 3px); --piece-half: calc(var(--piece-size) / 2); height: 440px; min-width: 0; margin: 0; display: flex; flex-direction: column; }
  .rubik-stage { position: relative; flex: 1; min-height: 0; perspective: 950px; }
  .cube-view { position: absolute; left: 50%; top: 46%; width: 0; height: 0; transform: rotateX(-24deg) rotateY(-33deg); transform-style: preserve-3d; }
  .ground { position: absolute; bottom: 15%; left: 50%; width: 190px; height: 24px; transform: translateX(-50%); background: rgb(0 0 0 / .08); border-radius: 50%; filter: blur(13px); }
  figcaption { width: min(100%, 330px); margin-inline: auto; }
  .rubik-toolbar { display: flex; align-items: center; gap: .6rem; justify-content: space-between; border-top: 1px solid var(--line); padding-top: .65rem; }
  .sequence { display: flex; align-items: center; gap: .35rem; }
  .sequence > span { display: grid; place-items: center; min-width: 30px; height: 32px; color: var(--muted); font-size: .82rem; font-weight: 650; border-radius: 3px; }
  .sequence > span.active { background: var(--surface-purple); color: var(--purple-strong); }
  .repetition { font-size: .7rem; font-variant-numeric: tabular-nums; white-space: nowrap; color: var(--muted); }
  .controls { display: flex; align-items: center; }
  .animation-control { display: grid; place-items: center; min-width: 44px; min-height: 44px; padding: .5rem; border: 0; border-radius: 3px; color: var(--ink); background: transparent; cursor: pointer; }
  .animation-control:hover { color: var(--purple-strong); background: var(--surface-purple); }
  .loop-note { color: var(--muted); text-align: center; font-size: .67rem; margin: .35rem 0 0; }
  @media (min-width: 1440px) { .rubik { height: 470px; } }
  @media (max-width: 1000px) { .rubik { --piece-size: 54px; height: 380px; } }
  @media (max-width: 700px) {
    .rubik { --piece-size: 48px; height: 350px; }
    .ground { width: 155px; height: 20px; }
  }
</style>
