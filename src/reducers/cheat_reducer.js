const initialState = {
    cheatActive: false,
    data: {}
}

const cheatReducer = (state = initialState, action) => {
    var newState = { ...state };
    switch (action.type) {
        case 'CHEAT_ACTIVE':
            newState.cheatActive = true;
            newState.data = action.payload;
            return newState;
        case 'CHEAT_INACTIVE':
            newState.cheatActive = false;
            return newState;
        default:
            return state;
    }
}

export default cheatReducer;