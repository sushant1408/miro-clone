"use client";

import { useOrganization } from "@clerk/nextjs";
import { use } from "react";

import { BoardList } from "./_components/board-list";
import { EmptyOrg } from "./_components/empty-states/empty-org";

interface DashboardPageProps {
  searchParams: Promise<{ search?: string; favorites?: string }>;
}

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  const queryParams = use(searchParams);
  const { organization } = useOrganization();

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={queryParams} />
      )}
    </div>
  );
}
