import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const [player1, setPlayer1] = useState("")
  const [player2, setPlayer2] = useState("")
  const navigate = useNavigate()

  const handleStartGame = () => {
    if (player1.trim() && player2.trim()) {
      localStorage.setItem("currentPlayer1", player1.trim())
      localStorage.setItem("currentPlayer2", player2.trim())
      navigate("/game")
    }
  }

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
      <Paper elevation={3} sx={{ p: 4, width: "400px", borderRadius: "10px" }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 3 }}
        >
          Крестики-Нолики
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="Игрок 1 (X)"
            variant="outlined"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Игрок 2 (O)"
            variant="outlined"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            fullWidth
            required
          />
          <Box component="form" sx={{ display: "flex", gap: 3 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleStartGame}
              disabled={!player1.trim() || !player2.trim()}
              fullWidth
            >
              Начать игру
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/history")}
              fullWidth
            >
              История игр
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default LoginPage
