'use client';
import { Select } from '@radix-ui/themes';

const AssigneeSelect = () => {
  return (
    <div>
      <Select.Root>
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="1">Alvs</Select.Item>
            <Select.Item value="2">Apple</Select.Item>
            <Select.Item value="3" disabled>
              Boss
            </Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default AssigneeSelect;
