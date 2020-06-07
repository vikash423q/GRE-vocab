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
import { green, red } from '@material-ui/core/colors';


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

const TestPage = (props) => {
    const classes = useStyles();
    const state = useSelector(state => state.test);
    const dispatch = useDispatch();

    React.useEffect(() => { dispatch({ type: 'LOAD_TEST_SESSION' }) }, []);

    return (
        <Grid container className={classes.page} direction="column" justify="flex-start" align="flex-start">
            <Grid item container justify="center" align="center">
                <Grid item>
                    <IconButton onClick={() => dispatch({ type: 'CHANGE_TEST_SESSION', payload: state.session_id - 1 })}><ArrowBackOutlinedIcon /></IconButton>
                </Grid>
                <Grid item style={{ paddingTop: 12 }}>
                    <Typography>{"TEST SESSION " + (state.session_id + 1) + " of " + Math.ceil(state.words.length / 10)}</Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={() => dispatch({ type: 'CHANGE_TEST_SESSION', payload: state.session_id + 1 })}><ArrowForwardOutlinedIcon /></IconButton>
                </Grid>
            </Grid>
            <Grid item style={{ paddingTop: 12 }}>
                <Typography variant="body2">{"**scores will appear on completion**"}</Typography>
            </Grid>

            <MatchQuestions words={state.session} />
            <Divider />

            <TFQuestions words={state.session} />
            <Divider />

            <WrittenQuestions words={state.session} />
            <Divider />

        </Grid>
    );
}

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const RedRadio = withStyles({
    root: {
        color: red[400],
        '&$checked': {
            color: red[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);


const MatchQuestions = (props) => {
    const classes = useStyles();
    const [questions, setQuestions] = React.useState([]);
    const [answers, setAnswers] = React.useState([]);
    const [complete, setComplete] = React.useState(false);


    const [keys, setKeys] = React.useState({});

    const prepareMatch = () => {
        var words = shuffle([...props.words]);
        var answers = words.map((item, idx) => ({ word: item.word, answer: idx, selected: false, definition: item.definition }));
        var questions = shuffle([...answers]);
        return [questions, answers];
    }

    const handleInput = (idx, val) => {
        var key = val.length > 0 ? val.toUpperCase().charAt(0) : '';
        key = parseInt(key.charCodeAt(0) - 65);
        var _keys = { ...keys };
        _keys[idx] = key;
        setKeys(_keys);
        setAnswers(answers.map((item, idx) => ({ ...item, selected: Object.values(_keys).includes(idx) })));
        if (Object.keys(_keys).length >= questions.length) {
            setComplete(true);
        }
    }

    const calcScore = () => {
        return questions.filter((item, idx) => item.answer === keys[idx]).length;
    }

    React.useEffect(() => {
        const [questions, answers] = prepareMatch(props.words);
        setQuestions(questions);
        setAnswers(answers);
    }, [props.words])

    // console.log(questions);
    // console.log(answers);
    return (
        <Grid item container direction="column" justify="center" align="space-between" className={classes.part}>
            <Grid item style={{ marginBottom: 8 }}>
                <Typography variant="h6">{questions.length + " " + "MATCH QUESTIONS"}</Typography>
            </Grid>
            {questions.map((item, idx) =>
                <Grid key={item.word} item container style={{ marginBottom: 8, marginTop: 4 }} justify="space-between" align="flex-start">
                    <Grid item container xs={6}>
                        <Typography display="inline" variant="body1">
                            {(idx + 1) + ". "}
                        </Typography>
                        <TextField error={complete && keys[idx] !== item.answer} style={{ width: 36 }} onChange={(event) => handleInput(idx, event.target.value)} />
                        <Typography display="inline" variant="body1">
                            {item.word}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography display="inline" color={answers[idx].selected ? 'secondary' : 'inherit'} variant="body1">
                            {String.fromCharCode(idx + 65) + ". "}
                        </Typography>
                        <Typography display="inline" color={answers[idx].selected ? 'secondary' : 'inherit'} variant="body2">
                            {answers[idx].definition}
                        </Typography>
                    </Grid>
                </Grid>
            )}
            {Object.keys(keys).length >= questions.length ?
                <Grid item container style={{ marginTop: 16 }}>
                    <Typography variant="subtitle1">{'SCORE : ' + calcScore() + '/' + questions.length}</Typography>
                </Grid> : null}

        </Grid>);
}


const TFQuestions = (props) => {
    const classes = useStyles();
    const [questions, setQuestions] = React.useState([]);
    const [complete, setComplete] = React.useState(false);

    const prepareQuestions = () => {
        var words = shuffle([...props.words]);
        var definitions = words.map((item, idx) => item.definition);
        var questions = [];
        for (var i = 0; i < words.length; i++) {
            definitions.splice(i, 1);
            var ans = Math.random() > 0.5;
            if (ans) {
                questions.push({ word: words[i].word, definition: words[i].definition, answer: ans, selected: null });
            } else {
                var rIdx = Math.floor(Math.random() * definitions.length);
                questions.push({ word: words[i].word, definition: definitions[rIdx], answer: ans, selected: null });
                definitions.splice(rIdx, 1);
            }
        }
        return questions;
    }

    const handleChange = (idx, event) => {
        var ques = [...questions];
        ques[idx].selected = event.target.value === 'false' ? false : event.target.value === 'true' ? true : null;
        setQuestions(ques);
        if (questions.filter(item => item.selected !== null).length >= questions.length) {
            setComplete(true);
        }
    }

    const calcScore = () => {
        return questions.filter((item, idx) => item.answer === item.selected).length;
    }

    React.useEffect(() => {
        const questions = prepareQuestions(props.words);
        setQuestions(questions);
    }, [props.words])

    return (
        <Grid item container direction="column" justify="center" align="space-between" className={classes.part}>
            <Grid item style={{ marginBottom: 8 }}>
                <Typography variant="h6">{questions.length + " " + "TRUE/FALSE QUESTIONS"}</Typography>
            </Grid>
            {questions.map((item, idx) =>
                <Grid key={item.word} item container style={{ marginBottom: 4, marginTop: 4 }} direction="column" justify="space-between" align="flex-start">
                    <Grid item container>
                        <Typography display="inline" variant="body1">
                            {(idx + 1) + ". " + item.definition + " -> " + capitalize(item.word)}
                        </Typography>
                    </Grid>
                    <Grid item container direction="column">
                        <RadioGroup aria-label="gender" name="gender1" value={item.selected} onChange={(val) => handleChange(idx, val)}>
                            <FormControlLabel value={true} control={item.selected ? complete && item.answer !== item.selected ? <RedRadio /> : <GreenRadio /> : <Radio />} label="True" />
                            <FormControlLabel value={false} control={item.selected === false ? complete && item.answer !== item.selected ? <RedRadio /> : <GreenRadio /> : <Radio />} label="False" />
                        </RadioGroup>
                    </Grid>
                </Grid>
            )}
            {questions.filter(item => item.selected !== null).length >= questions.length ?
                <Grid item container style={{ marginTop: 16 }}>
                    <Typography variant="subtitle1">{'SCORE : ' + calcScore() + '/' + questions.length}</Typography>
                </Grid> : null}
        </Grid>);
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

export default TestPage;