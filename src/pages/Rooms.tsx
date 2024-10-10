import { Box, Center, CircularProgress, Heading, VStack, Wrap } from '@chakra-ui/react'

import JoinModal from '../components/JoinModal'
import CreateModal from '../components/CreateModal'
import Room from '../components/Room'
import useGetRooms from '../apiCalls/hooks/useGetRooms'


const Rooms = () => {

  const { rooms, isLoading, error} = useGetRooms()

  if(error){
    return (
      <Box display='flex' w='100%' alignItems='center' justifyContent='center'>
        <Heading as='h4' size='md'>{error}</Heading>
      </Box>
    )
  }

  if(isLoading){
    return (
      <Box display='flex' w='100%' alignItems='center' justifyContent='center'>
        <CircularProgress isIndeterminate size='100px' />
      </Box>
    )
  }

  return (
    <VStack display='flex' w='100%' >
      <Center p={8}>
        <VStack>
          <Heading>Pick a room, and let the creativity flow </Heading>
          <JoinModal />
          <Heading as='h4' size='md'>or</Heading>
          <CreateModal />
        </VStack>
      </Center>
      <Wrap maxW='1280px' mx='auto' display='flex' spacing={6} justify='center'>
        {rooms.map((room) => (
          <Room key={room.id} language={room.language} name={room.name} id={room.id}/>
        ))}
      </Wrap>
    </VStack>
  )
}

export default Rooms
