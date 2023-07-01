const KAKAO_CLIENT_ID = "819e7c335ac8a43d541cc2aaf18346ba";
const KAKAO_REDIRECT_URI = "http://127.0.0.1:5500/assets/doc/kakao.html";

document.addEventListener('DOMContentLoaded', function () {
  const kakaoBtn = document.querySelector('.kakao');

  kakaoBtn.addEventListener('click', function () {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&scope=account_email&prompt=login`
  });

});