import { createContext, useReducer, useCallback } from 'react'
import { initLoadable } from 'utils/state.utils'
import { appReducer } from './App.reducer'
import { LocalStorageHandler } from 'utils/LocalStorageHandler'

import {firebaseApp} from "firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { messages } from 'constants/messages'


import { getFirestore, doc, collection, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);





const initialAppState = {
  login: () => Promise.resolve(''),
  user: initLoadable({
    email: '',
    id: -1,
    id_role: -1,
    name: '',
    role: 'user',
  }),
}

export const AppContext = createContext(initialAppState)

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState)
  const { user } = state

  async function getRol(uid) {
    const docuRef = await doc(firestore, `users/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data();
    return infoFinal;
  }

  async function setUserWithFirebaseAndRol(usuarioFirebase) {
    const rol = await getRol(usuarioFirebase.uid)
    return rol.role
  }

  const login = useCallback(
    async (email, password) => {
      dispatch({ type: 'UPDATE_USER_META_PROPS', isLoading: true })

      try {
        const response = await signInWithEmailAndPassword(auth, email, password)
        console.log("response", response);
        if (response) {
          const role = await setUserWithFirebaseAndRol(response.user);
          const { accessToken, ...user } = response.user

         
          LocalStorageHandler.token = accessToken
          LocalStorageHandler.user = {...user,role}
          // console.log("{ type: 'UPDATE_USER_DATA', user :{data : {...user,role}} }", { type: 'UPDATE_USER_DATA', user :{data : {...user,role}} });
          dispatch({ type: 'UPDATE_USER_DATA', user :  {...user,role} })
          return user
        }

      } catch (error) {
        console.log("error", error);
        const errorCode = error.code;

        dispatch({
          type: 'UPDATE_USER_META_PROPS',
          isLoading: false,
          error: messages.login[errorCode],
        })
        return messages.login[errorCode] || 'Error'
      }

    },
    [dispatch]
  )


  return (
    <AppContext.Provider value={{ user, login }}>
      {children}
    </AppContext.Provider>
  )
}
