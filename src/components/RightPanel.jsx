export default function RightPanel() {
  return (
    <div className="bg-[#8B3DFF]/20 border border-[#8B3DFF]/50 
                rounded-md px-3 py-2">

      <h2 className="text-sm font-semibold text-[#8B3DFF] tracking-wide">
        TRY-ONs
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="h-40 bg-white/10 rounded-lg"></div>
        <div className="h-40 bg-white/10 rounded-lg"></div>
        <div className="h-40 bg-white/10 rounded-lg"></div>
        <div className="h-40 bg-white/10 rounded-lg"></div>
      </div>

    </div>
  )
}