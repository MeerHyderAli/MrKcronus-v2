"use client";

import { useEffect, useState } from "react";

/**
 * COMPACT MOTION
 *
 * True below the lg breakpoint (64rem / 1024px).
 *
 * MOBILE DOES NOT LOSE ITS MOTION. This hook exists to reduce MOTION, never to
 * remove it, and deliberately reports one boolean rather than a tiered scale so
 * there is exactly one place in the codebase where "how much do we move on a
 * small screen" is decided. Everything else multiplies a declared px value.
 *
 * WHAT IS REDUCED AND WHAT IS KEPT
 *   halved      parallax displacement
 *   halved      scroll-linked travel
 *   kept        reveals, masks, iris, typography movement, image scale
 *   removed     nothing
 *
 * Mobile must still feel like MR.KCRONUS. Stripping masks to save a few pixels
 * of travel would be the wrong trade: a mask is one composited property and it
 * carries most of the choreography's character.
 *
 * HYDRATION
 * Initialised to false so the first client render matches the server's. A
 * compact device therefore paints one frame at full travel and corrects on the
 * next, which is imperceptible. Reading matchMedia during initial state would
 * instead produce a server/client style mismatch on every mobile load.
 */
export function useCompactMotion(): boolean {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 63.99rem)");
    const sync = () => setCompact(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return compact;
}