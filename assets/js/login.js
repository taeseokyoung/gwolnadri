async function handleLogin() {
    console.log('로그인 버튼');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(email, password);
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
    // access,refresh 토큰 데이터 json으로 받기
    const response_json = await response.json();

    // // 로컬 스토리지에 jwt 토큰 저장하기
    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);
    console.log(response_json);

    // 쿠키에 access 토큰 저장하기, 하루 이후에 만료 = 1
    setCookie("access", response_json.access, 1)

    // payload로 저장하기 
    const base64Url = response_json.access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    localStorage.setItem("payload", jsonPayload);

    alert('로그인 성공')
        window.location.replace(`${frontend_base_url}/`);
    
  } else {
      alert("로그인 실패했습니다. 다시 시도해 주세요.")
  }
}

// 에러나서 주석처리함  
// checkLogin()

// 소셜로그인 버튼 링크
document.addEventListener('DOMContentLoaded', function() {
  const kakaoBtn = document.querySelector('.kakao');
  const naverBtn = document.querySelector('.naver');
  const googleBtn = document.querySelector('.google');

  kakaoBtn.addEventListener('click', function() {
    window.location.href = `${backend_base_url}/users/kakao/login/`; 
  });

  naverBtn.addEventListener('click', function() {
    window.location.href = `${backend_base_url}/users/naver/login/`; 
  });

  googleBtn.addEventListener('click', function() {
    window.location.href = `${backend_base_url}/users/google/login/`; 
  });
});


