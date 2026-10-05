"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import createGlobe from "cobe";

const ACCENT: [number, number, number] = [0.89, 0.42, 0.18];

const THEMES = {
  light: {
    dark: 0,
    baseColor: [1, 1, 1] as [number, number, number],
    glowColor: [0.97, 0.97, 0.97] as [number, number, number],
    mapBrightness: 5,
    mapBaseBrightness: 0.03,
  },
  dark: {
    dark: 1,
    baseColor: [0.32, 0.32, 0.32] as [number, number, number],
    glowColor: [0.1, 0.1, 0.1] as [number, number, number],
    mapBrightness: 5,
    mapBaseBrightness: 0,
  },
};

const BASE_THETA = 0.3;
const AUTO_SPIN = 0.0016;

// the rotation that puts a longitude at the front of the globe
const phiFor = (lng: number) => Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2);

/**
 * Dotted WebGL globe. Spins slowly on its own, leans toward the cursor, and
 * can be dragged with inertia. Starts facing the first location and draws
 * its arcs from there.
 */
export function Globe({
  locations,
  className,
}: {
  /** [latitude, longitude] of each marked city */
  locations: [number, number][];
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const phiRef = useRef(phiFor(locations[0]?.[1] ?? 0));
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // cobe re-parents its canvas, so the canvas is created here, outside react
    const canvas = document.createElement("canvas");
    canvas.style.cssText =
      "width:100%;height:100%;cursor:grab;touch-action:pan-y";
    host.append(canvas);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let size = host.offsetWidth;

    const globe = createGlobe(canvas, {
      ...THEMES[resolvedTheme === "dark" ? "dark" : "light"],
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      width: size,
      height: size,
      phi: phiRef.current,
      theta: BASE_THETA,
      diffuse: 1.1,
      mapSamples: 18000,
      markerColor: ACCENT,
      markers: locations.map((location, i) => ({
        location,
        size: i === 0 ? 0.07 : 0.045,
      })),
      arcColor: ACCENT,
      arcWidth: 0.6,
      arcHeight: 0.28,
      arcs: locations.slice(1).map((to) => ({ from: locations[0], to })),
      markerElevation: 0.01,
    });

    let frame = 0;
    let visible = true;
    let dragX: number | null = null;
    let velocity = 0;
    // where the cursor is, -1..1 from the middle of the window, and the
    // smoothed lean that follows it
    const pointer = { x: 0, y: 0 };
    const lean = { x: 0, y: 0 };

    const render = () => {
      if (dragX === null) {
        phiRef.current += velocity + (reducedMotion ? 0 : AUTO_SPIN);
        velocity *= 0.95;
      }
      lean.x += (pointer.x - lean.x) * 0.05;
      lean.y += (pointer.y - lean.y) * 0.05;
      globe.update({
        phi: phiRef.current + lean.x * 0.4,
        theta: BASE_THETA + lean.y * 0.14,
      });
      if (visible) frame = requestAnimationFrame(render);
    };

    const onPointerDown = (e: PointerEvent) => {
      dragX = e.clientX;
      velocity = 0;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (dragX === null) return;
      velocity = (e.clientX - dragX) * 0.005;
      phiRef.current += velocity;
      dragX = e.clientX;
    };
    const onPointerUp = () => {
      dragX = null;
      canvas.style.cursor = "grab";
    };
    const onWindowPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || reducedMotion) return;
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("pointermove", onWindowPointerMove);

    const resizeObserver = new ResizeObserver(() => {
      if (host.offsetWidth === size) return;
      size = host.offsetWidth;
      globe.update({ width: size, height: size });
    });
    resizeObserver.observe(host);

    // only draw while the globe is on screen
    const viewObserver = new IntersectionObserver(([entry]) => {
      const wasVisible = visible;
      visible = entry.isIntersecting;
      if (visible && !wasVisible) frame = requestAnimationFrame(render);
    });
    viewObserver.observe(host);

    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      viewObserver.disconnect();
      window.removeEventListener("pointermove", onWindowPointerMove);
      globe.destroy();
      host.replaceChildren();
    };
  }, [resolvedTheme, locations]);

  return <div ref={hostRef} className={className} />;
}
