import React, { useRef, useEffect, useState } from 'react';
import { fade } from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from 'react-redux';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import ArrowDropDownOutlined from '@material-ui/icons/ArrowDownwardOutlined';
import Container from '@material-ui/core/Container/';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import { Say } from 'react-say';

const hoverColor = '#bbdefb';
const backgroundColor = '#e5edf1';
const correctColor = '#5ca40c';
const wrongColor = '#cd2c13';
const textColor = '#3b3e41';
const borderColor = '#97b7c9';
const fontFamily = 'Open Sans,Helvetica';
const greenColor = 'green';
const lightGreenColor = '#00e676';
const redColor = '#ae0015';
const lightRedColor = '#ff6e40';


const useStyles = (secs) => makeStyles(theme => ({
    question_container: {
        padding: 0,
        width: theme.spacing(120),
    },
    paper: {
        backgroundColor: theme.palette.type === 'dark' ? '#616161' : fade(theme.palette.common.white, 0.02),
        '&:hover': {
            backgroundColor: theme.palette.type === 'dark' ? '#757575' : '#fff',
        },
        padding: theme.spacing(5),
        margin: theme.spacing(3),
    },
    question_header: {
        height: theme.spacing(7),
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
        justifyContent: 'center',
    },
    header_item: {
        justifyContent: 'center',
        alignContent: 'flex-end'
    },
    question_description: {
        height: theme.spacing(30),
        alignContent: 'center',
        justifyContent: 'center'
    },
    options: {
        alignContent: 'center',
        justifyContent: 'center'
    },
    question: {
        color: theme.palette.type === 'dark' ? '#eee' : '#3b3e41',
        fontSize: 28,
        fontWeight: 500,
        fontFamily: 'Playfair Display, serif'
    },
    button_text: {
        color: '#375c71',
        fontWeight: 600,
        fontFamily: fontFamily
    },
    bottom_text: {
        color: theme.palette.type === 'dark' ? lightRedColor : redColor,
        letterSpacing: '0.17rem',
        lineHeight: '1.25rem',
        fontSize: '1.25rem'
    },
    icon: {
        color: theme.palette.type === 'dark' ? lightRedColor : redColor,
    },
    text: {
        color: theme.palette.type === 'dark' ? '#eee' : textColor,
        fontFamily: fontFamily,
        fontWeight: 400,
        fontSize: '1rem',
        marginBottom: 0,
    },
    timeout: {
        color: theme.palette.type === 'dark' ? lightRedColor : redColor,
    },
    timer: {
        color: secs > 5 ? (theme.palette.type === 'dark' ? lightGreenColor : greenColor) : (theme.palette.type === 'dark' ? lightRedColor : redColor),
        fontWeight: 700,
        fontSize: '1.6rem'

    },
    option_button: {
        margin: theme.spacing(2),
        height: theme.spacing(6),
        width: 'inherit',
        backgroundColor: backgroundColor,
        '&:hover': {
            backgroundColor: hoverColor,
        },
        borderRadius: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    next_button: {
        '&:hover': {
            textDecorationLine: 'underline',
            textDecorationColor: theme.palette.type === 'dark' ? lightRedColor : redColor,
        },
        height: theme.spacing(6),
        width: theme.spacing(45),
        marginBottom: theme.spacing(3),
    },
    footer: {
        marginTop: theme.spacing(4),
        alignContent: 'flex-end',
        justifyContent: 'center'
    }
}));



const Question = (props) => {
    const state = useSelector(state => state.quiz);
    const dispatch = useDispatch();
    const myRef = useRef(null);
    const [scrolled, setScroll] = useState(false);
    const scrollToRef = (ref) => {
        window.scrollTo(0, ref.current.offsetTop);
        setScroll(true);
    };

    const executeScroll = () => scrolled ? null : scrollToRef(myRef);
    const seconds = props.data.seconds;
    const classes = useStyles(seconds)();
    const setSeconds = () => dispatch({ type: 'DECREASE_SECONDS' });


    useEffect(() => {
        executeScroll();
        let myInterval = setInterval(() => {
            if ((props.data.answered || seconds == 0) && props.idx == state.num - 1) {
                dispatch({ type: 'QUIZ_COMPLETE' });
            }
            if (!props.data.answered && seconds > 0) {
                setSeconds();
            }
            else
                clearInterval(myInterval)
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    const onSelected = (ques, i) => {
        if (props.data.answered || seconds == 0) return;
        ques.options[i].selected = true;
        ques.answered = true;
        ques.answerCorrect = ques.options[i].selected && ques.options[i].correct;
        dispatch({ type: 'ANSWERED', index: props.idx, payload: ques });
        if (props.idx == state.num - 1) dispatch({ type: 'QUIZ_COMPLETE' });
    }

    const nextClick = () => {
        if ((props.data.answered || seconds === 0) && props.idx == state.num - 1) {
            // show score
            dispatch({ type: 'QUIZ_COMPLETE' });
        } else {
            // next question
            if ((props.data.answered || seconds === 0) && state.current == props.idx)
                dispatch({ type: 'NEXT_QUESTION' });
        }
    }

    return (
        <Grow ref={myRef} in={true}>
            <Grid container item justify="space-between" className="current-question">
                {state.quiz.current === props.idx && state.voice.active ? <Say speak={props.data.question} /> : null}
                <Grid item></Grid>
                <Grid container direction="column" item className={classes.question_container}>
                    <Paper className={classes.paper}>

                        <Grid container item className={classes.question_header}>
                            <Grid item container className={classes.header_item} xs={4}><Typography className={classes.text}><b>{props.idx + 1}</b> OF {state.num}</Typography></Grid>
                            <Grid item container direction="column" align="center" justify="center" className={classes.header_item} style={{
                                borderRight: `1px solid ${borderColor}`,
                                borderLeft: `1px solid ${borderColor}`,
                            }} xs={4}>
                                <Grid item>
                                    {seconds === 0 ? <Typography className={classes.timeout}>TIMEOUT</Typography> : null}
                                </Grid>
                                <Grid item container direction="row" align="center" justify="center">
                                    <Grid item><Typography noWrap variant="h4" className={classes.timer}>:{seconds}</Typography></Grid>
                                    <Grid item ><Typography noWrap variant="subtitle" className={classes.text}>SECONDS</Typography></Grid>
                                </Grid>
                            </Grid>
                            <Grid item container className={classes.header_item} xs={4}><Typography className={classes.text}><b>{state.points}</b> POINTS</Typography></Grid>
                        </Grid>
                        <Grid container item justify="flex-end">
                            <Paper>
                                <Typography variant="subtitle" color='secondary' style={{ padding: '0.7rem', borderBottomRightRadius: 12, borderBottomLeftRadius: 12 }}>SOURCE: {props.data.source.toUpperCase()}</Typography>
                            </Paper>
                        </Grid>
                        <Grid container item className={classes.question_description}>
                            <Typography className={classes.question + ' question-text'}>
                                {props.data.question}
                            </Typography>
                        </Grid>
                        <Grid container item className={classes.options}>
                            {props.data.options.map((item, idx) => <Grid key={item.word} item xs={6} container justify="center" align="center">
                                <Button onClick={() => onSelected(props.data, idx)} style={{ backgroundColor: item.selected ? item.correct ? correctColor : wrongColor : item.correct && (props.data.answered || seconds == 0) ? correctColor : backgroundColor }}
                                    variant="contained" size='large' className={classes.option_button + ((props.data.answered || seconds == 0) ? ` already-answered choice-${idx + 1}` : ` current-choices choice-${idx + 1}`)} disableElevation>
                                    <Typography className={classes.button_text} style={{ color: item.selected || (item.correct && (props.data.answered || seconds == 0)) ? '#fff' : '#375c71' }}>{item.word}</Typography>
                                </Button>
                            </Grid>)}
                        </Grid>
                        <Grid item container justify="center" align="center" className={classes.footer}>
                            <ButtonBase disableRipple className={classes.next_button + (props.idx === state.num - 1 ? ' show-result' : ' next-question')} onClick={() => nextClick()}>
                                <Grid container justify="center">
                                    <Grid item><Typography className={classes.bottom_text}>{props.idx === state.num - 1 ? 'SHOW RESULT' : 'NEXT QUESTION'}</Typography></Grid>
                                    <Grid item><ArrowDropDownOutlined className={classes.icon} /></Grid>
                                </Grid>
                            </ButtonBase>
                        </Grid>
                    </Paper>

                </Grid>
                <Grid item></Grid>

            </Grid>
        </Grow>
    );
}


export default Question;

