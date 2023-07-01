const frontend_base_url = "http://127.0.0.1:5500/assets/doc";
const backend_base_url = "http://127.0.0.1:8000";
const index_url = "http://127.0.0.1:5500/index.html";

document.addEventListener("DOMContentLoaded", async function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  const response = await fetch(
    `${backend_base_url}/users/kakao/login/callback?code=${code}`
  );
  if (response.ok) {
    const response_json = await response.json();
    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);
    const base64Url = response_json.access.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    localStorage.setItem("payload", jsonPayload);
    // alert("궐나드리에 오신 걸 환영합니다_K.");
    window.location.replace("/");
  } else if (response.status == 400) {
    alert("다시 시도해 주세요.");
    window.location.replace(`${frontend_base_url}/login.html`);
  } else {
    const response_json = await response.json();
    alert(response_json.err_msg);
  }
});