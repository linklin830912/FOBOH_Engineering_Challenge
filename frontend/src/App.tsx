import { useEffect, useState } from "react";

type HealthResponse = {
  status: string;
  service: string;
};

type HelloResponse = {
  message: string;
};

export default function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function load() {
      try {
        const [healthRes, helloRes] = await Promise.all([
          fetch("/api/health"),
          fetch("/api/hello"),
        ]);

        if (!healthRes.ok || !helloRes.ok) {
          throw new Error("API request failed");
        }

        const healthData = (await healthRes.json()) as HealthResponse;
        const helloData = (await helloRes.json()) as HelloResponse;

        setHealth(healthData);
        setMessage(helloData.message);
      } catch {
        setError("Could not reach the backend API.");
      }
    }

    void load();
  }, []);

  return (
    <main className="app">
      <h1>FOBOH Engineering Challenge</h1>
      <p>React + TypeScript frontend talking to a Node.js + TypeScript backend.</p>

      {error && <p className="error">{error}</p>}

      {!error && (
        <section className="card">
          <p>
            <strong>Health:</strong>{" "}
            {health ? `${health.status} (${health.service})` : "Loading…"}
          </p>
          <p>
            <strong>Message:</strong> {message || "Loading…"}
          </p>
        </section>
      )}
    </main>
  );
}
