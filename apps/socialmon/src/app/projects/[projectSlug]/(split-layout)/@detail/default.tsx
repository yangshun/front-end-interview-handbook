import { Text } from '@mantine/core';

export default function DetailDefault() {
  return (
    <div className="relative h-full bg-gray-50">
      <div className="pointer-events-none fixed inset-0 left-[40%] flex items-center justify-center">
        <div className="pointer-events-auto text-center">
          <Text c="dimmed" size="lg">
            Select a post to view details
          </Text>
          <Text c="dimmed" mt="xs" size="sm">
            Click on any post from the list to see its content here
          </Text>
        </div>
      </div>
    </div>
  );
}
