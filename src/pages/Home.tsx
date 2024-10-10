import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import * as yup from 'yup'

import { Box, Button, Center, FormControl, FormErrorMessage, 
  FormLabel, Heading, HStack, Input, InputGroup, InputRightElement, VStack 
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ViewIcon } from '@chakra-ui/icons'
import SiginInModal from '../components/SiginInModal'
import { Authentications } from '../apiCalls/auth'
import { useStore } from '../utils/store'



const schema = yup
  .object({
    username: yup.string().required('Required'),
    password: yup.string().required('Required'),
  })
  .required()

interface FormData {
  username: string,
  password: string
}

const Home = () => {

  const [show, setShow] = useState<boolean>(false)

  const { setUsername, setId } = useStore()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onLogin = async (data: FormData) => {
    try {
      const user = await Authentications.loginUser(data)
      setUsername(user.username)
      setId(user.id)
      navigate('/rooms')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError('password', { type: 'custom', message: err.response.data.error })
        } else {
          setError('password', { type: 'custom', message: err.message })
        }
      }
    }
  }

  const onSubmit = (data: FormData) => {
    onLogin(data)
  }

  const onShow = () => setShow(!show)

  return (
    <Box display='flex' w='100%' alignItems='center' justifyContent='center'>
      <Box
        borderRadius='8'
        p='4'
        bg='radial-gradient(circle at 10% 20%, rgb(39, 199, 171) 0%, rgb(70, 143, 197) 90%)'
      >
        <VStack p={8}>
          <Center p={4}>
            <Heading>Let`s code together, one line at a time...</Heading>
          </Center>
          <Center>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl p={4} isInvalid={Boolean(errors.username)}>
                <Center>
                  <FormLabel>Please enter your credentials</FormLabel>
                </Center>
                <Input
                  bg={'gray.800'}
                  id='username'
                  placeholder='Username'
                  focusBorderColor={errors.username ? 'red.300' : ''}
                  {...register('username')}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl p={4} isInvalid={Boolean(errors.password)}>
                <Center>
                </Center>
                <InputGroup>
                  <Input
                    bg={'gray.800'}
                    id='password'
                    placeholder='password'
                    type={show ? 'text' : 'password'}
                    focusBorderColor={errors.username ? 'red.300' : ''}
                    {...register('password')}
                  />
                  <InputRightElement>
                    <ViewIcon onClick={onShow} _hover={{ cursor: 'pointer' }} />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Center p={4}>
                <Button isLoading={isSubmitting} type='submit'>
                  Let`s start!
                </Button>
              </Center>
            </form>
          </Center>
          <HStack>
            <Heading as='h5' size='sm'>or</Heading>
            <SiginInModal />
          </HStack>
        </VStack>
      </Box>
    </Box>
  )
}

export default Home
