import { CreateOrganization } from "@clerk/nextjs";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EmptyOrg = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/elements.svg" height={200} width={200} alt="empty orgs" />
      <h2 className="text-2xl font-semibold mt-6">Welcome to Miro Clone</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Create an organization to get started
      </p>

      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">Create organization</Button>
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
      </div>
    </div>
  );
};

export { EmptyOrg };
