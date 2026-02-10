import { create } from 'zustand';

// URL per prenotazione - modifica qui il link Calendly
export const BOOKING_URL = 'https://calendly.com/spaziosacro/calibrazione';

export const useAppStore = create((set, get) => ({
    // Current phase (1-5)
    currentPhase: 1,

    // Phase 1: Brain dump input
    brainDumpInput: '',

    // Phase 2: Sorted quadrants
    quadrants: {
        ritual: [],
        sandbox: [],
        mischief: [],
        craft: []
    },

    // Phase 3: Market titles
    marketTitles: [],
    selectedTitle: null,

    // Phase 4: Validation gates
    gates: {
        resonance: null,   // RISONANZA UNICA
        scalability: null, // CRAFT SCALABILE
        authority: null    // AUTORITÀ SOVRANA
    },

    // Loading states
    isProcessing: false,

    // Actions
    setPhase: (phase) => set({ currentPhase: phase }),
    setBrainDumpInput: (input) => set({ brainDumpInput: input }),
    setQuadrants: (quadrants) => set({ quadrants }),
    setMarketTitles: (titles) => set({ marketTitles: titles }),
    setSelectedTitle: (title) => set({ selectedTitle: title }),
    setGate: (gate, value) => set((state) => ({
        gates: { ...state.gates, [gate]: value }
    })),
    setIsProcessing: (isProcessing) => set({ isProcessing }),

    getOutcome: () => {
        const { gates } = get();
        const allAnswered = gates.resonance !== null && gates.scalability !== null && gates.authority !== null;
        const allYes = gates.resonance === true && gates.scalability === true && gates.authority === true;

        if (!allAnswered) return null;

        if (allYes) {
            return { type: 'success', message: 'Asset Sovrano Validato. La tua via è libera.' };
        }

        const failures = [];
        if (gates.resonance === false) failures.push({ gate: 'resonance', message: 'Risonanza Unica non rilevata' });
        if (gates.scalability === false) failures.push({ gate: 'scalability', message: 'Il Craft non è ancora scalabile' });
        if (gates.authority === false) failures.push({ gate: 'authority', message: 'Mancanza di Autorità Sovrana' });

        return { type: 'alert', failures };
    },

    // Reset app
    reset: () => set({
        currentPhase: 1,
        brainDumpInput: '',
        quadrants: { ritual: [], sandbox: [], mischief: [], craft: [] },
        marketTitles: [],
        selectedTitle: null,
        gates: { resonance: null, scalability: null, authority: null },
        isProcessing: false
    })
}));
