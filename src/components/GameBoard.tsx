import { Box, Button } from "@mui/material"
import { memo, useMemo } from "react"
import { getCellStyles } from "../shared/lib/cellStyles"
import type {
  IBoardSize,
  IGameState,
  TCellValue
} from "../shared/types/game.types"
import { convertToKey } from "../shared/utils/gameUtils"

interface GameBoardProps {
  boardSize: IBoardSize
  gameState: IGameState
  handleCellClick: (cellKey: string) => void
}

const Cell = memo(
  ({
    cellKey,
    cellValue,
    isWinner,
    isGameOver,
    handleCellClick
  }: {
    cellKey: string
    cellValue: TCellValue
    isWinner: boolean
    isGameOver: boolean
    handleCellClick: (key: string) => void
  }) => {
    const isOccupied = Boolean(cellValue)
    const styles = useMemo(
      () => getCellStyles(cellValue, isWinner),
      [cellValue, isWinner]
    )

    return (
      <Button
        key={cellKey}
        variant="outlined"
        disabled={isOccupied || isGameOver}
        onClick={() => handleCellClick(cellKey)}
        sx={styles}
      >
        {cellValue}
      </Button>
    )
  }
)

const GameBoard = ({
  boardSize,
  gameState,
  handleCellClick
}: GameBoardProps) => {
  const { firstRowIndex, lastRowIndex, firstColIndex, lastColIndex } = boardSize
  const { boardMoves, winnerMoves, isGameOver } = gameState

  const winnerMovesSet = useMemo(() => new Set(winnerMoves), [winnerMoves])

  const rowsSize = useMemo(
    () => lastRowIndex - firstRowIndex + 1,
    [firstRowIndex, lastRowIndex]
  )
  const colsSize = useMemo(
    () => lastColIndex - firstColIndex + 1,
    [firstColIndex, lastColIndex]
  )

  const columns = useMemo(() => {
    return Array.from({ length: colsSize }).map((_, colIndex: number) => {
      const colKey = firstColIndex + colIndex
      return colKey
    })
  }, [colsSize, firstColIndex])

  const rows = useMemo(() => {
    return Array.from({ length: rowsSize }).map((_, rowIndex: number) => {
      const rowKey = firstRowIndex + rowIndex
      return rowKey
    })
  }, [rowsSize, firstRowIndex])

  return (
    <Box
      sx={{
        display: "grid",
        gap: "4px",
        justifyContent: "center",
        gridTemplateColumns: `repeat(${colsSize}, 40px)`
      }}
    >
      {columns.map((colKey) => {
        return (
          <Box
            key={colKey}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "4px"
            }}
          >
            {rows.map((rowKey) => {
              const cellKey = convertToKey(colKey, rowKey)
              const cellValue = boardMoves.get(cellKey) as TCellValue
              const isWinner = winnerMovesSet.has(cellKey)

              return (
                <Cell
                  key={cellKey}
                  cellKey={cellKey}
                  cellValue={cellValue}
                  isWinner={isWinner}
                  isGameOver={isGameOver}
                  handleCellClick={handleCellClick}
                />
              )
            })}
          </Box>
        )
      })}
    </Box>
  )
}

export default GameBoard
