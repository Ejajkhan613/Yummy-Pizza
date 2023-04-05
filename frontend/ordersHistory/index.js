let products = document.querySelector("#products");
let renderArea = document.querySelector(".renderArea");
let ind_item = document.querySelector(".ind-item");




// Show UserName
function showUsername() {
    let showname = document.querySelector("#username");
    let name = localStorage.getItem("username");
    showname.innerHTML = name;
}
showUsername();




// Fetching Product Data
if (localStorage.getItem("username") != null || localStorage.getItem("username") != undefined) {
    fetchData();
} else {
    document.getElementById("LoadingDataDiv").style.display = "none";
    shownotif("Please Login first");
}
async function fetchData() {
    try {
        let fetching = await fetch("https://nice-outfit-tuna.cyclic.app/orderHistory", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "username": localStorage.getItem("username")
            }
        })
        let data = await fetching.json();
        document.getElementById("LoadingDataDiv").style.display = "none";
        document.getElementById("showLogo").style.display = "none";
        showAllBookings(data);
    } catch (error) {
        console.log(error);
    }
}




function showAllBookings(data) {
    let renderProductArea = document.querySelector(".renderArea")
    renderProductArea.innerHTML = "";
    renderProductArea.innerHTML = `
        ${data.map((item) => {
        let isoDate = new Date(item.date);
        let total = 0;
        for (let a = 0; a < item.product_list.length; a++) {
            total += item.product_list[a].quantity * item.product_list[a].price;
        }
        return `<div class="ind_item_box">
                    <div class="textArea">
                        <span for=""
                            >TIME
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                        >
                        <p>${isoDate}</p>
                        <br />

                        <span for=""
                            >MODE
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                        >
                        <p>${item.mode}</p>
                        <br />

                        <span for=""
                            >TOTAL PRICE
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                        >
                        <p>&#8377 ${total}</p>
                        <br />
                        
                            ${item.product_list.map((item) => {
                                return `<div class="individualItem">
                                                <div class="leftside">
                                                    <div class="imgSec">
                                                        <img src="${item.image}" alt="${item.name}">
                                                    </div>
                                                    <div class="description">
                                                        <h4>${item.name}</h4>
                                                        <p>${item.description}</p>
                                                        <p class="sizeofitem">${item.size}</p>
                                                    </div>
                                                </div>
                                                <div class="rightside">
                                                    <span>Category - </span><p>${item.category}</p>
                                                    <br>
                                                    <span>Price - </span><p> &#8377 ${item.price}</p>
                                                    <br>
                                                    <span>Quantity - </span><p>${item.quantity}</p>
                                                </div>
                                            </div>`
                            }).join("")}
                    </div>
                </div><br><br>`
    }).join("")}`;
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