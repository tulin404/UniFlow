export default function HamMenuIcon({ isMenuOpen, setMenuOpen }) {

    return (
        <nav id="ham-menu-icon" aria-label="Main Navigation Menu" className="h-5.5 w-7 sm:h-6 sm:w-7.5 absolute left-5 md:left-10 lg:left-12">
            <button onClick={() => setMenuOpen(!isMenuOpen)} className={`${isMenuOpen ? "rotate-180" : "rotate-0"} size-full flex flex-col justify-between transition-[rotate] duration-500`}>
                <span className={`${isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0 translate-y-0 rotate-0"} relative h-0.5 sm:h-0.75 w-full bg-text rounded-full transition-all duration-300`}></span>
                <span className={`${isMenuOpen ? "opacity-0" : "opacity-100"} h-0.5 relative sm:h-0.75 w-full bg-text rounded-full transition-all duration-300`}></span>
                <span className={`${isMenuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0 translate-y-0 rotate-0"} h-0.5 relative sm:h-0.75 w-full bg-text rounded-full transition-all duration-300`}></span>
            </button>
        </nav>
    );
};