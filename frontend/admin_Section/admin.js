


// Getting Username and Token from SessionStorage
function showUsername() {
    let showUser = document.querySelector("#showUser");
    let data = sessionStorage.getItem("username");
    let token = sessionStorage.getItem("Access_Token");
    showUser.innerText = "";
    if (data != undefined && token != undefined) {
        showUser.innerText = data;
    } else {
        showUser.innerText = "Login Please";
    }
}
showUsername();















// Getting User Details
document.querySelector("#userDetails").addEventListener("click", fetchData);

async function fetchData() {
    let token = sessionStorage.getItem("Access_Token");
    try {
        let data = await fetch("https://nice-outfit-tuna.cyclic.app/users/admin/show", {
            method: "GET",
            headers: {
                "Authorization": token
            }
        })
        let res = await data.json();
        document.getElementById("showOrders").style.display = "none";
        document.getElementById("showLogo").style.display = "none";
        document.getElementById("userData").style.display = "block";
        document.getElementById("showProducts").style.display = "none";

        document.getElementById("admineditForm").style.display = "none";
        document.getElementById("editForm").style.display = "none";
        document.getElementById("addAdminForm").style.display = "none";
        document.getElementById("addUserForm").style.display = "none";
        document.getElementById("addDiscount").style.display = "none";
        document.getElementById("addNewProduct").style.display = "none";
        renderCardList(res);
    } catch (error) {
        shownotif(error)
    }
};










// Getting Admin Details
document.querySelector("#adminDetails").addEventListener("click", fetchAdminData);

async function fetchAdminData() {
    let token = sessionStorage.getItem("Access_Token");
    try {
        let data = await fetch("https://nice-outfit-tuna.cyclic.app/admin/show", {
            method: "GET",
            headers: {
                "Authorization": token
            }
        })
        let res = await data.json();
        document.getElementById("showLogo").style.display = "none";
        document.getElementById("userData").style.display = "block";
        document.getElementById("showProducts").style.display = "none";
        document.getElementById("showOrders").style.display = "none";


        document.getElementById("admineditForm").style.display = "none";
        document.getElementById("editForm").style.display = "none";
        document.getElementById("addAdminForm").style.display = "none";
        document.getElementById("addUserForm").style.display = "none";
        document.getElementById("addDiscount").style.display = "none";
        document.getElementById("addNewProduct").style.display = "none";
        renderCardList(res, "admin");
    } catch (error) {
        shownotif(error);
    }
};


































