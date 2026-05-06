import { useEffect, useRef } from "react";

export default function HamMenu({ isMenuOpen, setMenuOpen, isProfileOpen }) {
    const menuRef = useRef(null);

    if (isMenuOpen) {
        document.documentElement.classList.add("overflow-y-hidden");
    } else {
        document.documentElement.classList.remove("overflow-y-hidden");
    };

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target) && e.target.id !== "open-menu") {
                setMenuOpen(false);
            };
        };

        window.addEventListener("click", handleClickOutside);

        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <nav id="ham-menu" aria-label="Open Menu" className="h-5.5 w-7 md:hidden absolute left-5">
            <button id="open-menu" onClick={() => setMenuOpen(!isMenuOpen)} aria-expanded={isMenuOpen} aria-controls="menu-list" className={`${isMenuOpen ? "rotate-180" : "rotate-0"} ${isProfileOpen ? "z-4" : "z-6"} relative size-full flex flex-col justify-between transition-[rotate] duration-500`}>
                <span className={`${isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0 translate-y-0 rotate-0"} relative h-0.5 w-full bg-text rounded-full transition-all duration-300`}></span>
                <span className={`${isMenuOpen ? "opacity-0" : "opacity-100"} h-0.5 relative w-[70%] bg-text rounded-full transition-all duration-300`}></span>
                <span className={`${isMenuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45 w-full" : "bottom-0 translate-y-0 rotate-0 w-[40%]"} h-0.5 relative bg-text rounded-full transition-all duration-300`}></span>
            </button>
            <ul ref={menuRef} id="menu-list" inert={!isMenuOpen} className={`${isMenuOpen ? "translate-x-0" : "-translate-x-[100dvw]"} fixed top-0 bottom-0 left-0 pr-32 bg-color-base z-5 flex flex-col px-5 py-32 gap-6 transition-transform duration-400 text-text text-xl`}>
                <li><a onClick={() => setMenuOpen(!isMenuOpen)}>Lições</a></li>
                <li><a onClick={() => setMenuOpen(!isMenuOpen)}>Calendário</a></li>
                <li><a onClick={() => setMenuOpen(!isMenuOpen)}>Notas</a></li>
            </ul>
        </nav>
    );
};