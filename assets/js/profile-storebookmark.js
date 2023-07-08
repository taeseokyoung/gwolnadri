if (!localStorage.getItem("access")) {
    alert("로그인 후 이용해주세요");
    window.location.replace(`${frontend_base_url}/home.html`);
}

window.onload = async function loadStoreList() {

    const payload = localStorage.getItem("payload")

    //한복점 html 카드 생성
    const storeCard = document.getElementById("store-list-body")
    const bookedStores = await bookedStore()

    if (bookedStores["bookmark_stores"].length == 0) {
        const none_list = document.createElement('div')
        none_list.setAttribute('class', 'sh_col')

        const i = document.createElement('i')
        i.setAttribute('class', 'xi-shop')

        const none_content = document.createElement('p')
        none_content.setAttribute('class', 'sh_small')
        none_content.innerText = "관심 한복점이 없습니다"

        none_list.appendChild(i)
        none_list.appendChild(none_content)
        storeCard.insertBefore(none_list, storeCard.firstChild);
    } else {

        bookedStores["bookmark_stores"].forEach(store => {

            const newCon = document.createElement("div")
            const newTitle = document.createElement("div")
            const newCate = document.createElement("p")
            const newStore = document.createElement("p")
            const newAdd = document.createElement("p")
            const newIcon = document.createElement("div")
            const newHeart = document.createElement("div")
            const newBook = document.createElement("div")
            const newHeartImg = document.createElement("img")
            const newBookImg = document.createElement("img")
            const newHeartNum = document.createElement("span")
            let likeOn
            let bookOn

            storeCard.appendChild(newCon)
            newCon.appendChild(newTitle)
            newTitle.appendChild(newCate)
            newTitle.appendChild(newStore)
            newTitle.appendChild(newAdd)
            newCon.append(newIcon)
            newIcon.appendChild(newHeart)
            newIcon.appendChild(newBook)
            newHeart.appendChild(newHeartImg)
            newHeart.appendChild(newHeartNum)
            newBook.appendChild(newBookImg)

            newCon.setAttribute("class", "contant-card")
            newTitle.setAttribute("class", "store-title")
            newCate.setAttribute("class", "hanbok_category")
            newStore.setAttribute("class", "hanbok_store")
            newTitle.setAttribute("onclick", "storeLink(" + store.id + ")")
            newAdd.setAttribute("class", "hanbok_address")
            newIcon.setAttribute("class", "card-icon")
            newHeart.setAttribute("class", "heart")
            newBook.setAttribute("class", "bookmark")
            newHeartImg.setAttribute("src", "/assets/img/Heart-outline.svg")
            newHeartImg.setAttribute("alt", "")
            newBookImg.setAttribute("alt", "")


            //로그인 여부 판단
            if (payload) {
                const payload_parse = JSON.parse(payload)

                if (store.likes.includes(payload_parse.user_id)) {
                    likeOn = 1
                    newHeartImg.setAttribute("src", "/assets/img/Heart-full.svg")
                } else {
                    likeOn = 0
                    newHeartImg.setAttribute("src", "/assets/img/Heart-outline.svg")
                }

                if (store.store_bookmarks.includes(payload_parse.user_id)) {
                    bookOn = 1
                    newBookImg.setAttribute("src", "/assets/img/Bookmark-full.svg")
                } else {
                    bookOn = 0
                    newBookImg.setAttribute("src", "/assets/img/Bookmark-outline.svg")
                }
                newHeartImg.setAttribute("onclick", "likeBtn(" + store.id + `,${likeOn})`)
                newBookImg.setAttribute("onclick", "bookBtn(" + store.id + `,${bookOn})`)
            } else {
                newHeartImg.setAttribute("src", "/assets/img/Heart-outline.svg")
                newBookImg.setAttribute("src", "/assets/img/Bookmark-outline.svg")
            }

            newStore.innerText = store.store_name
            newAdd.innerText = store.store_address
            newHeartNum.innerText = store.total_likes
            newCate.innerText = "전통한복"  //카테고리 가져오기


        })
    }
}

async function bookedStore() {
    const response = await fetch(`${backend_base_url}/users/me/`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("요청이 실패했습니다!")
    }
}

async function storeLink(store_id) {
    location.href = `${frontend_base_url}/store-detail.html?hanbokstore_id=${store_id}`
}

async function bookBtn(store_id, bookOn) {
    const response = await fetch(`${backend_base_url}/api/v1/stores/${store_id}/bookmark/`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    }
    )
    switch (response.status) {
        case 200:
            if (bookOn == 0) {
                alert("북마크했습니다!")
            }
            if (bookOn == 1) {
                alert("북마크를 취소했습니다!")
            }
            location.replace(`${frontend_base_url}/profile-storebookmark.html`)
            break
        case 400:
            alert("잘못된 요청입니다.")
            location.replace(`${frontend_base_url}/profile-storebookmark.html`)
            break
        case 401:
            alert("로그인 권한이 만료되었습니다. 다시 로그인해주세요.")
            location.replace(`${frontend_base_url}/home.html`)
            break

    }
}

async function likeBtn(store_id, likeOn) {
    const response = await fetch(`${backend_base_url}/api/v1/stores/${store_id}/like/`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    }
    )
    switch (response.status) {
        case 200:
            if (likeOn == 0) {
                alert("좋아요를 눌렀습니다!")
            }
            if (likeOn == 1) {
                alert("좋아요를 취소했습니다!")
            }

            location.replace(`${frontend_base_url}/profile-storebookmark.html`)
            break
        case 400:
            alert("잘못된 요청입니다.")
            location.replace(`${frontend_base_url}/profile-storebookmark.html`)
            break
        case 401:
            alert("로그인 권한이 만료되었습니다. 다시 로그인해주세요.")
            location.replace(`${frontend_base_url}/home.html`)
            break

    }
}
