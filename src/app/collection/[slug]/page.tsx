import { routeMetadata } from "@/app/routeMetadata";
import DesignRoom from "@/components/collection/DesignRoom";
import { COLLECTION, getCollectionDesign } from "@/components/collection/collectionData";

/** Only the six designs exist; any other slug is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return COLLECTION.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { name, code } = getCollectionDesign(slug);
  const title = name.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
  return routeMetadata(title, `/collection/${slug}`, `MR.KCRONUS. ${title}, Drop 1, ${code}, in five colours.`);
}

export default async function DesignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DesignRoom slug={slug} />;
}
