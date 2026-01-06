## Packages
zustand | State management for quiz progress (answers, timer, navigation)
framer-motion | Smooth transitions between questions and pages
lucide-react | Icons for UI elements (already in base, but good to note usage)

## Notes
- Using Zustand for quiz state to avoid prop drilling across components.
- Quiz data is fetched from `/api/quiz/:level`.
- Audio player needs to persist across question changes.
