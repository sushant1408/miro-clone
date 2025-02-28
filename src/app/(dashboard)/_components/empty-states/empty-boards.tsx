"use client";

import { useOrganization } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "../../../../../convex/_generated/api";

const EmptyBoards = () => {
  const router = useRouter();
  const { organization } = useOrganization();

  const { mutate, isPending } = useApiMutation(api.board.create);

  const onClick = () => {
    if (!organization) {
      return;
    }

    mutate(
      {
        orgId: organization?.id,
        title: "Untitled",
      },
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
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/note.svg" alt="empty boards" height={110} width={110} />
      <h2 className="text-2xl font-semibold mt-6">Create your first board</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button onClick={onClick} disabled={isPending} size="lg" className="shrink-0">
          {isPending ? (
            <Loader2Icon className="!size-4 animate-spin shrink-0" />
          ) : (
            "Create board"
          )}
        </Button>
      </div>
    </div>
  );
};

export { EmptyBoards };
