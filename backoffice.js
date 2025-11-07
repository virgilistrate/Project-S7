const getYearInFooter = function () {
  const footer = document.getElementById("year");
  footer.innerText = new Date().getFullYear(); // 2025
};

getYearInFooter();

const prodottiURL = "https://striveschool-api.herokuapp.com/api/product/";

const password =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmY4YmY0YmQ0NzAwMTU4NWIyMDQiLCJpYXQiOjE3NjI1MDg2ODMsImV4cCI6MTc2MzcxODI4M30.no_7X5qQv-3teDO_0DoJScUHVeb954SaUQYtwB1PKo0";

const url = location.search;
const allTheParameters = new URLSearchParams(url);
const id = allTheParameters.get("prodottoID");
fetch(prodottiURL, {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmY4YmY0YmQ0NzAwMTU4NWIyMDQiLCJpYXQiOjE3NjI1MDg2ODMsImV4cCI6MTc2MzcxODI4M30.no_7X5qQv-3teDO_0DoJScUHVeb954SaUQYtwB1PKo0",
  },
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error("Errore:", err));

class Prodotto {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

const form = document.getElementById("product-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("description");
  const brandInput = document.getElementById("brand");
  const imageUrlInput = document.getElementById("immagine");
  const priceInput = document.getElementById("price");

  const name = nameInput.value;
  const description = descriptionInput.value;
  const brand = brandInput.value;
  const imageUrl = imageUrlInput.value;
  const price = priceInput.value;

  const newProduct = new Prodotto(name, description, brand, imageUrl, price);
  console.log("NEwPRODUCT", newProduct);

  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmY4YmY0YmQ0NzAwMTU4NWIyMDQiLCJpYXQiOjE3NjI1MDg2ODMsImV4cCI6MTc2MzcxODI4M30.no_7X5qQv-3teDO_0DoJScUHVeb954SaUQYtwB1PKo0",
    },
    body: JSON.stringify(newProduct),
  })
    .then((res) => {
      if (res.ok) {
        alert("PRODOTTO SALVATO!");

        form.reset();
      } else {
        throw new Error(`Errore nella risposta del server: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log("PROBLEMA NEL SALVATAGGIO", err);
    });
});

const getProducts = function () {
  fetch(prodottiURL, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmY4YmY0YmQ0NzAwMTU4NWIyMDQiLCJpYXQiOjE3NjI1MDg2ODMsImV4cCI6MTc2MzcxODI4M30.no_7X5qQv-3teDO_0DoJScUHVeb954SaUQYtwB1PKo0",
    },
  })
    .then((res) => {
      console.log("RESPONSE", res);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          `Errore nella risposta ricevuta dal server: ${res.status}`
        );
      }
    })
    .then((arrayOfProducts) => {
      console.log("ARRAY OF PRODUCTS", arrayOfProducts);

      const row = document.getElementById("backoffice-row");
      arrayOfProducts.forEach((Prodotto) => {
        row.innerHTML += `
    <div class="col">
      <div class="card h-100 d-flex flex-column">
        <img src=${Prodotto.imageUrl}>
        <div class="card-body flex-grow-1">
          <h5 class="card-title">${Prodotto.name}</h5>
          <p class="card-text">${Prodotto.description}</p>
          <p class="card-text">${Prodotto.brand}</p>
          <p class="card-text">${Prodotto.price}$</p>
        </div>
        <div>
          <button class="btn btn-warning" onclick="editProduct('${Prodotto._id}')">
            MODIFICA PRODOTTO
          </button>
          <button class="btn btn-danger" onclick="deleteProduct('${Prodotto._id}')">
            ELIMINA PRODOTTO
          </button>
        </div>
      </div>
    </div>
  `;
      });
    })
    .catch((err) => {
      console.log("PROBLEMA", err);
    });
};

getProducts();

const deleteProduct = function (id) {
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

const editProduct = function (id) {
  location.assign("./backoffice.html?prodottoID=" + id);
};
