import words from '../words';
import shuffle from '../utils';

const initialState = {
    words: [],
    quiz: [],
    loading: false,
    num: 10,
    timeout: 25,
    current: 0,
    points: 0,
    showResult: false,
}

const loadWords = () => {
    var _list = [];
    for (let [key, value] of Object.entries(words)) {
        _list.push(value)
    }
    return _list;
}

const prepareQuiz = (prevState) => {
    var questions = [];
    var question_index = [];

    var current_idx = 0;
    for (var [i, prevQ] of prevState.quiz.entries()) {
        if (current_idx > 0.3 * prevState.num) break;
        if (!prevQ.answerCorrect) {
            prevQ.options = shuffle(prevQ.options.map(item => { item.selected = false; return item; }));
            prevQ.seconds = prevState.timeout;
            prevQ.answered = false;
            prevQ.answerCorrect = false;
            questions.push(prevQ);
            question_index.push(prevQ.index);
            current_idx++;
        }
    }

    while (current_idx < prevState.num) {
        var randomIndex = Math.floor(Math.random() * prevState.words.length);
        if (!question_index.includes(randomIndex)) {
            var ques = prevState.words[randomIndex].definition;
            var source = prevState.words[randomIndex].source;
            var options = [{ word: prevState.words[randomIndex].word, correct: true, selected: false }];
            var selected_index = [randomIndex];
            for (var i = 0; i < 3; i++) {
                var ridx = Math.floor(Math.random() * prevState.words.length);
                while (selected_index.indexOf(ridx) >= 0) {
                    ridx = Math.floor(Math.random() * prevState.words.length);
                }
                options.push({ word: prevState.words[ridx].word, correct: false, selected: false });
            }

            shuffle(options);

            var q = { question: ques, options: options, source: source, seconds: prevState.timeout, answered: false, answerCorrect: false, index: randomIndex };
            questions.push(q);
            question_index.push(randomIndex);
            current_idx++;
        }
    }

    shuffle(questions);

    return questions;
}

const quizReducer = (state = initialState, action) => {
    var newState = { ...state };
    switch (action.type) {
        case 'LOAD_WORDS':
            newState.words = loadWords();
            return newState;
        case 'LOADING_QUIZ':
            newState.loading = true;
            return newState;
        case 'PREPARE_QUIZ':
            newState.points = 0
            newState.showResult = false;
            newState.current = 0;
            newState.quiz = prepareQuiz(state);
            return newState;
        case 'LOADED_QUIZ':
            newState.loading = false;
            return newState;
        case 'CHANGE_NUM':
            newState.num = action.payload;
            return newState;
        case 'CHANGE_TIMEOUT':
            newState.timeout = action.payload;
            return newState;
        case 'DECREASE_SECONDS':
            newState.quiz[state.current].seconds -= 1;
            return newState;
        case 'ANSWERED':
            newState.quiz[action.index] = action.payload;
            newState.points += action.payload.answerCorrect ? newState.quiz[state.current].seconds * 10 : 0;
            return newState;
        case 'NEXT_QUESTION':
            if (!state.quiz[state.current].answered && state.quiz[state.current].seconds > 0) return state;
            newState.current = state.current < state.num - 1 ? state.current + 1 : state.current;
            return newState;
        case 'QUIZ_COMPLETE':
            newState.showResult = true;
            return newState;
        case 'OPTION_SELECT':
            var current = state.current;
            if (state.quiz[current].answered || state.quiz[state.current].seconds === 0) return state;
            newState.quiz[current].options[action.index].selected = true;
            newState.quiz[current].answered = true;
            newState.quiz[current].answerCorrect = newState.quiz[current].options[action.index].selected && newState.quiz[current].options[action.index].correct;
            newState.points += newState.quiz[current].answerCorrect ? newState.quiz[current].seconds * 10 : 0;
            return newState;
        default:
            return state;
    }
}

export default quizReducer;