const user_id = parseInt(new URLSearchParams(window.location.search).get("user_id"));
const logined_token = localStorage.getItem("access");
const logined_account = payload_parse.account;

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
    profileImageElement.setAttribute("src", `${backend_base_url}${profileImageURL}`);
  } else {
    var defaultImageURL = "/assets/img/no-profile.png";
    profileImageElement.setAttribute("src", defaultImageURL);
  }

  var usernameElement = document
    .getElementById("username")
    .querySelector("p");
  usernameElement.textContent = username;

  var emailElement = document.getElementById("email");
  emailElement.textContent = email;
}
myProfile(user_id);


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

