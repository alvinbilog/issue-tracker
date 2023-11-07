import { Issue } from '@prisma/client';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

const EditIssueButton = ({ issue }: { issue: Issue }) => {
  return (
    <div>
      <Button>
        <Pencil2Icon />
        <Link href={`/issues/edit/${issue.id}/edit`}>Edit Issue</Link>
      </Button>
    </div>
  );
};

export default EditIssueButton;
