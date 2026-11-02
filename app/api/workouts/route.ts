import { workouts } from "@/lib/workouts";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(workouts);
}
