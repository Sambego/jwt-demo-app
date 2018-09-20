const API_URL = "http://localhost:3000/api";
const API_ENDPOINT = `${API_URL}/authenticate`;

const Authenticate = (username, password) => {
  const headers = new Headers({
    "content-type": "application/json"
  });

  const request = new Request(API_ENDPOINT, {
    headers,
    method: "POST",
    body: JSON.stringify({
      username,
      password
    })
  });

  return fetch(request).then(response => {
    if (response.status === 401) {
      return response
        .json()
        .then(error => Promise.reject({ ...response, message: error.error }));
    }

    return response.json();
  });
};

export default Authenticate;
