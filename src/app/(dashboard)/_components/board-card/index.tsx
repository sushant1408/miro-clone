import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontalIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BoardActions } from "@/components/board-actions";
import { Skeleton } from "@/components/ui/skeleton";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useConfirm } from "@/hooks/use-confirm";
import { api } from "../../../../../convex/_generated/api";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { Footer } from "./footer";
import { Overlay } from "./overlay";
import { toast } from "sonner";

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
  const [ConfirmationDialog, confirm] = useConfirm({
    message: "This will delete the board and al of its contents.",
    title: "Delete board?",
  });
  const { isPending: isFavoriteBoardPending, mutate: favoriteBoard } =
    useApiMutation(api.board.favorite);
  const { isPending: isUnfavoriteBoardPending, mutate: unfavoriteBoard } =
    useApiMutation(api.board.unfavorite);

  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  const onConfirm = async () => {
    return await confirm();
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      unfavoriteBoard(
        { id },
        {
          onError: () => {
            toast.error("Failed to unfavorite");
          },
        }
      );
    } else {
      favoriteBoard(
        { id },
        {
          onError: () => {
            toast.error("Failed to favorite");
          },
        }
      );
    }
  };

  return (
    <>
      <ConfirmationDialog />
      <Link href={`/board/${id}`}>
        <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
          <div className="relative flex-1 bg-amber-50">
            <Image src={imageUrl} alt={title} fill className="object-contain" />
            <Overlay />
            <BoardActions
              id={id}
              title={title}
              side="right"
              onConfirm={onConfirm}
            >
              <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                <MoreHorizontalIcon className="text-white opacity-75 hover:opacity-100 transition-opacity" />
              </button>
            </BoardActions>
          </div>
          <Footer
            isFavorite={isFavorite}
            title={title}
            authorLabel={authorLabel}
            createdAtLabel={createdAtLabel}
            onClick={toggleFavorite}
            disabled={isFavoriteBoardPending || isUnfavoriteBoardPending}
          />
        </div>
      </Link>
    </>
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
