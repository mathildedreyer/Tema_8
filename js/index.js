const category_list = document.querySelector(".category_list_container");

fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((Response) => Response.json())
  .then((data) => {
    data.forEach((category) => {
      category_list.innerHTML += `<a href="productlist.html">${category.category}</a>`;
    });
  });
