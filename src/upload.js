import React, {useEffect, useState, useRef} from 'react'
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
    Progress,
} from '@chakra-ui/react';
import bgimage from './images/bgimage.svg'
import './index.css'

const Upload = () => {
const fileInputRef = useRef(null);
const [droppedFile, setDroppedFile] = useState(null)
const [loadingProgress, setLoadingProgress] = useState(null)
const [imageLoading, setImageLoading] = useState(false)

const handleDragEnter = (event) => {
  event.preventDefault()
}

const handleDragLeave = (event) => {
  event.preventDefault()
}

const handleDragOver = (event) => {
  event.preventDefault()
}

const handleFileProcessing = (event) => {
  event.preventDefault()
  const file = event.target.files[0]

  const reader = new FileReader();

  reader.onloadstart = () => {
    setImageLoading(true)
  }

  reader.onprogress = (event) => {
    if (event.lengthComputable) {
      let progress = (event.loaded / event.total) * 100;
      if(progress < 100) {
        setLoadingProgress(progress)
      } else if(progress === 100){
        setInterval(() => setLoadingProgress(progress), 1000)
      }
    }
  };

  reader.onload = () => {
    const base64String = reader.result;

    setDroppedFile(base64String)
    setInterval(() => {setImageLoading(false)}, 3000)
  }

  reader.readAsDataURL(file)
}

const handleDrop = (event) => {
  event.preventDefault()
  
  const file = event.dataTransfer.files[0]

  const reader = new FileReader();
  reader.onload = (event) => {
    const bufferArray = new Uint8Array(event.target.result);
    const base64String = btoa(bufferArray.reduce((data, byte) => data + String.fromCharCode(byte), ""));

    setDroppedFile('data:image/png;base64,' + base64String)
  }

  reader.readAsArrayBuffer(file)

}

const handleClick = () => {
  fileInputRef.current.click()
}

  useEffect(() => {
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('dragenter', handleDragEnter);
    fileInput.addEventListener('dragleave', handleDragLeave);
    fileInput.addEventListener('dragover', handleDragOver);
    fileInput.addEventListener('drop', handleDrop);
    fileInput.addEventListener('click', handleClick)

    return () => {
      // Clean up event listeners when component unmounts
      fileInput.removeEventListener('dragenter', handleDragEnter);
      fileInput.removeEventListener('dragleave', handleDragLeave);
      fileInput.removeEventListener('dragover', handleDragOver);
      fileInput.removeEventListener('drop', handleDrop);
      fileInput.removeEventListener('click', handleClick)
    };
  }, []);

  useEffect(() => {
    console.log(droppedFile?.slice(0, 22));
    console.log(loadingProgress);
  }, [droppedFile, loadingProgress])


  return (
    <Center h='100vh' bg='gray.50'>
      <Box textAlign={'center'} fontSize={'30'} w={'auto'} border={'rounded'} justifySelf='center' alignSelf={'center'}>
        {
          imageLoading ? (
            <>
              <Card rounded={'2xl'} boxShadow={'xl'}>
                <Grid gap={5} py='12'>
                  <GridItem w='auto' h='auto' className='font1' px='10'>
                    <Text mr='80' fontSize={'20'} fontWeight={'800'} color={'gray.700'} textAlign={'start'} >Uploading...</Text>
                  </GridItem>
                  <GridItem w='auto' h='auto' className='font1' px='10'>
                    <Progress value={loadingProgress} height={'2'} rounded='lg' w='100%' />
                  </GridItem>
                </Grid>
              </Card>
            </>) : (
            <>
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
                        my='19' px='20'
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
            </>)
        }
      </Box>
    </Center>
  )
}

export default Upload