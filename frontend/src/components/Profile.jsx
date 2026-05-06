import { useEffect } from "react";

export default function Profile({ isProfileOpen, setProfileOpen, isMenuOpen }) {

    // CONSUME CLOUDFLARE R2
    const img = "";

    return (
        <div className="absolute flex justify-center right-5 sm:right-20 md:right-25 lg:right-30">
            <button id="profile-btn" onClick={() => setProfileOpen(!isProfileOpen)} className={`${isMenuOpen ? "z-3" : "z-5"} relative p-2 rounded-full bg-primary border-2`} type="button" aria-label="Abrir menu de usuário" aria-haspopup="menu" aria-expanded={isProfileOpen} aria-controls="user-menu">
                <img src={img || "./default-pfp.png"} className="md:size-7.5 size-7" />
            </button>

            <ul id="user-menu" role="menu" className={`${isProfileOpen ? "block" : "hidden"} absolute`}>
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