export default function LeftSidebar() {
  return (
    <div className="w-72 bg-[#160B26] p-4 border-r border-white/10">

      <h2 className="text-sm font-semibold mb-3 tracking-wide">
        YOUR MODEL
      </h2>

      {/* Model Preview */}
      <div className="h-48 bg-white/5 rounded-lg mb-3"></div>

      {/* Upload Reference */}
      <div className="border border-dashed border-white/20 rounded-lg p-4 text-center text-sm text-white/60 cursor-pointer hover:border-purple-500 transition">
        Upload Reference
      </div>

      {/* Recent Models */}
      <div className="mt-6">
        <p className="text-xs text-white/50 mb-2">
          RECENT MODELS
        </p>

        <div className="flex gap-2">
          <div className="w-14 h-14 bg-white/10 rounded-md"></div>
          <div className="w-14 h-14 bg-white/10 rounded-md"></div>
          <div className="w-14 h-14 bg-white/10 rounded-md"></div>
        </div>
      </div>

    </div>
  )
}