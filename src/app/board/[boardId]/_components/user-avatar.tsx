import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
}

const UserAvatar = ({ borderColor, fallback, name, src }: UserAvatarProps) => {
  return (
    <TooltipWrapper label={name || "Teammate"} side="bottom" sideOffset={14}>
      <Avatar className="size-8 border-2" style={{ borderColor: borderColor }}>
        <AvatarFallback className="text-xs font-semibold">
          {fallback}
        </AvatarFallback>
        <AvatarImage src={src} />
      </Avatar>
    </TooltipWrapper>
  );
};

export { UserAvatar };
