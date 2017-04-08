export default function reducer(state={"menu" : "game"}, action) {

  switch (action.type) {
    case "SHOW_SCORES": 
    {
      //var nextState = JSON.parse(JSON.stringify({"menu" : "scores"})))
      var nextState = {"menu" : "scores"}
      return nextState
    }
    case "BACK_TO_GAME":
    {
      var nextState =  {"menu" : "game"}
      return nextState
    }
    default:{
      console.log(action)
      return state 
    }
  }
    
}