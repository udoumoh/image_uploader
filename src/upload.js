import React from 'react'
import {
    Box,
    Grid,
    Card,
    Text,
    GridItem,
    Center,
} from '@chakra-ui/react';

const Upload = () => {
  return (
    <Center>
      <Box textAlign={'center'} fontSize={'30'} w={'100%'} border={'rounded'}>
          <Grid templateColumns='repeat(1, 1fr)' placeItems={'center'}>
              <GridItem w='40%' h='20'>
                  <Card boxShadow='lg' alignItems='center'>
                      <Text fontWeight={'500'} color={'gray.600'}>Upload your Image</Text>
                      <Text fontSize={'15'} mt={'19'} color={'GrayText'} fontWeight={'500'}>File Should be Jpeg, Png...</Text>

                      <Box border={'dashed'} borderColor={'#97BEF4'} borderWidth={'2px'} rounded={'xl'} h={'300'} w={'70%'} my='19' backgroundColor={'gray.50'}>
                      <Text>Drag and drop your images here</Text>
                      </Box>
                  </Card>
              </GridItem>
          </Grid>
      </Box>
    </Center>
  )
}

export default Upload