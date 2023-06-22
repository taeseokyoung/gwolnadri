// 전체 적용 js
const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

const payload = localStorage.getItem("payload");
const payload_parse = JSON.parse(payload);
const token = localStorage.getItem("access");

function checkLogin() {
    console.log('로그인 js 연결 체크')
    if (payload) {
        window.location.replace(`${frontend_base_url}/`)
    }
}

// 뒤로가기
function goBack() {
    window.history.back();
}

//쿠키 저장
// expiredays 는 일자 정수 - 365년 1년 쿠키
function setCookie(key, value, expiredays) {
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays); // 현재 시각 + 일 단위로 쿠키 만료 날짜 변경
    //todayDate.setTime(todayDate.getTime() + (expiredays * 24 * 60 * 60 * 1000)); // 밀리세컨드 단위로 쿠키 만료 날짜 변경
    document.cookie = key + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}

//쿠키 조회
function getCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
}

//쿠키 삭제
function deleteCookie(name) {
    document.cookie = encodeURIComponent(name) + '=; expires=Thu, 01 JAN 1999 00:00:10 GMT';
}

// 크롤링 이벤트 리스트
async function eventScrapList() {
    const response = await fetch(`${backend_base_url}/events/list/`)
    if (response.status == 200) {
        const response_json = await response.json()
        console.log(response_json)
        return response_json
    } else {
        alert("요청이 실패했습니다!")
    }
}

// 이벤트 리스트
async function eventList() {
    const response = await fetch(`${backend_base_url}/events/`)
    if (response.status == 200) {
        const response_json = await response.json()
        console.log(response_json)
        return response_json
    } else {
        alert("요청이 실패했습니다!")
    }
}
