import React, {useEffect, useState} from 'react'
import {
    Box,
    Grid,
    Card,
    Text,
    GridItem,
    Center,
    Image,
    Button,
    Input,
} from '@chakra-ui/react';
import bgimage from './images/bgimage.svg'
import './index.css'

const Upload = () => {
const [droppedFile, setDroppedFile] = useState(null)

const handleDragEnter = (event) => {
  event.preventDefault()
}

const handleDragLeave = (event) => {
  event.preventDefault()
}

const handleDragOver = (event) => {
  event.preventDefault()
}

const handleDrop = (event) => {
  event.preventDefault()
  const file = event.dataTransfer.files[0]
  setDroppedFile(file)
}

const handleFileSelect = (event) => {
  event.preventDefault()
  const file = event.target.files[0]
  setDroppedFile(file)
}

  useEffect(() => {
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('dragenter', handleDragEnter);
    fileInput.addEventListener('dragleave', handleDragLeave);
    fileInput.addEventListener('dragover', handleDragOver);
    fileInput.addEventListener('drop', handleDrop);

    return () => {
      // Clean up event listeners when component unmounts
      fileInput.removeEventListener('dragenter', handleDragEnter);
      fileInput.removeEventListener('dragleave', handleDragLeave);
      fileInput.removeEventListener('dragover', handleDragOver);
      fileInput.removeEventListener('drop', handleDrop);
    };
  }, []);


  return (
    <Center h='100vh' bg='gray.50'>
      <Box textAlign={'center'} fontSize={'30'} w={'auto'} border={'rounded'} justifySelf='center' alignSelf={'center'}>
          <Grid>
            <GridItem w='auto' h='auto' className='font1'>
              <Card boxShadow='xl' rounded={'2xl'} alignItems='center' px='10'>
                <Text fontWeight={'800'} color={'gray.700'} mt='10' >Upload your Image</Text>
                <Text fontSize={'15'} mt={'19'} color={'GrayText'} fontWeight={'600'}>File Should be Jpeg, Png...</Text>

                <Grid border={'dashed'} borderColor={'#97BEF4'} borderWidth={'2px'} rounded={'2xl'} h={'auto'} w={'auto'} my='19' px='20' backgroundColor={'gray.50'} py='10' gap={10}>
                  <Input type='file' id='fileInput' onChange={handleFileSelect}/>
                  <Box display='flex' justifyContent='center' alignItems='center'>
                    <Image src = {bgimage} alt='picture' boxSize={150} ></Image>
                  </Box>
                  <Text fontSize={20} fontWeight={'700'} color={'gray.400'}>Drag and drop your image here</Text>
                </Grid>
                <Grid gap={8}>
                  <Text fontSize={20} fontWeight={'700'} color={'gray.400'}>Or</Text>
                  <Button colorScheme='blue' mb={12}>Choose a file</Button>
                </Grid>
              </Card>
            </GridItem>
          </Grid>
      </Box>
    </Center>
  )
}

export default Upload