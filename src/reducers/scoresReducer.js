export default function reducer(state={list:[], isSendingScore:false}, action) {

  switch (action.type) {
    case "FETCH_SCORES": 
    {

      var nextState = JSON.parse(JSON.stringify(state))
      nextState.list = action.scores
      return nextState
    }

    case "ADD_RANK":
    {
      var nextState = JSON.parse(JSON.stringify(state))
      nextState.rank = action.rank
      nextState.isSendingScore = false
      return nextState
    }
    case "GAME_OVER":
    {
      var nextState = JSON.parse(JSON.stringify(state))
      nextState.isSendingScore = true
      return nextState
    }
    case "ENTER_PLAYER_NAME": 
    {
      var nextState = JSON.parse(JSON.stringify(state))
      nextState.playerName = action.name
      return nextState
    }
    case "GAME_RESTART":
    {
      var nextState = JSON.parse(JSON.stringify(state))
      nextState.rank = null
      return nextState
    }
    case "GAME_START":{
      var nextState = JSON.parse(JSON.stringify(state))
      nextState.rank = null
      return nextState
    }
    default:{
      return state 
    }
  }
    
}