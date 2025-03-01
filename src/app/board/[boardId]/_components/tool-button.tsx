"use client";

import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

const ToolButton = ({
  icon: Icon,
  label,
  onClick,
  isActive,
  isDisabled,
}: ToolButtonProps) => {
  return (
    <TooltipWrapper label={label} side="right" sideOffset={14}>
      <Button
        onClick={onClick}
        disabled={isDisabled}
        size="icon"
        variant={isActive ? "board-active" : "board"}
      >
        <Icon />
      </Button>
    </TooltipWrapper>
  );
};

export { ToolButton };
