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

    if (payload) {
        document.querySelector('.Profile-icon').addEventListener('click', function () {
            window.location.replace(`${frontend_base_url}/profile.html`)
        })
    } else {

        document.querySelector('.Profile-icon').addEventListener('click', function () {
            window.location.replace(`${frontend_base_url}/home.html`)
        })

    }
}

injectFooticon()
