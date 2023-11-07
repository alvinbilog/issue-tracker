'use client';
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogTitle,
  Button,
  Flex,
} from '@radix-ui/themes';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Delete Issue</Button>
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
              <Button color="red"> Delete Issue</Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default DeleteIssueButton;
