const textReducer = (state = {text: ""}, action) => {
    switch (action.type) {
        case 'TEXT':
            return {...state, text: action.payload}
        default:
            return state
    }
}
export default textReducer;