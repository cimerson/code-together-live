import { Button, Card, CardBody, Divider, Heading, Image, Center } from '@chakra-ui/react'
import { getLogo } from '../utils/languages'
import { NavLink } from 'react-router-dom'

interface RoomProps {
  language: string,
  name: string
  id: string
}

const Room = ({language, name, id}: RoomProps) => {
  return (
    <Card maxW='sm'>
      <CardBody>
        <Center>
          <Image
            maxH={'100px'}
            // src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            src={getLogo(language)}
            alt='Green double couch with wooden legs'
            borderRadius='lg'
          />
        </Center>
        {/* <Heading size='md' mt='6'>Living room Sofa</Heading> */}
        <Heading size='md' mt='6'>{name}</Heading>
      </CardBody>
      <Divider />
      <Center p={4}>
        <Button as={NavLink} to={`/room/${id}`} variant='outline' colorScheme='teal' size='xs'>
          Enter
        </Button>
      </Center>
    </Card>
  )
}

export default Room