// User Details Render Card List
function renderCardList(data, forAdmin) {
    if (forAdmin != undefined) {
        document.querySelector("#userData>h1").innerText = "Admin Data";
    } else {
        document.querySelector("#userData>h1").innerText = "User Data";
    }
    let renderArea = document.querySelector(".ind_item")
    renderArea.innerHTML = "";
    renderArea.innerHTML = `
        <div class="renderArea">
            ${data
            .map((item) => {
                let id = item._id;
                let username = item.username;
                let email = item.email;
                let mobile = item.mobile;
                let password = item.password;
                return getAsCard(id, username, email, mobile, password);
            })
            .join("")}
        </div>
    `;



    // Delete Functionality in User Details Section
    let deletingData = document.querySelectorAll("#deleteUserDetails");
    for (let deleteButton of deletingData) {
        deleteButton.addEventListener("click", (element) => {
            let data = element.target.dataset.id;
            deleteFunction(data, forAdmin)
        })
    }



    // User Details Edit Functionality
    let editData = document.querySelectorAll("#editUserDetails");
    for (let editingdata of editData) {
        editingdata.addEventListener("click", async (element) => {
            let data = element.target.dataset.id;
            let token = sessionStorage.getItem("Access_Token");


            try {

                if (forAdmin == undefined) {

                    let fetching = await fetch("https://nice-outfit-tuna.cyclic.app/users/admin/find", {
                        method: "GET",
                        headers: {
                            "authorization": token,
                            "id": data
                        }
                    })
                    let res = await fetching.json();
                    console.log(res);
                    if (res[0].message == "found") {

                        document.getElementById("showLogo").style.display = "none";
                        document.getElementById("userData").style.display = "none";
                        document.getElementById("showProducts").style.display = "none";
                        document.getElementById("showOrders").style.display = "none";

                        document.getElementById("admineditForm").style.display = "none";
                        document.getElementById("editForm").style.display = "block";
                        document.getElementById("addAdminForm").style.display = "none";
                        document.getElementById("addUserForm").style.display = "none";
                        document.getElementById("addDiscount").style.display = "none";
                        document.getElementById("addNewProduct").style.display = "none";

                        let username = document.querySelector("#edit_username");
                        let email = document.querySelector("#edit_email");
                        let mobile = document.querySelector("#edit_mobile");
                        let edit_save_button = document.querySelector("#savebutton");

                        username.value = res[1].username;
                        email.value = res[1].email;
                        mobile.value = res[1].mobile;
                        edit_save_button.dataset.id = res[1]._id;
                    } else {
                        shownotif(res[0].message);
                    }


                } else {

                    let fetching = await fetch("https://nice-outfit-tuna.cyclic.app/admin/find", {
                        method: "GET",
                        headers: {
                            "authorization": token,
                            "id": data
                        }
                    })
                    let res = await fetching.json();
                    if (res[0].message == "found") {
                        document.getElementById("showLogo").style.display = "none";
                        document.getElementById("userData").style.display = "none";
                        document.getElementById("showProducts").style.display = "none";
                        document.getElementById("showOrders").style.display = "none";

                        document.getElementById("editForm").style.display = "none";
                        document.getElementById("addAdminForm").style.display = "none";
                        document.getElementById("addUserForm").style.display = "none";
                        document.getElementById("addDiscount").style.display = "none";
                        document.getElementById("addNewProduct").style.display = "none";

                        document.getElementById("admineditForm").style.display = "block";


                        let username = document.querySelector("#edit_admin_username");
                        let email = document.querySelector("#edit_admin_email");
                        let mobile = document.querySelector("#edit_admin_mobile");
                        let edit_save_button = document.querySelector("#adminsavebutton");


                        username.value = res[1].username;
                        email.value = res[1].email;
                        mobile.value = res[1].mobile;
                        edit_save_button.dataset.id = res[1]._id;
                    } else {
                        shownotif(res[0].message);
                    }

                }
            } catch (error) {
                shownotif("Error while editing data")
            }
        })
    }
}








// Making Individual Product Cards
function getAsCard(id, username, email, mobile, password) {
    return `
    <div class="ind_item">
          <div class="textArea">
            <span for="">USERNAME  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <p>${username}</p><br>
            <span for="">EMAIL  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <p>${email}</p><br>
            <span for="">MOBILE  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <p>${mobile}</p><br>
            <span for="">PASSWORD  &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <p>${password.substring(0, 30)}</p>
          </div>
          <div class="buttonsArea">
            <button id="editUserDetails" data-id=${id}>Edit</button>
            <button id="deleteUserDetails" data-id=${id}>Delete</button>
          </div>
        </div>
      `;
}





// Delete Functionality
async function deleteFunction(data, forAdmin) {
    let token = sessionStorage.getItem("Access_Token");
    try {


        if (forAdmin == "admin") {

            let fetching = await fetch("https://nice-outfit-tuna.cyclic.app/admin/delete", {
                method: "DELETE",
                headers: {
                    "authorization": token,
                    "id": data
                }
            });
            let res = await fetching.json();
            shownotif(res[0].message);
            fetchAdminData();

        } else {

            let fetching = await fetch("https://nice-outfit-tuna.cyclic.app/users/admin/delete", {
                method: "DELETE",
                headers: {
                    "authorization": token,
                    "id": data
                }
            });
            let res = await fetching.json();
            shownotif(res[0].message);
            fetchData();

        }


    } catch (error) {
        shownotif(error)
    }
}








