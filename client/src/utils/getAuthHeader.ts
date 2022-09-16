const getAuthHeader = () => {
  const userData = localStorage.getItem('persist:root');
  const user = userData && JSON.parse(userData).user;
  const token = JSON.parse(user)?.accessToken;

  return token;
};

export default getAuthHeader;
