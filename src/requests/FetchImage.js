const API_URL = "http://localhost:3000/api";

const FetchImage = (endpoint, jwt) => {
  const headers = new Headers({
    "content-type": "application/json"
  });

  if (jwt) {
    headers.append("Authorization", `Bearer ${jwt}`);
  }

  const request = new Request(`${API_URL}/${endpoint}`, {
    headers,
    method: "GET"
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

export default FetchImage;
