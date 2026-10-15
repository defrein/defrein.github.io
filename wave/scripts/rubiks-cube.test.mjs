import test from 'node:test';
import assert from 'node:assert/strict';
import { ALGORITHM, REPETITIONS, applyMove, belongsToMove, createSolvedCube, isSolved, stickerColor, FACES, transformVector } from '../src/lib/rubiks-cube.ts';

test('the cube has 26 physical pieces and 54 outward stickers', () => {
  const cube = createSolvedCube();
  assert.equal(cube.length, 26);
  assert.equal(new Set(cube.map(piece => piece.id)).size, 26);
  assert.equal(cube.flatMap(piece => FACES.map(face => stickerColor(piece.home, face))).filter(color => color !== 'transparent').length, 54);
  for (const move of ALGORITHM) assert.equal(cube.filter(piece => belongsToMove(piece, move)).length, 9);
});

test('R sends the front-right edge to the top-right and rotates its sticker normals', () => {
  const edge = applyMove(createSolvedCube(), 'R').find(piece => piece.id === '1,0,1');
  assert.deepEqual(edge.position, [1, -1, 0]);
  assert.deepEqual(transformVector(edge.orientation, [0, 0, 1]), [0, -1, 0]);
});

test('U sends the top-front edge to the top-left when viewed clockwise from above', () => {
  const edge = applyMove(createSolvedCube(), 'U').find(piece => piece.id === '0,-1,1');
  assert.deepEqual(edge.position, [-1, -1, 0]);
  assert.deepEqual(transformVector(edge.orientation, [0, 0, 1]), [-1, 0, 0]);
});

test('every move is undone by its inverse, and four quarter turns restore the cube', () => {
  for (const move of ['R', 'U']) {
    let cube = applyMove(applyMove(createSolvedCube(), move), `${move}'`);
    assert.ok(isSolved(cube));
    cube = createSolvedCube();
    for (let turn = 0; turn < 4; turn++) cube = applyMove(cube, move);
    assert.ok(isSolved(cube));
  }
});

test("R U R' U' changes the cube and returns every piece and orientation after exactly six repetitions", () => {
  let cube = createSolvedCube();
  for (let repetition = 1; repetition <= REPETITIONS; repetition++) {
    for (const move of ALGORITHM) cube = applyMove(cube, move);
    assert.equal(isSolved(cube), repetition === 6, `repetition ${repetition}`);
    assert.equal(new Set(cube.map(piece => piece.position.join(','))).size, 26);
  }
});
