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
            newAvgGrade.innerText = " ⭐️" +get_avgstar.toFixed(2)
        }
 
        store_name.appendChild(newAvgGrade)
        store_likes.appendChild(newHeartImg)
        store_likes.appendChild(newHeartNum)
        store_bookmarks.appendChild(newBookImg)

        //로그인한 경우에만 후기작성이 보여야함
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

            //후기 작성 
            const commentList = document.getElementById("content-list")
            const reviewCard = document.createElement("div")
            const formCard = document.createElement("form")
            const newFormReview1 = document.createElement("div")
            const newFormReview2 = document.createElement("div")
            const newSelect = document.createElement("select")
            const newOption = document.createElement("option")
            const newOption1 = document.createElement("option")
            const newOption2 = document.createElement("option")
            const newOption3 = document.createElement("option")
            const newOption4 = document.createElement("option")
            const newOption5 = document.createElement("option")
            const newInputTxt = document.createElement("input")
            const newInputImg = document.createElement("input")
            const newPreImg = document.createElement("img")
            const newFormBtn = document.createElement("button")

            reviewCard.setAttribute("class", "review-card")
            formCard.setAttribute("style", "width: 100%;")
            newFormReview1.setAttribute("class", "review-content")
            newFormReview2.setAttribute("class", "review-content")
            newSelect.setAttribute("id", "new-star")
            newOption.setAttribute("value", "")
            newOption1.setAttribute("value", "1")
            newOption2.setAttribute("value", "2")
            newOption3.setAttribute("value", "3")
            newOption4.setAttribute("value", "4")
            newOption5.setAttribute("value", "5")
            newInputTxt.setAttribute("type","text")
            newInputTxt.setAttribute("id","new-comment")
            newInputTxt.setAttribute("style","width:90%;")
            newInputImg.setAttribute("type", "file")
            newInputImg.setAttribute("id", "image")
            newInputImg.setAttribute("style", "width:55%;")
            newInputImg.setAttribute("onchange", "readURL(this);")
            newPreImg.setAttribute("id", "preview")
            newPreImg.setAttribute("style", "width:200px; height:200px; object-fit:cover;")
            newFormBtn.setAttribute("type", "button")
            newFormBtn.setAttribute("class", "njs-button")
            newFormBtn.setAttribute("onclick", `submitComment(${hanbokstore_id})`)

            commentList.appendChild(reviewCard)
            reviewCard.appendChild(formCard)
            formCard.appendChild(newFormReview1)
            formCard.appendChild(newFormReview2)
            newFormReview1.appendChild(newSelect)
            newFormReview1.appendChild(newInputTxt)
            newSelect.appendChild(newOption)
            newSelect.appendChild(newOption1)
            newSelect.appendChild(newOption2)
            newSelect.appendChild(newOption3)
            newSelect.appendChild(newOption4)
            newSelect.appendChild(newOption5)
            newFormReview2.appendChild(newInputImg)
            newFormReview2.appendChild(newPreImg)
            formCard.appendChild(newFormBtn)
            
            newOption.innerText = "별점선택"
            newOption1.innerText = "⭐️"
            newOption2.innerText = "⭐️⭐️"
            newOption3.innerText = "⭐️⭐️⭐️"
            newOption4.innerText = "⭐️⭐️⭐️⭐️"
            newOption5.innerText = "⭐️⭐️⭐️⭐️⭐️"
            newFormBtn.innerText = "작성완료"


        } else {
            newHeartImg.setAttribute("src", "../assets/img/Heart-outline.svg")
            newBookImg.setAttribute("src", "../assets/img/Bookmark-outline.svg")
        }

        const hanbok = document.getElementById("hanbok_list");
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
            let starNum

            newCard.setAttribute("class","review-card")
            newCard.setAttribute("id", `${comments.id}`)
            newImage.setAttribute("class","review_image")
            newImage.setAttribute("src", `${backend_base_url}${comments.review_image}`)
            newImage.setAttribute("alt","")
            newText.setAttribute("class", "review-txt")
            newGrade.setAttribute("class","grade")
            switch(comments.grade) {
                case 1 :
                    starNum="⭐️"
                    break
                case 2:
                    starNum="⭐️⭐️"
                    break
                case 3:
                    starNum="⭐️⭐️⭐️"
                    break
                case 4:
                    starNum="⭐️⭐️⭐️⭐️"
                    break
                case 5:
                    starNum="⭐️⭐️⭐️⭐️⭐️"
                    break
            }
            newGrade.innerText = "별점 : "+ starNum + " " + comments.grade 
            newContent.setAttribute("class", "content")
            newContent.innerText = comments.content

            comment.appendChild(newCard)
            newCard.appendChild(newImage)
            newCard.appendChild(newText)
            newText.appendChild(newGrade)
            newText.appendChild(newContent)

            //로그인사용자와 후기 작성자가 같으면 수정버튼 활성화
            if (comments.user == payload_parse.user_id){
                const newBtnCase = document.createElement("div")
                const newEditBtn = document.createElement("button")
                const newDelBtn = document.createElement("button")
                newEditBtn.setAttribute("type", "button")
                newDelBtn.setAttribute("type", "button")
                // newEditBtn.setAttribute("class", "njs-button")
                newEditBtn.setAttribute("onclick", `EditComment(${hanbokstore_id},${comments.id})`)
                newDelBtn.setAttribute("onclick", `DeleteComment(${hanbokstore_id},${comments.id})`)
                newBtnCase.setAttribute("style", "display: flex;")
                newEditBtn.innerText = "후기 수정"
                newDelBtn.innerText = "후기 삭제"
                comment.appendChild(newBtnCase)
                newBtnCase.appendChild(newEditBtn)
                newBtnCase.appendChild(newDelBtn)
            }
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
async function submitComment(hanbokstore_id){

    const newStar = document.getElementById("new-star")
    const grade = newStar.options[newStar.selectedIndex].value
    const content = document.getElementById("new-comment").value
    const review_image = document.getElementById("image").files[0]

    const formdata = new FormData()

    formdata.append("grade", grade)
    formdata.append("content", content)
    formdata.append("review_image", review_image)

    if (token){
        const response = await fetch(`${backend_base_url}/api/v1/stores/${hanbokstore_id}/comments/`,{
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formdata
        } 
        )
        switch(response.status){
            case 200 :
                alert("후기작성 완료!")
                location.replace(`${frontend_base_url}/store-detail.html?hanbokstore_id=${hanbokstore_id}`)
                break
            case 400 :
                alert("빈칸을 모두 채워주세요.")
                break
            case 401 :
                alert("로그인 권한이 만료되었습니다. 다시 로그인해주세요.")
                location.replace(`${frontend_base_url}/`)
                break
       
    }
    } else {
        alert("로그인이 필요합니다")
        location.replace(`${frontend_base_url}/`)
    }
    
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

//후기 수정하기
async function EditComment(hanbokstore_id, comments_id){
    //이전 작성한 내용이 들어가있는 후기 작성 페이지 등장!

    const newStar = document.getElementById("new-star")
    const grade = newStar.options[newStar.selectedIndex].value
    const content = document.getElementById("new-comment").value
    const review_image = document.getElementById("image").files[0]

    const formdata = new FormData()

    formdata.append("grade", grade)
    formdata.append("content", content)
    formdata.append("review_image", review_image)

    if (token){
        const response = await fetch(`${backend_base_url}/api/v1/stores/${hanbokstore_id}/comments/${comments.id}`,{
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formdata
        } 
        )
        switch(response.status){
            case 200 :
                alert("후기작성 완료!")
                location.replace(`${frontend_base_url}/store-detail.html?hanbokstore_id=${hanbokstore_id}`)
                break
            case 400 :
                alert("빈칸을 모두 채워주세요.")
                break
            case 401 :
                alert("로그인 권한이 만료되었습니다. 다시 로그인해주세요.")
                location.replace(`${frontend_base_url}/`)
                break
       
    }
    } else {
        alert("로그인이 필요합니다")
        location.replace(`${frontend_base_url}/`)
    }
}

//후기 삭제하기
async function DeleteComment(hanbokstore_id,comments_id){
    const response = await fetch(`${backend_base_url}/api/v1/stores/${hanbokstore_id}/comments/${comments_id}`,{
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`
        },
    } 
    )
    switch(response.status){
        case 204 :
            alert("삭제 완료!")
            location.replace(`${frontend_base_url}/store-detail.html?hanbokstore_id=${hanbokstore_id}`)
            break
        case 401 :
            alert("로그인 권한이 만료되었습니다. 다시 로그인해주세요.")
            location.replace(`${frontend_base_url}/`)
            break

   
}
    
}