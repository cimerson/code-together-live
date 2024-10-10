import { Routes, Route, Navigate } from 'react-router-dom'

import { Flex } from '@chakra-ui/react'

import Home from './pages/Home'
import Rooms from './pages/Rooms'
import CodePlayground from './pages/CodePlayground'
import RequireAuth from './components/RequireAuth'


const App = () => {

  return (
    <Flex h='100vh' p={8}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/rooms' element={<Rooms />} />
        <Route path='/room/:roomId' element={<CodePlayground />} />
        <Route path='*' element={<Navigate to='.' replace />} />
      </Routes>
    </Flex>
  )
}

export default App
