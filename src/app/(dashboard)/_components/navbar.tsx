"use client";

import {
  OrganizationSwitcher,
  UserButton,
  useOrganization,
} from "@clerk/nextjs";
import { InviteButton } from "./invite-button";
import { SearchInput } from "./search-input";

const Navbar = () => {
  const { organization } = useOrganization();

  return (
    <nav className="flex items-center gap-x-4 p-5">
      <div className="hidden lg:flex-1 lg:flex">
        <SearchInput />
      </div>
      <div className="block lg:hidden flex-1">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "367px",
              },
              organizationSwitcherTrigger: {
                padding: "6px",
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                justifyContent: "space-between",
                backgroundColor: "white",
                fontSize: "1rem",
                height: "44px",
              },
            },
          }}
        />
      </div>
      {organization && <InviteButton />}
      <UserButton />
    </nav>
  );
};

export { Navbar };
