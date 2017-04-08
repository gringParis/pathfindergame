import { combineReducers } from "redux"
import game from "./gameReducer"
import nav from "./navReducer"
import control from "./controlReducer"
//combine reducers and inject gameLogic to gameReducer
export default function(gameLogic){
	return combineReducers({ 
		game: game(gameLogic),
		nav: nav,
		control : control,
	})
}