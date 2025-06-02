"use client";
import axios from "axios";
import { FormEvent, useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    const url = "http://localhost:8000/query";
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setAnswer("");
    setSources([]);

    try {
      const res = await axios.post(
        url,
        { question },
        { headers: { "Content-Type": "application/json" } }
      );
      setAnswer(res.data.answer);
      setSources(res.data.sources);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-black flex items-center justify-center px-4">
      {/* Container Card */}
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-12">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-red-800 mb-2">
            📜 SPD Bylaws Assistant
          </h1>
          <p className="text-gray-700">
            Ask any question about Beta-Iota SPD’s bylaws, and get a precise answer.
          </p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <label htmlFor="question" className="block text-black font-medium">
            Your Question
          </label>
          <textarea
            id="question"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 resize-none text-black"
            placeholder="e.g., What are the dues for an inactive member?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={isLoading || !question.trim()}
            className={`w-full flex items-center justify-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  ></path>
                </svg>
                Thinking…
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <p className="mt-6 text-red-600 font-medium text-center">{error}</p>
        )}

        {/* Answer Card */}
        {answer && (
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-black mb-4">Answer</h2>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {answer}
            </p>

            {/* {sources.length > 0 && (
              <div className="mt-6">
                <h3 className="text-black font-medium mb-2">Sources</h3>
                <ul className="space-y-1">
                  {sources.map((src, idx) => (
                    <li
                      key={idx}
                      className="inline-block bg-yellow-200 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {src}
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
}
