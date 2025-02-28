import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";

import { Doc } from "../../../../../convex/_generated/dataModel";
import { Overlay } from "./overlay";
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";

interface BoardCardProps {
  id: Doc<"boards">["_id"];
  title: Doc<"boards">["title"];
  imageUrl: Doc<"boards">["imageUrl"];
  authorId: Doc<"boards">["authorId"];
  authorName: Doc<"boards">["authorName"];
  createdAt: Doc<"boards">["_creationTime"];
  orgId: Doc<"boards">["orgId"];
  isFavorite: boolean;
}

const BoardCard = ({
  authorId,
  authorName,
  createdAt,
  id,
  imageUrl,
  isFavorite,
  orgId,
  title,
}: BoardCardProps) => {
  const { userId } = useAuth();

  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-contain" />
          <Overlay />
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={() => {}}
          disabled={false}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};

export { BoardCard };
