import { useEffect, useRef } from "react";

export default function HamMenu({ isMenuOpen, setMenuOpen }) {
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target) && e.target.id !== "open-menu") {
                setMenuOpen(false);
            };
        };

        window.addEventListener("mousedown", handleClickOutside);

        return () => window.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav id="ham-menu" aria-label="Open Menu" className="h-5.5 w-7 sm:hidden absolute left-5">
            <button id="open-menu" onClick={() => setMenuOpen(!isMenuOpen)} aria-expanded={isMenuOpen} aria-controls="menu-list" className={`${isMenuOpen ? "rotate-180" : "rotate-0"} z-6 relative size-full flex flex-col justify-between transition-[rotate] duration-500`}>
                <span className={`${isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0 translate-y-0 rotate-0"} relative h-0.5 w-full bg-text rounded-full transition-all duration-300`}></span>
                <span className={`${isMenuOpen ? "opacity-0" : "opacity-100"} h-0.5 relative w-full bg-text rounded-full transition-all duration-300`}></span>
                <span className={`${isMenuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0 translate-y-0 rotate-0"} h-0.5 relative w-full bg-text rounded-full transition-all duration-300`}></span>
            </button>
            <ul ref={menuRef} id="menu-list" inert={!isMenuOpen} className={`${isMenuOpen ? "block" : "hidden"} fixed top-0 bottom-0 left-10 bg-green-400 z-5`}>
                <li><a onClick={() => setMenuOpen(!isMenuOpen)} >Lições</a></li>
                <li><a onClick={() => setMenuOpen(!isMenuOpen)} href="google.com" target="_blank">Calendário</a></li>
                <li><a onClick={() => setMenuOpen(!isMenuOpen)} >Notas</a></li>
            </ul>
        </nav>
    );
};