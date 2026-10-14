import type { Metadata } from "next";
import ArchiveIndex from "@/components/archive/ArchiveIndex";

export const metadata: Metadata = {
  title: "Archive",
  description: "MR.KCRONUS. The archive.",
};

/**
 * The archive.
 *
 * The eight approved archive plates and their identity names, presented as an
 * editorial index. Built in Build 9; the previous build was a structural shell
 * with placeholder copy that referred to its own build phases.
 *
 * No level numbering, no invented description, no lore. The plates carry their
 * own slogans and record codes inside the artwork, and none of that is
 * reproduced as text.
 */
export default function ArchivePage() {
  return <ArchiveIndex />;
}
