export default function CenterPreview() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6">

      {/* Preview Card */}
      <div className="w-[420px] h-[560px] bg-black rounded-2xl flex items-center justify-center relative shadow-lg">
        <span className="text-white/40 tracking-widest">
          IMAGE PREVIEW
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">

        <button className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm">
          Save Draft
        </button>

        <button className="px-6 py-2 rounded-lg bg-[#8B3DFF] 
                   hover:bg-[#9A5BFF] transition
                   text-sm flex items-center gap-2">
          Generate Try-On
        </button>

      </div>

    </div>
  )
}