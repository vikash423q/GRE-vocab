import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import makeStyles from '@material-ui/styles/makeStyles';
import grey from '@material-ui/core/colors/grey';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import shuffle from '../utils';
import { flipOutX, fadeInLeft, fadeInRight } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import { TextField } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    page: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(16)
    },
    part: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
    container: {
        width: '100%',
    },
    flashcard: {
        height: theme.spacing(40),
        width: theme.spacing(65),
        padding: theme.spacing(2),
        '&:hover': {
            cursor: 'pointer'
        },
        overflowY: 'scroll'
    },
    bottombar: {
        marginTop: theme.spacing(1),
        width: theme.spacing(60),
    },
    paper: {
        height: '100%',
        width: '100%',

    },
    gap: {
        marginBottom: theme.spacing(1)
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'hurme_no2-webfont,-apple-system,BlinkMacSystemFont,sans-serif'
    },
    icon: {
        color: theme.palette.type === 'dark' ? '#dedede' : '#3d3d3d'
    }
}));

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const WritePage = (props) => {
    const classes = useStyles();
    const state = useSelector(state => state.write);
    const dispatch = useDispatch();

    React.useEffect(() => { dispatch({ type: 'LOAD_WRITE_SESSION' }) }, []);

    return (
        <Grid container className={classes.page} direction="column" justify="flex-start" align="flex-start">
            <Grid item container justify="center" align="center">
                <Grid item>
                    <IconButton onClick={() => dispatch({ type: 'CHANGE_WRITE_SESSION', payload: state.session_id - 1 })}><ArrowBackOutlinedIcon /></IconButton>
                </Grid>
                <Grid item style={{ paddingTop: 12 }}>
                    <Typography>{"SESSION " + (state.session_id + 1) + " of " + Math.ceil(state.words.length / 10)}</Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={() => dispatch({ type: 'CHANGE_WRITE_SESSION', payload: state.session_id + 1 })}><ArrowForwardOutlinedIcon /></IconButton>
                </Grid>
            </Grid>
            <Grid item style={{ paddingTop: 12 }}>
                <Typography variant="body2">{"**scores will appear on completion**"}</Typography>
            </Grid>

            <WrittenQuestions words={state.session} />
            <Divider />

        </Grid>
    );
}

const WrittenQuestions = (props) => {
    const classes = useStyles();
    const [questions, setQuestions] = React.useState([]);
    const [complete, setComplete] = React.useState(false);

    const prepareQuestions = () => {
        var words = shuffle([...props.words]);
        return words.map(item => ({ word: item.word, definition: item.definition, value: '' }));
    }

    const handleChange = (idx, event) => {
        var ques = [...questions];
        ques[idx].value = event.target.value;
        setQuestions(ques);
        if (ques.filter(item => item.value !== '').length >= questions.length) {
            setComplete(true);
        }
    }

    const calcScore = () => {
        return questions.filter((item, idx) => item.value.toLowerCase() === item.word.toLowerCase()).length;
    }

    React.useEffect(() => {
        const questions = prepareQuestions(props.words);
        setQuestions(questions);
    }, [props.words])

    return (
        <Grid item container direction="column" justify="center" align="space-between" className={classes.part}>
            <Grid item style={{ marginBottom: 8 }}>
                <Typography variant="h6">{questions.length + " " + "WRITTEN QUESTIONS"}</Typography>
            </Grid>
            {questions.map((item, idx) =>
                <Grid key={item.word} item container style={{ marginBottom: 16, marginTop: 4 }} direction="column" justify="space-between" align="flex-start">
                    <Grid item container>
                        <Typography display="inline" variant="body1">
                            {(idx + 1) + ". " + item.definition}
                        </Typography>
                    </Grid>
                    <Grid item container xs={6} style={{ marginLeft: 16 }} direction="column">
                        <TextField error={complete && item.word.toLowerCase() !== item.value.toLowerCase()} defaultValue={item.value} onChange={(e) => handleChange(idx, e)} />
                    </Grid>
                </Grid>
            )}
            {questions.filter(item => item.value !== '').length >= questions.length ?
                <Grid item container style={{ marginTop: 16 }}>
                    <Typography variant="subtitle1">{'SCORE : ' + calcScore() + '/' + questions.length}</Typography>
                </Grid> : null}
        </Grid>);
}

export default WritePage;