// Save Userdata in Edit Form 
document.getElementById("savebutton").addEventListener("click", async () => {
    let token = sessionStorage.getItem("Access_Token");
    let id = document.getElementById("savebutton").dataset.id;

    try {
        let username = document.querySelector("#edit_username");
        let email = document.querySelector("#edit_email");
        let mobile = document.querySelector("#edit_mobile");


        if (username.value != "" && email.value != "" && mobile != "") {

            let obj = {
                "username": username.value,
                "email": email.value,
                "mobile": mobile.value
            }

            let fetching = await fetch("https://nice-outfit-tuna.cyclic.app/users/admin/update", {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                    "authorization": token,
                    "id": id
                },
                body: JSON.stringify(obj)
            })
            let res = await fetching.json();
            if (res[0].message == "User Updated") {
                document.getElementById("editForm").style.display = "none";
                shownotif(res[0].message);
                fetchData();
            } else {
                shownotif(res[0].message)
            }
        } else {
            shownotif("Please fill all the details")
        }

    } catch (error) {
        shownotif("Something Went Wrong");
    }
});

// Hide Edit Form
document.getElementById("exitbutton").addEventListener("click", () => {
    document.getElementById("editForm").style.display = "none";
});















// Save Admin Data in Edit Form 
document.getElementById("adminsavebutton").addEventListener("click", async () => {
    let token = sessionStorage.getItem("Access_Token");
    let id = document.getElementById("adminsavebutton").dataset.id;

    try {
        let username = document.querySelector("#edit_admin_username");
        let email = document.querySelector("#edit_admin_email");
        let mobile = document.querySelector("#edit_admin_mobile");


        if (username.value != "" && email.value != "" && mobile != "") {

            let obj = {
                "username": username.value,
                "email": email.value,
                "mobile": mobile.value
            }

            let fetching = await fetch("https://nice-outfit-tuna.cyclic.app/admin/update", {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                    "authorization": token,
                    "id": id
                },
                body: JSON.stringify(obj)
            })
            let res = await fetching.json();
            if (res[0].message == "Details Updated") {
                document.getElementById("admineditForm").style.display = "none";
                shownotif(res[0].message);
                fetchAdminData();
            } else {
                shownotif(res[0].message)
            }
        } else {
            shownotif("Please fill all the details")
        }

    } catch (error) {
        shownotif("Something Went Wrong");
    }
});

// Hide Admin Edit Form
document.getElementById("adminexitbutton").addEventListener("click", () => {
    document.getElementById("admineditForm").style.display = "none";
});














// Showing Add User Form
document.getElementById("addUserDetails").addEventListener("click", () => {
    document.getElementById("showLogo").style.display = "none";
    document.getElementById("userData").style.display = "none";
    document.getElementById("showProducts").style.display = "none";
    document.getElementById("showOrders").style.display = "none";

    document.getElementById("admineditForm").style.display = "none";
    document.getElementById("editForm").style.display = "none";
    document.getElementById("addAdminForm").style.display = "none";
    document.getElementById("addDiscount").style.display = "none";
    document.getElementById("addNewProduct").style.display = "none";

    document.getElementById("addUserForm").style.display = "block";
});


// Adding New User Data
document.getElementById("add_user_save_button").addEventListener("click", async () => {

    try {
        let username = document.querySelector("#add_user_username");
        let email = document.querySelector("#add_user_email");
        let mobile = document.querySelector("#add_user_mobile");
        let password = document.querySelector("#add_user_password");

        if (username.value != "" && email.value != "" && mobile != "" && password.value != "") {

            let obj = {
                "username": username.value,
                "email": email.value,
                "mobile": mobile.value,
                "password": password.value
            }

            let fetching = await fetch("https://nice-outfit-tuna.cyclic.app/users/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(obj)
            })
            let res = await fetching.json();
            if (res[0].message == "registration successfull") {
                document.getElementById("addUserForm").style.display = "none";
                shownotif(res[0].message);
                fetchData();
            } else {
                shownotif(res[0].message)
            }
        } else {
            shownotif("Please fill all the details")
        }

    } catch (error) {
        shownotif("Something Went Wrong");
    }
});

// Hide Add User Form
document.getElementById("add_user_delete_button").addEventListener("click", () => {
    document.getElementById("addUserForm").style.display = "none";
});





















