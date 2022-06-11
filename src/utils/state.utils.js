export const createError = (message, name) => ({
  message,
  name,
})

export const initLoadable =(data) => ({
  data,
  error: null,
  isDirty: false,
  isLoading: false,
})

export const updateLoadableMetaProps = (
  loadable,
  isLoading,
  error = null
) => {
  loadable.isDirty = true
  loadable.isLoading = isLoading
  loadable.error = error
}

export const updateLoadableData = (loadable, data) => {
  updateLoadableMetaProps(loadable, false, null)
  loadable.data = data
}

export const shouldLoadData = (loadable) =>
  !loadable.isDirty && !loadable.isLoading && !loadable.error

export const hasSuccessfullyLoaded = (loadable) =>
  loadable.isDirty && !loadable.isLoading && !loadable.error
