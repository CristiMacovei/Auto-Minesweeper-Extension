import { Tile, TileType, AutoMove } from '../t';

function loadTiles() {
  const squares: HTMLDivElement[] = Array.from(
    document.querySelectorAll('div.square')
  );

  let numRows = -1;
  let numCols = -1;

  let tileList = squares.map((square) => {
    const [row, col] = square.id.split('_').map((s) => parseInt(s));

    if (row >= numRows) {
      numRows = row + 1;
    }

    if (col >= numCols) {
      numCols = col + 1;
    }

    return {
      div: square,
      row,
      col
    };
  });

  const tileMatrix: Tile[][] = [];
  for (let i = 0; i < numRows; ++i) {
    tileMatrix.push([]);

    for (let j = 0; j < numCols; ++j) {
      tileMatrix[i].push(null);
    }
  }

  tileList.forEach((tile) => {
    tileMatrix[tile.row][tile.col] = {
      tileDiv: tile.div
    };
  });

  return {
    matrix: tileMatrix,
    numRows: numRows - 1,
    numCols: numCols - 1
  };
}

function identityString(moveList: AutoMove[]): string {
  return moveList
    .map((move) => {
      return `${move.type}@$({move.row},${move.col})`;
    })
    .join('+');
}

function getTypeFromClass(className: string | undefined): TileType | undefined {
  if (!className) {
    return undefined;
  }

  if (className.includes('red')) {
    return TileType.FLAG;
  }

  // if (className.includes('green')) {
  //    return TileType.REVEAL_NONVALUE;
  // }

  const stateName = className.split(' ')[1];

  switch (stateName) {
    case 'blank':
      return TileType.UNCOVERED;

    case 'bombflagged':
      return TileType.FLAG;

    case 'open0':
      return TileType.REVEAL_0;

    case 'open1':
      return TileType.REVEAL_1;

    case 'open2':
      return TileType.REVEAL_2;

    case 'open3':
      return TileType.REVEAL_3;

    case 'open4':
      return TileType.REVEAL_4;

    case 'open5':
      return TileType.REVEAL_5;

    case 'open6':
      return TileType.REVEAL_6;

    case 'open7':
      return TileType.REVEAL_7;

    case 'open8':
      return TileType.REVEAL_8;

    default: {
      console.log(`[Warn] Unknown state found: ${stateName}`);
      return null;
    }
  }
}

function findNeighbors(
  row: number,
  col: number,
  numRows: number,
  numCols: number
) {
  const directions = [
    { deltaRow: -1, deltaCol: 0 }, // UP
    { deltaRow: -1, deltaCol: 1 }, // UP AND RIGHT
    { deltaRow: 0, deltaCol: 1 }, // RIGHT
    { deltaRow: 1, deltaCol: 1 }, // DOWN AND RIGHT
    { deltaRow: 1, deltaCol: 0 }, // DOWN
    { deltaRow: 1, deltaCol: -1 }, // DOWN AND LEFT
    { deltaRow: 0, deltaCol: -1 }, // LEFT
    { deltaRow: -1, deltaCol: -1 } // UP AND LEFT
  ];

  return directions
    .map(({ deltaRow, deltaCol }) => {
      const newRow = row + deltaRow;
      const newCol = col + deltaCol;

      return { row: newRow, col: newCol };
    })
    .filter(
      ({ row, col }) => 0 < row && row < numRows && 0 < col && col < numCols
    );
}

function findMoves(
  matrix: Tile[][],
  numRows: number,
  numCols: number
): AutoMove[] {
  return []
    .concat(findFullySurroundedOpenTiles(matrix, numRows, numCols))
    .concat(findNonFlaggedTiles(matrix, numRows, numCols))
    .concat(useOneOutOfTwo(matrix, numRows, numCols));
}

function findFullySurroundedOpenTiles(
  matrix: Tile[][],
  numRows: number,
  numCols: number
): AutoMove[] {
  let moves: AutoMove[] = [];
  for (let i = 1; i < numRows; ++i) {
    for (let j = 1; j < numCols; ++j) {
      const currentState = getTypeFromClass(matrix[i][j].tileDiv.className);

      if (currentState !== null && currentState >= 0) {
        const neighbors = findNeighbors(i, j, numRows, numCols).map((pos) => ({
          pos,
          tileDiv: matrix[pos.row][pos.col].tileDiv
        }));

        const artificialFlags = neighbors.filter(({ tileDiv }) =>
          tileDiv.className.includes('red')
        );
        if (artificialFlags.length > 0) {
          console.log(artificialFlags);
        }

        // console.log(
        //   `Finding artificial flag neighbours of [${i},${j}]: ${neighbors.filter(
        //     ({ pos, tileDiv }) => {
        //       // console.log(`Neighbor pos: ${pos}: ${tileDiv.className}`);

        //       return tileDiv.className.includes('red');
        //     }
        //   )}`
        // );

        const flagNeighbors = neighbors.filter(
          ({ tileDiv }) => getTypeFromClass(tileDiv.className) === TileType.FLAG
        );

        const emptyNeighbors = neighbors.filter(
          ({ tileDiv }) =>
            getTypeFromClass(tileDiv.className) === TileType.UNCOVERED
        );

        if (
          emptyNeighbors.length > 0 &&
          flagNeighbors.length === currentState
        ) {
          moves = moves.concat(
            emptyNeighbors.map(({ pos, tileDiv }) => ({
              type: 'reveal',
              ...pos,
              tileDiv,
              reason: `(${i}, ${j}) fully flagged`
            }))
          );
        }
      }
    }
  }

  return moves;
}

