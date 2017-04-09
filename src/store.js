import { applyMiddleware, createStore } from "redux"
import reducer from "./reducers"
import  { createLogger } from "redux-logger"
import { change_level , end_hintmode, mouse_up } from './actions/gameActions'

export default function( gameLogic){
	//this middleware is dedicated to chaining actions
	const myMiddleware = (store) => (next) => (action) => {
		next(action)
		const nextState = store.getState()
		switch (action.type){
			case "TRY_CELL":
			{
				if(nextState.game.isFinishedLvl && !nextState.game.isFinished)
				{
					setTimeout(()=>{store.dispatch(change_level())}, 500)
				}
				break
			}
			case "CHANGE_LEVEL":
			{
				store.dispatch(mouse_up())
				setTimeout(()=>{store.dispatch(end_hintmode())}, nextState.game.showLength * 1000)
				break
			}
			case "GAME_START":
			{
				setTimeout(()=>{store.dispatch(end_hintmode())}, nextState.game.showLength * 1000)
				break
			}
			case "END_HINTMODE":
			{
				store.dispatch(mouse_up())
				break
			}

		}
		
		console.log("my middleware!")
	}

	const middleware = applyMiddleware( myMiddleware, createLogger())
	return createStore(reducer(gameLogic), {game : gameLogic.props},middleware)
}


