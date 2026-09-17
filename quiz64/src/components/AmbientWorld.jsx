import React, { useContext, useEffect, useRef } from "react";
import { MotionConfigContext, useReducedMotion } from "motion/react";

const SCENES = {
  landing: {
    speed: 0.19,
    energy: 1.02,
    opacity: 0.94,
  },
  intro: {
    speed: 0.32,
    energy: 1.24,
    opacity: 1,
  },
  quiz: {
    speed: 0.08,
    energy: 0.42,
    opacity: 0.5,
  },
  gateway: {
    speed: 0.27,
    energy: 1.18,
    opacity: 0.98,
  },
  complete: {
    speed: 0.23,
    energy: 1.12,
    opacity: 0.96,
  },
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function drawSilkField(
  context,
  width,
  height,
  time,
  profile,
  chapterPhase,
  pulse,
) {
  context.clearRect(0, 0, width, height);
  context.lineCap = "round";
  context.lineJoin = "round";
  context.globalCompositeOperation = "source-over";

  const energy = profile.energy * (1 + Math.abs(pulse) * 0.48);
  const pointCount = clamp(Math.ceil(width / 12), 72, 176);
  const diagonalSheen = context.createLinearGradient(
    0,
    0,
    width,
    height * 0.18,
  );
  diagonalSheen.addColorStop(0, `rgba(112, 82, 174, ${0.2 * profile.opacity})`);
  diagonalSheen.addColorStop(
    0.16,
    `rgba(175, 159, 207, ${0.12 * profile.opacity})`,
  );
  diagonalSheen.addColorStop(
    0.38,
    `rgba(151, 131, 188, ${0.028 * profile.opacity})`,
  );
  diagonalSheen.addColorStop(
    0.52,
    `rgba(255, 255, 255, ${0.012 * profile.opacity})`,
  );
  diagonalSheen.addColorStop(
    0.68,
    `rgba(169, 151, 203, ${0.04 * profile.opacity})`,
  );
  diagonalSheen.addColorStop(
    0.86,
    `rgba(185, 170, 216, ${0.14 * profile.opacity})`,
  );
  diagonalSheen.addColorStop(
    1,
    `rgba(111, 80, 174, ${0.21 * profile.opacity})`,
  );

  // Two diagonal families cross like folded silk; their specular center fades
  // so the reading area stays quiet while the edges carry the light.
  for (let family = 0; family < 2; family += 1) {
    for (let strand = 0; strand < 4; strand += 1) {
      const offset = (strand - 1.5) * height * 0.016;
      const phase =
        time * profile.speed + chapterPhase + strand * 0.66 + family * 1.7;
      const points = [];

      for (let point = 0; point <= pointCount; point += 1) {
        const progress = point / pointCount;
        const envelope = Math.sin(Math.PI * progress);
        const sweep =
          Math.sin(progress * Math.PI * 2.15 + phase) * 0.88 +
          Math.sin(progress * Math.PI * 4.2 - phase * 0.66 + strand) * 0.22;
        const baseline =
          family === 0
            ? height * (0.08 + progress * 0.83)
            : height * (0.91 - progress * 0.82);
        const x =
          progress * width +
          Math.sin(progress * Math.PI + phase * 0.4) * height * 0.022 * energy;
        const y =
          baseline + offset + sweep * height * 0.145 * energy * envelope;
        points.push({ x, y });
      }

      const ribbonHalfWidth = height * (0.006 + (strand % 3) * 0.0022) * energy;
      const upper = [];
      const lower = [];
      points.forEach((point, index) => {
        const previous = points[Math.max(0, index - 1)];
        const next = points[Math.min(points.length - 1, index + 1)];
        const dx = next.x - previous.x;
        const dy = next.y - previous.y;
        const length = Math.max(1, Math.hypot(dx, dy));
        const nx = -dy / length;
        const ny = dx / length;
        upper.push({
          x: point.x + nx * ribbonHalfWidth,
          y: point.y + ny * ribbonHalfWidth,
        });
        lower.push({
          x: point.x - nx * ribbonHalfWidth,
          y: point.y - ny * ribbonHalfWidth,
        });
      });

      context.beginPath();
      upper.forEach(({ x, y }, index) => {
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      });
      for (let index = lower.length - 1; index >= 0; index -= 1) {
        context.lineTo(lower[index].x, lower[index].y);
      }
      context.closePath();
      context.fillStyle = diagonalSheen;
      context.fill();

      context.beginPath();
      points.forEach(({ x, y }, index) => {
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      });
      context.strokeStyle = diagonalSheen;
      context.lineWidth = 1.15 + (strand % 3) * 0.35;
      context.stroke();
    }
  }

  // Corner caustics curl inward from the margins, leaving a broad white
  // aperture through the center instead of a uniform full-screen mesh.
  const corners = [
    { x: -0.07, y: -0.1, start: 0, end: Math.PI / 2, rotation: -0.18 },
    { x: 1.07, y: -0.1, start: Math.PI / 2, end: Math.PI, rotation: 0.18 },
    { x: 1.07, y: 1.1, start: Math.PI, end: Math.PI * 1.5, rotation: -0.14 },
    {
      x: -0.07,
      y: 1.1,
      start: Math.PI * 1.5,
      end: Math.PI * 2,
      rotation: 0.14,
    },
  ];

  corners.forEach((corner, cornerIndex) => {
    for (let ring = 0; ring < 6; ring += 1) {
      const scale = 0.54 + ring * 0.145;
      const rx = width * 0.49 * scale;
      const ry = height * 0.47 * scale;
      const ringPhase =
        time * profile.speed * 0.72 + chapterPhase + ring * 0.28;
      const cosine = Math.cos(corner.rotation);
      const sine = Math.sin(corner.rotation);

      context.beginPath();
      for (let point = 0; point <= 64; point += 1) {
        const progress = point / 64;
        const angle = corner.start + (corner.end - corner.start) * progress;
        const warp =
          Math.sin(angle * 3 + ringPhase + cornerIndex * 0.8) *
          height *
          0.026 *
          energy;
        const localX = Math.cos(angle) * rx + warp * 0.56;
        const localY =
          Math.sin(angle) * ry + Math.cos(angle * 2 - ringPhase) * warp;
        const x = corner.x * width + localX * cosine - localY * sine;
        const y = corner.y * height + localX * sine + localY * cosine;
        if (point === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      const outerFade = 1 - Math.max(0, scale - 0.94) * 0.54;
      const ringOpacity =
        (0.12 + (ring % 3) * 0.032) * profile.opacity * outerFade;
      context.strokeStyle = `rgba(119, 91, 179, ${ringOpacity})`;
      context.lineWidth = ring % 2 === 0 ? 1.15 : 0.8;
      context.stroke();
    }
  });

  context.globalCompositeOperation = "source-over";
}

/**
 * Ambient only: the caustic field is decorative and carries no audio,
 * inference, answer, or character-state information.
 */
export function AmbientWorld({ scene = "landing", chapter = 1, pulseKey }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const pulseStartRef = useRef(0);
  const lastPulseKeyRef = useRef(pulseKey);
  const prefersReducedMotion = useReducedMotion();
  const motionConfig = useContext(MotionConfigContext);
  const motionOff =
    prefersReducedMotion || motionConfig?.reducedMotion === "always";
  const currentScene = SCENES[scene] ? scene : "landing";
  const safeChapter = Number.isFinite(Number(chapter))
    ? clamp(Number(chapter), 1, 99)
    : 1;

  useEffect(() => {
    if (pulseKey === lastPulseKeyRef.current) return;
    lastPulseKeyRef.current = pulseKey;
    pulseStartRef.current = performance.now();
  }, [pulseKey]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });
    if (!canvas || !context) return undefined;

    const root = rootRef.current;
    const profile = SCENES[currentScene];
    const chapterPhase = safeChapter * 0.19;
    const frameInterval = 1000 / 28;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let frameId = 0;
    let lastFrame = 0;
    let elapsed = 0;
    let inView = typeof IntersectionObserver === "undefined" || !root;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.3);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      if (motionOff && inView && !document.hidden) drawFrame(0);
    };

    const drawFrame = (time) => {
      const pulseAge = pulseStartRef.current
        ? Math.max(0, (performance.now() - pulseStartRef.current) / 1000)
        : 9;
      const pulse =
        pulseAge < 1.15
          ? Math.exp(-pulseAge * 2.6) * Math.sin(pulseAge * 9.5)
          : 0;
      drawSilkField(context, width, height, time, profile, chapterPhase, pulse);
    };

    const animate = (now) => {
      if (document.hidden) {
        frameId = 0;
        lastFrame = 0;
        return;
      }
      if (!lastFrame || now - lastFrame >= frameInterval) {
        const delta = lastFrame ? Math.min(now - lastFrame, 60) : frameInterval;
        elapsed += delta / 1000;
        lastFrame = now;
        drawFrame(elapsed);
      }
      frameId = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (motionOff || document.hidden || !inView || frameId) return;
      lastFrame = 0;
      frameId = window.requestAnimationFrame(animate);
    };

    const stop = () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
      lastFrame = 0;
    };

    const onVisibilityChange = () => {
      const visible = inView && !document.hidden;
      if (root) root.dataset.visible = String(visible);
      if (!visible) stop();
      else if (motionOff) drawFrame(0);
      else start();
    };

    const visibilityObserver =
      typeof IntersectionObserver === "undefined" || !root
        ? null
        : new IntersectionObserver(([entry]) => {
            inView = Boolean(entry?.isIntersecting);
            const visible = inView && !document.hidden;
            if (root) root.dataset.visible = String(visible);
            if (visible && motionOff) drawFrame(0);
            else if (visible) start();
            else stop();
          });

    if (root) root.dataset.visible = String(inView && !document.hidden);
    resize();
    visibilityObserver?.observe(root);
    if (!motionOff && !visibilityObserver) start();
    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resize);
    resizeObserver?.observe(canvas);
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      visibilityObserver?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [currentScene, motionOff, safeChapter]);

  return (
    <div
      ref={rootRef}
      className="ambient-world"
      data-scene={currentScene}
      data-motion={motionOff ? "off" : "on"}
      data-visible="true"
      data-chapter={Math.round(safeChapter)}
      aria-hidden="true"
    >
      <div className="ambient-world__atmosphere" />
      <div className="ambient-world__sculpture" />
      <canvas className="ambient-world__field" ref={canvasRef} />
      <div className="ambient-world__optics">
        <span className="ambient-world__lens ambient-world__lens--one" />
        <span className="ambient-world__lens ambient-world__lens--two" />
        <span className="ambient-world__sheen" />
      </div>
      <div className="ambient-world__veil" />
    </div>
  );
}