function findNonFlaggedTiles(
  matrix: Tile[][],
  numRows: number,
  numCols: number
) {
  let moves: AutoMove[] = [];
  for (let i = 1; i < numRows; ++i) {
    for (let j = 1; j < numCols; ++j) {
      const currentState = getTypeFromClass(matrix[i][j].tileDiv.className);

      if (currentState !== null && currentState >= 0) {
        const neighbors = findNeighbors(i, j, numRows, numCols).map((pos) => ({
          pos,
          tileDiv: matrix[pos.row][pos.col].tileDiv
        }));

        const flagNeighbors = neighbors.filter(
          ({ tileDiv }) => getTypeFromClass(tileDiv.className) === TileType.FLAG
        );

        const emptyNeighbors = neighbors.filter(
          ({ tileDiv }) =>
            getTypeFromClass(tileDiv.className) === TileType.UNCOVERED
        );

        const numFlagsRequired = currentState - flagNeighbors.length;

        if (
          emptyNeighbors.length > 0 &&
          emptyNeighbors.length === numFlagsRequired
        ) {
          moves = moves.concat(
            emptyNeighbors.map(({ pos, tileDiv }) => ({
              type: 'flag',
              ...pos,
              tileDiv,
              reason: `(${i}, ${j}) not flagged`
            }))
          );
        }
      }
    }
  }

  return moves;
}

