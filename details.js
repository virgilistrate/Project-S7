const getYearInFooter = function () {
  const footer = document.getElementById("year");
  footer.innerText = new Date().getFullYear();
};

getYearInFooter();

const url = location.search;
console.log(url);
const allTheParameters = new URLSearchParams(url);
const id = allTheParameters.get("prodottoID");
console.log("ID", id);

const prodottiURL = "https://striveschool-api.herokuapp.com/api/product/";

const getDetails = function () {
  fetch(prodottiURL + "/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmY4YmY0YmQ0NzAwMTU4NWIyMDQiLCJpYXQiOjE3NjI1MDg2ODMsImV4cCI6MTc2MzcxODI4M30.no_7X5qQv-3teDO_0DoJScUHVeb954SaUQYtwB1PKo0",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((productDetails) => {
      console.log("DETTAGLI PRODOTTO", productDetails);

      document.getElementById("name").innerText = productDetails.name;
      document.getElementById("description").innerText =
        productDetails.description;
      document.getElementById("brand").innerText = productDetails.brand;
      const imgTag = document.getElementById("immagine");
      imgTag.src = productDetails.imageUrl;

      document.getElementById("price").innerText = productDetails.price + "€";
    })
    .catch((err) => {
      console.log("ERRORE NEL RECUPERO DETTAGLI", err);
      document.getElementById("name").innerText = err;
    });
};

getDetails();

const deleteProduct = function () {
  fetch(prodottiURL + "/" + id, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmY4YmY0YmQ0NzAwMTU4NWIyMDQiLCJpYXQiOjE3NjI1MDg2ODMsImV4cCI6MTc2MzcxODI4M30.no_7X5qQv-3teDO_0DoJScUHVeb954SaUQYtwB1PKo0",
    },
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        alert("PRODOTTO ELIMINATO!");

        location.assign("./project.html");
      } else {
        throw new Error(`problema nella response: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log("ERRORE IN ELIMINAZIONE", err);
    });
};

const editProduct = function () {
  location.assign("./backoffice.html?prodottoID=" + id);
};
