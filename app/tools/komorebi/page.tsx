export default function KomorebiPage() {
  return (
    // Canvas-studio personality: deep ink, dot-grid backdrop, violet glow
    <main
      className="flex h-svh flex-col bg-[#0F0D14] text-[#E8E4F0]"
      style={{
        backgroundImage: "radial-gradient(circle, #2A2635 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      <div className="flex items-center justify-between border-b border-[#2A2635] bg-[#0F0D14]/90 px-4 py-2 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-violet-600 text-sm font-bold text-white shadow-[0_0_16px_rgba(139,92,246,0.5)]">木</span>
          <div>
            <span className="font-semibold">komorebi-lab</span>
            <span className="ml-2 text-xs text-[#9B93B3]">toolcraft playground — canvas · state · renderer</span>
          </div>
        </div>
        <div className="flex gap-4 text-xs">
          <a href="/komorebi" target="_blank" rel="noreferrer" className="text-[#B8B0D6] hover:text-violet-400 hover:underline">standalone ↗</a>
          <a href="https://github.com/theboyofdream" target="_blank" rel="noreferrer" className="text-[#9B93B3] hover:underline">github ↗</a>
        </div>
      </div>
      <iframe
        src="/komorebi"
        title="komorebi-lab"
        className="w-full flex-1 border-0 bg-[#0F0D14]"
      />
    </main>
  );
}
