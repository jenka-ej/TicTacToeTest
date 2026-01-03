import CheckIcon from "@mui/icons-material/Check"
import { Alert, Box, Button, Container, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import GameBoard from "../components/GameBoard"
import { defaultBoardSize } from "../shared/const/game.const"
import {
  getGameById,
  getGamesHistory,
  saveGameToHistory
} from "../shared/storage/gameStorage"
import type { IBoardSize, IGameState } from "../shared/types/game.types"
import {
  checkBoardSizeExtension,
  checkBoardSizeHistoryGame,
  checkWinner
} from "../shared/utils/gameUtils"

const GamePage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [gameState, setGameState] = useState<IGameState | null>(null)
  const [boardSize, setBoardSize] = useState<IBoardSize>({
    ...defaultBoardSize
  })

  const handleNewGame = () => {
    const player1 = localStorage.getItem("currentPlayer1")
    const player2 = localStorage.getItem("currentPlayer2")
    const historyLength = getGamesHistory().length

    if (!player1 || !player2) {
      navigate("/")
      return
    }

    if (location.state?.gameId) {
      const clickedGame = getGameById(location.state?.gameId) as IGameState
      const boardSizeHistory = checkBoardSizeHistoryGame(clickedGame.boardMoves)
      setGameState({
        id: clickedGame.id,
        boardMoves: clickedGame.boardMoves,
        currentPlayer: clickedGame.winner === "O" ? "X" : "O",
        winner: clickedGame.winner,
        winnerMoves: clickedGame.winnerMoves,
        isGameOver: true,
        player1: clickedGame.player1,
        player2: clickedGame.player2,
        date: clickedGame.date,
        startTime: clickedGame.startTime,
        endTime: clickedGame.endTime
      })
      setBoardSize(boardSizeHistory)
    } else {
      setGameState({
        id: `${historyLength + 1}`,
        boardMoves: new Map(),
        currentPlayer: "X",
        winner: null,
        isGameOver: false,
        winnerMoves: [],
        player1,
        player2,
        date: Date.now(),
        startTime: Date.now(),
        endTime: undefined
      })
      setBoardSize({ ...defaultBoardSize })
    }
  }

  const handleGoToLogin = () => {
    navigate("/")
  }

  const handleGoToHistory = () => {
    navigate("/history")
  }

  const handleCellClick = (cellKey: string) => {
    if (!gameState) return

    const { boardMoves, currentPlayer, winner, winnerMoves } = gameState

    if (boardMoves.has(cellKey)) return

    const newBoardMoves = new Map(boardMoves).set(cellKey, currentPlayer)
    const newPlayer = currentPlayer === "X" ? "O" : "X"
    const winResult = checkWinner(newBoardMoves, currentPlayer)
    const newWinner = winResult ? currentPlayer : winner
    const newWinnerMoves = winResult ? winResult.cellsInRow : winnerMoves

    const newGameState: IGameState = {
      ...gameState,
      boardMoves: newBoardMoves,
      currentPlayer: newPlayer,
      winner: newWinner,
      winnerMoves: newWinnerMoves,
      isGameOver: Boolean(newWinner)
    }
    const newBoardSize = checkBoardSizeExtension(boardSize, cellKey)

    setGameState(newGameState)
    setBoardSize(newBoardSize)

    if (newWinner) {
      saveGameToHistory(newGameState)
    }
  }

  useEffect(() => {
    handleNewGame()
  }, [])

  return (
    <Container
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 4, minWidth: "300px", borderRadius: "10px" }}
      >
        {gameState && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center"
              }}
            >
              <Typography variant="h6">
                <strong>{gameState.player1}</strong> (X) vs{" "}
                <strong>{gameState.player2}</strong> (O)
              </Typography>
            </Box>

            {gameState.winner ? (
              <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                {gameState.winner} победил!
              </Alert>
            ) : (
              <Alert
                severity={gameState.currentPlayer === "X" ? "error" : "info"}
              >
                Ход игрока {gameState.currentPlayer}
              </Alert>
            )}

            <GameBoard
              boardSize={boardSize}
              gameState={gameState}
              handleCellClick={handleCellClick}
            />

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              {location.state?.gameId ? (
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGoToLogin}
                >
                  На главную
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleNewGame}
                >
                  Новая игра
                </Button>
              )}
              <Button
                variant="outlined"
                size="large"
                onClick={handleGoToHistory}
              >
                История игр
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  )
}

export default GamePage
