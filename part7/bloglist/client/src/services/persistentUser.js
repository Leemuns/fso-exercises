export const getUser = () => {
  return JSON.parse(localStorage.getItem('loggedUser') || 'null')
}

export const saveUser = (user) => {
  window.localStorage.setItem('loggedUser', JSON.stringify(user))
}

export const removeUser = () => {
  window.localStorage.removeItem('loggedUser')
}

export default { getUser, saveUser, removeUser }
