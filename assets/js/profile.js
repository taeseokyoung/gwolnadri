const user_id = parseInt(new URLSearchParams(window.location.search).get("user_id"));
const logined_token = localStorage.getItem("access");
const logined_account = payload_parse.account;
console.log(payload_parse.user_id);

async function myProfile(user_id) {

  const response = await fetch(`${backend_base_url}/users/me/`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
  });


  const data = await response.json();

  var profileImageURL = data.profile_image;
  var username = data.username;
  var email = data.email;

  var profileImageElement = document.getElementById("profile_image");
  if (profileImageURL !== null) {
    profileImageElement.setAttribute("src", `${backend_base_url}${profileImageURL}`)
  } else {
    var defaultImageURL = "assets/img/no-prifile.png";
    profileImageElement.setAttribute("src", defaultImageURL);}
  
  var usernameElement = document
    .getElementById("username")
    .querySelector("p");
  usernameElement.textContent = username;

  var emailElement = document.getElementById("email");
  emailElement.textContent = email;
}
myProfile(user_id);


// 클릭시 profile-edit.html으로 
// "username" & 옆에 ">" 까지 clickable하게 생겼는데 구역이 따로라서 일단 두군데에 해둠.
document.addEventListener("DOMContentLoaded", function () {
  const usernameElement = document.getElementById("username");
  const angleRightElement = document.querySelector(".xi-angle-right-min");

  usernameElement.addEventListener("click", function () {
    window.location.href = `${frontend_base_url}/profile-edit.html`;
  });

  angleRightElement.addEventListener("click", function () {
    window.location.href = `${frontend_base_url}/profile-edit.html`;
  });
});

