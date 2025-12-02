export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="terminal-window max-w-4xl mx-auto">
          <div className="terminal-header">
            <div className="terminal-button red"></div>
            <div className="terminal-button yellow"></div>
            <div className="terminal-button green"></div>
          </div>
          <div className="text-center space-y-4">
            <h1 className="font-pixel text-2xl md:text-4xl text-matrix-green mb-8">
              CV PROFILE
            </h1>
            <p className="font-terminal text-xl text-ghost">
              {'>'} System initialized...<span className="animate-blink">_</span>
            </p>
            <p className="font-terminal text-xl text-ghost">
              {'>'} Loading portfolio...<span className="animate-blink">_</span>
            </p>
            <p className="font-code text-sm text-matrix-green-dark mt-8">
              Phase 1: Setup & Foundation - Complete
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
