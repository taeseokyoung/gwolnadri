var swiper = new Swiper(".mySwiper", {
    slidesPerView: 2.5,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});


window.onload = async function HanbokStoreDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    hanbokstore_id = urlParams.get('hanbokstore_id');
    

    const response = await fetch(`${backend_base_url}/api/v1/stores/${hanbokstore_id}`, {
    })
    if (response.status == 200) {
        const response_json = await response.json()
        console.log(response_json)

        const get_name = response_json.Store.store_name
        const get_address = response_json.Store.store_address
        const get_x = response_json.Store.location_x
        const get_y = response_json.Store.location_y

        const store_name = document.getElementById('store_name');
        const store_address = document.getElementById('store_address');
        store_name.innerText = get_name
        store_address.innerText = get_address

        const hanbok = document.getElementById('hanbok_list');
        console.log(response_json.HanbokList)
        response_json.HanbokList.forEach(hanboks => {
            console.log(hanboks)

            const div = document.createElement("div")
            div.setAttribute("class", "sub-card swiper-slide")

            const img = document.createElement("img")
            img.setAttribute("src", `${backend_base_url}${hanboks.hanbok_image}`)

            const div2 = document.createElement("div")
            div2.setAttribute("class", "sub-card-txt")

            const name = document.createElement("h3");
            name.setAttribute("class", "title")
            name.innerText = hanboks.hanbok_name

            const price = document.createElement("p");
            price.setAttribute("class", "event-price")
            price.innerText = hanboks.hanbok_price + " ~"

            const btn = document.createElement("button");
            btn.setAttribute("type", "button")
            btn.setAttribute("onclick", `SelectItem(${hanboks.id})`)
            btn.innerText = "예약하기"

            div.appendChild(img)
            div.appendChild(div2)
            div2.appendChild(name)
            div2.appendChild(price)
            div2.appendChild(btn)
            hanbok.insertBefore(div, hanbok.firstChild);
        })
        // console.log(get_x,get_y)
        KakaoMap(get_x,get_y,store_name.innerText)

    } else {
        alert(response.status)
    }
}

async function SelectItem(hanbok_id) {
    window.location.href = `${frontend_base_url}/select_hanbok.html?hanbok_id=${hanbok_id}`
}

//지도 생성
async function KakaoMap(lng,lat,name){
    var Position  = new kakao.maps.LatLng(lat,lng);      
    var mapContainer = document.getElementById('map')
    var mapOptions = {
        center: Position,
        level: 1
    }
    var map = new kakao.maps.Map(mapContainer, mapOptions);
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; // 마커 이미지 생성
    var imageSize = new kakao.maps.Size(24, 35);  
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        var marker = new kakao.maps.Marker({
            map: map,
            position: Position,
            title : name,
            image : markerImage, 
            clickable: true
        })
}