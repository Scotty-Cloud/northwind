// Get the dropdowns and results container
const typeDropdown = document.getElementById("type-dropdown");
const categoryDropdown = document.getElementById("category-dropdown");
const resultsContainer = document.getElementById("results");

// Add event listener to the first dropdown
typeDropdown.addEventListener("change", (e) => {
  const selectedType = e.target.value;

  // If "View All" is selected, display all items
  if (selectedType === "all") {
    displayAllItems();
  }
  // If "Categories" is selected, show the second dropdown
  else if (selectedType === "categories") {
    categoryDropdown.style.display = "block";
  }
});

// Add event listener to the second dropdown
categoryDropdown.addEventListener("change", (e) => {
  const selectedCategory = e.target.value;

  // Filter results based on the selected category
  if (selectedCategory === "fruits") {
    displayFruits();
  } else if (selectedCategory === "vegetables") {
    displayVegetables();
  } else if (selectedCategory === "all") {
    displayAllItems(); // Display all items if "View All" is selected
  }
});

// Function to display all items
function displayAllItems() {
  const allItems = [
    { name: "Apple", type: "fruit" },
    { name: "Carrot", type: "vegetable" }, // Fixed typo here
    { name: "Banana", type: "fruit" },
    { name: "Broccoli", type: "vegetable" },
    // Add more items here...
  ];

  resultsContainer.innerHTML = "";
  allItems.forEach((item) => {
    const itemHTML = `<p>${item.name} (${item.type})</p>`;
    resultsContainer.innerHTML += itemHTML;
  });
}

// Function to display fruits
function displayFruits() {
  const fruits = [
    { name: "Apple", type: "fruit" },
    { name: "Banana", type: "fruit" },
    { name: "Orange", type: "fruit" },
    // Add more fruits here...
  ];

  resultsContainer.innerHTML = "";
  fruits.forEach((item) => {
    const itemHTML = `<p>${item.name} (${item.type})</p>`;
    resultsContainer.innerHTML += itemHTML;
  });
}

// Function to display vegetables
function displayVegetables() {
  const vegetables = [
    { name: "Carrot", type: "vegetable" }, // Fixed typo here
    { name: "Broccoli", type: "vegetable" },
    { name: "Cauliflower", type: "vegetable" },
    // Add more vegetables here...
  ];

  resultsContainer.innerHTML = "";
  vegetables.forEach((item) => {
    const itemHTML = `<p>${item.name} (${item.type})</p>`;
    resultsContainer.innerHTML += itemHTML;
  });
}
