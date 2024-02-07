import React, { Suspense } from "react";
import foods from "../data/unique_foods.json";
interface Food {
  description: string;
  color: string; // Expecting a CSS color string
}

interface SquareProps {
  //   updateCurrentFood: (food: Food) => void;
  food: Food;
}

const limitedFoods = Array.isArray(foods) ? foods.slice(0, 1000) : [];

const Square: React.FC<SquareProps> = ({ food }) => {
  return (
    <Suspense fallback={<div className="w-1 h-1 bg-black" />}>
      <div className="food flex">
        <div
          className="pixel w-1 h-1 z-0 relative"
          data-food-description={food.description}
          style={{ backgroundColor: food.color }}
        />
      </div>
    </Suspense>
  );
};

const RandomColorSquares: React.FC = () => {
  // Generate an array of random HSL colors
  const generateRandomHSLColors = (count: number): string[] => {
    return Array.from({ length: count }, () => {
      const hue = Math.floor(Math.random() * 360);
      const saturation = 100; // Keeping saturation and lightness constant for simplicity
      const lightness = 50;
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    });
  };

  // Sort colors by hue
  const sortColorsByHue = (colors: string[]): string[] => {
    return colors.sort((a, b) => {
      const hueA = parseInt(a.substring(4, a.indexOf(",")), 10);
      const hueB = parseInt(b.substring(4, b.indexOf(",")), 10);
      return hueA - hueB;
    });
  };

  const unsortedColors = generateRandomHSLColors(limitedFoods.length);
  const foodsWithRandomColor = unsortedColors.map((color, index) => ({
    ...limitedFoods[index],
    color,
  }));

  const updateCurrentFood = () => {
    const foodDiv = document.querySelector(".food:hover");

    return foodDiv;
  };

  //   const sortedColors = sortColorsByHue(unsortedColors);

  return (
    <div id="container" className="flex flex-wrap w-full">
      {foodsWithRandomColor.map((food, index) => (
        <Square
          key={index}
          // updateCurrentFood={updateCurrentFood}
          food={food}
        />
      ))}
    </div>
  );
};

export default RandomColorSquares;
