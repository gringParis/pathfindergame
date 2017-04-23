import axios from "axios"
import { applyMiddleware, createStore } from "redux"
import reducer from "./reducers"
import  { createLogger } from "redux-logger"
import { change_level , end_hintmode, mouse_up, fetch_scores, add_rank, game_over } from './actions/gameActions'
//import db from "./lib/db"

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
				}else if(nextState.game.isFinished && !nextState.scores.rank)
				{
					//we send the result to the api
					
					if(!nextState.scores.isSendingScore)
					{
						store.dispatch(game_over())
						axios({
						  method: 'post',
						  url: 'http://gring.fr/scores',
						  headers: {'Content-Type': 'application/json'},
						  data:{
						    name:  nextState.scores.playerName,
						    score: nextState.game.score
						  }
						}).then((ajax)=>{
							//console.log(ajax.data.rank)
							if(ajax.data.rank)
								store.dispatch(add_rank(ajax.data.rank))
						})
					}
					
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
			case "SHOW_MENU":
			{
				if(action.payload == "scores")
		        { 
	        		//we get the scores from the api
		          axios.get("http://gring.fr/scores") 
		          .then((ajax)=>{
		            store.dispatch(fetch_scores(ajax.data))
		          })
		          
		        }
			}
		}
		
		//console.log("my middleware!")
	}
	if(process.env.NODE_ENV !== "production")
	{
		
		const middleware = applyMiddleware( myMiddleware, createLogger())
		return createStore(reducer(gameLogic), {game : gameLogic.props},middleware)
	}else{
		const middleware = applyMiddleware( myMiddleware)
		return createStore(reducer(gameLogic), {game : gameLogic.props}, middleware)
	}
}


