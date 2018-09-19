const jwt = "eyJhb...tzDGkCI";
const headers = new Headers({
  Authorization: `Bearer ${jwt}`
});
const request = new Request("/api/private", {
  method: "GET",
  headers
});

fetch(request)
  .then(response => response.json())
  .then(response => console.log("The api responded with:", response))
  .catch(error => console.error("Looks like something went wrong:", error));
