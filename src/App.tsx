import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SettingsPanel from "./components/SettingsPanel";
import { runSimulation, SimulationResult } from "./utils/simulation";
import IQPlane from "./components/IQPlane";

const App: React.FC = () => {
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [settings, setSettings] = useState<{ modulationOrder: number; ebN0: number }>({
    modulationOrder: 4,
    ebN0: 0,
  });

  useEffect(() => {
    const result = runSimulation(settings.modulationOrder, settings.ebN0);
    setSimulationResult(result);

    const interval = setInterval(() => {
      const result = runSimulation(settings.modulationOrder, settings.ebN0);
      setSimulationResult(result);
    }, 1000 / 10);

    return () => clearInterval(interval);
  }, [settings]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />
      <div className="container py-8 flex justify-center">
        <div className="w-full max-w-4xl p-4">
          <div className="flex flex-col sm:flex-row gap-8 w-full">
            <SettingsPanel onSettingsChange={setSettings} />
            {simulationResult && (
              <div className="w-full sm:w-1/2">
                <h2 className="text-xl font-bold text-center mb-4">シミュレーション結果</h2>
                <div className="p-4 border rounded-lg shadow-lg bg-white">
                  <IQPlane
                    transmitSymbols={simulationResult.transmitSymbols}
                    receivedSymbols={simulationResult.receivedSymbols}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
