import { Environment } from 'utils/Environment'

const joinPath = (path) => `${Environment.apiUrl}/${path}`

export const Endpoints = {
  login: joinPath('login'),
  user: {
    books: joinPath('book'),
    bookDetails: (id) => joinPath(`book/${id}`),
    requests: (userId) => joinPath(`loan/${userId}`),
    createRequest: joinPath('loan/loanBook'),
  },
  admin: {
    students: joinPath('user'),
    genres : joinPath('genre'),
    author : joinPath('author'),
    studentRequests: (id) => joinPath(`loan/${id}`),
    createUser: joinPath('user'),
    createBook: joinPath('book'),
    returnBook: (id) => joinPath(`loan/returnBook/${id}`),
  },
}
