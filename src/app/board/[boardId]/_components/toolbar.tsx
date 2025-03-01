const Toolbar = () => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center gap-y-1 shadow-md"></div>
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md"></div>
    </div>
  );
};

const ToolbarSkeleton = () => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md" />
  );
};

export { Toolbar, ToolbarSkeleton };
