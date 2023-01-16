import create from 'zustand'

const useLoggedUserStore = create((set) => ({
  user: null,
  changeUser: (user) => set({ user: user })
}))

const useRequestStore = create((set) => ({
  request: {},
  setRequest: (request) => set({ request: request })
}))

export {useLoggedUserStore , useRequestStore}
