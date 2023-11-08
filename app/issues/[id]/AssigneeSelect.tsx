'use client';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });
  function issueAssignedHandler(userId: string) {
    try {
      if (userId === 'Unassigned')
        axios.patch(`/api/issues/${issue.id}`, {
          assignedToUserId: null,
        });
      else {
        axios.patch(`/api/issues/${issue.id}`, {
          assignedToUserId: userId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (isLoading) return <Skeleton />;
  if (error) return null;
  return (
    <div>
      <Select.Root
        defaultValue={issue.assignedToUserId || ''}
        onValueChange={(userId) => issueAssignedHandler(userId)}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="Unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item value={user.id} key={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default AssigneeSelect;
