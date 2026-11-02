import { routeMetadata } from "@/app/routeMetadata";
import ArchiveDrops from "@/components/home/sections/ArchiveDrops";

export const metadata = routeMetadata(
  "Archive",
  "/archive",
  "MR.KCRONUS drops by category. Tees are unlocked. Joggers, shirts and sunglasses are locked.",
);

/** The Archive: the house's drops, one per category. See ArchiveDrops. */
export default function ArchivePage() {
  return <ArchiveDrops headingLevel="h1" />;
}
