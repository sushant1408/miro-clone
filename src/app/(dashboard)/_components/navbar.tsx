"use client";

import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex items-center gap-x-4 p-5">
      <div className="hidden lg:flex-1 lg:flex">
        {/* add search */}
      </div>
        <UserButton />
    </nav>
  );
};

export { Navbar };
