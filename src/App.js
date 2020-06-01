import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import makeStyles from '@material-ui/styles/makeStyles';
import TopBar from './containers/TopBar';
import { useSelector, useDispatch } from 'react-redux';
import { loadWords } from './actions';
import Question from './containers/Question';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { fade } from '@material-ui/core/styles';
import VoiceControl from './containers/VoiceControl';
import CheatSheet from './containers/CheatSheet';


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

  const quiz = useSelector(state => state.quiz);
  const cheat = useSelector(state => state.cheat);

  const loadQuiz = () => {
    dispatch({ type: 'LOADING_QUIZ' });
    dispatch({ type: 'LOAD_WORDS' });
    dispatch({ type: 'PREPARE_QUIZ' });
    dispatch({ type: 'LOADED_QUIZ' });
  }

  return (
    <React.Fragment>
      {console.log('refreshing app..')}
      <TopBar />

      <Grid container className={classes.container}>
        {!quiz.started ? <Grow in={true}><Grid item>
          <Paper className={classes.start}>
            <Grid container direction="column" justify="center" align="center">
              <Grid item>
                <Button onClick={() => loadQuiz()} className="start-button" contained style={{ backgroundColor: '#ffa726' }}><Typography style={{ color: '#fff', fontWeight: 700 }}>Start Quiz</Typography></Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid></Grow> : null}

        {quiz.quiz.map((item, idx) => idx <= quiz.current ? <Question data={item} idx={idx} key={item.question} /> : null)}

      </Grid>
      <Grid container justify="center">
        {quiz.loading ? <CircularProgress /> : null}
      </Grid>
      <Grid container className={classes.footer}>
        <Grid item></Grid>
        {quiz.showResult ? <Grow in={true}><Grid item>
          <Paper className={classes.start}>
            <Grid container direction="column" justify="center" align="center">
              <Grid item>
                <Typography variant="h5" className={classes.result_text}>Result: {quiz.quiz.filter(item => item.answerCorrect).length}/{quiz.num}</Typography>
              </Grid>
              <Grid item>
                <Button onClick={() => loadQuiz()} className="restart-button" contained style={{ backgroundColor: '#ffa726' }}><Typography style={{ color: '#fff', fontWeight: 700 }}>Restart</Typography></Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid></Grow> : null}
        <Grid item></Grid>
      </Grid>
      <VoiceControl />
      <CheatSheet />
      {/* {voice.active ? : null} */}
    </React.Fragment>
  );
}

export default App;
