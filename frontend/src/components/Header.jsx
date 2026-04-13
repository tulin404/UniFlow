import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function Header({ theme, setTheme }) {
    function toggleTheme() {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    
    return (
        <header className="bg-header py-6 flex justify-center relative transition-colors duration-200">
            <a href="/" className="flex items-end">
                <svg className="h-12 xl:h-14" viewBox="14 10 36 44" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><filter id="glow" x="-80%" y="-80%" width="260%" height="260%"><feDropShadow dx="0" dy="0" stdDeviation="2.3" floodColor="#8B5CF6" floodOpacity="0.25"/></filter></defs><path d="M20 16 V36 Q20 48 32 48 Q44 48 44 36 V16" stroke="#8B5CF6" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)"/></svg>
                <h1 className="hidden sm:block font-[satoshi] text-text font-semibold text-[52px] leading-13 xl:text-6xl">ni</h1><span className="font-[satoshi] text-text font-semibold text-[52px] leading-13 xl:text-6xl">Flow</span>
            </a>
            <div id="change-theme-wrapper" className="absolute sm:size-9.5 size-8.5 right-5 md:right-10 lg:right-12 translate-y-1/2 bottom-1/2 flex justify-center">
                <button className="absolute size-full">
                    <SunIcon
                        id="sun"
                        onClick={toggleTheme}
                        src="/sun.svg"
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