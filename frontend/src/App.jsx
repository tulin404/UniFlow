import { useState, useEffect } from "react";
import Header from "./components/Header";
import DoneGrid from "./components/DoneGrid";

export default function App() {

    // THEME
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

    // DATA FETCHING
    const [data, setData] = useState(null);

    useEffect(() => {
        async function getFullObj() {
            try {
                const raw = await fetch(`${import.meta.env.VITE_API_URL}`);
                const json = await raw.json();
                setData(json);
            } catch(error) {
                console.log("Erro na request das atividades:", error);
            };
        };

        getFullObj();
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    // ARROW EFFECT
    const [doneActive, setDoneActive] = useState(false);
    const [mainActive, setMainActive] = useState(false);

    return (
        <>
            <Header setTheme={setTheme} theme={theme} />
            <DoneGrid name="Feitas" data={data} active={doneActive} setActive={setDoneActive} />
        </>
    )
};