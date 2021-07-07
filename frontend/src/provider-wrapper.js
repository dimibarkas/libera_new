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
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: light)");
    useEffect(() => {
        dispatch(toggleDarkMode());
    }, [dispatch, prefersDarkMode]);
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