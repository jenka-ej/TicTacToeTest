import type { IBoardSize, TDirection } from "../types/game.types"

export const CELL_SIZE = 40

export const RESULT_TO_WIN = 5

export const DIRECTIONS: TDirection[] = [
  "horizontal",
  "vertical",
  "diagonal",
  "reverse diagonal"
]

export const defaultBoardSize: IBoardSize = {
  firstRowIndex: 0,
  lastRowIndex: 7,
  firstColIndex: 0,
  lastColIndex: 7
}
