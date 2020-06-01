import store from '../store';
import unirest from 'unirest';
import request from 'request';


const initialState = {
    active: false,
    commands: []
}

const voiceReducer = (state = initialState, action) => {
    var newState = { ...state };
    switch (action.type) {
        case 'TOGGLE_VOICE_CONTROL':
            newState.active = !state.active;
            return newState;
        case 'VOICE_COMMAND':
            setTimeout(() => handleCommand(action));
            return state;
        case 'ADD_COMMAND':
            console.log('adding command');
            newState.commands.push(action.payload);
            if (newState.commands.length > 10) newState.commands.shift();
            if (newState.commands.length === 1)
                setTimeout(() => handleCheatCommands());
            return newState;
        case 'CLEAR_COMMANDS':
            newState.commands = [];
            return newState;
        default:
            return state;
    }
}

const handleCheatCommands = () => {
    const state = store.getState();
    let myInterval = setInterval(() => {
        if (state.voice.commands.length > 0) {
            if (Date.now() - state.voice.commands[state.voice.commands.length - 1].timestamp > 2000) {
                store.dispatch({ type: 'CLEAR_COMMANDS' });
                clearInterval(myInterval);

                var cheat_prefix = ['meaning ', 'usage ', 'use ', 'definition ', 'define '];
                var cmd = state.voice.commands[state.voice.commands.length - 1].keyword;
                if (cheat_prefix.reduce((prev, curr) => prev || cmd.includes(curr), false)) {
                    var without_prefix = cheat_prefix.reduce((prev, curr) => prev.replace(curr, ''), cmd);
                    for (var [i, val] of ['of ', 'for ', 'in ', 'with ', 'by ', 'word ', ' '].entries()) {
                        without_prefix = without_prefix.replace(val, '');
                    }
                    if (without_prefix !== '') {

                        var options = (word) => ({
                            method: 'GET',
                            url: `https://wordsapiv1.p.rapidapi.com/words/${word}`,
                            headers: {
                                'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
                                'x-rapidapi-key': '1aeccb6ba2msh47200012c2995e7p131890jsne9b9b9a93c89',
                                useQueryString: true
                            }
                        });

                        if (state.cheat.data.word !== without_prefix) {
                            request(options(without_prefix), function (error, response, body) {
                                if (error) { };
                                store.dispatch({ type: 'CHEAT_ACTIVE', payload: JSON.parse(body) });
                                setTimeout(() => store.dispatch({ type: 'CHEAT_INACTIVE' }), 10000);
                            });
                        }

                    }
                    return;
                }

                // dispatch({ type: 'VOICE_COMMAND', payload: interimTranscript.toLowerCase(), startListening: startListening, stopListening: stopListening });

            }
        } else clearInterval(myInterval);
    }, 1000);
}

const handleCommand = (action) => {
    const { payload, startListening, stopListening } = action;
    const cmd = payload;

    var selection_prefix = ['select', 'click', 'choose', 'answer'];
    var choices_one = ['first', 'one', '1st', '1', 'fast'];
    var choices_two = ['second', 'two', '2nd', '2'];
    var choices_third = ['third', 'three', '3rd', '3', 'odd', 'hard'];
    var choices_fourth = ['fourth', 'four', '4th', '4', 'forth', 'last', 'port'];

    if (cmd.includes('dark mode')) {
        store.dispatch({ type: 'TOGGLE_DARKMODE' });
        return;
    }

    if (cmd.includes('start quiz') || cmd.includes('restart')) {
        store.dispatch({ type: 'LOADING_QUIZ' });
        store.dispatch({ type: 'LOAD_WORDS' });
        store.dispatch({ type: 'PREPARE_QUIZ' });
        store.dispatch({ type: 'LOADED_QUIZ' });
    } else if (selection_prefix.reduce((prev, curr) => prev || cmd.includes(curr), false)) {
        // contains prefix of selection_prefix
        var without_prefix = selection_prefix.reduce((prev, curr) => prev.replace(curr, ''), cmd);
        without_prefix = without_prefix.replace(' ', '');
        if (choices_one.includes(without_prefix)) {
            store.dispatch({ type: 'OPTION_SELECT', index: 0 });
        } else if (choices_two.includes(without_prefix)) {
            store.dispatch({ type: 'OPTION_SELECT', index: 1 });

        } else if (choices_third.includes(without_prefix)) {
            store.dispatch({ type: 'OPTION_SELECT', index: 2 });

        } else if (choices_fourth.includes(without_prefix)) {
            store.dispatch({ type: 'OPTION_SELECT', index: 3 });
        }
    } else if (cmd.includes('next')) {
        store.dispatch({ type: 'NEXT_QUESTION' });
        startListening();
    } else {
        const state = store.getState();
        const questions = state.quiz.quiz[state.quiz.current] || {};
        const options = questions.options || [];
        options.forEach((item, idx) => {
            if (cmd.includes(item.word)) {
                store.dispatch({ type: 'OPTION_SELECT', index: idx });
            }
        });
    }
}

export default voiceReducer;