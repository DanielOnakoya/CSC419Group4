export default function App() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Top Header */}
      <header className="h-14 flex items-center px-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#7C3AED]" />
          <h1 className="font-semibold text-sm tracking-wide">
            AI VIRTUAL Try-On
          </h1>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1">

        {/* LEFT PANEL */}
        <aside className="w-[260px] border-r border-white/10 p-4 space-y-4">

          <h2 className="text-xs font-semibold tracking-widest text-white/70">
            YOUR MODEL
          </h2>

          <div className="h-40 rounded-lg bg-white/10" />

          <p className="text-xs text-white/60">Upload Reference</p>

          <div className="h-28 rounded-lg border border-dashed border-white/20 
                          flex flex-col items-center justify-center gap-1 text-white/50 text-xs">
            <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
              +
            </div>
            Drop New Model
          </div>

          <div>
            <p className="text-xs text-white/60 mb-2">RECENT MODELS</p>
            <div className="flex gap-2">
              <div className="w-12 h-12 rounded bg-white/10" />
              <div className="w-12 h-12 rounded bg-white/10" />
              <div className="w-12 h-12 rounded bg-white/10" />
            </div>
          </div>

          <p className="text-xs text-white/60">Upload Reference</p>

          <div className="h-20 rounded-lg border border-dashed border-white/20 
                          flex flex-col items-center justify-center gap-1 text-white/50 text-xs">
            <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center">
              +
            </div>
            Drop New Model
          </div>

        </aside>

        {/* CENTER PANEL */}
        <main className="flex-1 flex flex-col justify-between py-8 px-8">

          {/* Enlarged Preview Area */}
          <div className="w-full h-[560px] rounded-2xl 
                bg-black flex items-center justify-center 
                text-white/50 text-sm tracking-wide">
            IMAGE PREVIEW
          </div>

          {/* Buttons */}
          <div className="flex justify-between w-full max-w-[560px] mt-8 mx-auto">

            <button className="px-6 py-2 rounded-lg bg-white/10 text-sm">
              Save Draft
            </button>

            <button className="px-6 py-2 rounded-lg bg-[#7C3AED] 
                               text-sm flex items-center gap-2">
              {/* Hanger Icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 7a3 3 0 0 1 3 3c0 1.5-1 2.5-2 3l6 4a2 2 0 0 1-2 3H7a2 2 0 0 1-2-3l6-4c-1-.5-2-1.5-2-3a3 3 0 0 1 3-3z" />
              </svg>

              Generate Try-On
            </button>

          </div>

        </main>

        {/* RIGHT PANEL */}
        <aside className="w-[300px] border-l border-white/10 p-4 space-y-4">

          {/* Purple TRY-ON Header */}
          <div className="bg-[#7C3AED]/20 border border-[#7C3AED]/40 
                          rounded-md px-3 py-2">
            <h2 className="text-sm font-semibold text-[#7C3AED]">
              TRY-ONs
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="h-28 rounded bg-white/10" />
            <div className="h-28 rounded bg-white/10" />
            <div className="h-28 rounded bg-white/10" />
            <div className="h-28 rounded bg-white/10" />
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-xs text-white/50">
              Selected item (1)
            </p>
            <button className="text-xs text-[#8B3DFF] hover:underline">
              Clear All
            </button>
          </div>

          <div className="flex gap-2">
            <div className="w-16 h-16 rounded bg-white/10" />
            <div className="w-16 h-16 rounded border border-dashed border-white/20" />
          </div>

        </aside>

      </div>
    </div>
  )
}