import { BrowserRouter as Router } from "react-router-dom"
import { SnackbarProvider } from "notistack"
import { useDispatch, useSelector } from "react-redux"
import { useMediaQuery } from "@material-ui/core"
import { useEffect } from "react"
import { toggleDarkMode } from "./redux/store/darkmode/actions"
import darkTheme from "./themes/darkTheme"
import lightTheme from "./themes/lightTheme"
import { ThemeProvider } from "@material-ui/styles"


export const ProviderWrapper = ({ children }) => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.darkMode);
    const prefersLightMode = useMediaQuery("(prefers-color-scheme: light)");

    useEffect(() => {
        const determineLightOrDarkMode = () => {
            if (prefersLightMode && darkMode.isEnabled) {
                dispatch(toggleDarkMode());
            }
            if (prefersLightMode && !darkMode.isEnabled) {

            }
            if (!prefersLightMode && darkMode.isEnabled) {

            }
            if (!prefersLightMode && !darkMode.isEnabled) {
                dispatch(toggleDarkMode())
            }
        };
        determineLightOrDarkMode();
    }, [dispatch, prefersLightMode, darkMode]);

    const theme = darkMode.isEnabled ? darkTheme : lightTheme;
    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
                <Router>
                    {children}
                </Router>
            </SnackbarProvider>
        </ThemeProvider>
    )
}