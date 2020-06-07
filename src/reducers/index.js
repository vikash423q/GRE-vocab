import { combineReducers } from 'redux';
import appReducer from './app_reducer';
import quizReducer from './quiz_reducer';
import voiceReducer from './voice_reducer';
import cheatReducer from './cheat_reducer';
import StudyReducer from './study_reducer';
import FlashcardReducer from './flashcard_reducer';
import LearnReducer from './learning_reducer';
import WriteReducer from './write_reducer';
import TestReducer from './test_reducer';

const rootReducer = combineReducers({
    app: appReducer,
    quiz: quizReducer,
    voice: voiceReducer,
    cheat: cheatReducer,
    study: StudyReducer,
    flashcard: FlashcardReducer,
    learn: LearnReducer,
    write: WriteReducer,
    test: TestReducer,
});

export default rootReducer;