export type TPlayer = "X" | "O"

export type TCellValue = TPlayer | null

export type TWinnerResult = { countInRow: number; cellsInRow: string[] }

export type TDirection =
  | "horizontal"
  | "vertical"
  | "diagonal"
  | "reverse diagonal"

export type TMovePosition = {
  row: number
  column: number
}

export interface IGameState {
  id: string
  boardMoves: Map<string, TPlayer>
  currentPlayer: TPlayer
  winner: TPlayer | null
  winnerMoves: string[]
  isGameOver: boolean
  player1: string
  player2: string
  date: number
  startTime: number
  endTime?: number
}

export interface IBoardSize {
  firstRowIndex: number
  lastRowIndex: number
  firstColIndex: number
  lastColIndex: number
}
