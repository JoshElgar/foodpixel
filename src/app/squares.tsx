import React, { useRef, useEffect, useState, useMemo } from "react";
import foods from "../data/unique_foods.json";

interface Food {
  description: string;
  color: string; // Expecting a CSS color string
}

const limitedFoods = Array.isArray(foods) ? foods.slice(0, 1000000) : [];

const RandomColorSquaresCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredFoodInfo, setHoveredFoodInfo] = useState<{
    description: string;
    x: number;
    y: number;
  } | null>(null); // Step 2: Add state for hovered food info

  // Generate an array of random HSL colors
  const generateRandomHSLColors = (count: number): string[] => {
    return Array.from({ length: count }, () => {
      const hue = Math.floor(Math.random() * 360);
      const saturation = 100; // Keeping saturation and lightness constant for simplicity
      const lightness = 50;
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    });
  };

  const foodsWithRandomColor = useMemo(() => {
    const unsortedColors = generateRandomHSLColors(limitedFoods.length);
    return unsortedColors.map((color, index) => ({
      ...limitedFoods[index],
      color,
    }));
  }, []); // useMemo to prevent regenerating colors on every render

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const squareSize = 1; // Size of the square in pixels
    const squaresPerRow = Math.floor(canvas.width / squareSize);
    foodsWithRandomColor.forEach((food, index) => {
      const y = Math.floor(index / squaresPerRow) * squareSize;
      ctx.fillStyle = food.color;
      const x = (index % squaresPerRow) * squareSize;
      ctx.fillRect(x, y, squareSize, squareSize);
    });
  }, [foodsWithRandomColor]);

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const squareSize = 2; // Size of the square in pixels, should match the size used in the useEffect
    const squaresPerRow = Math.floor(canvas.width / squareSize);
    const index =
      Math.floor(y / squareSize) * squaresPerRow + Math.floor(x / squareSize);

    if (index >= 0 && index < foodsWithRandomColor.length) {
      const hoveredFood = foodsWithRandomColor[index];
      setHoveredFoodInfo({
        description: hoveredFood.description,
        x: event.clientX,
        y: event.clientY,
      });
    } else {
      setHoveredFoodInfo(null);
    }
  };
  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        width={Math.min(window.innerWidth - 50, 700)}
        height={Math.min(300000 / Math.min(window.innerWidth - 50, 700), 550)}
        style={{ border: "1px solid black" }}
      ></canvas>
      {/* </div> */}
      {hoveredFoodInfo && (
        <div
          style={{
            position: "absolute",
            left: `${hoveredFoodInfo.x + 10}px`,
            top: `${hoveredFoodInfo.y + 10}px`,
            background: "black",
            padding: "2px 6px",
            color: "white",
            zIndex: 100,
          }}
          className="text-xs"
        >
          {hoveredFoodInfo.description}
        </div>
      )}
    </>
  );
};

export default RandomColorSquaresCanvas;