// Showing Add Discount Form
document.getElementById("addnewDiscount").addEventListener("click", () => {
    document.getElementById("showLogo").style.display = "none";
    document.getElementById("userData").style.display = "none";
    document.getElementById("showProducts").style.display = "none";
    document.getElementById("showOrders").style.display = "none";


    document.getElementById("admineditForm").style.display = "none";
    document.getElementById("editForm").style.display = "none";
    document.getElementById("addAdminForm").style.display = "none";
    document.getElementById("addUserForm").style.display = "none";
    document.getElementById("addNewProduct").style.display = "none";

    document.getElementById("addDiscount").style.display = "block";
});


// Adding New Discount Data
document.getElementById("discountbutton").addEventListener("click", async () => {
    let token = sessionStorage.getItem("Access_Token");


    try {
        let name = document.querySelector("#add_discount_name");
        let price = document.querySelector("#add_discount_price");

        if (name.value != "" && price.value != "") {

            let obj = {
                "name": name.value,
                "price": price.value
            }

            let fetching = await fetch("https://nice-outfit-tuna.cyclic.app/discount/add", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "authorization": token
                },
                body: JSON.stringify(obj)
            })
            let res = await fetching.json();
            console.log(res)
            if (res[0].message == "Discount Added") {
                shownotif(res[0].message);
            } else {
                shownotif(res[0].message);
            }
        } else {
            shownotif("Please fill all the details")
        }

    } catch (error) {
        shownotif("Something Went Wrong");
    }
});

// Hide Discount Form
document.getElementById("discountdeletebutton").addEventListener("click", () => {
    document.getElementById("addDiscount").style.display = "none";
});






















// Showing Add Product Form
document.getElementById("showAddProduct").addEventListener("click", () => {
    document.getElementById("showLogo").style.display = "none";
    document.getElementById("userData").style.display = "none";
    document.getElementById("showProducts").style.display = "none";
    document.getElementById("showOrders").style.display = "none";


    document.getElementById("admineditForm").style.display = "none";
    document.getElementById("editForm").style.display = "none";
    document.getElementById("addAdminForm").style.display = "none";
    document.getElementById("addUserForm").style.display = "none";
    document.getElementById("addDiscount").style.display = "none";

    document.getElementById("addNewProduct").style.display = "block";
});


// Adding New Product Data
document.getElementById("add_product_save_button").addEventListener("click", async () => {
    let token = sessionStorage.getItem("Access_Token");


    try {
        let name = document.querySelector("#add_product_name");
        let price = document.querySelector("#add_product_price");
        let description = document.querySelector("#add_product_description");
        let image = document.querySelector("#add_product_image");
        let size = document.querySelector("#add_product_size");
        let category = document.querySelector("#add_product_category");

        if (name.value != "" && price.value != "" && description.value != "" && image.value != "" && size.value != "" && category.value != "") {

            let obj = {
                "name": name.value,
                "price": price.value,
                "description": description.value,
                "image": image.value,
                "size": size.value,
                "category": category.value
            }

            let fetching = await fetch("https://nice-outfit-tuna.cyclic.app/products/admin/add", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "authorization": token
                },
                body: JSON.stringify(obj)
            })
            let res = await fetching.json();
            console.log(res)
            if (res[0].message == "Product Added") {
                shownotif(res[0].message);
            } else {
                shownotif(res[0].message);
            }
        } else {
            shownotif("Please fill all the details")
        }
    } catch (error) {
        shownotif("Something Went Wrong");
    }
});

// Hide Product Form
document.getElementById("add_product_delete_button").addEventListener("click", () => {
    document.getElementById("addNewProduct").style.display = "none";
});



























// Showing Add Admin Form
document.getElementById("addAdminDetails").addEventListener("click", () => {
    document.getElementById("showLogo").style.display = "none";
    document.getElementById("userData").style.display = "none";
    document.getElementById("showProducts").style.display = "none";
    document.getElementById("showOrders").style.display = "none";


    document.getElementById("admineditForm").style.display = "none";
    document.getElementById("editForm").style.display = "none";
    document.getElementById("addUserForm").style.display = "none";
    document.getElementById("addDiscount").style.display = "none";
    document.getElementById("addNewProduct").style.display = "none";

    document.getElementById("addAdminForm").style.display = "block";
});


