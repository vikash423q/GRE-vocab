const initialState = {
    darkMode: true,
}

const appReducer = (state = initialState, action) => {
    var newState = { ...state };
    switch (action.type) {
        case 'TOGGLE_DARKMODE':
            newState.darkMode = !state.darkMode;
            return newState;
        default:
            return state;
    }
}

export default appReducer;