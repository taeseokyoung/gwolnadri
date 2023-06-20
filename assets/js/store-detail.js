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
        // console.log(response_json)

        const get_name = response_json.Store.store_name
        const get_address = response_json.Store.store_address
        const get_x = response_json.Store.location_x
        const get_y = response_json.Store.location_y
        const get_likes = response_json.Store.likes
        const get_total_likes = response_json.Store.total_likes
        const get_bookmarks = response_json.Store.store_bookmarks
        const get_avgstar = response_json.Store.avg_stars.avg_stars
        // console.log(get_avgstar)

        const comments = response_json.Comment
        // console.log(comments)\
        const store_name = document.getElementById('store_name');
        const store_address = document.getElementById('store_address');
        
        const store_likes = document.getElementById('heart');
        const store_bookmarks = document.getElementById('bookmark');
        
        const newAvgGrade = document.createElement("span")
        const newHeartImg = document.createElement("img")
        const newBookImg = document.createElement("img")
        const newHeartNum = document.createElement("span")

        store_name.innerText = get_name
        store_address.innerText = get_address
        newHeartNum.innerText = get_total_likes

        // 평균 별점이 없는경우|있는경우
        if (get_avgstar==null){
            newAvgGrade.innerText = " "
        } else {
            newAvgGrade.innerText = " " +get_avgstar
        }
 
        store_name.appendChild(newAvgGrade)
        store_likes.appendChild(newHeartImg)
        store_likes.appendChild(newHeartNum)
        store_bookmarks.appendChild(newBookImg)

        //로그인 여부 판단
        if (payload){
            const payload_parse = JSON.parse(payload)
            //하트 표시
            if (get_likes.includes(payload_parse.user_id)){
                newHeartImg.setAttribute("src", "../assets/img/Heart-full.svg")
            } else {
                newHeartImg.setAttribute("src", "../assets/img/Heart-outline.svg")
            }

            //북마크 표시
            if (get_bookmarks.includes(payload_parse.user_id)){
                newBookImg.setAttribute("src", "../assets/img/Bookmark-full.svg")
            } else {
                newBookImg.setAttribute("src", "../assets/img/Bookmark-outline.svg")
            }
        } else {
            newHeartImg.setAttribute("src", "../assets/img/Heart-outline.svg")
            newBookImg.setAttribute("src", "../assets/img/Bookmark-outline.svg")
        }

        const hanbok = document.getElementById('hanbok_list');
        // console.log(response_json.HanbokList)
        response_json.HanbokList.forEach(hanboks => {
            // console.log(hanboks)

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

        KakaoMap(get_x,get_y,store_name.innerText)

        //후기 생성
        const comment = document.getElementById('content-list');
        comments.forEach(comments => {
            // console.log(comments)
            const newCard = document.createElement("div")
            const newImage = document.createElement("img")
            const newText = document.createElement("div")
            const newGrade = document.createElement("p")
            const newContent = document.createElement("p")

            newCard.setAttribute("class","review-card")
            newImage.setAttribute("class","review_image")
            newImage.setAttribute("src", `${backend_base_url}${comments.review_image}`)
            newImage.setAttribute("alt","")
            newText.setAttribute("class", "review-txt")
            newGrade.setAttribute("class","grade")
            newGrade.innerText = "별점 : "+comments.grade
            newContent.setAttribute("class", "content")
            newContent.innerText = comments.content

            comment.appendChild(newCard)
            newCard.appendChild(newImage)
            newCard.appendChild(newText)
            newText.appendChild(newGrade)
            newText.appendChild(newContent)
        })

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

// 한복점 후기 작성
async function submitComment(){
    const newStar = document.getElementById("new-star")
    const value = newStar.options[newStar.selectedIndex].value
    const newComment = document.getElementById("new-comment").value
    console.log("내가 작성한 댓글: ", newComment, "내 별점 : ",value)
}

// 업로드 이미지 미리보기
function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('preview').src = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      document.getElementById('preview').src = "";
    }
  }