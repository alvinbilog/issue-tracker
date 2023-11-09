import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import Link from '../../components/Link';
import IssueStatusBadge from '../../components/issueStatusBadge';
import IssueAction from './IssueAction';
import { Status } from '@prisma/client';

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { status: Status };
}) => {
  let issues;
  if (
    searchParams.status === 'OPEN' ||
    searchParams.status === 'CLOSED' ||
    searchParams.status === 'IN_PROGRESS'
  ) {
    issues = await prisma.issue.findMany({
      where: {
        status: searchParams.status,
      },
    });
  } else {
    issues = await prisma.issue.findMany(); // Fetch all issues
  }

  return (
    <div>
      <div className="mb-5">
        <IssueAction />
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Issue
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
export const dynamic = 'force-dynamic';

export default IssuesPage;
