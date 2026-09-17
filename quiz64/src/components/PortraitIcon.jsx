import React from "react";
import {
  MoonStar,
  Utensils,
  Footprints,
  BatteryCharging,
  Droplets,
  HeartPulse,
  Flower2,
  CloudLightning,
  Cloud,
  CloudRain,
  Eye,
  HeartHandshake,
  Sun,
  Wind,
} from "lucide-react";

const icons = {
  sleep: MoonStar,
  eating: Utensils,
  movement: Footprints,
  recovery: BatteryCharging,
  hydration: Droplets,
  body: HeartPulse,
  skin: Flower2,
  frustration: CloudLightning,
  worry: Cloud,
  disappointment: CloudRain,
  embarrassment: Eye,
  guilt: HeartHandshake,
  joy: Sun,
  relief: Wind,
};

export function PortraitIcon({ kind, small = false }) {
  const Icon = icons[kind] || HeartPulse;
  return (
    <span
      className={`portrait-icon${small ? " portrait-icon--small" : ""}`}
      aria-hidden="true"
    >
      <Icon size={small ? 19 : 25} strokeWidth={1.65} />
    </span>
  );
}
