import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, 
  ModalOverlay, useDisclosure, FormControl, Input, FormErrorMessage, FormLabel } from '@chakra-ui/react'


const schema = yup
  .object({
    id: yup.string().required('You must have ID to enter!'),
  })
  .required()

interface FormData {
  id: string
}

const JoinModal = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: FormData) => {

    navigate(`/room/${data.id}`)
  }

  return (
    <>
      <Button variant='outline' colorScheme='teal' onClick={onOpen}>Join</Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Others are waiting...</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={Boolean(errors.id)}>
                  <FormLabel>Please enter the ID</FormLabel>
                <Input
                  // bg={'gray.800'}
                  id='id'
                  placeholder='ID'
                  focusBorderColor={errors.id ? 'red.300' : ''}
                  {...register('id')}
                />
                <FormErrorMessage>
                  {errors.id && errors.id.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button variant='ghost' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme='teal' isLoading={isSubmitting} type='submit'>Enter</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default JoinModal
