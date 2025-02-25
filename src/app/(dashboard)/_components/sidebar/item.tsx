"use client";

import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { cn } from "@/lib/utils";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

const Item = ({ id, imageUrl, name }: ItemProps) => {
  const { setActive } = useOrganizationList();
  const { organization } = useOrganization();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) {
      return;
    }

    setActive({ organization: id });
  };

  return (
    <div className="aspect-square relative">
      <TooltipWrapper label={name} side="right" align="start" sideOffset={15}>
        <Image
          src={imageUrl}
          alt={name}
          onClick={onClick}
          fill
          className={cn(
            "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
            isActive && "opacity-100"
          )}
        />
      </TooltipWrapper>
    </div>
  );
};

export { Item };
