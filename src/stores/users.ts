import { ref } from 'vue'
import { defineStore } from 'pinia'
import { load, save } from './storage'
import { IUserField } from '@/BL/IUserField'

export const useUsersStore = defineStore('users', () => {
  const users = ref<IUserField[]>([])

  const loadUsers = () => {
    return load("users")
  }
  const saveUsers = () => {
    save("users", users.value)
  }

  const init = () => {
    if (users.value.length == 0) {
      const ls = loadUsers()
      if (ls != null)
        users.value = (<Array<any>>ls).map(el => new IUserField(el))
    }
  }

  const addUser = () => {
    users.value.push(new IUserField())
  }

  const deleteUser = (index: number) => {
    users.value.splice(index, 1)
    saveUsers()
  }

  const updateUser = (index: number, user: IUserField) => {

    if (users.value.length <= index) {
      addUser()
    }
    users.value[index] = user
    saveUsers()
  }

  return { users, saveUsers, init, deleteUser, updateUser }
})
