import React, { useState, useEffect } from "react";

interface Settings {
  modulationOrder: number;
  ebN0: number;
}

interface SettingsPanelProps {
  onSettingsChange: (settings: Settings) => void;
}

const ModulationOrderSelector: React.FC<{
  value: number;
  onChange: (value: number) => void;
}> = ({ value, onChange }) => (
  <div className="mb-6">
    <label className="block text-lg font-medium mb-2">QAM方式:</label>
    <select
      className="block w-full p-2 border rounded-lg"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      <option value={4}>4-QAM</option>
      <option value={16}>16-QAM</option>
      <option value={64}>64-QAM</option>
      <option value={256}>256-QAM</option>
    </select>
  </div>
);

const EbN0Slider: React.FC<{
  value: number;
  onChange: (value: number) => void;
}> = ({ value, onChange }) => (
  <div>
    <label className="block text-lg font-medium mb-2">Eb/N0:</label>
    <input
      type="range"
      min="0"
      max="15"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full"
    />
    <span className="block mt-2 text-center text-gray-700">Eb/N0 = {value} dB</span>
  </div>
);

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onSettingsChange }) => {
  const [modulationOrder, setModulationOrder] = useState<number>(4);
  const [ebN0, setEbN0] = useState<number>(0);

  useEffect(() => {
    onSettingsChange({ modulationOrder, ebN0 });
  }, [modulationOrder, ebN0, onSettingsChange]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
      <ModulationOrderSelector value={modulationOrder} onChange={setModulationOrder} />
      <EbN0Slider value={ebN0} onChange={setEbN0} />
    </div>
  );
};

export default SettingsPanel;
