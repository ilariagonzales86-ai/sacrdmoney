import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from './store/useAppStore';
import Phase1BrainDump from './components/phases/Phase1BrainDump';
import Phase2QuadrantSort from './components/phases/Phase2QuadrantSort';
import Phase3MarketCrystal from './components/phases/Phase3MarketCrystal';
import Phase4ValidationGates from './components/phases/Phase4ValidationGates';
import Phase5Outcome from './components/phases/Phase5Outcome';
import './index.css';

function App() {
  const { currentPhase } = useAppStore();

  const phases = {
    1: Phase1BrainDump,
    2: Phase2QuadrantSort,
    3: Phase3MarketCrystal,
    4: Phase4ValidationGates,
    5: Phase5Outcome
  };

  const CurrentPhase = phases[currentPhase];

  return (
    <div className="min-h-screen bg-grid relative overflow-hidden">
      {/* Global Progress Bar */}
      <div
        className="global-progress-bar"
        style={{ width: `${(currentPhase / 5) * 100}%` }}
      />

      {/* Orbital decorations */}
      <div className="orbital-ring" style={{
        width: '800px', height: '800px',
        top: '-400px', right: '-200px',
        border: '1px solid var(--violet-glow)',
        animation: 'orbit 60s linear infinite'
      }} />
      <div className="orbital-ring" style={{
        width: '600px', height: '600px',
        bottom: '-300px', left: '-150px',
        border: '1px solid var(--cyan-glow)',
        animation: 'orbit 45s linear infinite reverse'
      }} />

      {/* Header */}
      <header className="relative z-10 py-10 px-10">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-2xl font-black tracking-[0.2em] uppercase">
              <span className="text-[var(--violet)]">Sacred</span>
              <span className="text-white ml-3">Money</span>
              <span className="text-[var(--text-muted)] ml-2 opacity-50 font-light">Studio</span>
            </h1>
          </motion.div>

          {/* Phase indicator */}
          <div className="flex items-center gap-6">
            <span className="text-[10px] tracking-[0.4em] text-[var(--text-muted)] uppercase font-bold mr-2">Progressione Alchemica</span>
            <div className="phase-indicator">
              {[1, 2, 3, 4, 5].map((phase) => (
                <motion.div
                  key={phase}
                  className={`phase-dot ${currentPhase === phase ? 'active' : ''} ${currentPhase > phase ? 'completed' : ''}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: phase * 0.1 }}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 px-10 pb-32">
        <div className="max-w-[1400px] mx-auto w-full flex justify-center">
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhase}
                className="w-full"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <CurrentPhase />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 py-6 px-10 z-10 bg-gradient-to-t from-[var(--bg-deep)] to-transparent">
        <div className="max-w-5xl mx-auto flex justify-between items-center text-[10px] text-[var(--text-muted)] font-bold tracking-[0.3em] uppercase">
          <div className="flex items-center gap-4">
            <span>( N°001-A )</span>
            <div className="w-12 h-[1px] bg-white/10" />
            <span className="text-[var(--violet)]">V.2.6.0</span>
          </div>
          <span className="font-mono cyan-text">ALCHEMICAL RESEARCH UNIT</span>
          <div className="flex items-center gap-4">
            <span>SPAZIO SACRO © 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
