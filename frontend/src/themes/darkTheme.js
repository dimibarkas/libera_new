import { createTheme } from "@material-ui/core";
import { deDE } from "@material-ui/core/locale"

const darkTheme = createTheme({
    palette: {
        type: "dark"
    }
}, deDE)

export default darkTheme;