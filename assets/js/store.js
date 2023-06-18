
window.onload = async function loadStoreList() {
    
    var positions =[]
    //한복점 html 카드 생성
    const storeCard = document.getElementById("store-list-body")
    stores = await store()
    // console.log("여기여기여기 : ", stores["StoreList"][0])
    stores["StoreList"].forEach(store => {
        
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

        
        storeCard.appendChild(newCon)

        newCon.appendChild(newTitle)
        newTitle.appendChild(newCate)
        newTitle.appendChild(newStore)
        newCon.appendChild(newAdd)

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
        newAdd.setAttribute("class", "hanbok_address")
        newIcon.setAttribute("class", "card-icon")
        newHeart.setAttribute("class", "heart")
        newBook.setAttribute("class", "bookmark")
        newHeartImg.setAttribute("src", "../assets/img/Heart-outline.svg")
        newHeartImg.setAttribute("alt", "")
        newBookImg.setAttribute("src", "../assets/img/Bookmark-outline.svg")
        newBookImg.setAttribute("alt", "")
        //북마크 표시
        // if (store.store_bookmarks == 1){
        //     newBookImg.setAttribute("src", "../assets/img/Bookmark-full.svg")
        // } else {
        //     newBookImg.setAttribute("src", "../assets/img/Bookmark-outline.svg")
        // }

        newStore.innerText=store.store_name
        newAdd.innerText=store.store_address
        newHeartNum.innerText=store.total_likes
        newCate.innerText = "전통한복"  //카테고리 가져오기
        
        
        //한복점 포지션 리스트 생성
        positions.push({
            title: store.store_name,
            latlng: new kakao.maps.LatLng(store.location_y,store.location_x)   
        })
        
    })

    //지도 생성
    var mapContainer = document.getElementById('map')
    var mapOptions = {
        center: new kakao.maps.LatLng( 37.5714476873524,126.998320034926),
        level: 3
    }
    var map = new kakao.maps.Map(mapContainer, mapOptions);
    var bounds = new kakao.maps.LatLngBounds();  

    // 마커 이미지 생성
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        
    for (var i = 0; i < positions.length; i ++) {
        var imageSize = new kakao.maps.Size(24, 35);  
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        var marker = new kakao.maps.Marker({
            map: map,
            position: positions[i].latlng,
            title : positions[i].title,
            image : markerImage 
            
        })
        // marker.setMap(map);
        bounds.extend(positions[i].latlng);
        map.setBounds(bounds)
    }
   
}

//한복집 리스트 가져오기
async function store() {
    const response = await fetch(`${backend_base_url}/api/v1/stores/`)
    if(response.status==200){
        const response_json = await response.json()
        return response_json 
    }else{
        alert("요청이 실패했습니다!")
    }
}