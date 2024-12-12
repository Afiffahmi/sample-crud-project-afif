import React from 'react';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';

export default function SettingsScreen() {
  return (
    <Box className='flex-1 bg-white'>
      <Box className='justify-center items-center bg-gray-200 mx-4 mt-10 rounded-lg p-4 gap-4'>
      <Text className='text-center font-bold'>trusted review platform</Text>
      <Text className='text-center text-sm'>We are committed to maintaining a trustworthy and reliable review system to ensure the best shopping experience for everyone. To achieve this, we aim to eliminate fake or paid reviews, as well as irrelevant feedback that does not reflect the quality of the product itself. This includes reviews such as 'just received, haven’t tried yet' or comments solely focused on logistics rather than the product. We believe genuine and helpful reviews are key to making informed purchase decisions, and we appreciate your support in fostering an honest community!</Text>
      <Text className='text-center text-xs'>version 1.0.0</Text>
      </Box>
      
    </Box>
  );
}
