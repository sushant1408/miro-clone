"use client";

import { CreateOrganization } from "@clerk/nextjs";
import { PlusIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TooltipWrapper } from "@/components/tooltip-wrapper";

const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <TooltipWrapper label="Create organization" side="right" align="start" sideOffset={15}>
            <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
              <PlusIcon className="text-white" />
            </button>
          </TooltipWrapper>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none shadow-none max-w-[450px]">
        <DialogTitle className="hidden"></DialogTitle>
        <CreateOrganization
          appearance={{
            elements: {
              rootBox: {
                width: "100%",
              },
              cardBox: {
                width: "100%",
              },
            },
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export { NewButton };
