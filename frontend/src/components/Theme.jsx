import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function Theme({ theme, setTheme }) {
    function toggleTheme() {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div id="change-theme-wrapper" className="absolute sm:size-9.5 size-8.5 right-5 md:right-10 lg:right-12 flex justify-center">
            <button className="absolute size-full">
                <SunIcon
                    id="sun"
                    onClick={toggleTheme}
                    alt="Light mode icon"
                    className={`inset-0 text-primary scale-110 absolute hover:cursor-pointer hover:rotate-90 sm:hover:scale-115 hover:-translate-y-1 transition-all duration-500 ${theme === 'dark' ? 'rotate-90 opacity-0 pointer-events-none -z-10' : 'rotate-0 opacity-100 pointer-events-auto z-2'}`} 
                    tabIndex={theme === 'dark' ? -1 : 0}
                />
            </button>
            <button className="absolute size-full">
                <MoonIcon
                    id="moon"
                    onClick={toggleTheme}
                    alt="Dark mode icon"
                    className={`text-white scale-95 inset-0 hover:cursor-pointer hover:-translate-y-1 absolute transition-all duration-500 ${theme === 'dark' ? 'opacity-100 pointer-events-auto z-2' : 'rotate-90 opacity-0 pointer-events-none -z-10'}`}
                    tabIndex={theme === 'dark' ? 0 : -1}
                />
                
            </button>
        </div>
    );
};