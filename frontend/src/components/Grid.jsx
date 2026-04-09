import { useEffect } from "react";

// GRID COMPONENT
export default function Grid({ id, name, endpoint }) {
    
    let data;

    useEffect(() => {
        async function getFullObj() {
            try {
                const raw = await fetch();
                data = raw.json();
            } catch(error) {
                console.log("Erro na request das atividades:", error);
            };
        };
        
        getFullObj();
    }, []);

    const Wrapper = id === 'done' ? 'section' : 'main';

    return (
        <Wrapper>

        </Wrapper>
    );
};