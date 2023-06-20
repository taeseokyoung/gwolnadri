async function handleSignup(){
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;

  if (password === password2) {
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
  }
    
  if (response.status == 201) {
    alert("회원가입이 성공했습니다.")
    window.location.replace(`${frontend_base_url}/login.html`);

  }else{
    alert("회원가입이 실패헀습니다. 다시 시도해주세요.")
  }

}
