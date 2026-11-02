"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  Check,
  Clock3,
  Flame,
  Plus,
  Star,
} from "lucide-react";
import { ExerciseArt } from "@/components/exercise-art";
import { usePlan } from "@/components/plan-provider";
import type { Workout } from "@/lib/workouts";

export function WorkoutDetail({ workout }: { workout: Workout }) {
  const { planned, saved, hydrated, addToPlan, saveWorkout } = usePlan();
  const inPlan = planned.includes(workout.id);
  const isSaved = saved.includes(workout.id);
  const planFull = planned.length >= 5;

  return (
    <main className="detail-page section-wrap">
      <Link className="back-link" href="/#library"><ArrowLeft size={15} /> BACK TO LIBRARY</Link>
      <div className="detail-layout">
        <div className="detail-media">
          <ExerciseArt workout={workout} />
          <div className="detail-media-bottom">
            <span>FITLOG MOVEMENT GUIDE</span>
            <span>FL / {workout.id.toUpperCase()}</span>
          </div>
          <div className="detail-media-note">
            <span className="eyebrow">MOVEMENT FOCUS</span>
            <p>Make every rep count. Stay in control from start to finish.</p>
          </div>
        </div>

        <div className="detail-content">
          <span className="eyebrow">THE MOVEMENT / {workout.difficulty.toUpperCase()}</span>
          <h1 className="display-heading detail-title">{workout.title}</h1>
          <p className="detail-description">{workout.description}</p>
          <div className="category-list detail-categories">
            {workout.categories.map((category) => (
              <span className="category-tag" key={category}>{category}</span>
            ))}
          </div>

          <section className="specs-panel" aria-labelledby="specs-heading">
            <div className="subsection-heading">
              <h2 id="specs-heading">Key specs</h2>
              <span>AT A GLANCE</span>
            </div>
            <dl className="specs-grid">
              <div><dt>Equipment</dt><dd>{workout.equipment}</dd></div>
              <div><dt>Difficulty</dt><dd>{workout.difficulty}</dd></div>
              <div><dt>Sets</dt><dd>{workout.sets}</dd></div>
              <div><dt>Reps</dt><dd>{workout.reps}</dd></div>
              <div><dt>Duration</dt><dd><Clock3 size={13} /> {workout.duration} min</dd></div>
              <div><dt>Calories</dt><dd><Flame size={13} /> {workout.calories} kcal</dd></div>
              <div><dt>Rating</dt><dd><Star size={13} /> {workout.rating.toFixed(1)}</dd></div>
            </dl>
          </section>

          <section className="instructions-section">
            <div className="subsection-heading">
              <h2>Instructions</h2>
              <span>FOUR STEPS</span>
            </div>
            <ol className="instruction-list">
              {workout.instructions.map((instruction, index) => (
                <li key={instruction}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{instruction}</p>
                </li>
              ))}
            </ol>
          </section>

          <div className="detail-actions">
            <button
              className="button button-primary"
              onClick={() => addToPlan(workout.id)}
              disabled={!hydrated || inPlan || planFull}
              title={planFull && !inPlan ? "Today's plan is limited to five lifts." : undefined}
            >
              {inPlan ? <Check size={16} /> : <Plus size={16} />}
              {inPlan ? "Added to today's plan" : "Add to today's plan"}
            </button>
            <button
              className="button button-secondary"
              onClick={() => saveWorkout(workout.id)}
              disabled={!hydrated || isSaved}
            >
              {isSaved ? <Check size={16} /> : <Bookmark size={15} />}
              {isSaved ? "Saved for later" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
