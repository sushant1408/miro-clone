"use client";

import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { BoardActions } from "@/components/board-actions";
import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { cn } from "@/lib/utils";
import { useRenameModal } from "@/store/use-rename-modal";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface InfoProps {
  boardId: string;
}

const Info = ({ boardId }: InfoProps) => {
  const data = useQuery(api.board.get, { id: boardId as Id<"boards"> });

  const { onOpen } = useRenameModal();
  const [ConfirmationDialog, confirm] = useConfirm({
    message: "This will delete the board and al of its contents.",
    title: "Delete board?",
  });

  const onConfirm = async () => {
    return await confirm();
  };

  if (!data) {
    return <InfoSkeleton />;
  }

  return (
    <>
      <ConfirmationDialog />
      <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
        <TooltipWrapper label="Go to boards" side="bottom" sideOffset={10}>
          <Button className="px-2" variant="board" asChild>
            <Link href="/">
              <Image src="/logo.svg" alt="logo" height={30} width={30} />
              <span
                className={cn(
                  "font-semibold text-xl text-black",
                  font.className
                )}
              >
                Miro Clone
              </span>
            </Link>
          </Button>
        </TooltipWrapper>

        <TabSeparator />

        <TooltipWrapper label="Edit title" side="bottom" sideOffset={10}>
          <Button
            onClick={() => onOpen(data._id, data.title)}
            variant="board"
            className="text-base font-normal px-2"
          >
            {data.title}
          </Button>
        </TooltipWrapper>

        <TabSeparator />

        <BoardActions
          id={data._id}
          onConfirm={onConfirm}
          title={data.title}
          side="bottom"
          sideOffset={10}
        >
          <div>
            <TooltipWrapper label="Main menu" side="bottom" sideOffset={10}>
              <Button size="icon" variant="board">
                <MenuIcon />
              </Button>
            </TooltipWrapper>
          </div>
        </BoardActions>
      </div>
    </>
  );
};

const TabSeparator = () => {
  return <div className="text-neutral-300 px-1.5">|</div>;
};

const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
  );
};

export { Info, InfoSkeleton };
