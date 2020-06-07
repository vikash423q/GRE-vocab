const initialState = {
    darkMode: true,
    quizMode: false,
}

const appReducer = (state = initialState, action) => {
    var newState = { ...state };
    switch (action.type) {
        case 'TOGGLE_DARKMODE':
            newState.darkMode = !state.darkMode;
            return newState;
        case 'TOGGLE_QUIZMODE':
            newState.quizMode = !state.quizMode;
            return newState;
        default:
            return state;
    }
}

export default appReducer;