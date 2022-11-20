const initialState = {
    
    messages:[
        "first",
        "second"
    ]
}
export default(state=initialState, action) => {
    switch(action.type){
        
        case "ADD_NEW_MESSAGE":
            console.log('payload',action.payload)
            if(action.payload === state.messages[state.messages.length - 1]){
                return state
            }else      return{
                
                messages:[...state.messages,action.payload
                ]
            }

        default:
            return state;
    }
    
}