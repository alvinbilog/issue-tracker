'use client';
import Spinner from '@/app/components/Spinner';
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogTitle,
  Button,
  Flex,
} from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const [error, setError] = useState(false);
  const [isDeleteting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function deleteHandler() {
    try {
      setIsDeleting(true);
      await axios.delete('/api/issues/' + issueId);
      router.push('/issues');
      router.refresh();
    } catch (error) {
      setIsDeleting(false);
      console.log(error);
      setError(true);
    }
  }
  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleteting}>
            Delete Issue {isDeleteting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete? This action cannot be undone.
          </AlertDialogDescription>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button color="gray" variant="soft">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={deleteHandler}>
                {' '}
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted.
          </AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="2"
            onClick={() => setError(false)}
          >
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default DeleteIssueButton;
