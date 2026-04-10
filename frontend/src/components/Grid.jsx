import { useState, useEffect } from "react";

// GRID COMPONENT
export default function Grid({ id, name }) {
    
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

    const Wrapper = id === 'done' ? 'section' : 'main';

    return (
        <Wrapper>

        </Wrapper>
    );
};