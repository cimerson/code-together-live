import axios from 'axios'
import { useEffect, useState } from 'react'
import { Rooms } from '../rooms'

interface Room {
    id: string
    name: string
    language: string
    owner: string
    code: string
}

interface State {
    room: Room | undefined,
    isLoading: boolean,
    error: string
}

const useGetRoom = (roomId: string) => {
    const [state, setState] = useState<State>({
        room: undefined,
        isLoading: true,
        error: '',
      })
    
      const getRoom = async () => {
        try {
          const rooms = await Rooms.getRoomById(roomId)
          setState({ room: rooms as unknown as Room, isLoading: false, error: '' })
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setState({ room: undefined, isLoading: false, error: error.message })
          }
        }
      }
    
      useEffect(() => {
        getRoom().then((r) => r)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
    
      return state
}

export default useGetRoom
