import React, { useEffect } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import TopBar from './containers/TopBar';
import { useSelector, useDispatch } from 'react-redux';
import { fade } from '@material-ui/core/styles';
import VoiceControl from './containers/VoiceControl';
import CheatSheet from './containers/CheatSheet';
import QuizApp from './containers/Quiz';
import LearningApp from './containers/Learning';


const redColor = '#ae0015';
const lightRedColor = '#ff6e40';

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)'
    },
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100% - 56px)'
    },
    marginTop: theme.spacing(7),
    justifyContent: 'center'
  },
  result_text: {
    color: theme.palette.type === 'dark' ? lightRedColor : redColor,
    marginBottom: theme.spacing(2),
  },
  start: {
    width: theme.spacing(80),
    backgroundColor: theme.palette.type === 'dark' ? '#616161' : fade(theme.palette.common.white, 0.02),
    padding: theme.spacing(5),
    margin: theme.spacing(5),
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(80),
    },
    [theme.breakpoints.down('md')]: {
      width: theme.spacing(60),
    },
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(40),
      padding: theme.spacing(3),
      margin: theme.spacing(3),
    },
  },
  result: {
    width: theme.spacing(80),
    backgroundColor: theme.palette.type === 'dark' ? '#616161' : fade(theme.palette.common.white, 0.02),
    padding: theme.spacing(5),
    margin: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
    },
    [theme.breakpoints.down('sm')]: {
    },
    [theme.breakpoints.up('md')]: {
    },
    [theme.breakpoints.down('md')]: {
    }
  },
  footer: {
    height: theme.spacing(20),
    justifyContent: 'center'
  }
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const app = useSelector(state => state.app);
  const quiz = useSelector(state => state.quiz);
  const cheat = useSelector(state => state.cheat);

  return (
    <React.Fragment>
      {console.log('refreshing app..')}
      <TopBar />
      {app.quizMode ? <QuizApp /> : <LearningApp />}
      <VoiceControl />
      <CheatSheet />
    </React.Fragment>
  );
}

export default App;
