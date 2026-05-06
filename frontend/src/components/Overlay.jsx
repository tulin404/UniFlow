export default function Overlay({ isMenuOpen, isProfileOpen }) {
    return <div className={`${isMenuOpen || isProfileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} fixed inset-0 bg-black/30 backdrop-blur-xs z-4 transition-all duration-300`}></div>
};