"use client";
import React, { useEffect } from "react";
import RandomColorSquares from "./squares";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-8 lg:p-24">
      <RandomColorSquares />
      <p className="text-sm text-center mt-6 px-12">
        1 pixel for every food in the USDA database (314,998)
      </p>
      <p className="text-sm text-center mt-6 px-12">
        <a href="https://twitter.com/joshelgar">follow me on twitter</a>
      </p>
    </main>
  );
}
