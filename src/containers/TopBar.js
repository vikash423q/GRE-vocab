import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import MicIcon from '@material-ui/icons/Mic';
import Book from '@material-ui/icons/ImportContactsOutlined';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Tooltip from '@material-ui/core/Tooltip';
import { useSelector, useDispatch } from 'react-redux';


const useStyles = makeStyles(theme => ({
    appbar: {
        background: theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main,
        [theme.breakpoints.down('sm')]: {
        },
        [theme.breakpoints.up('md')]: {
        }
    },
    grow: {
        flexGrow: 1,
    },
    app: {
        marginRight: theme.spacing(2),
    },
    microphone: {
        marginRight: theme.spacing(2),
    }
}));


const TopBar = (props) => {
    const classes = useStyles();
    const state = useSelector(state => state.app);
    const dispatch = useDispatch();


    return (
        <div>
            <AppBar className={classes.appbar} position="fixed">
                <Toolbar>

                    <Typography className={classes.title} variant="h6" noWrap>
                        VOCAB QUIZ
                    </Typography>
                    <div className={classes.grow}></div>
                    <IconButton
                        edge="start"
                        className={classes.app}
                        color="inherit"
                        onClick={() => { dispatch({ type: 'TOGGLE_QUIZMODE' }) }}
                    >
                        <Tooltip title={state.quizMode ? "Switch to Learning App" : "Switch to Quiz App"}>
                            {state.quizMode ? <Book /> : <QuestionAnswerIcon />}
                        </Tooltip>
                    </IconButton>
                    <IconButton
                        edge="start"
                        className={classes.microphone}
                        color="inherit"
                        onClick={() => { dispatch({ type: 'TOGGLE_VOICE_CONTROL' }) }}
                    >
                        <Tooltip title="Toggle voice control">
                            <MicIcon />
                        </Tooltip>
                    </IconButton>
                    <IconButton
                        edge="start"
                        className={classes.darkModeButton}
                        color="inherit"
                        onClick={() => { dispatch({ type: 'TOGGLE_DARKMODE' }) }}
                    >
                        <Tooltip title="Toggle light/dark theme">
                            {state.darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                        </Tooltip>
                    </IconButton>
                </Toolbar>
            </AppBar>

        </div>
    );
}

export default TopBar;