export type Storage = {
  showTags: 'all' | 'only-rating' | 'none';
};

export type StorageType = 'local' | 'sync';

export type Tile = { tileDiv: HTMLDivElement };

export enum TileType {
  UNCOVERED = -1,
  FLAG = -2,
  REVEAL_0 = 0,
  REVEAL_1 = 1,
  REVEAL_2 = 2,
  REVEAL_3 = 3,
  REVEAL_4 = 4,
  REVEAL_5 = 5,
  REVEAL_6 = 6,
  REVEAL_7 = 7,
  REVEAL_8 = 8
}

export type AutoMove = {
  type: 'flag' | 'reveal';
  row: number;
  col: number;
  tileDiv: HTMLDivElement;
  reason?: string;
};
