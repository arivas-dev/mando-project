export class Environment {
    static _apiUrl = process.env.REACT_APP_API_URL
  
    static get apiUrl() {
      if (!this._apiUrl) {
        throw new Error('Api url not provided.')
      }
  
      return this._apiUrl
    }
  }
  