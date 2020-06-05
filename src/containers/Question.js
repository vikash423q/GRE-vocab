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
import { shake, pulse } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

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


const styles = {
    shake: {
        animation: 'x 1s',
        animationName: Radium.keyframes(shake, 'shake'),
        width: 'inherit',
        padding: 0,
        marginLeft: '1rem',
        marginRight: '1rem'
    },
    normal: {
        width: 'inherit',
        marginLeft: '1rem',
        padding: 0,
        marginRight: '1rem'
    },
    pulse: {
        animation: 'x 1s',
        animationName: Radium.keyframes(pulse, 'pulse'),
        width: 'inherit',
        marginLeft: '1rem',
        padding: 0,
        marginRight: '1rem'
    }
}


const useStyles = (secs) => makeStyles(theme => ({
    question_container: {
        padding: 0,
        // width: theme.spacing(120),
        // [theme.breakpoints.up('md')]: {
        //     width: theme.spacing(120),
        // },
        // [theme.breakpoints.down('md')]: {
        //     width: theme.spacing(100),
        // },
        // [theme.breakpoints.down('sm')]: {
        //     width: theme.spacing(80),
        // },
    },
    paper: {
        backgroundColor: theme.palette.type === 'dark' ? '#616161' : fade(theme.palette.common.white, 0.02),
        '&:hover': {
            backgroundColor: theme.palette.type === 'dark' ? '#757575' : '#fff',
        },
        padding: theme.spacing(5),

        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(5),
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
        },
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(4),
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(3),
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(2),
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    },
    question_header: {
        height: theme.spacing(7),
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
        justifyContent: 'center',
        [theme.breakpoints.up('md')]: {
            height: theme.spacing(7),
        },
        [theme.breakpoints.down('md')]: {
            height: theme.spacing(6),
        },
        [theme.breakpoints.down('sm')]: {
            height: theme.spacing(5),
        },
    },
    header_item: {
        justifyContent: 'center',
        alignContent: 'flex-end'
    },
    question_description: {
        height: theme.spacing(30),
        alignContent: 'center',
        justifyContent: 'center',
        [theme.breakpoints.up('md')]: {
            height: theme.spacing(30),
        },
        [theme.breakpoints.down('md')]: {
            height: theme.spacing(25),
        },
        [theme.breakpoints.down('sm')]: {
            height: theme.spacing(20),
        },
    },
    options: {
        alignContent: 'center',
        justifyContent: 'center',
        marginLeft: -1 * theme.spacing(2)
    },
    question: {
        color: theme.palette.type === 'dark' ? '#eee' : '#3b3e41',
        fontSize: 28,
        fontWeight: 500,
        fontFamily: 'Playfair Display, serif',
        [theme.breakpoints.up('md')]: {
            fontSize: 28,
            fontWeight: 500,
        },
        [theme.breakpoints.down('md')]: {
            fontSize: 26,
            fontWeight: 500,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 22,
            fontWeight: 500,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 20,
            fontWeight: 500,
        },
    },
    button_text: {
        color: '#375c71',
        fontWeight: 600,
        fontFamily: fontFamily,
        [theme.breakpoints.up('md')]: {
            fontSize: '1rem',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '0.9rem',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem',
        },
    },
    bottom_text: {
        color: theme.palette.type === 'dark' ? lightRedColor : redColor,
        letterSpacing: '0.17rem',
        lineHeight: '1.25rem',
        fontSize: '1.25rem',
        [theme.breakpoints.up('md')]: {
            letterSpacing: '0.17rem',
            lineHeight: '1.25rem',
            fontSize: '1.25rem',
        },
        [theme.breakpoints.down('md')]: {
            letterSpacing: '0.15rem',
            lineHeight: '1.1rem',
            fontSize: '1.1rem',
        },
        [theme.breakpoints.down('sm')]: {
            letterSpacing: '0.13rem',
            lineHeight: '1rem',
            fontSize: '1rem',
        },
        [theme.breakpoints.down('xs')]: {
            letterSpacing: '0.12rem',
            lineHeight: '0.9rem',
            fontSize: '0.9rem',
        },
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
        [theme.breakpoints.up('md')]: {
            fontSize: '1rem',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '0.9rem',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.7rem',
        },
    },
    timeout: {
        color: theme.palette.type === 'dark' ? lightRedColor : redColor,
        [theme.breakpoints.up('md')]: {
            fontWeight: 500,
            fontSize: '0.8rem',
        },
        [theme.breakpoints.down('md')]: {
            fontWeight: 500,
            fontSize: '0.6rem',
        },
        [theme.breakpoints.down('sm')]: {
            fontWeight: 500,
            fontSize: '0.5rem',
        },
    },
    timer: {
        color: secs > 5 ? (theme.palette.type === 'dark' ? lightGreenColor : greenColor) : (theme.palette.type === 'dark' ? lightRedColor : redColor),
        fontWeight: 700,
        fontSize: '1.6rem',
        [theme.breakpoints.up('md')]: {
            fontSize: '1.6rem',
            fontWeight: 700,
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '1.4rem',
            fontWeight: 700,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.2rem',
            fontWeight: 700,
        },

    },
    option_button: {
        width: 'inherit',
        margin: theme.spacing(2),
        height: theme.spacing(6),
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
        window.scrollTo(0, ref.current.offsetTop - 60);
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
                <Grid container direction="column" lg={6} md={8} sm={10} xs={12} item className={classes.question_container}>
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
                                <Typography variant="subtitle" color='secondary' className={classes.text} style={{ padding: '0.7rem', borderBottomRightRadius: 12, borderBottomLeftRadius: 12 }}>SOURCE: {props.data.source.toUpperCase()}</Typography>
                            </Paper>
                        </Grid>
                        <Grid container item className={classes.question_description}>
                            <Typography className={classes.question + ' question-text'}>
                                {props.data.question}
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} className={classes.options}>
                            {props.data.options.map((item, idx) => <Grid key={item.word} item xs={6} container justify="center" align="center">
                                {props.data.answered || seconds == 0 ?
                                    <StyleRoot style={item.correct ? styles.pulse : item.selected ? styles.shake : styles.normal}>
                                        <AnswerButton item={item} idx={idx} data={props.data} seconds={seconds} onSelected={onSelected} />    </StyleRoot>
                                    :
                                    <StyleRoot style={styles.normal}><AnswerButton item={item} idx={idx} data={props.data} seconds={seconds} onSelected={onSelected} /></StyleRoot>}
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

const AnswerButton = (props) => {
    const classes = useStyles(props.seconds)();

    return (
        <Button onClick={() => props.onSelected(props.data, props.idx)} style={{ backgroundColor: props.item.selected ? props.item.correct ? correctColor : wrongColor : props.item.correct && (props.data.answered || props.seconds == 0) ? correctColor : backgroundColor }}
            variant="contained" size='large' className={classes.option_button + ((props.data.answered || props.seconds == 0) ? ` already-answered choice-${props.idx + 1}` : ` current-choices choice-${props.idx + 1}`)} disableElevation>
            <Typography className={classes.button_text} style={{ color: props.item.selected || (props.item.correct && (props.data.answered || props.seconds == 0)) ? '#fff' : '#375c71' }}>{props.item.word}</Typography>
        </Button>
    );
}


export default Question;

