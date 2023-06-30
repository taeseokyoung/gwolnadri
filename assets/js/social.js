// 소셜로그인 버튼 링크

// const SOCIAL_AUTH_GOOGLE_CLIENT_ID =
//   "564064109981-6n9l7aspvf7m32jv882o5v60f4ek11ru.apps.googleusercontent.com";
// const SOCIAL_AUTH_GOOGLE_SECRET = "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";
// const SOCIAL_AUTH_NAVER_CLIENT_ID = "x5xYRVkKpV_KAx1Ht0Y_";
// const SOCIAL_AUTH_NAVER_SECRET = "12QgjS3qyt";
// const NAVER_REDIRECT_URI = "http://127.0.0.1:5500/assets/doc/naver.html";
// const GOOGLE_REDIRECT_URI = "http://127.0.0.1:5500/assets/doc/google.html";

const KAKAO_CLIENT_ID = "819e7c335ac8a43d541cc2aaf18346ba";
const KAKAO_REDIRECT_URI = "http://127.0.0.1:5500/assets/doc/kakao.html";

document.addEventListener('DOMContentLoaded', function () {
  const kakaoBtn = document.querySelector('.kakao');
  // const naverBtn = document.querySelector('.naver');
  // const googleBtn = document.querySelector('.google');

  kakaoBtn.addEventListener('click', function () {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&scope=account_email&prompt=login`;
  });

  // naverBtn.addEventListener('click', function () {
  //   window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${SOCIAL_AUTH_NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}`;
  // });

  // googleBtn.addEventListener('click', function () {
  //   window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${SOCIAL_AUTH_GOOGLE_CLIENT_ID}&response_type=code&redirect_uri=${GOOGLE_REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email&prompt=login`;
  // });
});
