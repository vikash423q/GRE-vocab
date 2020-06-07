import words from '../words';
import shuffle from '../utils';

const initialState = {
    words: [],
    current: 0,
    loading: true,
    session: [],
    session_id: 0,
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

const TestReducer = (state = initialState, action) => {
    var newState = { ...state };
    switch (action.type) {
        case 'CATEGORY_UPDATED':
            var words = [...action.payload];
            newState.words = [...words];
            newState.session_id = 0;
            newState.session = words.slice(10 * newState.session_id, 10 * (newState.session_id + 1));
            newState.loading = false;
            return newState;
        case 'LOAD_TEST_SESSION':
            newState.words = state.words.length === 0 ? loadWords() : state.words;
            var words = [...newState.words];
            newState.session_id = 0;
            newState.session = words.slice(10 * state.session_id, 10 * (state.session_id + 1))
            newState.loading = false;
            newState.current = 0;
            return newState;
        case 'CHANGE_TEST_SESSION':
            if (action.payload < 0 || action.payload >= Math.ceil(state.words.length / 10)) return state;
            newState.session_id = action.payload;
            var words = [...newState.words];
            newState.session = words.slice(10 * newState.session_id, 10 * (newState.session_id + 1))
            newState.loading = false;
            newState.current = 0;
            return newState;
        default:
            return state;
    }
}

export default TestReducer;
