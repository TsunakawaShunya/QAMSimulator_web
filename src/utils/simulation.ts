export interface SimulationResult {
    transmitSymbols: [number, number][];
    receivedSymbols: [number, number][];
}
  
/**
 * M-QAMのシンボル点を生成する
 * @param modulationOrder: M-QAMの次数
 * @returns シンボル点の配列
 */
const generateSymbols = (modulationOrder: number): [number, number][] => {
    const V = Math.sqrt(modulationOrder); // VはQAMの√Nに相当

    const symbols: [number, number][] = [];
    const denom = computeDenom(modulationOrder, V);
    
    // シンボル点の計算
    for (let v1 = 0; v1 < V; v1++) {
        for (let v2 = 0; v2 < V; v2++) {
            const x = (2 * v1 - (V - 1)) / denom; // x座標
            const y = (v1 % 2 === 0) ? (2 * v2 - (V - 1)) / denom : ((V - 1) - (2 * v2)) / denom; // y座標

            symbols.push([x, y]);
        }
    }
    return symbols;
};

/**
 * 正規化のための分母を計算する
 * @param modulationOrder: M-QAMの次数
 * @param V: シンボル数
 * @returns 正規化のための分母
 */
const computeDenom = (modulationOrder: number, V: number): number => {
    let denom = 0;
    const Ns = modulationOrder; // シンボル数

    for (let v1 = 0; v1 < V; v1++) {
        for (let v2 = 0; v2 < V; v2++) {
            denom += Math.pow(2 * v1 - (V - 1), 2) + Math.pow(2 * v2 - (V - 1), 2);
        }
    }

    return Math.sqrt(denom / Ns / Math.log2(Ns)); // 正規化
};
  

/**
 * シンボル点に雑音を加える
 * @param symbols: シンボル点の配列
 * @param ebN0: E_b/N_0
 * @returns 雑音が加えられたシンボル点の配列
 */
const addNoise = (symbols: [number, number][], EbN0dB: number): [number, number][] => {
    // シンボルの平均電力を計算
    const P_avg = symbols.reduce((sum, [x, y]) => sum + x ** 2 + y ** 2, 0) / symbols.length;
    // noiseSDを計算 (平均電力とEb/N0を基に)
    const noiseSD = Math.sqrt(P_avg * 0.5 * Math.pow(10.0, -0.1 * EbN0dB));
    
    return symbols.map(([x, y]) => [
        x + noiseSD * (Math.random() - 0.5),
        y + noiseSD * (Math.random() - 0.5),
    ]);
};
  
/**
 * シミュレーションを実行する
 * @param modulationOrder: M-QAMの次数
 * @param ebN0: E_b/N_0
 * @returns シミュレーション結果
 */
export const runSimulation = (modulationOrder: number, ebN0: number): SimulationResult => {
    const N_Tri = 10; // 試行回数
    const transmitSymbols = generateSymbols(modulationOrder);
    // console.log(transmitSymbols);
    let receivedSymbols: [number, number][] = [];
    for(let i = 0; i < N_Tri; i++) {
        receivedSymbols = receivedSymbols.concat(addNoise(transmitSymbols, ebN0));
    }
    return { transmitSymbols, receivedSymbols };
};