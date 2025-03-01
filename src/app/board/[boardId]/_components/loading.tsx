import { Loader2Icon } from "lucide-react";

import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

const Loading = () => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <Loader2Icon className="!size-6 text-muted-foreground animate-spin" />
      <Info.Skeleton />
      <Participants.Skeleton />
      <Toolbar.Skeleton />
    </main>
  );
};

export { Loading };
