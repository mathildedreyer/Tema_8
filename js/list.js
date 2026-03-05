"use strict";

const params = new URLSearchParams(window.location.search);
const category = params.get("category");

const productContainer = document.querySelector(".product_list_container");

fetch(`https://kea-alt-del.dk/t7/api/products?category=${category}`)
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

    const title =
      product.productdisplayname || product.articletype || "Produkt";

    const subtitle = `${product.articletype || ""}${
      product.brandname ? " | " + product.brandname : ""
    }`;

    const price = Number(product.price ?? 0);
    const discount = Number(product.discount ?? 0);

    let priceHTML = `<p class="price">DKK <span>${price}</span>,-</p>`;

    if (discount > 0) {
      const newPrice = Math.round(price * (1 - discount / 100));

      priceHTML = `
        <p class="price price--discount">
          DKK <span class="oldPrice">${price}</span>,-
          <span class="newPrice">${newPrice}</span>,-
          <span class="discountBadge">-${discount}%</span>
        </p>
      `;
    }

    productContainer.innerHTML += `
      <article class="smallProduct ${product.soldout ? "is-soldout" : ""}">
        <img
          src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
          alt="${title}"
        />

        ${soldoutHTML}

        <h3>${title}</h3>
        <p class="subtle">${subtitle}</p>

        ${priceHTML}

        <a href="product.html?id=${product.id}">Read More</a>
      </article>
    `;
  });
}
