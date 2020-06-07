import words from '../words';

const initialState = {
    words: [],
    shuffle: false,
    current: 0,
    loading: true,
}

const shuffle_idx = (state) => {
    return Math.floor(Math.random() * state.words.length);
}
const loadWords = () => {
    var _list = [];
    for (let [key, value] of Object.entries(words)) {
        _list.push(value);
    }
    return _list;
}


const FlashcardReducer = (state = initialState, action) => {
    var newState = { ...state };
    switch (action.type) {
        case 'CATEGORY_UPDATED':
            newState.words = action.payload;
            newState.current = 0;
            return newState;
        case 'LOAD_FLASHCARDS':
            newState.words = state.words.length === 0 ? loadWords() : state.words;
            newState.loading = false;
            newState.current = 0;
            return newState;
        case 'NEXT_FLASHCARD':
            newState.current = state.current === state.words.length - 1 ? 0 : state.shuffle ? shuffle_idx(state) : state.current + 1;
            return newState;
        case 'PREV_FLASHCARD':
            newState.current = state.current === 0 ? state.words.length - 1 : state.shuffle ? shuffle_idx(state) : state.current - 1;
            console.log(newState.current);
            return newState;
        case 'SWITCH_SHUFFLE':
            newState.shuffle = !state.shuffle;
            return newState;
        default:
            return state;
    }
}

export default FlashcardReducer;