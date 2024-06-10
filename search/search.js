const searchTypeSelect = document.querySelector("#searchTypeSelect");
const categorySelectLabel = document.querySelector("#categorySelectLabel");
const categorySelect = document.querySelector("#categories");
const productGrid = document.querySelector("#productGrid");

let categories = [];
let products = [];

async function fetchProducts() {
  try {
    let response = await fetch("http://localhost:4000/products");
    let data = await response.json();
    products = data;
    renderProductGrid(products);
  } catch (error) {
    console.error(error);
  }
}

async function fetchCategories() {
  try {
    let response = await fetch("http://localhost:4000/categories");
    let data = await response.json();
    categories = data;
    loadcategorySelect();
  } catch (error) {
    console.error(error);
  }
}

function loadcategorySelect() {
  categorySelect.innerText = '<option value="">Select a category</option>';
  for (let category of categories) {
    let option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  }
}

function renderProductGrid(products) {
  productGrid.innerText = "";
  let gridContainer = document.createElement("div");
  gridContainer.classList.add("grid-container");

  for (let product of products) {
    let productCard = document.createElement("div");
    productCard.classList.add("product-card");

    let productImage = document.createElement("img");
    productImage.src = product.imageUrl;
    productImage.alt = product.name;

    let productInfo = document.createElement("div");
    productInfo.classList.add("product-info");

    let productName = document.createElement("h4");
    productName.textContent = product.name;

    let productPrice = document.createElement("p");
    productPrice.textContent = `Price: $${product.unitPrice.toFixed(2)}`;

    let productStock = document.createElement("p");
    productStock.textContent = `In Stock: ${product.unitsInStock}`;

    let productDetailsLink = document.createElement("a");
    productDetailsLink.href = `details.html?id=${product.id}`;
    productDetailsLink.textContent = "See Details";
    productDetailsLink.style.display = "inline-block";
    productDetailsLink.style.padding = "10px 20px";
    productDetailsLink.style.border = "none";
    productDetailsLink.style.borderRadius = "5px";
    productDetailsLink.style.backgroundColor = "#8d5e44";
    productDetailsLink.style.color = "#ffffff";
    productDetailsLink.style.cursor = "pointer";
    productDetailsLink.style.textDecoration = "none";
    // productDetailsLink.classList.add("button-link");

    productInfo.appendChild(productName);
    productInfo.appendChild(productPrice);
    productInfo.appendChild(productStock);
    productInfo.appendChild(productDetailsLink);

    productCard.appendChild(productImage);
    productCard.appendChild(productInfo);

    gridContainer.appendChild(productCard);
  }

  productGrid.appendChild(gridContainer);
}

searchTypeSelect.addEventListener("change", onSearchTypeChange);

function onSearchTypeChange(event) {
  let selectedSearchType = event.target.value;

  if (selectedSearchType === "category") {
    categorySelectLabel.style.display = "inline";
    categorySelect.style.display = "inline";
    fetchCategories();
  } else if (selectedSearchType === "viewAll") {
    categorySelectLabel.style.display = "none";
    categorySelect.style.display = "none";
    fetchProducts();
  } else {
    categorySelectLabel.style.display = "none";
    categorySelect.style.display = "none";
    productGrid.innerText = "";
  }
}

categorySelect.addEventListener("change", async (event) => {
  let categoryId = event.target.value;

  try {
    if (categoryId) {
      let response = await fetch(
        `http://localhost:4000/products?categoryId=${categoryId}`
      );
      let data = await response.json();

      products = data;
      renderProductGrid(products);
    } else {
      productGrid.innerText = "";
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});

fetchCategories();