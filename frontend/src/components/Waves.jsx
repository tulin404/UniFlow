export default function Waves() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <svg
        viewBox="0 0 1440 490"
        className="w-full absolute bottom-[20dvh] md:bottom-[10dvh] lg:bottom-[5dvh] xl:-bottom-[10dvh]"
        style={{
          filter: "drop-shadow(0 0 6px rgba(139,92,246,0.15))",
        }}
      >
        {/* Wave 1 */}
        <path
          d="M0,260 
             C240,290 480,230 720,260 
             C960,290 1200,230 1440,260"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.3"
        >
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="
              M0,260 C240,290 480,230 720,260 C960,290 1200,230 1440,260;
              M0,260 C240,230 480,290 720,260 C960,230 1200,290 1440,260;
              M0,260 C240,290 480,230 720,260 C960,290 1200,230 1440,260
            "
          />
        </path>

        {/* Wave 2 */}
        <path
          d="M0,280 
             C240,300 480,250 720,280 
             C960,300 1200,250 1440,280"
          fill="none"
          stroke="#6D28D9"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.2"
        >
          <animate
            attributeName="d"
            dur="16s"
            repeatCount="indefinite"
            values="
              M0,280 C240,300 480,250 720,280 C960,300 1200,250 1440,280;
              M0,280 C240,250 480,300 720,280 C960,250 1200,300 1440,280;
              M0,280 C240,300 480,250 720,280 C960,300 1200,250 1440,280
            "
          />
        </path>

        {/* Wave 3 */}
        <path
          d="M0,300 
             C240,320 480,270 720,300 
             C960,320 1200,270 1440,300"
          fill="none"
          stroke="#5B21B6"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.15"
        >
          <animate
            attributeName="d"
            dur="20s"
            repeatCount="indefinite"
            values="
              M0,300 C240,320 480,270 720,300 C960,320 1200,270 1440,300;
              M0,300 C240,270 480,320 720,300 C960,270 1200,320 1440,300;
              M0,300 C240,320 480,270 720,300 C960,320 1200,270 1440,300
            "
          />
        </path>
      </svg>
    </div>
  );
}