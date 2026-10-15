export type Vector = readonly [number, number, number];
export type Matrix = readonly [number, number, number, number, number, number, number, number, number];
export type Face = 'front' | 'back' | 'right' | 'left' | 'top' | 'bottom';
export type Move = 'R' | 'U' | "R'" | "U'";

export interface Cubie {
  id: string;
  home: Vector;
  position: Vector;
  orientation: Matrix;
}

export const ALGORITHM: readonly Move[] = ['R', 'U', "R'", "U'"];
export const REPETITIONS = 6;
export const IDENTITY: Matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
export const FACES: readonly Face[] = ['front', 'back', 'right', 'left', 'top', 'bottom'];

// CSS coordinates: +x right, +y down, +z toward the viewer.
// R is clockwise looking directly at the right face; U is clockwise from above.
export function moveDefinition(move: Move) {
  return {
    axis: (move.startsWith('R') ? 'x' : 'y') as 'x' | 'y',
    layer: move.startsWith('R') ? 1 : -1,
    direction: (move === 'R' || move === "U'" ? 1 : -1) as 1 | -1,
  };
}

export function createSolvedCube(): Cubie[] {
  const cubies: Cubie[] = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        if (x === 0 && y === 0 && z === 0) continue;
        const home: Vector = [x, y, z];
        cubies.push({ id: `${x},${y},${z}`, home, position: home, orientation: IDENTITY });
      }
    }
  }
  return cubies;
}

export function belongsToMove(cubie: Cubie, move: Move): boolean {
  const { axis, layer } = moveDefinition(move);
  return cubie.position[axis === 'x' ? 0 : 1] === layer;
}

export function multiply(a: Matrix, b: Matrix): Matrix {
  return a.map((_, index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return a[row * 3] * b[col] + a[row * 3 + 1] * b[col + 3] + a[row * 3 + 2] * b[col + 6];
  }) as unknown as Matrix;
}

export function transformVector(matrix: Matrix, vector: Vector): Vector {
  return [0, 1, 2].map(row => matrix[row * 3] * vector[0] + matrix[row * 3 + 1] * vector[1] + matrix[row * 3 + 2] * vector[2]) as unknown as Vector;
}

export function applyMove(cubies: readonly Cubie[], move: Move): Cubie[] {
  const { axis, direction: d } = moveDefinition(move);
  const rotation: Matrix = axis === 'x'
    ? [1, 0, 0, 0, 0, -d, 0, d, 0]
    : [0, 0, d, 0, 1, 0, -d, 0, 0];
  return cubies.map(cubie => belongsToMove(cubie, move)
    ? { ...cubie, position: transformVector(rotation, cubie.position), orientation: multiply(rotation, cubie.orientation) }
    : cubie);
}

export function isSolved(cubies: readonly Cubie[]): boolean {
  return cubies.every(cubie => cubie.position.every((value, index) => value === cubie.home[index])
    && cubie.orientation.every((value, index) => value === IDENTITY[index]));
}

export function cubieTransform(cubie: Cubie): string {
  const [x, y, z] = cubie.position;
  const m = cubie.orientation;
  const matrix = [m[0], m[3], m[6], 0, m[1], m[4], m[7], 0, m[2], m[5], m[8], 0, 0, 0, 0, 1];
  return `translate3d(calc(var(--piece-step) * ${x}), calc(var(--piece-step) * ${y}), calc(var(--piece-step) * ${z})) matrix3d(${matrix.join(',')})`;
}

export function stickerColor(home: Vector, face: Face): string {
  const [x, y, z] = home;
  if (face === 'front' && z === 1) return '#25b887';
  if (face === 'back' && z === -1) return '#4984ed';
  if (face === 'right' && x === 1) return '#ed5962';
  if (face === 'left' && x === -1) return '#ff9f43';
  if (face === 'top' && y === -1) return '#f4f3ee';
  if (face === 'bottom' && y === 1) return '#ffd34d';
  return 'transparent';
}
