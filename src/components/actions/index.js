export const addNewMessage = (data) =>(dispatch) =>{
    console.log(`add new message action creator reached` );
    dispatch({
        type:"ADD_NEW_MESSAGE",
        payload: data
    })
}