import { Box, Button } from "@mui/material"
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

const GameBoard = ({
  boardSize,
  gameState,
  handleCellClick
}: GameBoardProps) => {
  const { firstRowIndex, lastRowIndex, firstColIndex, lastColIndex } = boardSize
  const { boardMoves, isGameOver, winnerMoves } = gameState
  const rowsSize = lastRowIndex - firstRowIndex + 1
  const colsSize = lastColIndex - firstColIndex + 1

  const renderCell = (cellKey: string, cellValue: TCellValue) => {
    const isOccupied = Boolean(cellValue)

    return (
      <Button
        key={cellKey}
        variant="outlined"
        disabled={isOccupied || isGameOver}
        onClick={() => handleCellClick(cellKey)}
        sx={getCellStyles(cellValue, winnerMoves.includes(cellKey))}
      >
        {cellValue}
      </Button>
    )
  }

  return (
    <Box
      sx={{
        display: "grid",
        gap: "4px",
        justifyContent: "center",
        gridTemplateColumns: `repeat(${colsSize}, 40px)`
      }}
    >
      {Array.from({ length: colsSize }).map((_, colIndex: number) => {
        const colKey = firstColIndex + colIndex
        return (
          <Box
            key={colKey}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "4px"
            }}
          >
            {Array.from({ length: rowsSize }).map((_, rowIndex: number) => {
              const rowKey = firstRowIndex + rowIndex
              const cellKey = convertToKey(colKey, rowKey)
              const cellValue = boardMoves.get(cellKey) as TCellValue
              return renderCell(cellKey, cellValue)
            })}
          </Box>
        )
      })}
    </Box>
  )
}

export default GameBoard
