import React from 'react'
import {
    Box,
    Grid,
    Card,
    Text,
    GridItem,
    Image,
    Button,
    Input,
} from '@chakra-ui/react';

const Uploader = ({handleDragOver, handleDrop, bgimage, fileInputRef, handleFileProcessing, handleClick}) => {
  return (
      <Grid>
          <GridItem w='auto' h='auto' className='font1'>
              <Card boxShadow='xl' rounded={'2xl'} alignItems='center' px='10'>
                  <Text fontWeight={'800'} color={'gray.700'} mt='10' >Upload your Image</Text>
                  <Text fontSize={'15'} mt={'19'} color={'GrayText'} fontWeight={'600'}>File Should be Jpeg, Png...</Text>

                  <Grid
                      border={'dashed'}
                      borderColor={'#97BEF4'}
                      borderWidth={'2px'}
                      rounded={'2xl'}
                      h={'auto'}
                      w={'auto'}
                      my='19' px='10'
                      backgroundColor={'gray.50'}
                      py='10' gap={10}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                  >
                      <Input type='file' id='fileInput' display={'none'} ref={fileInputRef} onChange={handleFileProcessing} />
                      <Box display='flex' justifyContent='center' alignItems='center'>
                          <Image src={bgimage} alt='picture' boxSize={150} ></Image>
                      </Box>
                      <Text fontSize={20} fontWeight={'700'} color={'gray.400'}>Drag and drop your image here</Text>
                  </Grid>
                  <Grid gap={8}>
                      <Text fontSize={20} fontWeight={'700'} color={'gray.400'}>Or</Text>
                      <Button colorScheme='blue' mb={12} onClick={handleClick}>Choose a file</Button>
                  </Grid>
              </Card>
          </GridItem>
      </Grid>
  )
}

export default Uploader