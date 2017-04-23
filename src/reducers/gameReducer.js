export default function(gameLogic){ 
  return function reducer(state=gameLogic.props, action) {

    switch (action.type) {
      case "TRY_CELL": 
      {
          if(!state.isFinished && !state.hintMode)
          {
            var nextState = JSON.parse(JSON.stringify(gameLogic.play(action.i,action.j, state)))
            return nextState
          }
          return state 
      }
      case "CHANGE_LEVEL":
      {
        //console.log("lvl changed")
        var nextState =  JSON.parse(JSON.stringify(gameLogic.changeLevel(state)))
        //console.log(nextState)
        return nextState
      }
      case "END_HINTMODE":
      {
        return JSON.parse(JSON.stringify(gameLogic.endHintMode(state)))
      }
     /* case "GAME_START":
      {
        return JSON.parse(JSON.stringify(gameLogic.start(state)))
      }*/
      case "GAME_START":
      {
        return JSON.parse(JSON.stringify(gameLogic.start(state)))
      }
      case "ENTER_PLAYER_NAME":
      {
        return JSON.parse(JSON.stringify(gameLogic.enterPlayerName(action.payload, state))) 
      }
      default:{
        return state 
      }
    }
      
  }
}