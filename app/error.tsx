"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-8">
      <div className="text-center max-w-md">
        <div className="text-7xl mb-6">⚠️</div>
        <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
        <p className="text-zinc-400 mb-8">The GODLY engine hit a snag. Don't worry — your work is safe.</p>
        
        <div className="flex gap-4 justify-center">
          <Button onClick={reset} className="bg-gradient-to-r from-amber-500 to-cyan-500">
            Try again
          </Button>
          <Button variant="outline" onClick={() => window.location.href = "/"}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}