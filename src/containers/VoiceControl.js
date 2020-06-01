import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
// import Speech from 'react-speech';
import Say from 'react-say';
import MicIcon from '@material-ui/icons/Mic';
import MicRoundedIcon from '@material-ui/icons/MicNoneRounded';
import LinearProgress from '@material-ui/core/LinearProgress';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import SpeechRecognition from 'react-speech-recognition'
import { useSelector, useDispatch } from 'react-redux';
import { useSynthesize } from 'react-say';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    box: {
        height: theme.spacing(25),
        width: theme.spacing(40),
        position: 'fixed',
        right: theme.spacing(2),
        top: theme.spacing(10),
    },
    grid: {
        height: 'inherit',
    },
    detail: {
        flexGrow: 1,
        paddingTop: theme.spacing(1),
    },
    mic: {
        margin: theme.spacing(1),
    }
}));


const VoiceControl = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const voice = useSelector(state => state.voice);
    const [text, setText] = useState('');
    const [speakNow, setSpeakNow] = useState(false);
    const [prevCommand, setCommand] = useState('');

    const cheat_prefix = ['meaning', 'usage', 'use', 'definition', 'define'];

    const {
        transcript,
        interimTranscript,
        finalTranscript,
        resetTranscript,
        browserSupportsSpeechRecognition,
        startListening,
        stopListening,
        abortListening,
        listening
    } = props;


    React.useEffect(() => {
        console.log(props);
        if (!voice.active && listening)
            stopListening();

        if (listening && interimTranscript && (interimTranscript !== prevCommand && interimTranscript !== '')) {
            if (cheat_prefix.reduce((prev, curr) => prev || interimTranscript.includes(curr), false)) {
                dispatch({ type: 'ADD_COMMAND', payload: { keyword: interimTranscript, timestamp: Date.now() } });
                return;
            }

            dispatch({ type: 'VOICE_COMMAND', payload: interimTranscript.toLowerCase(), startListening: startListening, stopListening: stopListening });
            setCommand(interimTranscript);
        }
    }, [interimTranscript]);

    if (!browserSupportsSpeechRecognition) {
        return (
            <Grow in={voice.active}>
                <Paper className={classes.box}>
                    <Grid container justify="center" align="center">
                        <IconButton onClick={() => { }} ><MicIcon /></IconButton>
                        <Typography>Browser not supported</Typography>
                    </Grid>
                </Paper>
            </Grow >
        );
    }

    const toggleListening = () => listening ? stopListening() : startListening();



    return (

        <Grow in={voice.active}>
            <Paper className={classes.box}>
                <Grid className={classes.grid} container direction="column" justify="space-between" align="center">
                    <Grid item container direction="column" justify="space-around" align="center">
                        <Grid item>
                            <IconButton className={classes.mic} onClick={toggleListening} style={{ marginBottom: 2 }}><MicIcon color="primary" fontSize="large" /></IconButton>
                        </Grid>
                        <Grid item>{listening ? <LinearProgress color="primary" style={{ backgroundColor: '#ff9800', color: '#607d8b' }} /> : null}</Grid>

                    </Grid>
                    <Grid item container className={classes.detail} justify="center" align="center">
                        <Typography>{interimTranscript}</Typography>
                    </Grid>
                    {interimTranscript ? <Grid container justify="center" align="center">
                        <IconButton onClick={resetTranscript} ><DeleteIcon /></IconButton>
                    </Grid> : null}
                </Grid>
            </Paper >
        </Grow >
    );
}

export default SpeechRecognition({ autoStart: false, continous: false })(VoiceControl);