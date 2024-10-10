import { Box, Center, CircularProgress, Heading, HStack, VStack } from '@chakra-ui/react'

import CodeEditor from '../components/CodeEditor'
import RoomInfo from '../components/RoomInfo'
import { useParams } from 'react-router-dom'
import useGetRoom from '../apiCalls/hooks/useGetRoom'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useStore } from '../utils/store'

interface Use {
  roomId: string
  userId: string
  username: string
}

const CodePlayground = () => {

  const { id, username } = useStore()

  const { roomId } = useParams()

  const { room, isLoading, error } = useGetRoom(roomId as string)

  const [ users, setUsers] = useState<object[]>([])


  useEffect(() => {

    const socket = io('http://localhost:5000/', {
      transports: ['websocket'],
      withCredentials: true
    })

    socket.on('connect', () => {

      socket.emit("join-room", { roomId, userId: id, username })

      socket.on('new-user-joined', (use: Use[]) => {
        console.log('new-user-joined', use)
        if(use && use.length !== 0 ){
          setUsers(prevUsers => [...prevUsers, use])
        }
      })

    })
    
    // socket.on('code_changed', (code) => {
    //   console.log(code)
    // })

    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`)
    })

    // return () => {
    //   socket.emit('dissconet-from-room', { roomId, username })
    // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    <Box w='100%' h='100%' display='flex' flexDir='column'>
      <Center>
        <VStack>
          <Heading as='h2' size='xl'>{room?.name}</Heading>
          <Heading as='h4' size='md'>{room?.language}</Heading>
        </VStack>
      </Center>
      <Box h='100%' w='100%' pt={4} display='flex'>
        <HStack spacing={4} h='100%' w='100%'>
          <Box w='80%'>
              <CodeEditor language={room?.language as string} code={room?.code as string}/>
              <Box bg='gray' h='200px'>
                Run
              </Box>
          </Box>
          <Box h='100%' >
            <RoomInfo users={users}/>
          </Box>
        </HStack>
      </Box>
    </Box>
  )
}

export default CodePlayground