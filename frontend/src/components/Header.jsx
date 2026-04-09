export default function Header({ theme, setTheme }) {
    function toggleTheme() {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    
    return (
        <header className="bg-header py-6 flex justify-center relative transition-colors duration-200">
            <a href="/" className="flex items-end">
                <svg className="h-12 xl:h-14" viewBox="14 10 36 44" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><filter id="glow" x="-80%" y="-80%" width="260%" height="260%"><feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#8B5CF6" floodOpacity="0.5"/></filter></defs><path d="M20 16 V36 Q20 48 32 48 Q44 48 44 36 V16" stroke="#8B5CF6" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)"/></svg>
                <h1 className="font-[satoshi] text-text font-semibold text-5xl xl:text-6xl">niFlow</h1>
            </a>
            <div id="change-theme-wrapper" className="absolute h-12 min-w-12 right-5  translate-y-1/2 bottom-1/2">
                <button className="absolute size-full">
                    <img
                        id="sun"
                        onClick={toggleTheme}
                        src="/sun.svg"
                        className={`inset-0 absolute transition-all duration-500 ${theme === 'dark' ? 'rotate-90 opacity-0 pointer-events-none -z-10' : 'rotate-0 opacity-100 pointer-events-auto z-10'}`} 
                        tabIndex={theme === 'dark' ? -1 : 0}
                    />
                </button>
                <button className="absolute size-full">
                    <img
                        id="moon"
                        onClick={toggleTheme}
                        src="/moon.svg"
                        className={`scale-90 inset-0 absolute transition-all duration-500 ${theme === 'dark' ? '-rotate-35 opacity-100 pointer-events-auto z-10' : 'rotate-90 opacity-0 pointer-events-none -z-10'}`}
                        tabIndex={theme === 'dark' ? 0 : -1}
                    />
                
                </button>
            </div>
        </header>
    );
};