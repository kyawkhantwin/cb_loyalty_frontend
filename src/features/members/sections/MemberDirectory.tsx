'use client';

import React, { useState, useMemo } from 'react';
import {
  Table,
  Spinner,
} from '@heroui/react';
import { Member } from '../types';
import { DirectoryTopContent } from '../components/DirectoryTopContent';
import { MemberTableCell } from '../components/MemberTableCell';
import { MemberForm } from '../components/MemberForm';

import { useGetMembersQuery } from '../api/useGetMembersQuery';
import { useCreateMemberMutation } from '../api/useCreateMemberMutation';
import { useUpdateMemberMutation } from '../api/useUpdateMemberMutation';
import { useDeleteMemberMutation } from '../api/useDeleteMemberMutation';

const DIRECTORY_COLUMNS = [
  { name: "MEMBER", uid: "name" },
  { name: "BALANCE", uid: "points" },
  { name: "TIER", uid: "tier" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export const MemberDirectory = () => {
  const { data: response, isLoading: queryLoading } = useGetMembersQuery();
  const membersList = response?.data || [];

  const [searchFilter, setSearchFilter] = useState("");
  const [memberToEdit, setMemberToEdit] = useState<Member | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const createMutation = useCreateMemberMutation();
  const updateMutation = useUpdateMemberMutation();
  const deleteMutation = useDeleteMemberMutation();

  const filteredMembers = useMemo(() =>
          membersList.filter((m) => m.name.toLowerCase().includes(searchFilter.toLowerCase())),
      [membersList, searchFilter]
  );

  const handleMemberAction = (member: Member, actionKey: string) => {
    if (actionKey === "edit") setMemberToEdit(member);
    if (actionKey === "delete") deleteMutation.mutate(member.id);
  };

  return (
      <div className="flex flex-col gap-6 p-4">
        <DirectoryTopContent
            filter={searchFilter}
            onFilterChange={setSearchFilter}
            onAdd={() => setIsCreateModalOpen(true)}
        />

        <Table variant="primary" className="shadow-sm">
          <Table.ScrollContainer>
            <Table.Content aria-label="Members Directory">
              <Table.Header columns={DIRECTORY_COLUMNS}>
                {(column) => (
                    <Table.Column id={column.uid} isRowHeader={column.uid === 'name'}>
                      {column.name}
                    </Table.Column>
                )}
              </Table.Header>

              <Table.Body
                  items={filteredMembers}
                  renderEmptyState={() => (
                      <div className="flex justify-center p-10 text-default-400">
                        {queryLoading ? <Spinner  /> : "No members found"}
                      </div>
                  )}
              >
                {(item: Member) => (
                    <Table.Row id={item.id}>
                      {DIRECTORY_COLUMNS.map((col) => (
                          <Table.Cell key={col.uid}>
                            <MemberTableCell
                                member={item}
                                columnKey={col.uid}
                                onAction={(key) => handleMemberAction(item, key)}
                            />
                          </Table.Cell>
                      ))}
                    </Table.Row>
                )}
              </Table.Body>

              {queryLoading && filteredMembers.length > 0 && (
                  <Table.LoadMore isLoading={true}>
                    <Table.LoadMoreContent>
                      <Spinner size="sm" />
                    </Table.LoadMoreContent>
                  </Table.LoadMore>
              )}
            </Table.Content>
          </Table.ScrollContainer>
        </Table>

        {/* CREATE MODAL */}
        <MemberForm
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={(data) => createMutation.mutate(data as never, { onSuccess: () => setIsCreateModalOpen(false) })}
            isLoading={createMutation.isPending}
        />

        {/* EDIT MODAL */}
        <MemberForm
            isOpen={!!memberToEdit}
            initialData={memberToEdit ?? undefined}
            onClose={() => setMemberToEdit(null)}
            onSubmit={(data) => {
              if (memberToEdit) {
                updateMutation.mutate(
                    { memberId: memberToEdit.id, memberData: data },
                    { onSuccess: () => setMemberToEdit(null) }
                );
              }
            }}
            isLoading={updateMutation.isPending}
        />
      </div>
  );
};
