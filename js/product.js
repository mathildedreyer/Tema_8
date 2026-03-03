"use strict";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const productContainer = document.querySelector("#productContainer");

if (!id) {
  productContainer.innerHTML = "<p>Mangler produkt-id i URL (fx ?id=1163).</p>";
} else {
  fetch(`https://kea-alt-del.dk/t7/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const title = data.productdisplayname || data.articletype || "Produkt";
      const brand = data.brandname || "Ukendt brand";
      const category = data.category || "Ukendt kategori";
      const type = data.articletype || "Ukendt type";

      const price = data.price ?? "";

      const hasDiscount =
        data.discountedPrice !== null &&
        data.discountedPrice !== undefined &&
        Number(data.discountedPrice) < Number(data.price);

      const saleLabelHTML = hasDiscount
        ? `<span class="saleLabel">Udsalg!</span>`
        : "";

      const soldoutBadgeHTML = data.soldout
        ? `<span class="badge badge--soldout">Sold out</span>`
        : "";

      productContainer.innerHTML = `
        <section class="product-page">
          <div class="product-page__media">
            <figure class="product-figure">
              <img
                src="https://kea-alt-del.dk/t7/images/webp/1000/${data.id}.webp"
                alt="${title}"
                class="productImage"
              />
              ${saleLabelHTML}
            </figure>
          </div>

          <div class="product-page__info">
            <dl class="product-specs">
              <div class="product-specs__row">
                <dt>Produkt</dt>
                <dd>${title}</dd>
              </div>

              <div class="product-specs__row">
                <dt>Type</dt>
                <dd>${type}</dd>
              </div>

              <div class="product-specs__row">
                <dt>Kategori</dt>
                <dd>${category}</dd>
              </div>

              <div class="product-specs__row">
                <dt>Mærke</dt>
                <dd>${brand}</dd>
              </div>
            </dl>
          </div>

          <aside class="buy-box" aria-label="Køb produkt">
            <h2 class="buy-box__title">${title}</h2>
            <p class="buy-box__meta">${type} | ${brand}</p>

            ${data.soldout ? `<p class="buy-box__meta"><strong>Sold out</strong></p>` : ""}

            <p class="buy-box__price">
              ${
                hasDiscount
                  ? `DKK <s>${data.price}</s> <strong>${data.discountedPrice}</strong>,-`
                  : `DKK ${price},-`
              }
            </p>

            <label class="buy-box__label" for="size">Choose a size</label>
            <div class="buy-box__row">
              <select id="size" class="buy-box__select">
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div>

            <button class="buy-box__btn" type="button" ${data.soldout ? "disabled" : ""}>
              ${data.soldout ? "Udsolgt" : "Add to basket"}
            </button>
          </aside>
        </section>
      `;
    })
    .catch((error) => {
      console.log("Fejl:", error);
      productContainer.innerHTML = "<p>Kunne ikke hente produktet.</p>";
    });
}
