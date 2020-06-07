import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import { useSelector, useDispatch } from 'react-redux';
import Flashcards from './Flashcards';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import CloseIcon from '@material-ui/icons/Close';
import shuffle from '../utils';
import LearnPage from './LearnPage';
import TestPage from './TestPage';
import WritePage from './WritePage';



const useStyles = makeStyles((theme) => ({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',

    },
    bar: {
        width: '100%',
        height: '100%',
        marginRight: theme.spacing(1),
        elevation: theme.spacing(1),
    },
    paper: {
        paddingTop: theme.spacing(12),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        width: '100vh',
        height: '100vh'
    },
    title: {
        marginLeft: theme.spacing(3),
        fontWeight: 600,
        fontSize: '0.9rem',
        '&:hover': {
            color: '#8bc34a'
        }
    },
    selected: {
        minWidth: theme.spacing(30),
        padding: theme.spacing(1),
        color: theme.palette.type === 'dark' ? '#8bc34a' : '#ffffff',
        backgroundColor: theme.palette.type === 'dark' ? '#006064' : '#8bc34a'
    },
    selected_cat: {
    },
    icon: {
        color: '#0288d1'
    },
    space: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(4)
    }
}));

const LearningApp = (props) => {

    const classes = useStyles();
    const study = useSelector(state => state.study);
    const dispatch = useDispatch();

    React.useEffect(() => { dispatch({ type: 'SELECT_CATEGORY', payload: null }) }, []);

    const [open, setOpen] = React.useState(false);

    const getOptions = (value) => {
        var opts = [];
        var words = [];
        for (var key of Object.keys(study.words)) {
            var size = study.words[key].relevantWords.filter(item => item.score >= study.similarity_score).length;
            if (size > 0)
                words.push({ word: key, count: size });
        }
        words = value === null || value === '' ? words : words.filter((item) => item.word.match(value));
        words = shuffle(words);
        return words.slice(0, 4);
    }
    const [options, setOptions] = React.useState(getOptions());

    const changeOptions = () => setOptions(getOptions());

    const handleSearch = (event) => {
        var value = event.target.value;
        console.log(value);
        setOptions(getOptions(value));
    }

    const handleScore = (event) => {
        var value = event.target.value;
        console.log(value);
        dispatch({ type: 'CHANGE_SCORE', payload: value / 100 });
    }

    return (<React.Fragment>
        <Grid container className={classes.container}>
            <Grid elevation={5} item container xs={3} md={2} className={classes.bar}>
                <Paper className={classes.paper}>
                    <Grid container direction="column" justify="center" align="flex-start">
                        <Grid item container style={{ marginBottom: 8 }}><Typography variant="subtitle2" color="secondary">STUDY</Typography></Grid>
                        <Grid item container justify="flex-start">
                            <Grid item>
                                <ViewCarouselIcon className={classes.icon} />
                            </Grid>
                            <Grid item onClick={() => dispatch({ type: 'CHANGE_SELECTED', payload: 'flashcard' })}>
                                <Typography gutterBottom variant="h6" style={{ color: study.selected === 'flashcard' ? '#8bc34a' : grey[400] }} className={classes.title}>Flashcards</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container justify="flex-start">
                            <Grid item>
                                <RotateRightIcon className={classes.icon} />
                            </Grid>
                            <Grid item onClick={() => dispatch({ type: 'CHANGE_SELECTED', payload: 'learn' })}>
                                <Typography gutterBottom variant="h6" style={{ color: study.selected === 'learn' ? '#8bc34a' : grey[400] }} className={classes.title}>Learn</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container justify="flex-start">
                            <Grid item>
                                <CreateOutlinedIcon className={classes.icon} />
                            </Grid>
                            <Grid item onClick={() => dispatch({ type: 'CHANGE_SELECTED', payload: 'write' })}>
                                <Typography gutterBottom variant="h6" style={{ color: study.selected === 'write' ? '#8bc34a' : grey[400] }} className={classes.title}>Write</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container justify="flex-start">
                            <Grid item>
                                <DescriptionOutlinedIcon className={classes.icon} />
                            </Grid>
                            <Grid item onClick={() => dispatch({ type: 'CHANGE_SELECTED', payload: 'test' })}>
                                <Typography gutterBottom variant="h6" style={{ color: study.selected === 'test' ? '#8bc34a' : grey[400] }} className={classes.title}>Test</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid elevation={5} item container xs={6} md={5} sm={4} className={classes.bar}>
                <Paper elevation={5} className={classes.paper} style={{ overflowY: 'scroll' }}>
                    <Grid container direction="column" justify="center" align="center">
                        <Grid item container justify="space-around" align="center">
                            <Grid item xs={4}>
                                <TextField id="score-field" endAdornment={<InputAdornment position="start">%</InputAdornment>}
                                    type="number" size="small" style={{ width: '50%', height: '50px' }} onChange={(val) => handleScore(val)} variant="outlined" label="Similarity" defaultValue={study.similarity_score * 100}></TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <Button elevation={1} size="small" onClick={() => { setOpen(!open) }} className="select-button" contained style={{ backgroundColor: '#ffa726' }}><Typography style={{ color: '#fff', fontWeight: 600 }}>Choose Category</Typography></Button>
                            </Grid>
                            <Grid item xs={4}></Grid>

                        </Grid>
                        <Grid style={{ marginTop: 8 }} elevation={4} item container xs={6} justify="center" align="center">
                            <Paper >
                                {study.category ?
                                    <Grid container justify="center" align="center">
                                        <Grid item container xs={12} className={classes.selected} align="center">
                                            <Grid item xs={10}>
                                                <Typography variant="body2" style={{ paddingTop: 4 }}>{study.category + "  " + (study.words[study.category].relevantWords.filter(item => item.score >= study.similarity_score).length + 1) + ' words'}</Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <IconButton onClick={() => { dispatch({ type: 'SELECT_CATEGORY', payload: null }); }} size="small" style={{ color: '#fff' }}><CloseIcon /></IconButton>
                                            </Grid>

                                        </Grid>
                                    </Grid> : null}
                                {open ?
                                    <Grid container justify="center" align="center" style={{ paddingBottom: 8, paddingTop: 6 }}>
                                        <Grid item container xs={12} justify="space-between" align="center">
                                            <Grid item><IconButton onClick={() => setOpen(false)}><CloseIcon /></IconButton></Grid>
                                            <Grid item>  <TextField onChange={(val) => handleSearch(val)} variant="outlined" id="standard-basic" size="small" label="word" />
                                            </Grid>
                                            <Grid item><IconButton onClick={() => changeOptions()}><RefreshIcon /></IconButton></Grid>
                                        </Grid>
                                        {options.map(item => <Grid item xs={12} style={{ margin: 1 }}><Button onClick={() => { dispatch({ type: 'SELECT_CATEGORY', payload: item.word }); setOpen(false); }} style={{ width: '100%' }}>{item.word + "  " + item.count}</Button></Grid>)}
                                    </Grid> : null}
                            </Paper>
                        </Grid>
                    </Grid>
                    <div className={classes.space} />
                    <Divider />
                    <div className={classes.space} />

                    {study.selected === 'flashcard' ? <Flashcards /> : study.selected === 'learn' ? <LearnPage /> : study.selected === 'write' ? <WritePage /> : study.selected === 'test' ? <TestPage /> : null}
                </Paper>
            </Grid>
        </Grid >
    </React.Fragment >);
};

export default LearningApp;