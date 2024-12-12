import React from 'react';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { Card } from '@/components/ui/card';

export default function HomeScreen() {
  return (
    <Box className='flex-1  bg-white'>
      <Text className='text-center'>My Review</Text>
      <Box className='justify-center items-center'>
      <Card className='w-80 h-40 mt-4 p-4'>
        <Text className='text-center border-slate-400 border rounded-lg'>This is a review card</Text>
      </Card>
      </Box>
    </Box>
  );
}
