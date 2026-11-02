"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Check,
  Clock3,
  Flame,
  Search,
  Star,
  X,
} from "lucide-react";
import { ExerciseArt } from "@/components/exercise-art";
import { usePlan } from "@/components/plan-provider";
import type { Workout } from "@/lib/workouts";

type PlanTab = "today" | "saved";

function PlanContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { planned, saved, completed, hydrated, removeFromPlan, removeSaved, markDone } = usePlan();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<PlanTab>("today");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setTab(searchParams.get("tab") === "saved" ? "saved" : "today");
  }, [searchParams]);

  useEffect(() => {
    const controller = new AbortController();
    async function loadWorkouts() {
      try {
        const response = await fetch("/api/workouts", { signal: controller.signal });
        if (!response.ok) throw new Error(`Workout request failed (${response.status}).`);
        const data: unknown = await response.json();
        if (!Array.isArray(data)) throw new Error("Workout data has an unexpected format.");
        setWorkouts(data as Workout[]);
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") return;
        console.error("Could not load plan workouts.", loadError);
        setError("We couldn't load your workouts. Please refresh to try again.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadWorkouts();
    return () => controller.abort();
  }, []);

  const workoutsById = useMemo(
    () => new Map(workouts.map((workout) => [workout.id, workout])),
    [workouts],
  );
  const activeIds = tab === "today" ? planned : saved;
  const activeWorkouts = activeIds
    .map((id) => workoutsById.get(id))
    .filter((workout): workout is Workout => Boolean(workout))
    .filter(
      (workout) =>
        workout.title.toLowerCase().includes(query.trim().toLowerCase()) ||
        workout.categories.some((category) =>
          category.toLowerCase().includes(query.trim().toLowerCase()),
        ),
    );
  const plannedWorkouts = planned
    .map((id) => workoutsById.get(id))
    .filter((workout): workout is Workout => Boolean(workout));
  const totalMinutes = plannedWorkouts.reduce((total, workout) => total + workout.duration, 0);
  const totalCalories = plannedWorkouts.reduce((total, workout) => total + workout.calories, 0);
  const isLoading = loading || !hydrated;

  function changeTab(nextTab: PlanTab) {
    setTab(nextTab);
    router.replace(nextTab === "saved" ? "/my-plan?tab=saved" : "/my-plan", {
      scroll: false,
    });
  }

  return (
    <main className="plan-page section-wrap">
      <div className="plan-heading">
        <div>
          <span className="eyebrow">YOUR TRAINING LOG</span>
          <h1 className="display-heading section-heading">My Plan</h1>
          <p className="section-subtitle">Cap of five lifts for today. Finish them, then load more.</p>
        </div>
        <Link className="button button-secondary plan-add-link" href="/#library">
          Browse library
        </Link>
      </div>

      <section className="metrics-grid" aria-label="Today's plan summary">
        <div className="metric-card"><span>EXERCISES</span><strong>{plannedWorkouts.length}<small> / 5</small></strong><p>IN TODAY&apos;S PLAN</p></div>
        <div className="metric-card"><span>MINUTES</span><strong>{totalMinutes}<small> MIN</small></strong><p>ESTIMATED SESSION</p></div>
        <div className="metric-card"><span>CALORIES</span><strong>{totalCalories}<small> KCAL</small></strong><p>ESTIMATED BURN</p></div>
      </section>

      <div className="plan-toolbar">
        <div className="plan-tabs" role="tablist" aria-label="Workout lists">
          <button
            className={tab === "today" ? "plan-tab plan-tab-active" : "plan-tab"}
            role="tab"
            aria-selected={tab === "today"}
            onClick={() => changeTab("today")}
          >
            Today&apos;s Plan <span>{planned.length}</span>
          </button>
          <button
            className={tab === "saved" ? "plan-tab plan-tab-active" : "plan-tab"}
            role="tab"
            aria-selected={tab === "saved"}
            onClick={() => changeTab("saved")}
          >
            Saved <span>{saved.length}</span>
          </button>
        </div>
        <label className="search-field plan-search">
          <Search size={15} aria-hidden="true" />
          <input
            type="search"
            placeholder="Search lifts"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search current workout list"
          />
        </label>
      </div>

      {isLoading ? (
        <div className="loading-state plan-loading" role="status">
          <span className="loading-ring" />
          <span>Loading workouts…</span>
        </div>
      ) : error ? (
        <div className="error-message" role="alert">{error}</div>
      ) : activeWorkouts.length ? (
        <div className="plan-list">
          {activeWorkouts.map((workout, index) => {
            const done = completed.includes(workout.id);
            return (
              <article className={`plan-card${done ? " plan-card-done" : ""}`} key={workout.id}>
                <div className="plan-card-index">{String(index + 1).padStart(2, "0")}</div>
                <div className="plan-card-art"><ExerciseArt workout={workout} compact /></div>
                <div className="plan-card-info">
                  <div className="category-list">
                    {workout.categories.map((category) => <span className="category-tag" key={category}>{category}</span>)}
                  </div>
                  <h2>{workout.title}</h2>
                  <p>{workout.equipment}</p>
                  <div className="card-stats">
                    <span><Clock3 size={13} />{workout.duration} min</span>
                    <span><Flame size={13} />{workout.calories} kcal</span>
                    <span><Star size={13} />{workout.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="plan-card-actions">
                  <Link className="button button-secondary button-small" href={`/workouts/${workout.id}`}>
                    View details
                  </Link>
                  {tab === "today" && (
                    <button
                      className={`button button-small${done ? " button-done" : " button-secondary"}`}
                      onClick={() => markDone(workout.id)}
                      disabled={done}
                    >
                      <Check size={14} /> {done ? "Done" : "Mark as done"}
                    </button>
                  )}
                  <button
                    className="remove-button"
                    aria-label={`Remove ${workout.title} from ${tab === "today" ? "today's plan" : "saved lifts"}`}
                    onClick={() => tab === "today" ? removeFromPlan(workout.id) : removeSaved(workout.id)}
                  >
                    <X size={17} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="plan-empty">
          <span className="empty-cross">+</span>
          <span className="eyebrow">{query ? "NO MATCHES" : "REST DAY?"}</span>
          <h2 className="display-heading">{query ? "NOTHING FOUND" : "NOTHING HERE YET"}</h2>
          <p>{query ? "Try another name or muscle group." : "Browse the library and add a lift to get today moving."}</p>
          <Link className="button button-primary" href="/#library">Go to workouts</Link>
        </div>
      )}
    </main>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense fallback={<main className="plan-page section-wrap"><div className="loading-state"><span className="loading-ring" /><span>Loading workouts…</span></div></main>}>
      <PlanContent />
    </Suspense>
  );
}
