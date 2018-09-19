const jwt = "eyJhb...tzDGkCI";
const request = new Request("/api/private");
const headers = new Headers({
  Authorization: `Bearer ${jwt}`
});

fetch(request, {
  method: "GET",
  headers
})
  .then(response => response.json())
  .then(response => console.log("The api responded with:", response))
  .catch(error => console.error("Looks like something went wrong:", error));
