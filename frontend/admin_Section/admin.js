// Getting Username and Token from SessionStorage
function showUsername() {
    let showUser = document.querySelector("#showUser");
    let data = sessionStorage.getItem("username");
    let token = sessionStorage.getItem("Access_Token");
    showUser.innerText = "";
    if (data != undefined && token != undefined) {
        showUser.innerText = data;
    } else {
        showUser.innerText = "Login";
    }
}
showUsername();


// Getting User Details
document.querySelector("#userDetails").addEventListener("click", async () => {
    let token = sessionStorage.getItem("Access_Token");
    console.log(token)
    try {
        let data = await fetch("http://localhost:4500/users/show", {
            method: "GET",
            headers: {
                "Authorization": token
            }
        })
        let res = await data.json();
        console.log(res);
    } catch (error) {
        console.log(error)
    }
});