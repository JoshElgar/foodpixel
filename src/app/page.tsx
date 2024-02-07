"use client";
import React, { useEffect } from "react";
import RandomColorSquares from "./squares";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-8 lg:p-24">
      <RandomColorSquares />
      <div className="text-sm mt-2">314,998 foods</div>
    </main>
  );
}
