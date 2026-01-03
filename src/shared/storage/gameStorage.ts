import type { IGameState, TPlayer } from "../types/game.types"

const HISTORY_KEY = "gamesHistory"

// Функция для преобразования Map в объект
const mapReplacer = (key: string, value: any) => {
  if (value instanceof Map) {
    return {
      _type: "Map",
      value: [...(value as Map<string, TPlayer>)]
    }
  }
  return value
}

// Функция для восстановления Map из объекта
const mapReviver = (key: string, value: any) => {
  if (value && typeof value === "object" && value._type === "Map") {
    return new Map(value.value)
  }
  return value
}

export const getGamesHistory = (): IGameState[] => {
  const gamesHistory = localStorage.getItem(HISTORY_KEY)
  if (!gamesHistory) return []

  try {
    return JSON.parse(gamesHistory, mapReviver)
  } catch {
    return []
  }
}

export const saveGameToHistory = (game: IGameState): void => {
  const history = getGamesHistory()
  history.unshift(game)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history, mapReplacer))
}

export const getGameById = (id: string): IGameState | null => {
  const history = getGamesHistory()
  return history.find((game) => game.id === id) || null
}
