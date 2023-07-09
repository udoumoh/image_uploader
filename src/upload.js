import React, {useEffect, useState, useRef, useCallback} from 'react'
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
    InputGroup,
    InputRightElement
} from '@chakra-ui/react';
import bgimage from './images/bgimage.svg'
import './index.css'
import { BiCheckCircle } from 'react-icons/bi'

function PasswordInput(placeholder) {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

const Upload = () => {
const fileInputRef = useRef(null);
const [droppedFile, setDroppedFile] = useState(null)
const [loadingProgress, setLoadingProgress] = useState(null)
const [imageLoading, setImageLoading] = useState(false)
const [isImageLoaded, setIsImageLoaded] = useState(false)

const handleDragOver = (event) => {
  event.preventDefault()
}

const handleOnProgress = (reader) => {
  reader.onloadstart = () => {
    setImageLoading(true)
  }

  
  reader.onprogress = (event) => {
    if (event.lengthComputable) {
      let progress = (event.loaded / event.total) * 100;
      if (progress < 100) {
        setLoadingProgress(progress)
      } else if (progress === 100) {
        setInterval(() => {
          setLoadingProgress(progress)}, 1000)
      }
    }
  };
}

const handleFileProcessing = (event) => {
  event.preventDefault()
  const file = event.target.files[0]

  const reader = new FileReader();

  handleOnProgress(reader)

  reader.onload = () => {
    const base64String = reader.result;

    setDroppedFile(base64String)
    setInterval(() => {
      setImageLoading(false)
      setIsImageLoaded(true)
    }, 3000)
  }

  reader.readAsDataURL(file)
}

  const handleDrop = useCallback((event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];

    const reader = new FileReader();
    handleOnProgress(reader);

    reader.onload = () => {
      const imageUrl = URL.createObjectURL(file);
      setDroppedFile(imageUrl);
      setInterval(() => {
        setImageLoading(false);
        setIsImageLoaded(true);
      }, 3000);
    };

    reader.readAsDataURL(file);
  }, []);


const handleClick = () => {
  fileInputRef.current.click()
}

  useEffect(() => {
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('dragover', handleDragOver);
    fileInput.addEventListener('drop', handleDrop);
    fileInput.addEventListener('click', handleClick)

    return () => {
      // Clean up event listeners when component unmounts 
      fileInput.removeEventListener('dragover', handleDragOver);
      fileInput.removeEventListener('drop', handleDrop);
      fileInput.removeEventListener('click', handleClick)
    };
  }, [handleDrop]);

  useEffect(() => {
    console.log(droppedFile);
  }, [droppedFile])

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
                {
                  isImageLoaded ? (
                  <> 
                      <Grid>
                        <GridItem w='auto' h='auto' className='font1'>
                          <Card boxShadow='xl' rounded={'2xl'} alignItems='center' px='10'>
                            <Box pt='12'>
                              <BiCheckCircle color='green' fontSize={'50'}/>
                            </Box>
                            <Text fontWeight={'800'} color={'gray.700'} pt='5' fontSize={'22'} >Uploaded successfully!</Text>
                            <Grid
                              py='10' 
                              gap={10}
                              onDragOver={handleDragOver}
                              onDrop={handleDrop}
                            >
                              <Input type='file' id='fileInput' display={'none'} ref={fileInputRef} onChange={handleFileProcessing} />
                              
                              <Box display='flex' justifyContent='center' alignItems='center'>
                                <Image src={droppedFile} alt='picture' h={'224'} w={'338'} rounded={'2xl'}></Image>
                              </Box>

                              <Box>
                                  <PasswordInput placeholder={'image link'}/>
                              </Box>
                            </Grid>
                          </Card>
                        </GridItem>
                      </Grid>
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
                
            </>)
        }
      </Box>
    </Center>
  )
}

export default Upload