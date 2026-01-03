import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography
} from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getGamesHistory } from "../shared/storage/gameStorage"
import type { IGameState } from "../shared/types/game.types"

const HistoryPage = () => {
  const navigate = useNavigate()
  const [gamesHistory, setGamesHistory] = useState<IGameState[]>([])

  const handleGameClick = (gameId: string) => {
    navigate("/game", { state: { gameId } })
  }

  useEffect(() => {
    setGamesHistory(getGamesHistory())
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
        <Box>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            История игр
          </Typography>
          <List sx={{ width: "100%" }}>
            {gamesHistory.map((game, index) => {
              const labelId = `checkbox-list-label-${game.id}`
              return (
                <ListItem key={game.id} disablePadding>
                  <ListItemButton
                    role={undefined}
                    onClick={() => handleGameClick(game.id)}
                    dense
                  >
                    <ListItemText
                      id={labelId}
                      primary={`Игра №${game.id}: ${game.player1} vs ${game.player2}`}
                      secondary={new Date(game.date).toLocaleString()}
                    />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/")}
            >
              На главную
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default HistoryPage
