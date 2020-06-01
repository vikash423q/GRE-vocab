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
import { Typography, Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    box: {
        width: theme.spacing(40),
        position: 'fixed',
        top: theme.spacing(37),
        right: theme.spacing(2),
        padding: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            width: theme.spacing(40),
            right: theme.spacing(2),
        },
        [theme.breakpoints.down('md')]: {
            width: theme.spacing(30),
            right: theme.spacing(2),
        },
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(25),
            right: theme.spacing(1),
        },
        [theme.breakpoints.down('xs')]: {
            width: theme.spacing(20),
        }
    },
    grid: {
        height: '100%',
        overflowY: 'scroll',
    },
    detail: {
        height: '100%'
    },
    mic: {
        margin: theme.spacing(1),
    },
    gap: {
        height: theme.spacing(2),
    }
}));


const CheatSheet = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const cheat = useSelector(state => state.cheat);
    const data = cheat.data || {};
    const results = data.results ? (data.results.length > 5 ? data.results.splice(0, 5) : data.results) : data.results || [];
    // React.useEffect(() => {
    //     return () => { };
    // });

    // if (loading) {
    //     return (
    //         <Paper className={classes.box}>
    //             <Grid className={classes.grid} container direction="column" justify="space-between" align="flex-start">
    //             </Grid>
    //         </Paper >
    //     );
    // }


    return (
        <Grow in={cheat.cheatActive}>
            <Paper className={classes.box}>
                <Grid className={classes.grid} container direction="column" justify="space-between" align="flex-start">
                    <Grid container direction="column" item>
                        <Grid item>
                            <Typography variant="h5">{data.word}</Typography>
                        </Grid>
                        <Container className={classes.gap} style={{ height: 8 }} />
                        {data.pronunciation ?
                            <Grid item>
                                <Typography variant="subtitle2"><i>pronunciation:</i>{` ${data.pronunciation.all}` || ''}</Typography>
                            </Grid> : null}
                    </Grid>
                    <Container className={classes.gap} />
                    {results.map(item => {
                        return (<Grid direction="column" container item key={item.definition}>
                            <Grid item>
                                <Typography variant="body2"><i>definition: </i>{`(${item.partOfSpeech}) ${item.definition}`}</Typography>
                            </Grid>
                            {item.synonyms && item.synonyms.length > 0 ?
                                <Grid item>
                                    <Typography variant="subtitle2"><i>synonym:</i>{` ${item.synonyms.join(', ')}`}</Typography>
                                </Grid> : null}
                            {item.examples ? item.examples.map(ex => <Grid key={ex} item>
                                <Typography variant="caption"><i>example: </i>{`" ${ex}"`}</Typography>
                            </Grid>) : null}
                            <Container className={classes.gap} />

                        </Grid>);
                    })}
                </Grid>
            </Paper >
        </Grow>
    );
}

export default CheatSheet;