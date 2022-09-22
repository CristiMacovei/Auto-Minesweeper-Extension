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

function getTypeFromClass(className: string): TileType {
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

    default:
      return null;
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
      ({ row, col }) => 0 <= row && row < numRows && 0 <= col && col < numCols
    );
}

function findMoves(
  matrix: Tile[][],
  numRows: number,
  numCols: number
): AutoMove[] {
  return []
    .concat(findFullySurroundedOpenTiles(matrix, numRows, numCols))
    .concat(findNonFlaggedTiles(matrix, numRows, numCols));
}

function findFullySurroundedOpenTiles(
  matrix: Tile[][],
  numRows: number,
  numCols: number
): AutoMove[] {
  let moves: AutoMove[] = [];
  for (let i = 0; i < numRows; ++i) {
    for (let j = 0; j < numCols; ++j) {
      const currentState = getTypeFromClass(matrix[i][j].tileDiv.className);

      if (currentState !== null && currentState >= 0) {
        // console.log(
        //   `Found non-empty cell (state ${currentState}) @ (${i}, ${j})`
        // );

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

        // console.log('Flags: ', flagNeighbors);
        // console.log('Empties: ', emptyNeighbors);

        if (
          emptyNeighbors.length > 0 &&
          flagNeighbors.length === currentState
        ) {
          console.log(i, j);
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
  for (let i = 0; i < numRows; ++i) {
    for (let j = 0; j < numCols; ++j) {
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
          console.log(i, j);
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

window.addEventListener('load', async (evt) => {
  const tiles = loadTiles();
  console.log(tiles);

  setInterval(() => {
    const autoMoves = findMoves(tiles.matrix, tiles.numRows, tiles.numCols);
    console.log(autoMoves);
    tiles.matrix.forEach((row) =>
      row.forEach((tile) => {
        tile.tileDiv.classList.remove('red');
        tile.tileDiv.classList.remove('green');
      })
    );
    autoMoves.forEach((autoMove) => {
      autoMove.tileDiv.classList.add(
        autoMove.type === 'flag' ? 'red' : 'green'
      );
    });
  }, 50);
});
