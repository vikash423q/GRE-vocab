export const toggleDarkMode = () => ({
    type: 'TOGGLE_DARKMODE'
});

export const loadWords = () => ({
    type: 'LOAD_WORDS'
});

export const prepareQuiz = () => ({
    type: 'PREPARE_QUIZ'
});

export const loadingQuiz = () => ({
    type: 'LOADING_QUIZ'
});

export const loadedQuiz = () => ({
    type: 'LOADED_QUIZ'
});

export const changeNumQuestion = (payload) => ({
    type: 'CHANGE_NUM',
    payload: payload
});

export const changeQuestionTimeout = (payload) => ({
    type: 'CHANGE_TIMEOUT',
    payload: payload
});

export const questionAnswered = (index, payload) => ({
    type: 'ANSWERED',
    index: index,
    payload: payload
});

export const updateCurrent = (payload) => ({
    type: 'UPDATE_CURRENT',
    payload: payload
});