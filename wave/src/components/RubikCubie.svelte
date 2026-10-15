<script lang="ts">
  import { FACES, cubieTransform, stickerColor, type Cubie } from '../lib/rubiks-cube';
  let { cubie, axis, angle = 0 }: { cubie: Cubie; axis: 'x' | 'y'; angle?: number } = $props();
  const transform = $derived(`${angle ? `rotate${axis === 'x' ? 'X' : 'Y'}(${angle}deg) ` : ''}${cubieTransform(cubie)}`);
</script>

<div class="cubie" style:transform={transform}>
  {#each FACES as face}
    <div class="face {face}" style={`--sticker: ${stickerColor(cubie.home, face)}`}></div>
  {/each}
</div>

<style>
  .cubie { position: absolute; left: 0; top: 0; width: var(--piece-size); height: var(--piece-size); margin-left: calc(var(--piece-size) / -2); margin-top: calc(var(--piece-size) / -2); transform-style: preserve-3d; }
  .face { position: absolute; inset: 0; background: #18171c; border-radius: 5px; backface-visibility: hidden; }
  .face::after { content: ''; position: absolute; inset: 2px; border-radius: 4px; background: var(--sticker); }
  .front { transform: translateZ(var(--piece-half)); }
  .back { transform: rotateY(180deg) translateZ(var(--piece-half)); }
  .right { transform: rotateY(90deg) translateZ(var(--piece-half)); }
  .left { transform: rotateY(-90deg) translateZ(var(--piece-half)); }
  .top { transform: rotateX(90deg) translateZ(var(--piece-half)); }
  .bottom { transform: rotateX(-90deg) translateZ(var(--piece-half)); }
</style>
