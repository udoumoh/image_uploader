import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  Card,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
// import { Logo } from './Logo';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
            <Card>

            </Card>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
