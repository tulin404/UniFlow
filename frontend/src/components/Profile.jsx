import { useEffect } from "react";

export default function Profile({ isProfileOpen, setProfileOpen }) {

    // CONSUME CLOUDFLARE R2
    const img = "";

    return (
        <div className="absolute flex justify-center right-12.5 md:right-25 lg:right-30">
            <button id="profile-btn" onClick={() => setProfileOpen(!isProfileOpen)} className="z-5 relative p-2 rounded-full bg-primary border-2" type="button" aria-label="Abrir menu de usuário" aria-haspopup="menu" aria-expanded={isProfileOpen} aria-controls="user-menu">
                <img src={img || "./default-pfp.png"} className="size-8" />
            </button>

            <ul id="user-menu" role="menu" className="absolute hidden">
                <li role="none">
                    <a role="menuitem">Perfil</a>
                </li>
                <li id="separate" role="none">
                    <a role="menuitem">Atividades</a>
                </li>
                <li role="none">
                    <button role="menuitem">Sair</button>
                </li>
            </ul>
        </div>
    );
};