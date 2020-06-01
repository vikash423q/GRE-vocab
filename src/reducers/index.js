import { combineReducers } from 'redux';
import appReducer from './app_reducer';
import quizReducer from './quiz_reducer';
import voiceReducer from './voice_reducer';
import cheatReducer from './cheat_reducer';

const rootReducer = combineReducers({
    app: appReducer,
    quiz: quizReducer,
    voice: voiceReducer,
    cheat: cheatReducer
});

export default rootReducer;