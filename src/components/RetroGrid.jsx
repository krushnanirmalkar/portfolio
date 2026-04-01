export function RetroGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80caff44_1px,transparent_1px),linear-gradient(to_bottom,#80caff44_1px,transparent_1px)] bg-[size:60px_60px]"
      style={{
        maskImage:
          'linear-gradient(to bottom right, black 30%, transparent 80%)',
        WebkitMaskImage:
          'linear-gradient(to bottom right, black 30%, transparent 80%)',
      }}
    />
  )
}
