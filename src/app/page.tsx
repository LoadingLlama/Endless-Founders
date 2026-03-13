import MarbleBackground from "@/components/MarbleBackground";
import WaitlistCTA from "@/components/WaitlistCTA";
import Socials from "@/components/Socials";

export default function Home() {
  return (
    <>
      <MarbleBackground />

      {/* Bottom fade overlay */}
      <div className="fixed bottom-0 left-0 w-full h-[35%] z-[3] pointer-events-none bg-gradient-to-b from-transparent via-black/70 to-black/85" />

      {/* Main content */}
      <div className="fixed inset-0 z-10 flex flex-col items-center justify-center text-center px-8 py-16 pointer-events-none [background:radial-gradient(ellipse_at_center,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.3)_40%,transparent_70%)]">
        <div className="pointer-events-auto flex flex-col items-center">
          <h1 className="font-serif font-light text-[clamp(3.5rem,10vw,8.5rem)] tracking-tight leading-none text-[#f0eeea] mb-8 opacity-0 translate-y-[30px] animate-[fadeUp_0.9s_cubic-bezier(0.25,0.1,0.25,1)_0.4s_forwards] [text-shadow:0_4px_40px_rgba(0,0,0,0.6)]">
            <em>Endless</em> Founders
          </h1>

          <p className="font-sans font-light text-[clamp(0.65rem,1.4vw,0.8rem)] tracking-[0.4em] uppercase text-[#c5c3be] mb-10 opacity-0 translate-y-[20px] animate-[fadeUp_0.8s_cubic-bezier(0.25,0.1,0.25,1)_0.6s_forwards] [text-shadow:0_1px_12px_rgba(0,0,0,0.8)]">
            A founder residency
          </p>

          <WaitlistCTA />
        </div>
      </div>

      {/* Location label */}
      <div className="fixed bottom-8 left-10 z-10 font-sans font-light text-[0.7rem] tracking-[0.06em] text-[#b0ada8] opacity-0 animate-[fadeIn_1s_ease_2s_forwards] [text-shadow:0_1px_8px_rgba(0,0,0,0.9)] max-sm:bottom-6 max-sm:left-6 max-sm:text-[0.6rem]">
        Location TBD
      </div>

      {/* Bottom mark */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 opacity-0 animate-[fadeIn_1s_ease_2s_forwards] max-sm:hidden">
        <span className="font-sans font-light text-[0.55rem] tracking-[0.3em] uppercase text-[#807d78] [text-shadow:0_1px_8px_rgba(0,0,0,0.9)]">
          Endless Founders
        </span>
        <div className="w-[3px] h-[3px] rounded-full bg-[#807d78]" />
        <span className="font-sans font-light text-[0.55rem] tracking-[0.3em] uppercase text-[#807d78] [text-shadow:0_1px_8px_rgba(0,0,0,0.9)]">
          2026
        </span>
      </div>

      <Socials />
    </>
  );
}
