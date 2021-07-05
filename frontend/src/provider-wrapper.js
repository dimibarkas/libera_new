import { BrowserRouter as Router } from "react-router-dom"

export const ProviderWrapper = ({ children }) => {
    return (
        <Router>
            {children}
        </Router>
    )
}