"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [code, setCode] = useState("");
  const [response, setResponse] = useState("");

  const analyzeCode = async () => {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();
    setResponse(data.result);
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">

      {/* 🔥 Header dengan karakter */}
      <div className="flex items-center gap-3 mb-4">
        <Image
          src="/akira.png"
          alt="Akira Sensei"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">Akira Sensei</h1>
          <p className="text-sm text-gray-500">AI Dev Mentor</p>
        </div>
      </div>

      {/* Input code */}
      <textarea
        className="w-full h-40 p-3 border rounded"
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      {/* Button */}
      <button
        onClick={analyzeCode}
        className="mt-4 px-4 py-2 bg-black text-white rounded"
      >
        Analyze Code
      </button>

      {/* Output */}
      <div className="mt-6 p-4 border rounded whitespace-pre-wrap">
        {response}
      </div>
    </main>
  );
}