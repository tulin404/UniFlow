import { useState, useEffect } from "react";
import Header from "./components/Header";
import DoneGrid from "./components/DoneGrid";
import MainGrid from "./components/MainGrid";
import Waves from "./components/Waves";
import FloatingItems from "./components/FloatingItems";
import Loading from "./components/Loading";

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
    const [data, setData] = useState(() => {
        const stored = localStorage.getItem("activ");
        return stored ? JSON.parse(stored) : null;
    });

    const updateData = (newData) => {
        setData(newData);
        localStorage.setItem("activ", JSON.stringify(newData));
    };

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function getFullObj() {
            setLoading(true);

            try {
                const raw = await fetch(`${import.meta.env.VITE_API_URL}`, {
                    signal: controller.signal
                });
                const json = await raw.json();
                if (!json.error) {
                    updateData(json);
                };
            } catch(error) {
                if (error.name !== "AbortError") {
                    console.log("Erro na request das atividades:", error);
                };
            } finally {
                setLoading(false);
            };

        };

        getFullObj();

        // CLEANUP FOR RACE CONDITION
        return () => controller.abort();
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    // ARROW EFFECT
    const [doneActive, setDoneActive] = useState(false);
    const [mainActive, setMainActive] = useState(false);
    const [doneLimit, setDoneLimit] = useState(4);

    return (
        <>
            <Waves />
            <FloatingItems />
            <Header setTheme={setTheme} theme={theme} />
            <Loading isLoading={isLoading} />
            <DoneGrid name="Feitas" data={data} active={doneActive} setActive={setDoneActive} theme={theme} limit={doneLimit} setLimit={setDoneLimit} />
            <MainGrid name="Abertas" data={data} active={mainActive} setActive={setMainActive} theme={theme} limit={doneLimit}/>
        </>
    )
};