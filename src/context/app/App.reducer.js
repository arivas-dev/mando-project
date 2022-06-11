import { cloneDeep } from 'lodash'

import { updateLoadableData, updateLoadableMetaProps } from 'utils/state.utils'





export const appReducer = (state, action) => {
  const clone = cloneDeep(state)

  switch (action.type) {
    case 'UPDATE_USER_META_PROPS':
      updateLoadableMetaProps(clone.user, action.isLoading, action.error)
      break
    case 'UPDATE_USER_DATA':
      updateLoadableData(clone.user, action.user)
      break
    default:
      return state
  }

  return clone
}
