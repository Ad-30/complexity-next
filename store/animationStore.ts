import { create } from 'zustand';

type AnimationStore = {
  isAnalyzing: boolean;
  analysisCompleted: boolean;
  buttonClicked: boolean; // Track button clicked state
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setAnalysisCompleted: (analysisCompleted: boolean) => void;
  toggleButtonClicked: () => void; // Method to toggle button clicked state
};

export const useAnimationStore = create<AnimationStore>((set) => ({
  isAnalyzing: false,
  analysisCompleted: false,
  buttonClicked: false, // Initialize button clicked state
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setAnalysisCompleted: (analysisCompleted) => set({ analysisCompleted }),
  toggleButtonClicked: () => set((state) => ({ buttonClicked: !state.buttonClicked })), // Toggle the clicked state
}));