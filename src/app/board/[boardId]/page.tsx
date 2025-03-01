import { Room } from "@/components/room";
import { Id } from "../../../../convex/_generated/dataModel";
import { Canvas } from "./_components/canvas";
import { Loading } from "./_components/loading";

interface BoardIdPageProps {
  params: Promise<{ boardId: string }>;
}

export default async function BoardIdPage({ params }: BoardIdPageProps) {
  const { boardId } = await params;

  return (
    <Room roomId={boardId} fallback={<Loading />}>
      <Canvas boardId={boardId as Id<"boards">} />
    </Room>
  );
}
