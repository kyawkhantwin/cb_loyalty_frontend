import {MemberDirectory} from "@/features/members/public-api";
import {Breadcrumbs} from "@heroui/react";

export const MembersPage = () => (
  <div className="space-y-6">
    <div className="flex flex-col gap-2">
      <Breadcrumbs>
        <Breadcrumbs.Item href="/">Dashboard</Breadcrumbs.Item>
        <Breadcrumbs.Item>Members</Breadcrumbs.Item>
      </Breadcrumbs>
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Member Management</h1>
          <p className="text-default-500">Search, filter, and adjust member points or tiers.</p>
        </div>
      </div>
    </div>
    
    <MemberDirectory />
  </div>
);
