import React from "react";

const kinds = new Set([
  "chapter-1",
  "chapter-2",
  "chapter-3",
  "chapter-4",
  "chapter-5",
  "chapter-6",
  "chapter-7",
  "chapter-8",
  "sleep",
  "eating",
  "movement",
  "recovery",
  "hydration",
  "body",
  "skin",
  "frustration",
  "worry",
  "disappointment",
  "embarrassment",
  "guilt",
  "joy",
  "relief",
]);

export function JewelIcon({
  kind = "chapter-1",
  small = false,
  variant = "portrait",
  children,
}) {
  const safeKind = kinds.has(kind) ? kind : "chapter-1";
  const safeVariant = variant === "chapter" ? "chapter" : "portrait";

  return (
    <span
      className={`jewel-icon jewel-icon--${safeVariant} jewel-icon--${safeKind}${small ? " jewel-icon--small" : ""}`}
      aria-hidden="true"
    >
      <span className="jewel-icon__body" />
      <span className="jewel-icon__bezel" />
      <span className="jewel-icon__sheen" />
      <span className="jewel-icon__glyph">{children}</span>
    </span>
  );
}
