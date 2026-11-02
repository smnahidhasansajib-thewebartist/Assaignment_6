export type Workout = {
  id: string;
  title: string;
  categories: string[];
  equipment: string;
  duration: number;
  calories: number;
  rating: number;
  difficulty: string;
  sets: number;
  reps: string;
  description: string;
  instructions: string[];
};

export const workouts: Workout[] = [
  {
    id: "barbell-bench-press",
    title: "Barbell Bench Press",
    categories: ["Chest", "Arms"],
    equipment: "Barbell, Bench",
    duration: 25,
    calories: 180,
    rating: 4.8,
    difficulty: "Intermediate",
    sets: 4,
    reps: "6-8",
    description:
      "A compound press that builds chest thickness, triceps, and pressing power from a stable bench.",
    instructions: [
      "Lie back with your eyes under the bar and plant both feet firmly on the floor.",
      "Grip the bar just wider than shoulder-width and draw your shoulder blades together.",
      "Unrack the bar, lower it with control to your mid-chest, and keep your wrists stacked.",
      "Press the bar up until your arms are extended without losing your upper-back position.",
    ],
  },
  {
    id: "incline-dumbbell-press",
    title: "Incline Dumbbell Press",
    categories: ["Chest", "Arms"],
    equipment: "Dumbbells, Incline Bench",
    duration: 22,
    calories: 165,
    rating: 4.7,
    difficulty: "Intermediate",
    sets: 3,
    reps: "8-10",
    description:
      "A controlled incline press that targets the upper chest while challenging the shoulders and triceps.",
    instructions: [
      "Set the bench to a low incline and hold a dumbbell in each hand.",
      "Brace your core and position the weights beside your upper chest.",
      "Press both dumbbells upward and slightly inward without letting them collide.",
      "Lower slowly until your elbows are just below shoulder level, then repeat.",
    ],
  },
  {
    id: "cable-chest-fly",
    title: "Cable Chest Fly",
    categories: ["Chest"],
    equipment: "Cable Machine",
    duration: 18,
    calories: 130,
    rating: 4.6,
    difficulty: "Beginner",
    sets: 3,
    reps: "12-15",
    description:
      "A constant-tension chest isolation exercise that builds control through a wide range of motion.",
    instructions: [
      "Set both pulleys around shoulder height and take a handle in each hand.",
      "Step forward into a stable staggered stance with a soft bend in your elbows.",
      "Bring your hands together in front of your chest while keeping your torso still.",
      "Open your arms slowly until you feel a comfortable stretch, then squeeze again.",
    ],
  },
  {
    id: "overhead-press",
    title: "Overhead Press",
    categories: ["Shoulders", "Arms"],
    equipment: "Barbell",
    duration: 24,
    calories: 175,
    rating: 4.8,
    difficulty: "Intermediate",
    sets: 4,
    reps: "6-8",
    description:
      "A standing strength staple that trains the shoulders, triceps, and trunk with every clean rep.",
    instructions: [
      "Stand with feet hip-width apart and the bar resting at your upper chest.",
      "Brace your midsection and squeeze your glutes before starting each rep.",
      "Press the bar overhead, moving your head slightly back and then through.",
      "Lower the bar under control to your collarbone without arching your lower back.",
    ],
  },
  {
    id: "dumbbell-lateral-raise",
    title: "Dumbbell Lateral Raise",
    categories: ["Shoulders"],
    equipment: "Dumbbells",
    duration: 16,
    calories: 105,
    rating: 4.5,
    difficulty: "Beginner",
    sets: 3,
    reps: "12-15",
    description:
      "A focused shoulder-builder that adds width with light loads and deliberate, steady reps.",
    instructions: [
      "Stand tall with a light dumbbell at each side and a slight bend in your elbows.",
      "Set your shoulders down and keep your ribs stacked over your hips.",
      "Raise both arms out to the sides until the weights reach shoulder height.",
      "Lower slowly without swinging, keeping tension in your shoulders throughout.",
    ],
  },
  {
    id: "barbell-curl",
    title: "Barbell Curl",
    categories: ["Arms"],
    equipment: "Barbell",
    duration: 18,
    calories: 115,
    rating: 4.7,
    difficulty: "Beginner",
    sets: 3,
    reps: "10-12",
    description:
      "A straightforward biceps lift that rewards a steady torso and a full, controlled range.",
    instructions: [
      "Stand tall and hold the bar with an underhand grip just outside your hips.",
      "Pin your elbows close to your sides and brace your core.",
      "Curl the bar toward your shoulders without leaning back or swinging.",
      "Lower all the way with control, keeping your elbows near your sides.",
    ],
  },
  {
    id: "triceps-pushdown",
    title: "Triceps Pushdown",
    categories: ["Arms"],
    equipment: "Cable Machine",
    duration: 15,
    calories: 100,
    rating: 4.6,
    difficulty: "Beginner",
    sets: 3,
    reps: "12-15",
    description:
      "A simple cable movement for building the triceps with stable shoulders and a strong lockout.",
    instructions: [
      "Attach a straight bar to a high pulley and stand close to the machine.",
      "Hold the bar with elbows tucked and shoulders relaxed.",
      "Push the handle toward your thighs until your arms straighten.",
      "Return slowly until your forearms are just above parallel, then repeat.",
    ],
  },
  {
    id: "lat-pulldown",
    title: "Lat Pulldown",
    categories: ["Back", "Arms"],
    equipment: "Cable Machine",
    duration: 21,
    calories: 155,
    rating: 4.8,
    difficulty: "Beginner",
    sets: 4,
    reps: "8-12",
    description:
      "A dependable vertical pull for developing the lats while building grip and upper-back strength.",
    instructions: [
      "Adjust the thigh pad and sit tall with a wide, comfortable grip on the bar.",
      "Brace your torso and draw your shoulder blades down away from your ears.",
      "Pull the bar toward your upper chest while keeping your elbows pointed down.",
      "Let the bar rise slowly until your arms are extended without shrugging.",
    ],
  },
  {
    id: "barbell-row",
    title: "Barbell Row",
    categories: ["Back", "Arms"],
    equipment: "Barbell",
    duration: 23,
    calories: 175,
    rating: 4.7,
    difficulty: "Intermediate",
    sets: 4,
    reps: "8-10",
    description:
      "A powerful horizontal pull that strengthens the lats and upper back while training a braced hinge.",
    instructions: [
      "Stand over the bar and hinge at your hips with a small bend in your knees.",
      "Grip the bar just outside your legs and keep your spine long and neutral.",
      "Pull the bar toward your lower ribs, driving your elbows behind you.",
      "Lower the bar smoothly until your arms are straight while keeping your torso set.",
    ],
  },
  {
    id: "goblet-squat",
    title: "Goblet Squat",
    categories: ["Legs", "Core"],
    equipment: "Dumbbell",
    duration: 20,
    calories: 160,
    rating: 4.8,
    difficulty: "Beginner",
    sets: 3,
    reps: "10-12",
    description:
      "A front-loaded squat that builds strong legs and helps reinforce an upright, balanced position.",
    instructions: [
      "Hold one dumbbell close to your chest with feet just wider than hip-width.",
      "Brace your trunk and let your toes turn out slightly.",
      "Sit between your hips until you reach a comfortable depth with heels grounded.",
      "Drive through the floor to stand tall, keeping the weight close to your chest.",
    ],
  },
  {
    id: "romanian-deadlift",
    title: "Romanian Deadlift",
    categories: ["Legs", "Back"],
    equipment: "Barbell",
    duration: 26,
    calories: 190,
    rating: 4.9,
    difficulty: "Intermediate",
    sets: 4,
    reps: "8-10",
    description:
      "A hip-hinge strength move that loads the hamstrings and glutes while reinforcing a strong back.",
    instructions: [
      "Stand tall holding the bar against your thighs with feet hip-width apart.",
      "Unlock your knees and push your hips back while keeping the bar close.",
      "Lower until you feel a strong hamstring stretch without rounding your back.",
      "Drive your hips forward to stand, finishing tall without leaning backward.",
    ],
  },
  {
    id: "russian-twist",
    title: "Russian Twist",
    categories: ["Core"],
    equipment: "Medicine Ball",
    duration: 17,
    calories: 125,
    rating: 4.6,
    difficulty: "Beginner",
    sets: 3,
    reps: "16-20",
    description:
      "A seated rotational core exercise that builds control with a light load and a tall, braced posture.",
    instructions: [
      "Sit on the floor with knees bent and hold a light medicine ball at your chest.",
      "Lean back slightly while keeping your spine long and your core braced.",
      "Rotate your rib cage to one side, moving the ball with your torso.",
      "Return through center and rotate to the other side for one controlled rep.",
    ],
  },
];
