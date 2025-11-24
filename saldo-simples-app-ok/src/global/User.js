let userId = null;
let userToken = '';
let isLogged = false;

export const setUser = (id, token, logged = true) => {
  userId = id;
  userToken = token;
  isLogged = logged;
}

export const getUser = () => ({
  userId,
  userToken,
  isLogged,
});