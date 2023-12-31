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
    InputRightElement,
} from '@chakra-ui/react';
import bgimage from '../images/bgimage.svg'
import '../css/style.css';
import { BiCheckCircle } from 'react-icons/bi'
import Footer from './footer';
import Uploader from './uploader';

function PasswordInput({placeholder, clipboardState, isCopied}) {

  return (
    <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type='text'
        placeholder={placeholder.split(50,100)}
        isReadOnly
      />
      <InputRightElement width='4.5rem'>
        <Button colorScheme='blue' h='1.75rem' size='sm' onClick={clipboardState}> {isCopied ? 'Copied!' : 'Copy'}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

const Upload = () => {
const fileInputRef = useRef(null);
const [droppedFile, setDroppedFile] = useState("")
const [loadingProgress, setLoadingProgress] = useState(null)
const [imageLoading, setImageLoading] = useState(false)
const [isImageLoaded, setIsImageLoaded] = useState(false)
const [isCopied, setIsCopied] = useState(false)

const handleClipboardState = () => {
  navigator.clipboard.writeText(droppedFile)
  .then(() => setIsCopied(true))
  setInterval(() => {
    setIsCopied(false)
  }, 5000);
}

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
    const imageUrl = reader.result;
    console.log(imageUrl);
    setDroppedFile(imageUrl)
    setInterval(() => {
      setImageLoading(false)
      setIsImageLoaded(true)
    }, 2000)
  }

  reader.readAsDataURL(file)
}

const handleDrop = useCallback((event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  const reader = new FileReader();
  handleOnProgress(reader);

  reader.onload = () => {
    const imageUrl = reader.result;
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
    console.log(droppedFile.current);
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
                                <PasswordInput placeholder={droppedFile} clipboardState={handleClipboardState} isCopied={isCopied}/>
                              </Box>
                            </Grid>
                          </Card>
                        </GridItem>
                      </Grid>
                  </>) : (<> <Uploader handleDragOver={handleDragOver} handleDrop={handleDrop} bgimage={bgimage} fileInputRef={fileInputRef} handleFileProcessing={handleFileProcessing} handleClick={handleClick} /></>)
                }
                
            </>)
        }
        <Box display={'flex'} justifyContent={'center'}>
      <Footer />
        </Box>
      </Box>
    </Center>
  )
}

export default Upload