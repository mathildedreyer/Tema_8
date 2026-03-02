"use strict";

const productContainer = document.querySelector(".product_list_container");

fetch("https://kea-alt-del.dk/t7/api/products")
  .then((response) => response.json())
  .then((data) => {
    showProducts(data);
  })
  .catch((err) => console.log("Fetch fejl:", err));

function showProducts(productsArr) {
  productContainer.innerHTML = "";

  productsArr.forEach((product) => {
    const soldoutHTML = product.soldout
      ? `<p class="soldoutTxt color_me_black_and_red">SOLD OUT</p>`
      : "";

    // Brug API-data i stedet for hardcoded
    const title =
      product.productdisplayname || product.articletype || "Produkt";
    const subtitle = `${product.articletype || ""}${product.brandname ? " | " + product.brandname : ""}`;

    // Pris
    const price = product.price ?? "";

    // Hvis du senere får discount-felter, kan du sætte dem på her:
    // Lige nu skjuler vi discount-boksen, så den ikke står tom.
    const discountHTML = "";

    productContainer.innerHTML += `
      <article class="smallProduct ${product.soldout ? "is-soldout" : ""}">
        <img
          src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
          alt="${title}"
        />

        ${soldoutHTML}

        <h3>${title}</h3>
        <p class="subtle">${subtitle}</p>

        <p class="price">DKK <span>${price}</span>,-</p>

        ${discountHTML}

        <a href="product.html?id=${product.id}">Read More</a>
      </article>
    `;
  });
}
