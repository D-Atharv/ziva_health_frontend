"use client";

import { useState, useEffect, useRef } from "react";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEvents } from "@/hooks/useEvents";
import { CheckCircle, Loader2 } from "lucide-react";

const formSteps = [
  { key: "title", label: "Enter event title", type: "text" },
  { key: "description", label: "Enter description", type: "text" },
  { key: "dateTime", label: "Select date and time", type: "datetime-local" },
  { key: "location", label: "Enter location", type: "text" },
  { key: "maxCapacity", label: "Enter max capacity", type: "number" },
];

const initialFormData = {
  title: "",
  description: "",
  dateTime: "",
  location: "",
  maxCapacity: 1,
};

export function EventForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { fetchEvents } = useEvents();

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentStep]);

  const handleChange = (key: keyof typeof formData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNextStep = () => {
    const currentKey = formSteps[currentStep].key as keyof typeof formData;
    if (!formData[currentKey] || formData[currentKey] === "") return;

    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNextStep();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await apiFetch("/events", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      await fetchEvents();
      router.push("/events");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setLoading(false);
    }
  };

  const isWizardFinished = currentStep >= formSteps.length;
  const currentStepConfig = formSteps[currentStep];

  return (
    <div className="space-y-4 max-w-md mx-auto p-4">
      {formSteps.slice(0, currentStep).map((step) => (
        <div key={step.key} className="flex items-center gap-2 text-green-300">
          <CheckCircle className="w-5 h-5 text-cyan-400" />
          <span className="font-bold capitalize">{step.key}:</span>
          <span>{String(formData[step.key as keyof typeof formData])}</span>
        </div>
      ))}

      {!isWizardFinished ? (
        <div className="flex flex-col gap-2">
          <label className="text-cyan-400 font-bold">
            {currentStepConfig.label}:
          </label>

          <input
            ref={inputRef}
            type={currentStepConfig.type}
            value={
              formData[currentStepConfig.key as keyof typeof formData] as string
            }
            onChange={(e) =>
              handleChange(
                currentStepConfig.key as keyof typeof formData,
                currentStepConfig.type === "number"
                  ? Number(e.target.value)
                  : e.target.value
              )
            }
            onKeyDown={handleKeyDown}
            className="w-full bg-black border border-green-700 text-green-300 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            autoComplete="off"
            required
          />

          <div className="flex gap-2 mt-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrevStep}
                type="button"
                className="text-green-300 hover:bg-green-900/50 px-2 py-1 rounded transition-all duration-200 flex-1"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNextStep}
              type="button"
              className="text-green-300 hover:bg-green-900/50 px-2 py-1 rounded transition-all duration-200 flex-1"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-cyan-400 font-bold my-4">
            Configuration complete. Review and create event.
          </p>
          {error && <p className="text-red-500">[error]: {error}</p>}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-2 text-lg text-green-300 hover:bg-green-900/50 px-2 py-1 rounded transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? "Executing..." : "Create Event"}
          </button>
        </div>
      )}
    </div>
  );
}
