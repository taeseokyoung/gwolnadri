
window.onload = async function loadStoreList() {
    
    const payload = localStorage.getItem("payload")
    
    
    //지도 생성
    var positions =[]
    var mapContainer = document.getElementById('map')
    var mapOptions = {
        center: new kakao.maps.LatLng( 37.5714476873524,126.998320034926),
        level: 3
    }
    var map = new kakao.maps.Map(mapContainer, mapOptions);
    var bounds = new kakao.maps.LatLngBounds();
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; // 마커 이미지 생성
     

    //한복점 html 카드 생성
    const storeCard = document.getElementById("store-list-body")
    stores = await store()
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
        newStore.setAttribute("onClick", "storeLink("+store.id+")")
        newAdd.setAttribute("class", "hanbok_address")
        newIcon.setAttribute("class", "card-icon")
        newHeart.setAttribute("class", "heart")
        newBook.setAttribute("class", "bookmark")
        newHeartImg.setAttribute("src", "../assets/img/Heart-outline.svg")
        newHeartImg.setAttribute("alt", "")
        newBookImg.setAttribute("alt", "")

        //로그인 여부 판단
        if (payload){
            const payload_parse = JSON.parse(payload)
            //하트 표시
            if (store.likes.includes(payload_parse.user_id)){
                newHeartImg.setAttribute("src", "../assets/img/Heart-full.svg")
            } else {
                newHeartImg.setAttribute("src", "../assets/img/Heart-outline.svg")
            }

            //북마크 표시
            if (store.store_bookmarks.includes(payload_parse.user_id)){
                newBookImg.setAttribute("src", "../assets/img/Bookmark-full.svg")
            } else {
                newBookImg.setAttribute("src", "../assets/img/Bookmark-outline.svg")
            }
        } else {
            newHeartImg.setAttribute("src", "../assets/img/Heart-outline.svg")
            newBookImg.setAttribute("src", "../assets/img/Bookmark-outline.svg")
        }
        

        // console.log("여기 : ", store.id)
        newStore.innerText=store.store_name
        newAdd.innerText=store.store_address
        newHeartNum.innerText=store.total_likes
        newCate.innerText = "전통한복"  //카테고리 가져오기
        
        //한복점 포지션 리스트 생성
        positions.push({
            title: store.store_name,
            latlng: new kakao.maps.LatLng(store.location_y,store.location_x)
        })
        
        // //한복점 아이디 리스트 생성
        // storeId.push({
        //     id: store.id,
        // })
        
    })
      

       
    for (var i = 0; i < positions.length; i ++) {
        var imageSize = new kakao.maps.Size(24, 35);  
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        var marker = new kakao.maps.Marker({
            map: map,
            position: positions[i].latlng,
            title : positions[i].title,
            image : markerImage, 
            clickable: true
            
        })
        bounds.extend(positions[i].latlng);
        map.setBounds(bounds)
        
    }

//     kakao.maps.event.addListener(marker, 'click', function() {
//         // 마커를 클릭해도 상점 디테일 페이지로 이동
        
//         console.log(marker[0]); 
       
            
//         // storeLink(storeId[i].id)
//   });
    
   
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

async function storeLink(store_id) {
    console.log(store_id)
    location.href = `${frontend_base_url}/store-detail.html?hanbokstore_id=${store_id}`
}