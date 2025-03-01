"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Link2Icon, PencilIcon, Trash2Icon } from "lucide-react";
import { ReactNode } from "react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "../../convex/_generated/api";
import { useRenameModal } from "@/store/use-rename-modal";

interface BoardActionsProps {
  children: ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
  onConfirm: () => Promise<unknown>;
}

const BoardActions = ({
  children,
  id,
  title,
  side,
  sideOffset,
  onConfirm,
}: BoardActionsProps) => {
  const { onOpen } = useRenameModal();
  const { isPending, mutate } = useApiMutation(api.board.remove);

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => {
        toast.success("Board link copied");
      })
      .catch(() => {
        toast.error("Failed to copy the link");
      });
  };

  const onRenameClick = () => {
    onOpen(id, title);
  };

  const onDeleteClick = async () => {
    const ok = await onConfirm();

    if (!ok) {
      return;
    }

    mutate(
      { id },
      {
        onSuccess: () => {
          toast.success(`"${title}" deleted`);
        },
        onError: () => {
          toast.error("Failed to delete the board");
        },
      }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        className="w-60"
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuItem onClick={onCopyLink} className="p-3 cursor-pointer">
          <Link2Icon className="!size-4" />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onRenameClick}
          className="p-3 cursor-pointer"
        >
          <PencilIcon className="!size-4" />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onDeleteClick}
          className="p-3 cursor-pointer"
          disabled={isPending}
        >
          <Trash2Icon className="!size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { BoardActions };
