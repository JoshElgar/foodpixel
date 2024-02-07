"use client";
import React, { useEffect } from "react";
import RandomColorSquares from "./square";
import InfoBox from "./infobox";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 lg:p-24">
      <div>
        <InfoBox />
        <RandomColorSquares />
      </div>
    </main>
  );
}
