import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { grey, blueGrey, blue } from '@material-ui/core/colors';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import store from './store';
import { useSelector } from 'react-redux'

const getTheme = (darkMode) => {
    let theme = createMuiTheme({
        palette: {
            primary: {
                main: blue[700],
                light: blue[500],
                dark: blueGrey[700]
            },
            secondary: {
                main: grey[500],
                light: grey[300],
                dark: grey[500]
            },
            type: darkMode ? 'dark' : 'light',
            types: {
                dark: {
                    background: {
                        default: "#000000"
                    }
                },
                light: {
                    background: {
                        default: "#ffffff"
                    }
                }
            }
        },
        typography: {
            fontSize: 13
        },
        spacing: 8
    });

    theme = responsiveFontSizes(theme);
    return theme;
}

const ThemedApp = (props) => {
    const state = useSelector(state => state.app);

    return (
        <MuiThemeProvider theme={getTheme(state.darkMode)}>
            <CssBaseline />
            <App />
        </MuiThemeProvider>
    );

}

ReactDOM.render(<Provider store={store}><ThemedApp /></Provider>, document.getElementById('root'));
