document.addEventListener("DOMContentLoaded", function() {
	// Get the necessary elements from the DOM
const addButton = document.querySelector(".add-button");
const searchBar = document.querySelector(".search-bar");
const flexibleDiv = document.querySelector(".flexible-div");
function addDismissButtonListener(button) {
  button.addEventListener("click", removeProduct);
}

 function deleteFromRemainList(productName) {
        const boughtProductItems = document.querySelectorAll(".second2 .product-item");
        boughtProductItems.forEach((item) => {
            if (item.textContent.includes(productName)) {
                item.remove();
            }
        });
    }

// Function to create a new product element and add it to the list
function addProduct() {
  // Get the product name from the input field
  const productName = searchBar.value;
   // Check if the product name is empty
  if (productName === "") {
    alert("Некоректна назва продукта");
    return;
  }

  // Check if the product name already exists
  const existingProductNames = document.querySelectorAll(".name");
  for (const existingName of existingProductNames) {
    if (existingName.textContent === productName) {
      alert("Такий продукт вже існує");
      return;
    }
  }

  // Create a new div element for the product
  const newDiv = document.createElement("div");
  newDiv.className = "first";

  // Create the HTML structure for the product div
  newDiv.innerHTML = `
    <div class="btns">
      <div class="name">${productName}</div>
      <div class="centerBtns">
        <button type="button" class="addBtn" data-tooltip="Tooltip"><span class="s">+</span></button>
        <div class="indicator"><span class="quantity">1</span></div>
        <button type="button" class="removeBtn" data-tooltip="Tooltip"><span class="s">-</span></button>
      </div>
      <div class="rightBtns">
        <button type="button" class="buyBtn" data-tooltip="Tooltip"><span class="s">Куплено</span></button>
        <button type="button" class="dismissBtn" data-tooltip="Tooltip">x</button>
      </div>
    </div>
  `;
  const productNameDiv = newDiv.querySelector(".name");
productNameDiv.addEventListener("click", handleProductNameClick);
  
  const newSpan = document.createElement("span");
  newSpan.className = "product-item";
  
  newSpan.innerHTML = `${productName}<span class="amount">1</span>`;
    const second2Div = document.querySelector(".second2");
  second2Div.appendChild(newSpan);

  // Append the new product div to the flexible div
  flexibleDiv.appendChild(newDiv);

  // Clear the input field and focus on it
  searchBar.value = "";
  searchBar.focus();
    const dismissButton = newDiv.querySelector(".dismissBtn");
  addDismissButtonListener(dismissButton);
attachButtonListeners();
}


// Add an event listener to the add button
addButton.addEventListener("click", addProduct);



// Function to remove the product element from the list
function removeProduct(event) {
	
  const product = event.target.closest(".first");
    const productNameSpan = product.querySelector(".name").textContent;
  deleteFromRemainList(productNameSpan);
  product.remove();
}

// Add event listeners to all "dismissBtn" buttons
const dismissButtons = document.querySelectorAll(".dismissBtn");
dismissButtons.forEach((button) => {
  button.addEventListener("click", removeProduct);
});



function handleBuyButtonClick() {
  // Get the parent element of the buy button
  const product = this.parentElement.parentElement;

  // Change the text decoration of the product name to line-through
  const productName = product.querySelector(".name");
  productName.style.textDecoration = "line-through";

  // Hide the addBtn, removeBtn, and dismissBtn
  const addBtn = product.querySelector(".addBtn");
  addBtn.style.visibility = "hidden";
  const removeBtn = product.querySelector(".removeBtn");
  removeBtn.style.visibility = "hidden";
  const dismissBtn = product.querySelector(".dismissBtn");
  dismissBtn.style.display = "none";

  // Change the buyBtn text and class
  this.textContent = "Не куплено";
  this.removeAttribute("class");
  this.classList.add("notBought");
  const newSpan = document.createElement("span");
  newSpan.className = "bought-product-item";
    const quantitySpan = product.querySelector(".quantity");
  let quantity = parseInt(quantitySpan.textContent);
  newSpan.innerHTML = `${productName.innerHTML}<span class="amount">${quantity}</span>`;
    const fourth2Div = document.querySelector(".fourth2");
  fourth2Div.appendChild(newSpan);
   const productNameSpan = product.querySelector(".name").textContent;
  deleteFromRemainList(productNameSpan);
}

function handleNotBoughtButtonClick() {
  // Get the parent element of the notBought button
  const product = this.parentElement.parentElement;

  // Remove the line-through text decoration from the product name
  const productName = product.querySelector(".name");
  productName.style.textDecoration = "none";

  // Show the addBtn, removeBtn, and dismissBtn
  const addBtn = product.querySelector(".addBtn");
  addBtn.style.visibility = "visible";
  const removeBtn = product.querySelector(".removeBtn");
  removeBtn.style.visibility = "visible";
  const dismissBtn = product.querySelector(".dismissBtn");
  dismissBtn.style.display = "block";

  // Change the notBought button text and class
  this.textContent = "Куплено";
  this.removeAttribute("class");
  this.classList.add("buyBtn");
    const newSpan = document.createElement("span");
  newSpan.className = "product-item";
      const quantitySpan = product.querySelector(".quantity");
  let quantity = parseInt(quantitySpan.textContent);
  newSpan.innerHTML = `${productName.innerHTML}<span class="amount">${quantity}</span>`;
    const second2 = document.querySelector(".second2");
  second2.appendChild(newSpan);

  // Remove the product's span from the fourth2 div
  const productNameSpan = product.querySelector(".name");
  const boughtProductItems = document.querySelectorAll(".fourth2 .bought-product-item");
  boughtProductItems.forEach((item) => {
    if (item.textContent.includes(productNameSpan.textContent)) {
      item.remove();
    }
  });
}


flexibleDiv.addEventListener("click", function(event) {
  const buyButton = event.target.closest(".buyBtn");
  const notBoughtButton = event.target.closest(".notBought");

  if (buyButton) {
    handleBuyButtonClick.call(buyButton);
  } else if (notBoughtButton) {
    handleNotBoughtButtonClick.call(notBoughtButton);
  }
});

function attachButtonListeners() {
  const addButtons = document.querySelectorAll(".addBtn");
  const removeButtons = document.querySelectorAll(".removeBtn");

  addButtons.forEach(function (button) {
    // Remove existing event listener
    button.removeEventListener("click", handleAddButtonClick);

    // Attach new event listener
    button.addEventListener("click", handleAddButtonClick);
  });

  removeButtons.forEach(function (button) {
    // Remove existing event listener
    button.removeEventListener("click", handleRemoveButtonClick);

    // Attach new event listener
    button.addEventListener("click", handleRemoveButtonClick);
  });
}
function handleAddButtonClick() {
  const indicator = this.parentNode.querySelector(".indicator");
  const removeBtn = indicator.parentNode.querySelector(".removeBtn");
  const quantitySpan = indicator.querySelector(".quantity");
  let quantity = parseInt(quantitySpan.textContent);
  if(quantity < 2){
    removeBtn.style.opacity = "1";
  }
  quantity++;
  quantitySpan.textContent = quantity;

  const productName = this.parentNode.parentNode.querySelector(".name").textContent;
  updateAmountSpan(productName, quantity);
}
function handleRemoveButtonClick() {
  const indicator = this.parentNode.querySelector(".indicator");
  const removeBtn = indicator.parentNode.querySelector(".removeBtn");
  const quantitySpan = indicator.querySelector(".quantity");
  let quantity = parseInt(quantitySpan.textContent);
  if (quantity > 1) {
    quantity--;
    if(quantity === 1)  removeBtn.style.opacity = "0.3";
    quantitySpan.textContent = quantity;

    const productName = this.parentNode.parentNode.querySelector(".name").textContent;
    updateAmountSpan(productName, quantity);
  }else{
  }
}


  function updateAmountSpan(productName, quantity) {
    const amountSpans = document.querySelectorAll(".amount");
    amountSpans.forEach(function(amountSpan) {
      if (amountSpan.previousSibling.textContent === productName) {
        amountSpan.textContent = quantity;
      }
    });
  }
   attachButtonListeners();
   
 function handleProductNameClick() {
  // Get the current product name and its parent element
  const productName = this.innerText;
  const quantity = this.parentNode.querySelector(".quantity").textContent;
  const parentElement = this.parentElement;

  // Create an input field and set its initial value to the product name
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = productName;
  inputField.style.height = "30px";
  const centerBtns = this.parentNode.querySelector(".centerBtns");
  centerBtns.style.left = "-60px";

  // Save the previous product name to compare later
  const previousName = productName;

  // Replace the product name div with the input field
  parentElement.replaceChild(inputField, this);

  // Set focus on the input field
  inputField.focus();

  // Add an event listener to the input field to handle the name change
  inputField.addEventListener("blur", function () {
    // Get the new product name from the input field
    const newProductName = this.value;

    if (newProductName === "") {
      alert("Некоректна назва продукта");
      return;
    }

    // Check if the product name already exists
    const existingProductNames = document.querySelectorAll(".name");
    for (const existingName of existingProductNames) {
      if (existingName.textContent === newProductName) {
        alert("Такий продукт вже існує");
        return;
      }
    }

    centerBtns.style.left = "0";

    // Create a new product name div
    const newProductNameDiv = document.createElement("div");
    newProductNameDiv.className = "name";
    newProductNameDiv.textContent = newProductName;

    // Replace the input field with the new product name div
    parentElement.replaceChild(newProductNameDiv, this);

    // Update the product name in the second2 div
    updateProductNameInSecond2(previousName, newProductName, quantity);
  });
}

function updateProductNameInSecond2(previousName, newProductName, quantity) {
    
  const productItems = document.querySelectorAll(".second2 .product-item");
  productItems.forEach((item) => {
    if (item.textContent.includes(previousName)) {
      item.innerHTML = `${newProductName}<span class="amount">${quantity}</span>`;
    }
  });
}

const ProductNames = document.querySelectorAll(".name");
    ProductNames.forEach((productNameDiv) =>
    productNameDiv.addEventListener("click", handleProductNameClick)
);

});