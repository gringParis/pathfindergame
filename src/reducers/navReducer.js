
export default function reducer(state={"menu" : "welcome"}, action) {

  switch (action.type) {
    case "SHOW_MENU": 
    {
      var nextState = {"menu" : action.payload}
      return nextState
    }
    case "ENTER_PLAYER_NAME": 
    {
      var nextState =  {"menu" : "game"}
      return nextState
    }
    case "BACK_TO_GAME":
    {
      var nextState =  {"menu" : "game"}
      return nextState
    }
    default:{
      return state 
    }
  }
    
}