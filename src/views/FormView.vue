<template>
  <FormFields :users="sUsers.users" @deleteUser="deleteUser" @updateUser="updateUser" />
</template>

<script setup lang="ts">
import type { IUserField } from '@/BL/IUserField';
import FormFields from '@/components/FormFields.vue';
import { useUsersStore } from '@/stores/users';
const sUsers = useUsersStore()
sUsers.init()

const deleteUser = (index: number) => {
  sUsers.deleteUser(index)
}

const updateUser = (index: number, user: IUserField) => {
  sUsers.updateUser(index, user)
}

</script>

<style lang="css">
@import '@/assets/users-form.css';
</style>