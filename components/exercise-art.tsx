import {
  Activity,
  BicepsFlexed,
  Dumbbell,
  HeartPulse,
  PersonStanding,
  type LucideIcon,
} from "lucide-react";
import type { Workout } from "@/lib/workouts";

const artwork: Record<string, { icon: LucideIcon; label: string }> = {
  Chest: { icon: Dumbbell, label: "PRESS" },
  Arms: { icon: BicepsFlexed, label: "STRENGTH" },
  Shoulders: { icon: Activity, label: "POWER" },
  Back: { icon: Dumbbell, label: "PULL" },
  Legs: { icon: PersonStanding, label: "LOWER BODY" },
  Core: { icon: HeartPulse, label: "CONTROL" },
};

const palettes = [
  "art-lime",
  "art-steel",
  "art-orange",
  "art-olive",
  "art-violet",
  "art-blue",
];

export function ExerciseArt({
  workout,
  compact = false,
}: {
  workout: Workout;
  compact?: boolean;
}) {
  const primary = artwork[workout.categories[0]] ?? artwork.Chest;
  const Icon = primary.icon;
  const palette =
    palettes[workout.categories.reduce((total, category) => total + category.length, 0) % palettes.length];

  return (
    <div
      className={`exercise-art ${palette}${compact ? " exercise-art-compact" : ""}`}
      aria-label={`${workout.categories.join(" and ")} workout illustration`}
      role="img"
    >
      <span className="art-index">FL / {String(workout.duration).padStart(2, "0")}</span>
      <Icon className="art-icon" strokeWidth={1.05} aria-hidden="true" />
      <span className="art-label">{primary.label}</span>
      <span className="art-lines" aria-hidden="true" />
    </div>
  );
}
