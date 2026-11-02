import StoryIndex from "@/components/archive/StoryIndex";
import { routeMetadata } from "@/app/routeMetadata";

export const metadata = routeMetadata(
  "Story",
  "/story",
  "MR.KCRONUS. The story, in eight plates.",
);

/**
 * The story: the eight approved plates, moved here from /archive at client
 * instruction. This route had been an empty shell until then.
 */
export default function StoryPage() {
  return <StoryIndex />;
}
