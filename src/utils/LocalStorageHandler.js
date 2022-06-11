
export class LocalStorageHandler {
    static _token = localStorage.getItem('token')
    static _user = localStorage.getItem('user')

    static get token(){
        return this._token || ''
    }

    static set token(jwt) {
        localStorage.setItem('token', jwt)
        this._token = jwt
    }

    static set user(userObj) {
        const stringified = JSON.stringify(userObj)
        this._user = stringified
        localStorage.setItem('user', stringified)
    }

    static get user() {
        if (this._user) {
            return JSON.parse(this._user) || {}
        }

        return null
    }

    static clearToken() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this._token = null
        this._user = null
    }
}
