type ValueOf<T> = T[keyof T]

export const TypeUserEnum = {
    LDAP: "LDAP", Local: "Локальная"
} as const
export type TypeUserEnum = ValueOf<typeof TypeUserEnum>