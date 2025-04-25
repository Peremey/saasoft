<template>
    <form class="users">
        <div class="users--add add">
            <div class="add--wrapper">
                <h3 class="add--label">
                    Учетные записи
                </h3>
                <div class="add--btn">
                    <n-button @click="addUserRow">+</n-button>
                </div>
            </div>
        </div>

        <Note />

        <div class="users--list">
            <div class="users--header" v-for="header in headers">
                {{ header }}
            </div>
            <div class="users--header"></div>
            <template v-for="(user, index) in users" :key="index">
                <div class="users--item">
                    <n-input placeholder="" type="textarea" :autosize="{ minRows: 1 }" v-model:value="user.mark"
                        :class="{ 'error': errors.has('mark' + index) }" @blur="updateMark($event, index)" />
                </div>
                <div class="users--item">
                    <n-select v-model:value="user.type" @update:value="updateType($event, index)"
                        :options="userTypes" />
                </div>
                <div class="users--item" :class="{ 'users--item-ldap': user.type == TypeUserEnum.LDAP }">
                    <n-input type="text" placeholder="" v-model:value="user.login" class="login--input"
                        :class="{ 'error': errors.has('login' + index) }" @blur="updateLogin($event, index)" />
                </div>
                <div class="users--item" v-if="user.type == TypeUserEnum.Local">
                    <n-input type="password" show-password-on="mousedown" placeholder="" v-model:value="user.password"
                        :class="{ 'error': errors.has('password' + index) }" @blur="updatePassword($event, index)" />
                </div>
                <div class="users--item">
                    <n-button @click="deleteUser(index)" :bordered="false">
                        <iDelete />
                    </n-button>
                </div>
            </template>
        </div>
    </form>
</template>
<script setup lang="ts">
import { NButton, NInput, NSelect } from 'naive-ui'
import Note from '@/components/Note.vue'
import iDelete from '@/components/icon/iDelete.vue'

import { IUserField } from '@/BL/IUserField';
import { TypeUserEnum } from '@/BL/enums';
import { v } from '@/BL/v'
import { ref } from 'vue';

const headers = ["Метки", "Тип записи", "Логин", "Пароль"]
const userTypes = Object.values(TypeUserEnum).map(e => { return { label: e, value: e } })
const props = defineProps<{
    users: IUserField[]
}>()

const users = ref<IUserField[]>(props.users.map(user => new IUserField(user)))

const emit = defineEmits<{
    (e: "deleteUser", index: number): void
    (e: "updateUser", index: number, user: IUserField): void
}>()

const addUserRow = () => {
    if (!users.value.find(u => u.isEmpty))
        users.value.push(new IUserField())
    else
        alert("Сначала корректно заполните уже существующие поля")
}

const errors = ref(new Set())
const update = (e: Event | string, key: keyof IUserField, index: number, validate: (value: string) => boolean) => {
    const value = typeof e != 'string' ? (e.target as HTMLInputElement).value : e
    if (validate(value)) {
        if (!users.value[index].isEmpty) {
            emit("updateUser", index, users.value[index])
        }
        errors.value.delete(key + index)
    } else {

        errors.value.add(key + index)
    }
}

const updateMark = (e: Event, index: number) => {
    update(e, 'mark', index, (value) => v.maxLength(50, value))
}

const updateLogin = (e: Event, index: number) => {
    update(e, 'login', index, (value) => v.range(1, 100, value))
}

const updatePassword = (e: Event, index: number) => {
    update(e, 'password', index, (value) => v.range(1, 100, value))
}

const updateType = (e: Event, index: number) => {
    update(e, 'type', index, (value) => true)
}

const deleteUser = (index: number) => {
    users.value.splice(index, 1)
    if (props.users.length > index)
        emit('deleteUser', index)
}
</script>