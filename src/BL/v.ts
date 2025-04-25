export class v {
    static maxLength(l: number, value: string) {
        return value.trim().length <= l
    }

    static required(value: string) {
        return value.trim() != ""
    }

    static range(min: number, max: number, value: string) {
        value = value.trim()
        return value.length >= min && value.length <= max
    }
}