import axios from 'axios'
import { useEffect, useState } from 'react'
import { Rooms } from '../rooms'

interface Room {
    id: string
    name: string
    language: string
    owner: string
}

interface State {
    rooms: Room[] | [],
    isLoading: boolean,
    error: string
}

const useGetRooms = () => {
    const [state, setState] = useState<State>({
        rooms: [],
        isLoading: true,
        error: '',
      })
    
      const getRooms = async () => {
        try {
          const rooms = await Rooms.getUserRooms()
          setState({ rooms: rooms as unknown as Room[], isLoading: false, error: '' })
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setState({ rooms: [], isLoading: false, error: error.message })
          }
        }
      }
    
      useEffect(() => {
        getRooms().then((r) => r)
      }, [])
    
      return state
}

export default useGetRooms
