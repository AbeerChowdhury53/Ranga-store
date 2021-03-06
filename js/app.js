const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) =>showProducts(data));
};

// 
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h5>${product.title}</h5>
      <p>Category: ${product.category}</p>
      <h4>Price: $ ${product.price}</h4>
      <h4>Rating:  ${product.rating.rate}</h4>
      <h4>Number of Rating:  ${product.rating.count}</h4>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>

      

      <button onclick="modalValue(${product.price})" id="details-btn" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      Details
    </button>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// create add to cart function
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal()
};


// set modal value
const modalValue = (price) => {
  document.getElementById('modalPrice').innerText= price
}


const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element)   // Fix here  parseInt(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText =parseFloat(total).toFixed(2) // Fix here Math.round(total);
  return parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2) // Fix here Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
   const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
    document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);    // Fix here grandTotal;
};
