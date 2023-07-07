async function handleSignup() {
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;

  const response = await fetch(`${backend_base_url}/users/signup/`, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email: email,
      username: username,
      password: password,
      password2: password2,
    }),
  });
  response_json = await response.json();

  const e_email = document.getElementById("div_email");
  const e_username = document.getElementById("div_username");
  const e_password = document.getElementById("div_password");
  const e_password2 = document.getElementById("div_password2");

  e_email.replaceChildren();
  e_username.replaceChildren();
  e_password.replaceChildren();
  e_password2.replaceChildren();

  if (response.status == 201) {
    alert("회원가입에 성공했습니다.");
    window.location.replace(`${frontend_base_url}/home.html`);
  } else if (response.status == 400) {
    if (response_json.email) {
      const email_error = document.createElement("p");
      email_error.setAttribute("class", "sh_error");
      email_error.innerText = response_json.email;
      e_email.appendChild(email_error);
    } else if (response_json.username) {
      const user_error = document.createElement("p");
      user_error.setAttribute("class", "sh_error");
      user_error.innerText = response_json.username;
      e_username.appendChild(user_error);
    } else if (response_json.password2) {
      const password_error = document.createElement("p");
      password_error.setAttribute("class", "sh_error");
      password_error.innerText = response_json.password2;
      e_password2.appendChild(password_error);
    }
  } else if (response.status == 403) {
    const key_username = response_json.username;
    const key_password = response_json.password;
    const key_email = response_json.email;

    if (key_username) {
      for (let i = 0; i < key_username.length; i++) {
        const error_user = key_username[i];

        const user_error = document.createElement("p");
        user_error.setAttribute("class", "sh_error");
        user_error.innerText = error_user;

        e_username.appendChild(user_error);
      }
    }

    if (key_password) {
      for (let i = 0; i < key_password.length; i++) {
        const error_password = key_password[i];

        const password_error = document.createElement("p");
        password_error.setAttribute("class", "sh_error");
        password_error.innerText = error_password;

        e_password.appendChild(password_error);
      }
    }

    if (key_email) {
      for (let i = 0; i < key_email.length; i++) {
        const error_email = key_email[i];

        const email_error = document.createElement("p");
        email_error.setAttribute("class", "sh_error");
        email_error.innerText = error_email;

        e_email.appendChild(email_error);
      }
    }
  } else {
    alert(response.status);
    location.replace(`${index_url}`);
  }
}
