"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type PlanState = {
  planned: string[];
  saved: string[];
  completed: string[];
};

type PlanContextValue = PlanState & {
  hydrated: boolean;
  toast: string | null;
  addToPlan: (id: string) => void;
  saveWorkout: (id: string) => void;
  removeFromPlan: (id: string) => void;
  removeSaved: (id: string) => void;
  markDone: (id: string) => void;
};

const STORAGE_KEY = "fitlog-plan-v1";
const PlanContext = createContext<PlanContextValue | null>(null);

function readStoredPlan(): PlanState {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return { planned: [], saved: [], completed: [] };
    const parsed: unknown = JSON.parse(stored);
    if (!parsed || typeof parsed !== "object") {
      throw new Error("Stored plan must be an object.");
    }

    const value = parsed as Record<string, unknown>;
    const readIds = (key: keyof PlanState) =>
      Array.isArray(value[key])
        ? (value[key] as unknown[]).filter(
            (id): id is string => typeof id === "string",
          )
        : [];

    return {
      planned: readIds("planned").slice(0, 5),
      saved: readIds("saved"),
      completed: readIds("completed"),
    };
  } catch (error) {
    console.error("Could not read the saved FitLog plan.", error);
    return { planned: [], saved: [], completed: [] };
  }
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PlanState>({
    planned: [],
    saved: [],
    completed: [],
  });
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setState(readStoredPlan());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Could not save the FitLog plan.", error);
      setToast("Your browser could not save this change.");
    }
  }, [hydrated, state]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const notify = useCallback((message: string) => setToast(message), []);

  const addToPlan = useCallback(
    (id: string) => {
      if (!hydrated) return;
      if (state.planned.includes(id)) {
        notify("This lift is already in today's plan.");
        return;
      }
      if (state.planned.length >= 5) {
        notify("Today's plan is full. Finish a lift to make room.");
        return;
      }
      setState({ ...state, planned: [...state.planned, id] });
      notify("Added to today's plan.");
    },
    [hydrated, notify, state],
  );

  const saveWorkout = useCallback(
    (id: string) => {
      if (!hydrated) return;
      if (state.saved.includes(id)) {
        notify("Already saved for later.");
        return;
      }
      setState({ ...state, saved: [...state.saved, id] });
      notify("Saved for later.");
    },
    [hydrated, notify, state],
  );

  const removeFromPlan = useCallback(
    (id: string) => {
      setState((current) => ({
        ...current,
        planned: current.planned.filter((item) => item !== id),
        completed: current.completed.filter((item) => item !== id),
      }));
      notify("Removed from today's plan.");
    },
    [notify],
  );

  const removeSaved = useCallback(
    (id: string) => {
      setState((current) => ({
        ...current,
        saved: current.saved.filter((item) => item !== id),
      }));
      notify("Removed from saved lifts.");
    },
    [notify],
  );

  const markDone = useCallback(
    (id: string) => {
      if (state.completed.includes(id)) return;
      setState({ ...state, completed: [...state.completed, id] });
      notify("Lift marked as done. Strong work.");
    },
    [notify, state],
  );

  const value = useMemo(
    () => ({
      ...state,
      hydrated,
      toast,
      addToPlan,
      saveWorkout,
      removeFromPlan,
      removeSaved,
      markDone,
    }),
    [
      state,
      hydrated,
      toast,
      addToPlan,
      saveWorkout,
      removeFromPlan,
      removeSaved,
      markDone,
    ],
  );

  return (
    <PlanContext.Provider value={value}>
      {children}
      <div className={`toast${toast ? " toast-visible" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used inside PlanProvider.");
  return context;
}
