import { TypeUserEnum } from "./enums"

export class IUserField {
    _mark: Array<string> = []
    _type: TypeUserEnum = TypeUserEnum.Local
    login: string = ""
    _pswd: string | null = ""

    constructor(user?: IUserField) {
        if (user)
            Object.assign(this, user)
    }

    get isEmpty() {
        return this.login.trim() == "" || (this._type == TypeUserEnum.Local && (this._pswd == "" || this._pswd == null))
    }

    get mark() {
        return this._mark.join(";")
    }

    set mark(data: string) {
        if (data.trim() == "")
            this._mark = []
        else
            this._mark = data.split(";")
    }

    get password() {
        return this._pswd == null ? "" : this._pswd
    }

    set password(value: string | null) {
        this._pswd = this._type == TypeUserEnum.LDAP ? null : value
    }

    get type() {
        return this._type
    }

    set type(value: TypeUserEnum) {
        this._type = value
        this.password = this._pswd
    }
}

