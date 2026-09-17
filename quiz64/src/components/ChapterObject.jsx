import React from "react";
import {
  Compass,
  Heart,
  MoonStar,
  Flower2,
  Shapes,
  CloudSun,
  Sparkles,
  House,
} from "lucide-react";
const icons = [
  Compass,
  Shapes,
  Heart,
  House,
  CloudSun,
  Flower2,
  MoonStar,
  Sparkles,
];
export function ChapterObject({ chapter = 1 }) {
  const Icon = icons[chapter - 1] || Sparkles;
  return (
    <span className="chapter-object" aria-hidden="true">
      <span>
        <Icon size={30} strokeWidth={1.3} />
      </span>
    </span>
  );
}
