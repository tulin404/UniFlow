import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function Header({ theme, setTheme }) {
    function toggleTheme() {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    
    return (
        <header className="bg-header py-6 flex justify-center items-center relative transition-colors duration-200">
            <a href="/" className="flex items-end">
                <img src="./Logo.svg" className="h-13 pr-1 mb-1" />
                <h1 className="hidden sm:flex items-end font-[satoshi] text-6xl text-text font-semibold">niFlow</h1>
            </a>
            <div id="change-theme-wrapper" className="absolute sm:size-9.5 size-8.5 right-5 md:right-10 lg:right-12 translate-y-1/2 bottom-1/2 flex justify-center">
                <button className="absolute size-full">
                    <SunIcon
                        id="sun"
                        onClick={toggleTheme}
                        alt="Light mode icon"
                        className={`inset-0 text-primary scale-110 absolute hover:cursor-pointer hover:rotate-90 sm:hover:scale-115 hover:-translate-y-1 transition-all duration-500 ${theme === 'dark' ? 'rotate-90 opacity-0 pointer-events-none -z-10' : 'rotate-0 opacity-100 pointer-events-auto z-10'}`} 
                        tabIndex={theme === 'dark' ? -1 : 0}
                    />
                </button>
                <button className="absolute size-full">
                    <MoonIcon
                        id="moon"
                        onClick={toggleTheme}
                        alt="Dark mode icon"
                        className={`text-white scale-95 inset-0 hover:cursor-pointer hover:-translate-y-1 absolute transition-all duration-500 ${theme === 'dark' ? 'opacity-100 pointer-events-auto z-10' : 'rotate-90 opacity-0 pointer-events-none -z-10'}`}
                        tabIndex={theme === 'dark' ? 0 : -1}
                    />
                    
                </button>
            </div>
        </header>
    );
};