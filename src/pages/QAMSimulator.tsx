import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SettingsPanel from "../components/SettingsPanel";
import { runSimulation, SimulationResult } from "../utils/simulation";
import IQPlane from "../components/IQPlane";
import Footer from "../components/Footer";

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
    }, 1000 / 10);    // 1/10秒ごとに更新

    return () => clearInterval(interval);
  }, [settings]);

  const headerTitle = "QAMシミュレーション";

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800 w-full">
        <Header title={headerTitle} />
        <div className="mx-auto container py-8 flex justify-center flex-1">
            <div className="w-full max-w-4xl p-4">
            <div className="flex flex-col sm:flex-row">
                <div className="mx-3 my-3 flex justify-center w-full sm:w-1/2">
                <SettingsPanel onSettingsChange={setSettings} />
                </div>
                {simulationResult && (
                <div className="w-full sm:w-1/2">
                    <h2 className="text-xl font-bold text-center pt-3">シミュレーション結果</h2>
                    <div className="mx-3 p-2">
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
        <Footer url="/introduce" title="QAMとは？"/>
    </div>
  );
};

export default App;
