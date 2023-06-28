async function handleLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const response = await fetch(`${backend_base_url}/users/token/`, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      "email": email,
      "password": password
    })
  });


  if (response.status == 200) {
    const response_json = await response.json();
    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);

    setCookie("access", response_json.access, 1)
    const base64Url = response_json.access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    localStorage.setItem("payload", jsonPayload);
    window.location.replace("/");

  } else {
    alert("로그인에 실패하였습니다. 다시 시도해 주세요.")
  }
}


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('login-signup-btn').addEventListener('click', function () {
    window.location.href = `${frontend_base_url}/signup.html`
  })
})


// 에러로 주석처리
// checkLogin()

// 소셜로그인 버튼 링크
// document.addEventListener('DOMContentLoaded', function () {
//   const kakaoBtn = document.querySelector('.kakao');
//   const naverBtn = document.querySelector('.naver');
//   const googleBtn = document.querySelector('.google');

//   kakaoBtn.addEventListener('click', function () {
//     window.location.href = `${backend_base_url}/users/kakao/login/`;
//   });

//   naverBtn.addEventListener('click', function () {
//     window.location.href = `${backend_base_url}/users/naver/login/`;
//   });

//   googleBtn.addEventListener('click', function () {
//     window.location.href = `${backend_base_url}/users/google/login/`;
//   });
// });
