import words from '../words';
import store from '../store';
import shuffle from '../utils';

const initialState = {
    selected: 'flashcard',
    words: words,
    category: null,
    selected_words: [],
    similarity_score: 0.6
}

const loadWords = () => {
    var _list = [];
    for (let [key, value] of Object.entries(words)) {
        _list.push(value);
    }
    return _list;
}

const loadCategory = (cat, score) => {
    var _list = [];
    _list.push(words[cat]);
    var categories = words[cat].relevantWords;
    // console.log(categories);
    for (let category of categories) {
        if (category.score >= score) {
            var el = words[category.word];
            if (el)
                _list.push(el);
        }
    }
    // console.log(_list);
    return _list;
}

const StudyReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case 'CHANGE_SELECTED':
            newState.selected = action.payload;
            return newState;
        case 'SELECT_CATEGORY':
            newState.category = state.words[action.payload] !== null ? action.payload : null;
            newState.selected_words = action.payload !== null ? loadCategory(action.payload, state.similarity_score) : loadWords();
            setTimeout(() => store.dispatch({ type: 'CATEGORY_UPDATED', payload: newState.selected_words }));
            return newState;
        case 'CHANGE_SCORE':
            newState.similarity_score = action.payload;
            if (state.category) {
                newState.selected_words = loadCategory(state.category, newState.similarity_score);
            }
            setTimeout(() => store.dispatch({ type: 'CATEGORY_UPDATED', payload: newState.selected_words }));
            return newState;
        default:
            return state;
    }
}

export default StudyReducer;