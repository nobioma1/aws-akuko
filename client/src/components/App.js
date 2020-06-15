import React from 'react';
import { Theme } from './Theme';
import { CSSReset, Box, Flex, Heading, Text } from '@chakra-ui/core';

import { Posts } from './Posts';

export const App = () => {
  return (
    <Theme>
      <CSSReset />
      <Box>
        <Box p={2} background="black">
          <Heading textAlign="center" color="white">
            Akúkó
          </Heading>
          <Text textAlign="center" color="white">
            tokam anonymously
          </Text>
        </Box>
        <Flex w="full" justifyContent={['space-between']} px={2} pt={3}>
          <Posts />
        </Flex>
      </Box>
    </Theme>
  );
};