/*
1 half \
        => 1
1 half /

x free 
*/
function useOneOutOfTwo(matrix: Tile[][], numRows: number, numCols: number) {
  let moves: AutoMove[] = [];
  for (let i = 1; i < numRows; ++i) {
    for (let j = 1; j < numCols; ++j) {
      // console.log(`Trying to run off of ${i}, ${j}`);
      const currentState = getTypeFromClass(matrix[i][j].tileDiv.className);

      if (currentState !== null && currentState >= 0) {
        const neighbors = findNeighbors(i, j, numRows, numCols).map((pos) => ({
          pos,
          tileDiv: matrix[pos.row][pos.col].tileDiv
        }));

        const flagNeighbors = neighbors.filter(
          ({ tileDiv }) => getTypeFromClass(tileDiv.className) === TileType.FLAG
        );

        const emptyNeighbors = neighbors.filter(
          ({ tileDiv }) =>
            getTypeFromClass(tileDiv.className) === TileType.UNCOVERED
        );

        const numFlagsRequired = currentState - flagNeighbors.length;

        // console.log(`Running 1-2 off of (${i}, ${j})`);
        if (emptyNeighbors.length === 2 && numFlagsRequired === 1) {
          const [empty1, empty2] = emptyNeighbors;

          const deltaRow = empty1.pos.row - empty2.pos.row;
          const deltaCol = empty1.pos.col - empty2.pos.col;
          // console.log(
          //   `Empties: (${empty1.pos.row},${empty1.pos.col}), (${empty2.pos.row},${empty2.pos.col})`
          // );

          // empty neighbours are adjacent
          if (Math.abs(deltaRow) + Math.abs(deltaCol) !== 1) {
            return;
          }
          // console.log(`Passed line 268 check`);

          for (let multiplier = -2; multiplier <= 1; multiplier += 3) {
            const candidateRow = empty1.pos.row + deltaRow * multiplier;
            const candidateCol = empty1.pos.col + deltaCol * multiplier;

            // console.log(
            //   `[${i}, ${j} @ ${multiplier}] Candidate (${candidateRow}, ${candidateCol}`
            // );
            if (
              0 < candidateRow &&
              candidateRow < numRows &&
              0 < candidateCol &&
              candidateCol < numCols &&
              getTypeFromClass(
                matrix[candidateRow][candidateCol]?.tileDiv?.className
              ) === TileType.UNCOVERED
            ) {
              let nextTargetRow = candidateRow;
              let nextTargetCol = candidateCol;

              if (nextTargetRow - i === 2) {
                --nextTargetRow;
                nextTargetCol = j;
              } else if (nextTargetRow - i === -2) {
                ++nextTargetRow;
                nextTargetCol = j;
              } else if (nextTargetCol - j === 2) {
                --nextTargetCol;
                nextTargetRow = i;
              } else if (nextTargetCol - j === -2) {
                ++nextTargetCol;
                nextTargetRow = i;
              }

              // console.log(
              //   `Targeted tile is (${nextTargetRow}, ${nextTargetCol})`
              // );

              const nextTargetDiv =
                matrix[nextTargetRow][nextTargetCol].tileDiv;
              const nextTargetState = getTypeFromClass(nextTargetDiv.className);
              // console.log(`Targeted tile state: ${nextTargetState}`);

              if (nextTargetState !== null && nextTargetState > 0) {
                // console.log('Passed line 311 check');

                const nextNeighbors = findNeighbors(
                  nextTargetRow,
                  nextTargetCol,
                  numRows,
                  numCols
                ).map((pos) => ({
                  pos,
                  tileDiv: matrix[pos.row][pos.col].tileDiv
                }));

                const nextTargetFlagNeighbours = nextNeighbors.filter(
                  ({ tileDiv }) =>
                    getTypeFromClass(tileDiv.className) === TileType.FLAG
                );

                const nextTargetEmptyNeighbours = nextNeighbors.filter(
                  ({ tileDiv }) =>
                    getTypeFromClass(tileDiv.className) === TileType.UNCOVERED
                );

                const nextTargetNumFlagsRequired =
                  nextTargetState - nextTargetFlagNeighbours.length;

                // console.log(
                //   `[${i}, ${j}] - Final check: num flags for next target = ${nextTargetNumFlagsRequired}`
                // );
                // console.log(`
                //   [${i}, ${j}] - Empties: ${nextTargetEmptyNeighbours.map(
                //   (n) => n.pos
                // )}`);
                if (
                  nextTargetNumFlagsRequired + 1 ===
                  nextTargetEmptyNeighbours.length
                ) {
                  // console.log(`[${i}, ${j}] - Flagging empties`);
                  nextTargetEmptyNeighbours.forEach((empty) => {
                    if (
                      (empty.pos.row !== empty1.pos.row ||
                        empty.pos.col !== empty1.pos.col) &&
                      (empty.pos.row !== empty2.pos.row ||
                        empty.pos.col !== empty2.pos.col)
                    ) {
                      moves.push({
                        row: candidateRow,
                        col: candidateCol,
                        tileDiv: matrix[candidateRow][candidateCol].tileDiv,
                        type: 'flag',
                        reason: `1-2 from (${i},${j})`
                      });
                    }
                  });
                } else if (nextTargetNumFlagsRequired === 1) {
                  // console.log(`[${i}, ${j}] - Uncovering empties`);
                  nextTargetEmptyNeighbours.forEach((empty) => {
                    if (
                      (empty.pos.row !== empty1.pos.row ||
                        empty.pos.col !== empty1.pos.col) &&
                      (empty.pos.row !== empty2.pos.row ||
                        empty.pos.col !== empty2.pos.col)
                    ) {
                      moves.push({
                        ...empty.pos,
                        tileDiv: matrix[candidateRow][candidateCol].tileDiv,
                        type: 'reveal',
                        reason: `1-2 from (${i},${j})`
                      });
                    }
                  });
                }
              }
            }
          }
        }
      }
    }
  }

  return moves;
}

window.addEventListener('load', async (evt) => {
  const tiles = loadTiles();
  console.log(`Loaded tiles: `, tiles);

  const faceElement = document.getElementById('face');

  let prevMoveListIdentityString = '';

  let iterations = 200;
  let testingMode = false;
  const mainInterval = setInterval(() => {
    --iterations;
    if (testingMode && iterations < 0) {
      clearInterval(mainInterval);
      return;
    }

    if (
      faceElement.className.includes('facedead') ||
      faceElement.className.includes('faceooh')
    ) {
      return;
    }

    tiles.matrix.forEach((row) =>
      row.forEach((tile) => {
        tile.tileDiv.classList.remove('red');
        tile.tileDiv.classList.remove('green');
      })
    );

    const autoMoves = findMoves(tiles.matrix, tiles.numRows, tiles.numCols);
    autoMoves.forEach((autoMove) => {
      //todo fix this bug
      if (!autoMove.tileDiv) {
        console.log('fucked up:', autoMove);
        return;
      }
      autoMove.tileDiv.classList.add(
        autoMove.type === 'flag' ? 'red' : 'green'
      );
    });

    const autoMovesIdentityString = identityString(autoMoves);
    if (
      autoMoves.length > 0 &&
      autoMovesIdentityString !== prevMoveListIdentityString
    ) {
      console.log('Found auto moves: ', autoMoves);
    }

    prevMoveListIdentityString = autoMovesIdentityString;
  }, 50);
});
