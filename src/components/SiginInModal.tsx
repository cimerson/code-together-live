import { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import {
  Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
  ModalOverlay, useDisclosure, FormControl, Input, FormErrorMessage, FormLabel,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'

import { Authentications } from '../apiCalls/auth'



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

const SiginInModal = () => {

  const [show, setShow] = useState<boolean>(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onRegister = async (data: FormData) => {
    try {
      await Authentications.createUser(data)
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
    console.log(data)
    onRegister(data)
    onClose()
  }

  const onShow = () => setShow(!show)

  return (
    <>
      <Button variant='link' colorScheme='pink' onClick={onOpen}>Sign In</Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Register</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl p={4} isInvalid={Boolean(errors.username)}>
                <FormLabel>Please enter your credentials</FormLabel>
                <Input
                  id='userNamename'
                  placeholder='Username'
                  focusBorderColor={errors.username ? 'red.300' : ''}
                  {...register('username')}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl p={4} isInvalid={Boolean(errors.password)}>
                <InputGroup>
                  <Input
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
            </ModalBody>
            <ModalFooter>
              <Button variant='ghost' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme='teal' isLoading={isSubmitting} type='submit'>Register</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SiginInModal
