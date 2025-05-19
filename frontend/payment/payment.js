let products = document.querySelector("#products");
let renderArea = document.querySelector("#itemList");
let ind_item = document.querySelector(".individualItem");




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
    let gettingAddress = await fetch("https://pizzabackend-rdbu.onrender.com/address/get", {
      method: "GET",
      headers: {
        "username": username
      }
    })
    let res = await gettingAddress.json();
    let pilup = res[0].first_name + " " + res[0].last_name + "\n" + "street - " + res[0].street_no + "\n" + "house - " + res[0].house_no + " \n" + "place - " + res[0].locality + ",  " + "pincode -" + res[0].pincode;
    data.innerText = pilup.substring(0, 90);
  } catch (error) {
    console.log("error while getting your address");
  }
}
showAddress();





// Fetching Product Data
fetchData();
async function fetchData() {
  let username = localStorage.getItem("username")
  try {
    let fetching = await fetch("https://pizzabackend-rdbu.onrender.com/cart", {
      method: "GET",
      headers: {
        "username": username
      }
    })
    let data = await fetching.json();

    if (data.length == 0) {

    } else {
      renderPrice(data);
    }
  } catch (error) {
    console.log("Error while loading your Total Price");
  }
}




// Rendering Total Price
function renderPrice(data) {
  let total = document.querySelector("#subtotal>span>span");
  let grandTotal = document.querySelector("#total>span>span");
  let taxes = document.querySelector("#taxes>span>span");
  let discountApplied = sessionStorage.getItem("discount") || 0;
  let discount = document.querySelector("#discounts>span>span");

  let calculateSubtotal = 0;
  for (let a = 0; a < data.length; a++) {
    calculateSubtotal = calculateSubtotal + (data[a].price * data[a].quantity);
  }
  calculateSubtotal = calculateSubtotal - (+discountApplied);
  let allTax = (calculateSubtotal + (calculateSubtotal * (18 / 100))) - calculateSubtotal;
  discount.innerText = +discountApplied;
  total.innerText = calculateSubtotal.toFixed(2);
  taxes.innerText = allTax.toFixed(2);
  grandTotal.innerText = (calculateSubtotal + (calculateSubtotal * (18 / 100))).toFixed(2);
}









// To Show Notifications
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


document.querySelector("#leftTop>button").addEventListener("click", () => {
  window.location.href = "../cart/cart.html"
})


function delivery() {
  document.getElementById("creditCard").style.display = "none";
  document.getElementById("debitCard").style.display = "none";
  document.getElementById("paymentDone").style.display = "none";
  document.getElementById("noItem").style.display = "block";
}
delivery();


document.querySelector("#cash").addEventListener("click", () => {
  document.getElementById("creditCard").style.display = "none";
  document.getElementById("debitCard").style.display = "none";
  document.getElementById("paymentDone").style.display = "none";
  document.getElementById("noItem").style.display = "block";
});


document.querySelector("#creditCardButton").addEventListener("click", () => {
  document.getElementById("creditCard").style.display = "block";
  document.getElementById("debitCard").style.display = "none";
  document.getElementById("paymentDone").style.display = "none";
  document.getElementById("noItem").style.display = "none";
})


document.querySelector("#debitCardButton").addEventListener("click", () => {
  document.getElementById("creditCard").style.display = "none";
  document.getElementById("debitCard").style.display = "block";
  document.getElementById("paymentDone").style.display = "none";
  document.getElementById("noItem").style.display = "none";
})








// confirming Order through Cash On Delivery and saving data in oder history
document.querySelector("#confirmCashOnDelivery").addEventListener("click", async () => {
  try {
    let username = localStorage.getItem("username");
    let fetching = await fetch("https://pizzabackend-rdbu.onrender.com/orderHistory/add", {
      method: "POST",
      headers: {
        "username": username,
        "mode": "Cash_On_Delivery"
      }
    });
    let res = await fetching.json();
    if (res[0].message == "Please add some Product first") {
      alert(res[0].message);
    } else {
      document.getElementById("creditCard").style.display = "none";
      document.getElementById("debitCard").style.display = "none";
      document.getElementById("paymentDone").style.display = "block";
      document.getElementById("noItem").style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
})








// confirming Order through Credit Card and saving data in oder history
document.querySelector("#confirmCreditCard").addEventListener("click", async () => {
  try {

    let C_cardNo = document.querySelector("#C_cardNo");
    let C_exp_month = document.querySelector("#C_exp_month");
    let C_exp_year = document.querySelector("#C_exp_year");
    let C_name = document.querySelector("#C_name");
    let C_cvv = document.querySelector("#C_cvv");


    if (C_cardNo.value != "" && C_exp_month.value != "" && C_exp_year.value != "" && C_cvv.value != "" && C_name != "") {

      let obj = {
        "C_cardNo": C_cardNo.value,
        "C_exp_month": C_exp_month.value,
        "C_exp_year": C_exp_year.value,
        "C_name": C_name.value
      }


      let username = localStorage.getItem("username");
      let fetching = await fetch("https://pizzabackend-rdbu.onrender.com/orderHistory/add", {
        method: "POST",
        headers: {
          "username": username,
          "mode": "Credit_Card"
        },
        body: JSON.stringify(obj)
      });
      let res = await fetching.json();
      if (res[0].message == "Please add some Product first") {
        alert(res[0].message);
      } else {
        document.getElementById("creditCard").style.display = "none";
        document.getElementById("debitCard").style.display = "none";
        document.getElementById("paymentDone").style.display = "block";
        document.getElementById("noItem").style.display = "none";
      }
    } else {
      alert("Please fill all the Details first")
    }
  } catch (error) {
    console.log(error);
  }
})







// confirming Order throug Debit Card and saving data in oder history
document.querySelector("#confirmDebitCard").addEventListener("click", async () => {
  try {

    let D_cardNo = document.querySelector("#D_cardNo");
    let D_exp_month = document.querySelector("#D_exp_month");
    let D_exp_year = document.querySelector("#D_exp_year");
    let D_name = document.querySelector("#D_name");
    let D_cvv = document.querySelector("#D_cvv");


    if (D_cardNo.value != "" && D_exp_month.value != "" && D_exp_year.value != "" && D_cvv.value != "" && D_cvv.value != "" && D_name != "") {

      let obj = {
        "D_cardNo": D_cardNo.value,
        "D_exp_month": D_exp_month.value,
        "D_exp_year": D_exp_year.value,
        "D_name": D_name.value
      }



      let username = localStorage.getItem("username");
      let fetching = await fetch("https://pizzabackend-rdbu.onrender.com/orderHistory/add", {
        method: "POST",
        headers: {
          "username": username,
          "mode": "Debit_Card"
        },
        body: JSON.stringify(obj)
      });
      let res = await fetching.json();
      if (res[0].message == "Please add some Product first") {
        alert(res[0].message);
      } else {
        document.getElementById("creditCard").style.display = "none";
        document.getElementById("debitCard").style.display = "none";
        document.getElementById("paymentDone").style.display = "block";
        document.getElementById("noItem").style.display = "none";
      }
    } else {
      alert("Please fill all the Details first")
    }
  } catch (error) {
    console.log(error);
  }
})