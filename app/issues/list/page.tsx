import Pagination from '@/app/components/Pagination';
import prisma from '@/prisma/client';
import { Issue, Status } from '@prisma/client';
import IssueAction from './IssueAction';
import IssueTable, { columnNames } from './IssueTable';
import { Flex } from '@radix-ui/themes';

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;

  let issues;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issueCount = await prisma.issue.count({ where });

  if (
    searchParams.status === 'OPEN' ||
    searchParams.status === 'CLOSED' ||
    searchParams.status === 'IN_PROGRESS'
  ) {
    issues = await prisma.issue.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  } else {
    issues = await prisma.issue.findMany({
      where: {},
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }); // Fetch all issues
  }

  return (
    <Flex direction="column" gap="3">
      <IssueAction />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};
export const dynamic = 'force-dynamic';

export default IssuesPage;
