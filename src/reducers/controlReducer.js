export default function reducer(state={"pressed" : false}, action) {

  switch (action.type) {
    case "MOUSE_DOWN": 
    {
      return {"pressed" : true}
    }
    case "MOUSE_UP": 
    {
      return {"pressed" : false}
    }
    default:{
      console.log(action)
      return state 
    }
  }
    
}