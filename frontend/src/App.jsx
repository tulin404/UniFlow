import { useState, useEffect } from "react";
import Header from "./components/Header";
import Grid from "./components/Grid";

export default function App() {
    const browserTheme = () => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    };

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || browserTheme();
    });

    useEffect(() => {

        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        };

        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <>
            <Header setTheme={setTheme} theme={theme} />
            <Grid id="done" name="Feitas" />
        </>
    )
};