import type { SxProps, Theme } from "@mui/material"
import { CELL_SIZE } from "../const/game.const"
import type { TCellValue } from "../types/game.types"

export const getCellStyles = (
  cellValue: TCellValue,
  cellWinner: boolean
): SxProps<Theme> => {
  const baseStyle: SxProps<Theme> = {
    minHeight: CELL_SIZE,
    minWidth: CELL_SIZE,
    width: CELL_SIZE,
    height: CELL_SIZE,
    padding: 0,
    borderRadius: "8px",
    fontSize: "20px"
  }

  if (cellWinner) {
    return {
      ...baseStyle,
      backgroundColor: "#fff9c4",
      color: "#f57f17",
      borderColor: "#f57f17",
      "&:hover": {
        backgroundColor: "#fff59d"
      },
      "&:disabled": {
        backgroundColor: "#fff9c4",
        color: "#f57f17",
        borderColor: "#f57f17"
      }
    }
  } else {
    if (cellValue === "X") {
      return {
        ...baseStyle,
        backgroundColor: "#ffebee",
        color: "#d32f2f",
        borderColor: "#d32f2f",
        "&:hover": {
          backgroundColor: "#ffcdd2"
        },
        "&:disabled": {
          backgroundColor: "#ffebee",
          color: "#d32f2f",
          borderColor: "#d32f2f"
        }
      }
    }

    if (cellValue === "O") {
      return {
        ...baseStyle,
        backgroundColor: "#e3f2fd",
        color: "#1976d2",
        borderColor: "#1976d2",
        "&:hover": {
          backgroundColor: "#bbdefb"
        },
        "&:disabled": {
          backgroundColor: "#e3f2fd",
          color: "#1976d2",
          borderColor: "#1976d2"
        }
      }
    }

    return {
      ...baseStyle,
      backgroundColor: "#ffffff",
      color: "#000000",
      borderColor: "#9e9e9e",
      "&:hover": {
        backgroundColor: "#f5f5f5"
      },
      "&:disabled": {
        backgroundColor: "#ffffff",
        borderColor: "#9e9e9e"
      }
    }
  }
}
