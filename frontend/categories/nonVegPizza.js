let products = document.querySelector("#products");
let renderArea = document.querySelector(".renderArea");
let ind_item = document.querySelector(".ind-item");




// Go To Cart button Event
document.querySelector("#gotoCart").addEventListener("click", () => {
  window.location.href = "../cart/cart.html";
})


// Go To Address Page
document.querySelector("#address").addEventListener("click", () => {
  window.location.href = "../address/address.html";
})


// Show User Address
async function showAddress() {
  let data = document.querySelector("#textAddress");
  let username = localStorage.getItem("username");
  try {
    let gettingAddress = await fetch("https://pizzabackend-rdbu.onrender.com/address/get", {
      method: "GET",
      headers: {
        "username": username
      }
    })
    let res = await gettingAddress.json();
    let pilup = res[0].street_no + "/" + res[0].house_no + " " + res[0].locality + " " + res[0].pincode;
    data.innerText = pilup.substring(0, 25) + " ..";
  } catch (error) {
    console.log(error);
  }
}
showAddress();





// Show UserName
function showUsername() {
  let showname = document.querySelector("#username");
  let name = localStorage.getItem("username");
  if (name == null) {
    document.querySelector("#logoutButton").style.display = "none";
    document.querySelector("#loginButton").style.display = "block";
  } else {
    document.querySelector("#logoutButton").style.display = "inline-block";
    document.querySelector("#loginButton").style.display = "none";
    showname.innerText = name;
    document.querySelector("#logoutButton").addEventListener("click", () => {
      localStorage.removeItem("username")
      localStorage.removeItem("Access_Token")
      window.location.href = "../login/userLogin.html";
    })
  }
}
showUsername();




// Fetching Product Data
fetchData();
async function fetchData() {
  try {
    let fetching = await fetch("https://pizzabackend-rdbu.onrender.com/products?category=nonveg_pizza")
    let data = await fetching.json();
    document.getElementById("LoadingDataDiv").style.display = "none";
    renderCardList(data);
  } catch (error) {
    console.log(error);
  }
}


// Main Div to Show the Products
function renderCardList(data) {
  renderArea.innerHTML = "";
  renderArea.innerHTML = `
      <div class="renderArea">
          ${data
      .map((item) => {
        let imgSrc = item.image;
        let price = item.price;
        let title = item.name;
        let description = item.description;
        let size = item.size;
        let category = item.category;
        let id = item._id;
        return getAsCard(imgSrc, price, title, description, size, category, id);
      })
      .join("")}
      </div>
  `;


  // Adding Add to Cart functionality
  let addToCart = document.querySelectorAll(".addtoCart");
  for (let addCart of addToCart) {
    addCart.addEventListener("click", (element) => {
      let username = localStorage.getItem("username");
      let id = element.target.dataset.id;
      addtocartFunc(username, id);
    })
  }
}


// Making Individual Product Cards
function getAsCard(imgSrc, price, title, description, size, category, id) {
  return `
    <div class="ind-item">
    <div class="item-top-img">
      <img src=${imgSrc} alt="image">
    </div>
    <div class="item-bottom-text">
      <p> &#8377 ${price}</p>
      <h4>${title}</h4>
      <p class="desc">${description.substring(0, 60) + "..."}</p>
      <hr>
      <span>Size</span>
      <br>
      <span class="showSize">${size}</span>
      <button class="addtoCart" data-category=${category} data-id=${id}>ADD TO CART</button>
    </div>
  </div>
    `;
}




// Add to Cart function
async function addtocartFunc(username, id) {
  try {
    let fetching = await fetch("https://pizzabackend-rdbu.onrender.com/cart/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ "username": username, "id": id })
    })
    let res = await fetching.json();
    shownotif(res[0].message);
  } catch (error) {
    shownotif("Error while Adding to Cart")
  }
}


function shownotif(data) {
  if (data == undefined) {
      data = "Error";
      let notify = document.querySelector("#notification>h2");
      setTimeout(() => {
          document.getElementById("notification").style.display = "none";
          notify.innerText = ""
      }, 3000);
      document.getElementById("notification").style.display = "block";
      notify.innerText = data;
  } else {
      let notify = document.querySelector("#notification>h2");
      setTimeout(() => {
          document.getElementById("notification").style.display = "none";
          notify.innerText = ""
      }, 2000);
      document.getElementById("notification").style.display = "block";
      notify.innerText = data;
  }
}