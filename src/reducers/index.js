import { combineReducers } from "redux"
import game from "./gameReducer"
//combine reducers and inject gameLogic to gameReducer
export default function(gameLogic){
	return combineReducers({ game: game(gameLogic)})
}