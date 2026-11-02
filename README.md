# FitLog — Workout Library

FitLog is a responsive, dark-themed workout companion for finding a lift, building a focused plan for today, and keeping a shortlist of exercises for later.

## Technologies

- Next.js App Router and React
- TypeScript
- Tailwind CSS and custom responsive CSS
- Lucide icons
- Browser localStorage for plan persistence

## Features

1. **Twelve-movement library** served by a local API route, with workout artwork, muscle tags, equipment, and training stats.
2. **Responsive workout discovery** with live search and sorting by duration, calories, or rating.
3. **Workout detail pages** with key specs, four step-by-step instructions, and plan/save actions.
4. **Today's Plan dashboard** with a five-lift cap, live exercise/minute/calorie totals, and completion tracking.
5. **Saved workouts** that persist with the plan across browser reloads.
6. **Toast feedback** for adding, saving, completing, and removing lifts.
7. **Responsive layouts** for mobile, tablet, and desktop, plus a custom 404 page.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Run the TypeScript check with `npm run typecheck`. Create a production build with `npm run build`, then serve it with `npm start`.

Workout data is provided by `GET /api/workouts`, so the library runs without a third-party API key.
