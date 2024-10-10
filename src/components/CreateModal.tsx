import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import * as yup from 'yup'

import {
  Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
  ModalOverlay, useDisclosure, FormControl, Input, FormErrorMessage, FormLabel,
  Select
} from '@chakra-ui/react'

import { Rooms } from '../apiCalls/rooms'
import { CODE_SNIPPETS, LANGUAGES } from '../utils/languages'


const schema = yup
  .object({
    name: yup.string().required('You must provide a name!'),
    language: yup.string().required('You must select a language!'),
  })
  .required()

interface FormData {
  name: string,
  language: string
}

const CreateModal = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onCrete = async (data: FormData) => {
    try {
      const room = await Rooms.createRoom(data)
      navigate(`/room/${room.id}`)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError('language', { type: 'custom', message: err.response.data.error })
        } else {
          setError('language', { type: 'custom', message: err.message })
        }
      }
    }
  }

  const onSubmit = (data: FormData) => {
    const language = data.language
    const code = CODE_SNIPPETS[language as keyof typeof CODE_SNIPPETS]
    const dataForCreate = {...data, code: code}
    onCrete(dataForCreate)
  }

  return (
    <>
      <Button colorScheme='teal' onClick={onOpen}>Create a new room</Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Create a room</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={Boolean(errors.name)} mb={4}>
                <FormLabel>Please enter room name</FormLabel>
                <Input
                  // bg={'gray.800'}
                  id='name'
                  placeholder='Name'
                  focusBorderColor={errors.name ? 'red.300' : ''}
                  {...register('name')}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.language)}>
                <FormLabel>Please select lang</FormLabel>
                <Select
                  id='language'
                  placeholder='Select option'
                  focusBorderColor={errors.language ? 'red.300' : ''}
                  {...register('language')}
                >
                  {LANGUAGES.map(language => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.language && errors.language.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button variant='ghost' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme='teal' isLoading={isSubmitting} type='submit'>Create</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateModal
