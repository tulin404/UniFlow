import { useEffect, useRef } from "react";

export default function Profile({ isProfileOpen, setProfileOpen, isMenuOpen }) {
    const profileRef = useRef(null);

    if (isProfileOpen) {
        document.documentElement.classList.add("overflow-y-hidden");
    } else {
        document.documentElement.classList.remove("overflow-y-hidden");
    };

    useEffect(() => {
        function handleClickOutside(e) {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileOpen(false);
            };
        };

        window.addEventListener("pointerdown", handleClickOutside);

        console.log(isProfileOpen)

        return () => window.removeEventListener("pointerdown", handleClickOutside);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("overflow-y-hidden");
    }, [isProfileOpen]);

    // CONSUME CLOUDFLARE R2
    const img = "";

    return (
        <div className="absolute flex justify-center right-5 sm:right-20 md:right-25 lg:right-30">
            <button id="profile-btn" onClick={() => setProfileOpen(!isProfileOpen)} className={`${isMenuOpen ? "z-3" : "z-5"} relative p-2 rounded-full bg-primary border-2`} type="button" aria-label="Abrir menu de usuário" aria-haspopup="menu" aria-expanded={isProfileOpen} aria-controls="user-menu">
                <img src={img || "./default-pfp.png"} className="md:size-7.5 size-7" />
            </button>

            <ul ref={profileRef} id="user-menu" role="menu" inert={!isProfileOpen} className={`${isProfileOpen ? "opacity-100 z-5 pointer-events-auto" : "opacity-0 z-3 pointer-events-none"} fixed menu-list bg-color-base text-text transition-opacity duration-200`}>
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