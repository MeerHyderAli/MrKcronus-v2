"use client";

import { useSyncExternalStore } from "react";

const COMPACT_QUERY = "(max-width: 63.99rem)";

/**
 * COMPACT MOTION
 *
 * True below the lg breakpoint (64rem / 1024px).
 *
 * MOBILE DOES NOT LOSE ITS MOTION. This hook reduces movement, never removes it:
 * travel and parallax displacement are halved, while reveals, masks, iris,
 * typography movement and image scale remain part of the choreography.
 *
 * HYDRATION
 *
 * `useSyncExternalStore` supplies `false` to the server and initial hydration,
 * then adopts the browser's media-query snapshot. Pinned-track heights use the
 * same CSS breakpoint, so that update changes motion distances and vector sizing
 * without changing page geometry or causing a track-height shift.
 */
function subscribe(onChange: () => void) {
  const query = window.matchMedia(COMPACT_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(COMPACT_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function useCompactMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