// Adding New Admin Data
document.getElementById("add_admin_save_button").addEventListener("click", async () => {

    try {
        let username = document.querySelector("#add_admin_username");
        let email = document.querySelector("#add_admin_email");
        let mobile = document.querySelector("#add_admin_mobile");
        let password = document.querySelector("#add_admin_password");
        let key = document.querySelector("#add_admin_key");


        if (username.value != "" && email.value != "" && mobile != "" && password.value != "" && key.value != "") {

            let obj = {
                "username": username.value,
                "email": email.value,
                "mobile": mobile.value,
                "password": password.value,
                "key": key.value
            }

            let fetching = await fetch("https://nice-outfit-tuna.cyclic.app/admin/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(obj)
            })
            let res = await fetching.json();
            if (res[0].message == "registration successfull") {
                document.getElementById("addAdminForm").style.display = "none";
                shownotif(res[0].message);
                fetchAdminData();
            } else {
                shownotif(res[0].message);
            }
        } else {
            shownotif("Please fill all the details")
        }

    } catch (error) {
        shownotif("Something Went Wrong");
    }
});

// Hide Add User Form
document.getElementById("add_admin_delete_button").addEventListener("click", () => {
    document.getElementById("addAdminForm").style.display = "none";
});
















// // To Show Orders
// // Getting Order Details
document.querySelector("#orderHistory").addEventListener("click", fetchOrderHistory);

async function fetchOrderHistory() {
    let token = sessionStorage.getItem("Access_Token");
    try {
        let data = await fetch("https://nice-outfit-tuna.cyclic.app/orderHistory/admin/get", {
            method: "GET",
            headers: {
                "Authorization": token
            }
        })
        let res = await data.json();

        document.getElementById("showLogo").style.display = "none";
        document.getElementById("userData").style.display = "none";
        document.getElementById("showProducts").style.display = "none";

        document.getElementById("admineditForm").style.display = "none";
        document.getElementById("editForm").style.display = "none";
        document.getElementById("addAdminForm").style.display = "none";
        document.getElementById("addUserForm").style.display = "none";
        document.getElementById("addDiscount").style.display = "none";
        document.getElementById("addNewProduct").style.display = "none";

        document.getElementById("showOrders").style.display = "block";
        showAllBookings(res);
    } catch (error) {
        shownotif(error);
    }
};



