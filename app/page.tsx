"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownWideNarrow,
  ArrowRight,
  Clock3,
  Flame,
  Search,
  Star,
} from "lucide-react";
import { ExerciseArt } from "@/components/exercise-art";
import type { Workout } from "@/lib/workouts";

type SortKey = "duration" | "calories" | "rating";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");

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
        console.error("Could not load workouts.", loadError);
        setError("We couldn't load the workout library. Please refresh to try again.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadWorkouts();
    return () => controller.abort();
  }, []);

  const visibleWorkouts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return workouts
      .filter(
        (workout) =>
          workout.title.toLowerCase().includes(normalizedQuery) ||
          workout.categories.some((category) =>
            category.toLowerCase().includes(normalizedQuery),
          ),
      )
      .sort((a, b) => a[sortBy] - b[sortBy]);
  }, [workouts, query, sortBy]);

  return (
    <main>
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">WORKOUT LIBRARY</span>
            <h1 className="display-heading hero-title">
              Train with intent.
              <br />
              <span>Log every set.</span>
            </h1>
            <p className="hero-description">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#library">
                <ArrowDownWideNarrow size={16} />
                Browse workouts
              </a>
              <span className="hero-note">12 MOVES. ZERO GUESSWORK.</span>
            </div>
          </div>
          <div className="hero-visual" aria-label="Strength training illustration">
            <div className="hero-visual-label">
              <span>01 / 12</span>
              <span>BUILT FOR THE WORK</span>
            </div>
            <div className="hero-glow" />
            <Image
              src="/banner.png"
              alt="Strength athlete training on a seated machine"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 48vw"
              className="hero-image"
            />
            <span className="hero-image-caption">FORM FIRST. EVERY REP.</span>
          </div>
        </div>
        <div className="hero-bottom-line">
          <span>TRAIN WITH PURPOSE</span>
          <span>SCROLL TO EXPLORE <ArrowDownWideNarrow size={13} /></span>
        </div>
      </section>

      <section className="library-section section-wrap" id="library">
        <div className="library-top">
          <div>
            <span className="eyebrow">BUILT FOR YOUR NEXT SESSION</span>
            <div className="library-title-row">
              <h2 className="display-heading section-heading">The Library</h2>
              <span className="library-count">{visibleWorkouts.length} / {workouts.length || 12}</span>
            </div>
            <p className="section-subtitle">Twelve lifts covering every major muscle group.</p>
          </div>
          <div className="library-tools">
            <label className="search-field">
              <Search size={16} aria-hidden="true" />
              <input
                type="search"
                placeholder="Search lifts or muscle"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search workouts by name or category"
              />
            </label>
            <label className="sort-field">
              <span>Sort by</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortKey)}
                aria-label="Sort workouts"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <ArrowDownWideNarrow size={14} aria-hidden="true" />
            </label>
          </div>
        </div>

        {loading ? (
          <div className="loading-state" role="status">
            <span className="loading-ring" />
            <span>Loading workouts…</span>
          </div>
        ) : error ? (
          <div className="error-message" role="alert">{error}</div>
        ) : visibleWorkouts.length ? (
          <div className="workout-grid">
            {visibleWorkouts.map((workout, index) => (
              <Link
                className="workout-card"
                href={`/workouts/${workout.id}`}
                key={workout.id}
                style={{ animationDelay: `${Math.min(index, 8) * 35}ms` }}
              >
                <ExerciseArt workout={workout} />
                <div className="workout-card-content">
                  <div className="category-list">
                    {workout.categories.map((category) => (
                      <span className="category-tag" key={category}>{category}</span>
                    ))}
                  </div>
                  <h3>{workout.title}</h3>
                  <p className="equipment-line">{workout.equipment}</p>
                  <div className="card-stats">
                    <span><Clock3 size={13} />{workout.duration} min</span>
                    <span><Flame size={13} />{workout.calories} kcal</span>
                    <span><Star size={13} />{workout.rating.toFixed(1)}</span>
                  </div>
                  <div className="card-link">
                    Explore lift <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-search">
            <p className="display-heading">NO LIFTS FOUND</p>
            <span>Try another name or muscle group.</span>
          </div>
        )}
      </section>
    </main>
  );
}
