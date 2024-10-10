import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// type Store = {
//   id: string
//   username: string
// //   inc: () => void
//   setId: (id: string) => void
//   setUsername: (name: string) => void
// }

// export const useStore = create<Store>()((set) => ({
//     id: '',
//     username: '',
//     setUsername: (name) => set(() => ({username: name})),
//     setId: (id) => set(() => ({id: id})),

// }))



export const useStore = create(
  persist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (set, get) => ({
      id: '',
    username: '',
    setUsername: (name: string) => set(() => ({username: name})),
    setId: (id: string) => set(() => ({id: id})),
    }),
    {
      name: 'food-storage', // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)