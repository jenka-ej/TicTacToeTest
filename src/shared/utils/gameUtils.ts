import { DIRECTIONS, RESULT_TO_WIN } from "../const/game.const"
import type {
  IBoardSize,
  TDirection,
  TMovePosition,
  TPlayer,
  TWinnerResult
} from "../types/game.types"

export const convertToKey = (column: number, row: number) => `${column},${row}`

export const convertFromKey = (moveKey: string): TMovePosition => {
  const keyEntries = moveKey.split(",")
  const column = Number(keyEntries[0])
  const row = Number(keyEntries[1])
  return { column, row }
}

const getPlayerMoves = (
  boardMoves: Map<string, TPlayer>,
  chosenPlayer: TPlayer
) => [...boardMoves].filter(([, player]) => player === chosenPlayer)

const getOffsetFromDirection = (direction: TDirection) => {
  switch (direction) {
    case "horizontal":
      return { dColumn: 1, dRow: 0 }
    case "vertical":
      return { dColumn: 0, dRow: 1 }
    case "diagonal":
      return { dColumn: 1, dRow: 1 }
    default:
      return { dColumn: -1, dRow: 1 }
  }
}

const checkDirection = (
  lastPlayerMove: string,
  playerMoves: Map<string, TPlayer>,
  direction: TDirection
) => {
  const { row, column } = convertFromKey(lastPlayerMove)
  const { dColumn, dRow } = getOffsetFromDirection(direction)

  const result: TWinnerResult = {
    countInRow: 1,
    cellsInRow: [lastPlayerMove]
  }

  for (let i = 1; i < RESULT_TO_WIN; i++) {
    const cell = convertToKey(column + i * dColumn, row + i * dRow)
    if (!playerMoves.get(cell)) break
    result.countInRow += 1
    result.cellsInRow = [...result.cellsInRow, cell]
  }

  for (let k = 1; k < RESULT_TO_WIN; k++) {
    const cell = convertToKey(column - k * dColumn, row - k * dRow)
    if (!playerMoves.get(cell)) break
    result.countInRow += 1
    result.cellsInRow = [...result.cellsInRow, cell]
  }

  return result
}

export const checkWinner = (
  boardMoves: Map<string, TPlayer>,
  currentPlayer: TPlayer
) => {
  const playerMoves = getPlayerMoves(boardMoves, currentPlayer)
  const lastPlayerMove = playerMoves
    .map(([stringCellPosition]) => stringCellPosition)
    .at(-1)

  if (!lastPlayerMove) return false
  const results = DIRECTIONS.map((direction) =>
    checkDirection(lastPlayerMove, new Map(playerMoves), direction)
  )
  const gameOver = results
    .map(({ countInRow }) => countInRow >= RESULT_TO_WIN)
    .includes(true)
  return gameOver
    ? (results.find(
        ({ countInRow }) => countInRow >= RESULT_TO_WIN
      ) as TWinnerResult)
    : false
}

export const checkBoardSizeExtension = (
  boardSize: IBoardSize,
  lastPlayerMove: string
): IBoardSize => {
  const { firstRowIndex, lastRowIndex, firstColIndex, lastColIndex } = boardSize
  const { row, column } = convertFromKey(lastPlayerMove)
  return {
    firstRowIndex: firstRowIndex === row ? firstRowIndex - 1 : firstRowIndex,
    lastRowIndex: lastRowIndex === row ? lastRowIndex + 1 : lastRowIndex,
    firstColIndex: firstColIndex === column ? firstColIndex - 1 : firstColIndex,
    lastColIndex: lastColIndex === column ? lastColIndex + 1 : lastColIndex
  }
}

export const checkBoardSizeHistoryGame = (
  boardMoves: Map<string, TPlayer>
): IBoardSize => {
  const boardMovesToObj = [...boardMoves].map(([cellKey]) =>
    convertFromKey(cellKey)
  )
  const firstRowIndex = Math.min(...boardMovesToObj.map(({ row }) => row)) - 1
  const lastRowIndex = Math.max(...boardMovesToObj.map(({ row }) => row)) + 1
  const firstColIndex =
    Math.min(...boardMovesToObj.map(({ column }) => column)) - 1
  const lastColIndex =
    Math.max(...boardMovesToObj.map(({ column }) => column)) + 1
  return {
    firstRowIndex: firstRowIndex <= 0 ? firstRowIndex : 0,
    lastRowIndex: lastRowIndex >= 7 ? lastRowIndex : 7,
    firstColIndex: firstColIndex <= 0 ? firstColIndex : 0,
    lastColIndex: lastColIndex >= 7 ? lastColIndex : 7
  }
}
