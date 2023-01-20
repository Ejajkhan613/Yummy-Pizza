let products = document.querySelector("#products");
let renderArea = document.querySelector("#itemList");
let ind_item = document.querySelector(".individualItem");



// Go To Address Page
document.querySelector("#changeAddress").addEventListener("click", () => {
  window.location.href = "../address/address.html";
})


// Showing username
showUsername();
function showUsername() {
  let data = localStorage.getItem("username");
  document.querySelector("#username").innerText = data;
}


// Show User Address
async function showAddress() {
  let data = document.querySelector("#addressShow");
  let username = localStorage.getItem("username");
  try {
    let gettingAddress = await fetch("http://localhost:4500/address/get", {
      method: "GET",
      headers: {
        "username": username
      }
    })
    let res = await gettingAddress.json();
    let pilup = res[0].first_name + " " + res[0].last_name + "\n" + "street - " + res[0].street_no + "\n" + "house - " + res[0].house_no + " \n" + "place - " + res[0].locality + ",  " + "pincode -" + res[0].pincode;
    data.innerText = pilup.substring(0, 90);
  } catch (error) {
    alert("error while getting your address");
  }
}
showAddress();





// Fetching Cart Data
fetchData();
async function fetchData() {
  let username = localStorage.getItem("username")
  try {
    let fetching = await fetch("http://localhost:4500/cart", {
      method: "GET",
      headers: {
        "username": username
      }
    })
    let data = await fetching.json();

    if (data.length == 0) {
      document.getElementById("showItem").style.display = "none";
      document.getElementById("noItem").style.display = "block";
    } else {
      document.getElementById("noItem").style.display = "none";
      document.getElementById("showItem").style.display = "block";
      renderCardList(data);
      renderPrice(data);
    }
  } catch (error) {
    console.log("Error while loading your CART Item's");
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
        let size = item.size || "";
        let category = item.category;
        let id = item._id;
        let username = item.username;
        let product_id = item.product_id;
        let quantity = item.quantity;
        return getAsCard(imgSrc, price, title, description, size, category, id, username, product_id, quantity);
      })
      .join("")}
      </div>
  `;

  // Increasing Item of Cart functionality
  let decreasing = document.querySelectorAll(".minus");
  for (let decrease of decreasing) {
    decrease.addEventListener("click", (element) => {
      let currentQuantity = +element.target.dataset.quantity;
      let id = element.target.dataset.id;
      let username = element.target.dataset.username;
      updateCart(currentQuantity - 1, id, username)
    })
  }


  // Increasing Item of Cart functionality
  let increasing = document.querySelectorAll(".plus");
  for (let increase of increasing) {
    increase.addEventListener("click", (element) => {
      let currentQuantity = +element.target.dataset.quantity;
      let id = element.target.dataset.id;
      let username = element.target.dataset.username;
      updateCart(currentQuantity + 1, id, username)
    })
  }

}


// Making Individual Product Cards
function getAsCard(imgSrc, price, title, description, size, category, id, username, product_id, quantity) {
  return `
  <div class="individualItem">
  <div class="leftside">
      <div class="imgSec">
          <img src=${imgSrc} alt="image">
      </div>
      <div class="description">
          <h4>${title}</h4>
          <p>${description}</p>
          <p class="sizeofitem">${size}</p>
      </div>
  </div>
  <div class="rightside">
      <p> &#8377 ${price}</p>
      <div class="changePrice">
          <div class="minus"><button data-quantity=${quantity} data-id=${id} data-username=${username} data-product_id=${product_id}>-</button></div>
          <div class="number"><span>${quantity}</span></div>
          <div class="plus"><button data-quantity=${quantity} data-id=${id} data-username=${username} data-product_id=${product_id}>+</button></div>
      </div>
  </div>
</div>
    `;
}




// Add to Cart function
async function updateCart(currentQuantity, id, username) {
  try {
    let fetching = await fetch("http://localhost:4500/cart/update", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ "username": username, "id": id, "quantity": currentQuantity })
    })
    let res = await fetching.json();
    fetchData();
  } catch (error) {
    console.log("Error while Adding to Cart")
  }
}




// Rendering Total Price

function renderPrice(data) {
  let total = document.querySelector("#subtotal>span>span");
  let grandTotal = document.querySelector("#total>span");
  let taxes = document.querySelector("#taxes>span")


  let calculateSubtotal = 0;
  for (let a = 0; a < data.length; a++) {
    calculateSubtotal = calculateSubtotal + (data[a].price * data[a].quantity);
  }
  let allTax = (calculateSubtotal + (calculateSubtotal * (18 / 100))) - calculateSubtotal;
  total.innerText = calculateSubtotal.toFixed(2);
  taxes.innerText = allTax.toFixed(2);
  grandTotal.innerText = (calculateSubtotal + (calculateSubtotal * (18 / 100))).toFixed(2);
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