let positions = []
let mapContainer = document.getElementById('map')
let mapOptions = {
    center: new kakao.maps.LatLng(37.5714476873524, 126.998320034926),
    level: 3
}
let map = new kakao.maps.Map(mapContainer, mapOptions);
let bounds = new kakao.maps.LatLngBounds();
let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; // 마커 이미지 생성


StoresList()


async function StoresList() {
    const response = await fetch(`${backend_base_url}/api/v1/stores/`, { method: GET });
    const response_json = await response.json()
    const storeCard = document.getElementById("store-list-body");
    response_json["StoreList"].forEach(store => {

        const newCon = document.createElement("div")
        newCon.setAttribute("class", "contant-card")
        const newTitle = document.createElement("div")
        newTitle.setAttribute("class", "store-title")
        const newCate = document.createElement("p")
        newCate.setAttribute("class", "hanbok_category")
        const newStore = document.createElement("p")
        newStore.setAttribute("class", "hanbok_store")
        newTitle.setAttribute("onclick", "storeLink(" + store.id + ")")
        const newAdd = document.createElement("p")
        newAdd.setAttribute("class", "hanbok_address")
        const newIcon = document.createElement("div")
        newIcon.setAttribute("class", "card-icon")
        const newHeart = document.createElement("div")
        newHeart.setAttribute("class", "heart")
        const newBook = document.createElement("div")
        newBook.setAttribute("class", "bookmark")
        const newHeartImg = document.createElement("img")
        newHeartImg.setAttribute("src", "/assets/img/Heart-outline.svg")
        newHeartImg.setAttribute("alt", "")
        const newBookImg = document.createElement("img")
        newBookImg.setAttribute("alt", "")
        const newHeartNum = document.createElement("span")
        let likeOn
        let bookOn

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
        storeCard.appendChild(newCon)



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
        newCate.innerText = "전통한복"

        positions.push({
            title: store.store_name,
            latlng: new kakao.maps.LatLng(store.location_y, store.location_x)
        })

    })
}


for (var i = 0; i < positions.length; i++) {
    var imageSize = new kakao.maps.Size(24, 35);
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    var marker = new kakao.maps.Marker({
        map: map,
        position: positions[i].latlng,
        title: positions[i].title,
        image: markerImage,
        clickable: true

    })
    bounds.extend(positions[i].latlng);
    map.setBounds(bounds)

}


async function storeLink(store_id) {
    console.log(store_id)
    location.href = `${frontend_base_url}/store-detail.html?hanbokstore_id=${store_id}`
}

async function bookBtn(store_id, bookOn) {
    const response = await fetch(`${backend_base_url}/api/v1/stores/${store_id}/bookmark/`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
            "X-CSRFToken": '{{csrf_token}}'
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
            location.replace(`${frontend_base_url}/store.html`)
            break
        case 400:
            alert("잘못된 요청입니다.")
            location.replace(`${frontend_base_url}/store.html`)
            break
        case 401:
            alert("로그인 권한이 만료되었습니다. 다시 로그인해주세요.")
            location.replace(`${frontend_base_url}/login.html`)
            break

    }
}

async function likeBtn(store_id, likeOn) {
    const response = await fetch(`${backend_base_url}/api/v1/stores/${store_id}/like/`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
            "X-CSRFToken": '{{csrf_token}}'
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

            location.replace(`${frontend_base_url}/store.html`)
            break
        case 400:
            alert("잘못된 요청입니다.")
            location.replace(`${frontend_base_url}/store.html`)
            break
        case 401:
            alert("로그인 권한이 만료되었습니다. 다시 로그인해주세요.")
            location.replace(`${frontend_base_url}/login.html`)
            break

    }
}
