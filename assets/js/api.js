const frontend_base_url = "https://gwolnadri.com/assets/doc"
const backend_base_url = "https://gwolnadri.online"
const index_url = "https://gwolnadri.com/index.html"



const payload = localStorage.getItem("payload");
const payload_parse = JSON.parse(payload);
const token = localStorage.getItem("access");

function checkLogin() {
    if (payload) {
        window.location.replace(`${frontend_base_url}/`)
    }
}

function goBack() {
    window.history.back();
}

function setCookie(key, value, expiredays) {
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = key + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}

function getCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
}

function deleteCookie(name) {
    document.cookie = encodeURIComponent(name) + '=; expires=Thu, 01 JAN 1999 00:00:10 GMT';
}

async function eventScrapList() {
    const response = await fetch(`${backend_base_url}/events/list/`)
    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("요청이 실패했습니다!")
    }
}

async function eventList() {
    const response = await fetch(`${backend_base_url}/events/`)
    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("요청이 실패했습니다!")
    }
}

async function storeList() {
    const response = await fetch(`${backend_base_url}/api/v1/stores/`)
    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("요청이 실패했습니다!")
    }
}

