// 하단 메뉴 아이콘
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

}

injectFooticon()