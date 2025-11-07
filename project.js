const getYearInFooter = function () {
  const footer = document.getElementById("year");
  footer.innerText = new Date().getFullYear();
};

getYearInFooter();

const prodottiURL = "https://striveschool-api.herokuapp.com/api/product/";

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

      const row = document.getElementById("products-row");
      arrayOfProducts.forEach((Prodotto) => {
        row.innerHTML += `
            <div class="col">
                <div class="card h-100 d-flex flex-column pb-2 px-1">
                    <img src=${Prodotto.imageUrl}>
                    <div class="card-body flex-grow-1 ">
                        <h5 class="card-title">${Prodotto.name}</h5>
                        <p class="card-text">${Prodotto.description}</p>
                        <p class="card-text">${Prodotto.brand}</p>
                        <p class="card-text ">${Prodotto.price}$</p>
                    
                        </div>
                        <a href="./details.html?prodottoID=${Prodotto._id}" class="btn btn-secondary">Vai ai dettagli</a>
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
