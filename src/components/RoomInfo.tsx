import { Box } from '@chakra-ui/react'

interface RoomInfo {
  roomId: string
  userId: string
  username: string
}

const RoomInfo = ({ users }: RoomInfo[]) => {
  return (
    <Box h='100%' w='100%'>
      Room Info
      {users.map(user => (
          <Box key={user.id}>{user.username}</Box>
      ))}
    </Box>
  )
}

export default RoomInfo