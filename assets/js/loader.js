function CheckEXP() {
    const exp = payload_parse.exp
    const current = Math.floor((new Date()).getTime() / 1000);

    if (exp < current) {
        alert("로그인 유효시간이 만료되었습니다")
        DeleteToken()
        window.location.replace(`${index_url}`)
    }
}

async function injectFooticon() {
    fetch("/assets/components/foot-icon.html").then(response => {
        return response.text()
    })
        .then(data => {
            document.querySelector("footer").innerHTML = data;
        })

    let footiconHtml = await fetch("/assets/components/foot-icon.html")
    let data = await footiconHtml.text()
    document.querySelector("footer").innerHTML = data;

    if (!payload) {
        document.querySelector('.Profile-icon').addEventListener('click', function () {
            window.location.replace(`${frontend_base_url}/home.html`)
        })
    } else {
        CheckEXP();    
        document.querySelector('.Profile-icon').addEventListener('click', function () {
            window.location.replace(`${frontend_base_url}/profile.html`)
        })
    }
}

injectFooticon()
