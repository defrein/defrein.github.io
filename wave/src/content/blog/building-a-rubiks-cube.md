---
title: "Building a Rubik’s cube with Svelte and CSS"
description: "26 pieces, four moves, and one continuous loop. How the cube in this portfolio keeps its geometry, state, and animation in sync."
pubDate: 2026-10-15
tags: ["Svelte", "CSS", "Creative coding"]
draft: false
demo: rubik
---

The cube in this portfolio has a small job: perform **R U R′ U′** six times, return to solved, and start again. It is a familiar sequence, often called the *sexy move*, but building it makes an interesting interface problem. The stickers must travel with their pieces, each turn must affect the correct layer, and the end of one loop must match the beginning of the next.

This note walks through the implementation used on this site. It uses Svelte for state and playback, CSS for the 3D geometry, and a small TypeScript model for the actual cube.

## Start with the pieces

A visible 3 × 3 × 3 cube needs **26 pieces**. The centre of the whole cube is hidden, so there is no reason to render it. Each piece starts at a position whose coordinates are −1, 0, or 1.

The coordinates follow CSS: positive x points right, positive y points down, and positive z points towards the viewer. That convention matters when deciding which direction a face should turn.

Each piece stores three things:

- Its home position, which identifies the original piece and its stickers.
- Its current position, which determines which layer it belongs to.
- Its orientation, stored as a 3 × 3 rotation matrix.

The six outside faces have nine stickers each, giving **54 coloured stickers**. Their colours belong to the original piece. They are never reassigned just to make the cube look solved.

## Give CSS the geometry

Each piece is a small element with six faces. A face is translated out from the centre of that piece; the other faces also receive a quarter or half turn so that they face the correct direction.

```css
.cubie {
  transform-style: preserve-3d;
}

.front {
  transform: translateZ(var(--piece-half));
}

.right {
  transform: rotateY(90deg) translateZ(var(--piece-half));
}
```

The full component defines the remaining four faces in the same way. A parent supplies perspective and a fixed viewing angle, making the front, right, and top visible together. The slight gaps between pieces help reveal a layer as it rotates.

The cube stays in the DOM. It does not need a downloaded 3D model or a WebGL renderer for this particular animation.

## Turn one layer at a time

The sequence contains four quarter turns. Clockwise and counterclockwise are defined while looking directly at the face being turned.

| Move | Action |
| --- | --- |
| R | Right face, clockwise |
| U | Upper face, clockwise |
| R′ | Right face, counterclockwise |
| U′ | Upper face, counterclockwise |

A right turn selects pieces whose **current x coordinate is 1**. An upper turn selects pieces whose **current y coordinate is −1**. Each selection contains nine pieces.

Selecting by the current position is essential. A piece that began on the upper face might move to the front; its home position can no longer tell us which layer to rotate.

During a turn, those nine pieces share a rotation around the cube’s origin. The visual rotation is applied before each piece’s translation and stored orientation, so the layer moves together.

## Keep state separate from motion

The visible angle eases between zero and 90 degrees. The physical model only changes when that quarter turn finishes.

For example, a right turn maps a position like this in the coordinate system above:

```ts
type Vector = readonly [number, number, number];

function rotateRight([x, y, z]: Vector): Vector {
  return [x, -z, y];
}
```

The piece at `[1, 0, 1]` moves to `[1, -1, 0]`: from the front-right edge to the top-right edge. The same rotation is applied to its orientation matrix, which carries its stickers along with it.

Keeping the stored rotations at exact integer quarter turns prevents small floating-point errors from accumulating in the cube model. The intermediate, eased angle belongs to the animation layer instead.

Playback uses `requestAnimationFrame`. Each turn lasts **580 milliseconds**, with a **150 millisecond** hold between moves. A sine curve makes the layer accelerate and slow down smoothly.

## Let six repetitions close the loop

The algorithm is short enough to express directly:

```ts
const ALGORITHM = ['R', 'U', "R'", "U'"] as const;
const REPETITIONS = 6;

for (let repetition = 0; repetition < REPETITIONS; repetition++) {
  for (const move of ALGORITHM) {
    cubies = applyMove(cubies, move);
  }
}
```

This snippet illustrates the order of the state changes. The on-screen version schedules and animates one move at a time.

Four moves, repeated six times, produce **24 quarter turns**. Starting from solved, the complete sequence returns every piece and its orientation to its starting state. The first five repetitions do not.

The model tests check that exact return, as well as move direction, inverse moves, sticker count, and unique piece positions. Browser tests check that playback reaches turn 24 in a solved state and begins the next loop.

The animation rests for **1,100 milliseconds** at the end. It then starts the sequence again using the existing cube state. There is no hidden reset to a fresh cube between loops.

## Make the loop easy to live with

A repeating animation needs a way to stop. The cube has Play/Pause and Restart controls, a highlighted move, and a repetition counter.

It also stops requesting animation frames when it leaves the viewport or the tab is hidden. When playback resumes, the timing starts from the current position instead of jumping through the time spent away.

With a reduced-motion preference, the first view is a static, solved cube. Pressing Play explicitly starts the animation. The controls remain ordinary keyboard-accessible buttons, and the caption keeps the same readable text size as the rest of the interface.

The useful lesson here is the separation between **what the cube is** and **how its movement is shown**. Exact state makes the sequence testable; a separate visual angle makes it smooth. Together, they make a small loop that can keep going without losing its place.
