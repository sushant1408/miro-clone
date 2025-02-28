"use client";

import { Loader2Icon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { api } from "../../../../convex/_generated/api";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

const NewBoardButton = ({ disabled, orgId }: NewBoardButtonProps) => {
  const router = useRouter();
  const { isPending, mutate } = useApiMutation(api.board.create);

  const onClick = () => {
    mutate(
      { title: "Untitled", orgId },
      {
        onSuccess: (id) => {
          toast.success("Board created");
          router.push(`/board/${id}`);
        },
        onError: () => {
          toast.error("Failed to create a board");
        },
      }
    );
  };

  return (
    <button
      disabled={disabled || isPending}
      onClick={onClick}
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        disabled && "opacity-75 bg-blue-600 cursor-not-allowed"
      )}
    >
      {isPending ? (
        <Loader2Icon className="animate-spin !size-12 text-white stroke-1" />
      ) : (
        <PlusIcon className="!size-12 text-white stroke-1" />
      )}
      <p className="text-sm text-white font-light">New board</p>
    </button>
  );
};

export { NewBoardButton };
