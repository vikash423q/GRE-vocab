import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import grey from '@material-ui/core/colors/grey';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import KeyboardOutlinedIcon from '@material-ui/icons/KeyboardOutlined';
import ShuffleOutlinedIcon from '@material-ui/icons/ShuffleOutlined';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import SpaceBarIcon from '@material-ui/icons/SpaceBar';
import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { flipOutX, fadeInLeft, fadeInRight } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import { useSelector, useDispatch } from 'react-redux';
import { useSwipeable, Swipeable } from 'react-swipeable'
import { SayButton } from 'react-say';


const styles = {
    flip: {
        animation: 'x 0.5s',
        animationName: Radium.keyframes(flipOutX, 'flipOutX'),
    },
    normal: {

    },
    next: {
        animation: 'x 0.5s',
        animationName: Radium.keyframes(fadeInLeft, 'fadeInLeftBig'),
    },
    prev: {
        animation: 'x 0.5s',
        animationName: Radium.keyframes(fadeInRight, 'fadeInRightBig'),
    }
}

const useStyles = makeStyles((theme) => ({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    flashcard: {
        height: theme.spacing(40),
        width: theme.spacing(65),
        padding: theme.spacing(2),
        '&:hover': {
            cursor: 'pointer'
        },
        overflowY: 'scroll',
        [theme.breakpoints.up('md')]: {
            height: theme.spacing(40),
            width: theme.spacing(65),
        },
        [theme.breakpoints.down('md')]: {
            height: theme.spacing(35),
            width: theme.spacing(55),
        },
        [theme.breakpoints.down('sm')]: {
            height: theme.spacing(30),
            width: theme.spacing(48),
        },
        [theme.breakpoints.down('xs')]: {
            height: theme.spacing(26),
            width: theme.spacing(40),
        },
    },
    bottombar: {
        marginTop: theme.spacing(1),
        width: theme.spacing(60),
        [theme.breakpoints.up('md')]: {
            width: theme.spacing(65),
        },
        [theme.breakpoints.down('md')]: {
            width: theme.spacing(55),
        },
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(45),
        },
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(36),
        },
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

const Flashcards = (props) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const flashcard = useSelector(state => state.flashcard);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [style, setStyle] = React.useState(styles.normal);

    const handleNext = () => { setStyle(styles.next); dispatch({ type: 'NEXT_FLASHCARD' }); setTimeout(() => { setStyle(styles.normal); }, 500) };
    const handlePrev = () => { setStyle(styles.prev); dispatch({ type: 'PREV_FLASHCARD' }); setTimeout(() => { setStyle(styles.normal); }, 500) };

    React.useEffect(() => {
        dispatch({ type: 'LOAD_FLASHCARDS' });
    }, []);

    const handleKey = (event) => {
        event.persist();
        console.log(event);
    }

    const handlers = useSwipeable({ onSwipedRight: (eventData) => handleNext(), onSwipedLeft: (eventData) => handlePrev(), });

    return (<React.Fragment>
        <Grid container direction="column" className={classes.container}>
            <Grid item container justify="center">
                {flashcard.loading ? null :
                    <StyleRoot style={style}><Card {...handlers} data={flashcard.words[flashcard.current]} /></StyleRoot>}
            </Grid>
            <Grid item container justify="center" className={classes.bottombar}>
                <Grid container>
                    <Grid item container md={4} sm={12}></Grid>
                    <Grid item container justify="space-around" align="center" md={4} sm={12}>
                        <Grid item><IconButton className={classes.icon} onKeyPress={handleKey} onClick={handlePrev}><ArrowBackOutlinedIcon /></IconButton></Grid>

                        <Typography variant="subtitle2" style={{ marginTop: 12 }} >{flashcard.current + 1}/{flashcard.words.length}</Typography>

                        <Grid item><IconButton className={classes.icon} onKeyPress={handleKey} onClick={handleNext}><ArrowForwardOutlinedIcon /></IconButton></Grid>
                    </Grid>
                    <Grid item container md={4} sm={12} justify="center">
                        <Grid item><IconButton className={classes.icon} onKeyPress={handleKey} onClick={handleClick}><KeyboardOutlinedIcon /></IconButton></Grid>
                        <Grid item><IconButton className={classes.icon} onClick={() => dispatch({ type: 'SWITCH_SHUFFLE' })}><ShuffleOutlinedIcon color={flashcard.shuffle ? 'primary' : 'secondary'} /></IconButton></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Grid container direction="column" style={{ padding: 8 }}>
                <Grid item container justify="space-between">
                    <Grid item><Typography variant="subtitle2">PREV</Typography></Grid>
                    <Grid item><KeyboardArrowLeftIcon /></Grid>

                </Grid>
                <Grid item container justify="space-between">
                    <Grid item><Typography variant="subtitle2">NEXT</Typography></Grid>
                    <Grid item><KeyboardArrowRightIcon /></Grid>
                </Grid>
                <Grid item container justify="space-between">
                    <Grid item><Typography variant="subtitle2">FLIP</Typography></Grid>
                    <Grid item><SpaceBarIcon /></Grid>
                </Grid>
            </Grid>
        </Popover>
    </React.Fragment>);
};

const Card = (props) => {
    const classes = useStyles();
    const [state, setState] = React.useState({ style: styles.normal, front: true });
    const handleClick = (event) => { event.persist(); console.log(event); setState({ style: styles.flip, front: state.front }); setTimeout(() => setState({ style: styles.normal, front: !state.front }), 500) }
    console.log(props.data);
    const dict = props.data['dictionary'];

    dict['results'] = dict['results'].length > 2 ? dict['results'].slice(0, 3) : dict['results'];
    for (var idx = 0; idx < dict['results'].length; idx++) {
        if (!dict['results'][idx]['examples']) {
            continue;
        }
        dict['results'][idx]['examples'] = dict['results'][idx]['examples'].length > 2 ? dict['results'][idx]['examples'].slice(0, 3) : dict['results'][idx]['examples'];
    }

    React.useEffect(() => {
        setState({ ...state, front: true });
    }, [props.data.word]);



    return (
        <StyleRoot style={state.style}>
            <Paper elevation={7} className={classes.flashcard} onClick={handleClick} >
                {state.front ?
                    <Grid container direction="column" style={{ height: '100%' }} justify="center" align="center">
                        <Grid item container justify="center" align="center">
                            <Grid item style={{ paddingBottom: 12 }}>
                                <Typography variant="h4">{props.data.word}</Typography>
                            </Grid>
                            <Grid item id="say-grid" onClick={(e) => e.stopPropagation()} elevation={8} style={{ paddingTop: 6, marginLeft: 8 }}>
                                <SayButton id="say-button" style={{ color: 'rgba(0,0,0,0)' }} speak={props.data.word}><VolumeUpIcon /></SayButton>
                            </Grid>
                        </Grid>

                    </Grid> :
                    <Grid className={classes.grid} container direction="column" justify="center" align="center">
                        <Grid container direction="column" item>
                            {/* <Grid item>
                                <Typography variant="h5">{dict.word}</Typography>
                            </Grid> */}
                            <Grid item>
                                <Typography variant="subtitle1" style={{ paddingTop: 4, paddingBottom: 4 }}>{props.data.definition}</Typography>
                            </Grid>
                            <Divider />
                            <Container className={classes.gap} style={{ height: 8 }} />
                            {dict.pronunciation ?
                                <Grid item>
                                    <Typography variant="subtitle2"><i>pronunciation:</i>{` ${dict.pronunciation.all}` || ''}</Typography>
                                </Grid> : null}
                        </Grid>
                        <Container className={classes.gap} />
                        {dict['results'].map(item => {
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
                }
            </Paper>
        </StyleRoot >
    );
}

export default Flashcards;