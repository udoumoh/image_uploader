import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import Upload from './components/upload';
// import { Logo } from './Logo';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Upload />
    </ChakraProvider>
  );
}

export default App;