function showAllBookings(data) {
    let renderProductArea = document.querySelector(".ind_itemm")
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
                        <span for="">USERNAME &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <p>${item.username}</p>
                        <br />

                        <span for=""
                            >MODE
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                        >
                        <p>${item.mode}</p>
                        <br />
                        
                        <span for=""
                            >TIME
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                        >
                        <p>${isoDate}</p>
                        <br />
                        <span for=""
                            >TOTAL PRICE
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                        >
                        <p>${total}</p>
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


























// Show Products
// Getting Products Details
document.querySelector("#showAllProducts").addEventListener("click", fetchProductData);

async function fetchProductData() {
    let token = sessionStorage.getItem("Access_Token");
    try {
        let data = await fetch("https://nice-outfit-tuna.cyclic.app/products/admin/show", {
            method: "GET",
            headers: {
                "authorization": token
            }
        })
        let res = await data.json();

        document.getElementById("showLogo").style.display = "none";
        document.getElementById("userData").style.display = "none";
        document.getElementById("showOrders").style.display = "none";

        document.getElementById("admineditForm").style.display = "none";
        document.getElementById("editForm").style.display = "none";
        document.getElementById("addAdminForm").style.display = "none";
        document.getElementById("addUserForm").style.display = "none";
        document.getElementById("addDiscount").style.display = "none";
        document.getElementById("addNewProduct").style.display = "none";

        document.getElementById("showProducts").style.display = "block";
        renderProductList(res);
    } catch (error) {
        shownotif(error);
    }
};


// Select and Fetch by Category
document.querySelector("#select_category").addEventListener("change", async () => {
    let cat = document.querySelector("#select_category").value;
    let token = sessionStorage.getItem("Access_Token");
    try {

        if (cat == "all") {
            let data = await fetch("https://nice-outfit-tuna.cyclic.app/products/admin/show", {
                method: "GET",
                headers: {
                    "authorization": token
                }
            })
            let res = await data.json();

            document.getElementById("showLogo").style.display = "none";
            document.getElementById("userData").style.display = "none";
            document.getElementById("showOrders").style.display = "none";


            document.getElementById("admineditForm").style.display = "none";
            document.getElementById("editForm").style.display = "none";
            document.getElementById("addAdminForm").style.display = "none";
            document.getElementById("addUserForm").style.display = "none";
            document.getElementById("addDiscount").style.display = "none";
            document.getElementById("addNewProduct").style.display = "none";

            document.getElementById("showProducts").style.display = "block";
            renderProductList(res);
        } else {
            let data = await fetch("https://nice-outfit-tuna.cyclic.app/products/admin/find", {
                method: "GET",
                headers: {
                    "authorization": token,
                    "category": cat
                }
            })
            let res = await data.json();

            document.getElementById("showLogo").style.display = "none";
            document.getElementById("userData").style.display = "none";
            document.getElementById("showOrders").style.display = "none";


            document.getElementById("admineditForm").style.display = "none";
            document.getElementById("editForm").style.display = "none";
            document.getElementById("addAdminForm").style.display = "none";
            document.getElementById("addUserForm").style.display = "none";
            document.getElementById("addDiscount").style.display = "none";
            document.getElementById("addNewProduct").style.display = "none";

            document.getElementById("showProducts").style.display = "block";
            renderProductList(res);
        }
    } catch (error) {
        shownotif(error);
    }
});




// Product Details Render Card List
function renderProductList(data) {
    let renderProductArea = document.querySelector(".allProductsHere")
    renderProductArea.innerHTML = "";
    renderProductArea.innerHTML = `
        <div class="renderProductArea">
            ${data
            .map((item) => {
                let category = item.category;
                let id = item._id;
                let description = item.description;
                let image = item.image;
                let name = item.name;
                let price = item.price;
                let size = item.size;

                return getAsProductCard(id, category, description, image, name, price, size);
            })
            .join("")}
        </div>
    `;



    // Delete Functionality in Products Details Section
    let deletingData = document.querySelectorAll("#deleteProductButton");
    for (let deleteButton of deletingData) {
        deleteButton.addEventListener("click", (element) => {
            let data = element.target.dataset.id;
            deleteProduct(data)
        })
    }
};


// Making Individual Product Cards
function getAsProductCard(id, category, description, image, name, price, size) {
    return `
    <div class="individualItem">
          <div class="leftside">
              <div class="imgSec">
                  <img src=${image} alt="image">
              </div>
              <div class="description">
                  <h4>${name}</h4>
                  <p>${description}</p>
                  <p class="sizeofitem">${size}</p>
              </div>
          </div>
          <div class="rightside">
              <span>Category - </span><p>${category}</p>
              <br>
              <span>Price - </span><p> &#8377 ${price}</p>
          </div>
          <div class="buttonsArea">
          <button id="deleteProductButton" data-id=${id}>Delete</button>
          </div>
          </div>
          `;
}

// <button id="editProductButton" data-id=${id}>Edit</button>








// Delete products Functionality
async function deleteProduct(data) {
    let token = sessionStorage.getItem("Access_Token");
    try {
        let fetching = await fetch("https://nice-outfit-tuna.cyclic.app/products/admin/delete", {
            method: "DELETE",
            headers: {
                "authorization": token,
                "id": data
            }
        });
        let res = await fetching.json();
        shownotif(res[0].message);
        showProductAfterDelete();
    } catch (error) {
        shownotif(error);
    }
}

async function showProductAfterDelete() {
    let token = sessionStorage.getItem("Access_Token");
    try {
        let data = await fetch("https://nice-outfit-tuna.cyclic.app/products/admin/show", {
            method: "GET",
            headers: {
                "authorization": token
            }
        })
        let res = await data.json();
        renderProductList(res);
    } catch (error) {
        shownotif(error);
    }
}















// Notification Section
function shownotif(data) {
    let notify = document.querySelector("#notification>h2");
    setTimeout(() => {
        document.getElementById("notification").style.display = "none";
        notify.innerText = ""
    }, 2000);
    document.getElementById("notification").style.display = "block";
    notify.innerText = data;
}