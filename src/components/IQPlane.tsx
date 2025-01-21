import React, { useRef, useEffect, useState } from "react";

// IQ平面コンポーネント
interface IQPlaneProps {
  transmitSymbols: [number, number][];
  receivedSymbols: [number, number][];
}

const IQPlane: React.FC<IQPlaneProps> = ({ transmitSymbols, receivedSymbols }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 400 });

  // 親要素のサイズに合わせてキャンバスサイズを更新
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        setCanvasSize({
          width: canvasRef.current.parentElement?.offsetWidth || 400,
          height: canvasRef.current.parentElement?.offsetHeight || 400,
        });
      }
    };

    // 初回ロードとリサイズイベントに対応
    window.addEventListener("resize", handleResize);
    handleResize(); // 初期サイズ設定

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // クリア

        // 軸の描画
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.strokeStyle = "#000";
        ctx.stroke();

        // 送信シンボルを塗りつぶして描画
        transmitSymbols.forEach(([x, y]) => {
          ctx.beginPath();
          ctx.arc(
            x * 50 + canvas.width / 2,
            -y * 50 + canvas.height / 2,
            5, // 点のサイズ（半径）
            0,
            Math.PI * 2
          );
          ctx.fillStyle = "blue";
          ctx.fill();
        });

        // 受信シンボルを塗りつぶして描画
        receivedSymbols.forEach(([x, y]) => {
          ctx.beginPath();
          ctx.arc(
            x * 50 + canvas.width / 2,
            -y * 50 + canvas.height / 2,
            3, // 点のサイズ（半径）
            0,
            Math.PI * 2
          );
          ctx.fillStyle = "red";
          ctx.fill();
        });
      }
    }
  }, [transmitSymbols, receivedSymbols, canvasSize]);

  return (
    <canvas
      className="mx-auto border rounded-lg shadow-lg bg-white"
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
      style={{ border: "1px solid black", width: "100%", height: "100%" }}
    />
  );
};

export default IQPlane;
