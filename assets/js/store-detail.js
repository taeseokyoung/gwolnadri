var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1.8,
    spaceBetween: 15,
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
    },
});


window.onload = async function HanbokStoreDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    hanbokstore_id = urlParams.get('hanbokstore_id');


    const response = await fetch(`${backend_base_url}/api/v1/stores/${hanbokstore_id}`, {
    })
    if (response.status == 200) {
        const response_json = await response.json()

        const get_name = response_json.Store.store_name
        const get_address = response_json.Store.store_address
        const get_x = response_json.Store.location_x
        const get_y = response_json.Store.location_y
        const get_likes = response_json.Store.likes
        const get_total_likes = response_json.Store.total_likes
        const get_bookmarks = response_json.Store.store_bookmarks
        const get_avgstar = response_json.Store.avg_stars.avg_stars
        const get_cate = response_json.Store.tags[0]

        const comments = response_json.Comment
        const store_cate = document.getElementById("hanbok_category")
        const store_name = document.getElementById('store_name')
        const store_address = document.getElementById('store_address')

        const store_likes = document.getElementById('heart')
        const store_bookmarks = document.getElementById('bookmark')

        const newAvgGrade = document.createElement("span")
        const newHeartImg = document.createElement("img")
        const newBookImg = document.createElement("img")
        const newHeartNum = document.createElement("span")
        let likeOn
        let bookOn

        store_name.innerText = get_name
        store_address.innerText = get_address
        newHeartNum.innerText = get_total_likes

        // 카테고리가 있는 경우 | 없는 경우
        if (get_cate == null) {
            store_cate.innerText = "전통한복"
        } else {
            store_cate.innerText = get_cate
        }

        // 평균 별점이 없는경우|있는경우
        if (get_avgstar == null) {
            newAvgGrade.innerText = " "
        } else {
            newAvgGrade.innerText = " ⭐️" + get_avgstar.toFixed(2)
        }

        store_name.appendChild(newAvgGrade)
        store_likes.appendChild(newHeartImg)
        store_likes.appendChild(newHeartNum)
        store_bookmarks.appendChild(newBookImg)

        //---로그인 사용자의 경우
        if (payload) {
            const payload_parse = JSON.parse(payload)

            //좋아요 표시
            if (get_likes.includes(payload_parse.user_id)) {
                likeOn = 1
                newHeartImg.setAttribute("src", "/assets/img/Heart-full.svg")
            } else {
                likeOn = 0
                newHeartImg.setAttribute("src", "/assets/img/Heart-outline.svg")
            }
            //북마크 표시
            if (get_bookmarks.includes(payload_parse.user_id)) {
                bookOn = 1
                newBookImg.setAttribute("src", "/assets/img/Bookmark-full.svg")
            } else {
                bookOn = 0
                newBookImg.setAttribute("src", "/assets/img/Bookmark-outline.svg")
            }

            const newFormBtn = document.getElementById("create-comment-btn")
            newFormBtn.setAttribute("onclick", `submitComment(${hanbokstore_id})`)
        } else {
            //비로그인 사용자의 경우
            newHeartImg.setAttribute("src", "/assets/img/Heart-outline.svg")
            newBookImg.setAttribute("src", "/assets/img/Bookmark-outline.svg")
            //document.getElementById("js_input").style.display = "none";
        }
        newHeartImg.setAttribute("onclick", `likeBtn(${likeOn})`)
        newBookImg.setAttribute("onclick", `bookBtn(${bookOn})`)


        const hanbok = document.getElementById("hanbok_list");

        response_json.HanbokList.forEach(hanboks => {
            const div = document.createElement("div")
            div.setAttribute("class", "sub-card swiper-slide sh_slide")

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
        KakaoMap(get_x, get_y, get_name)

        const comment_input = document.getElementById('review')
        if (comments.length == 0) {
            const noReviewContainElement = document.createElement('div')
            noReviewContainElement.className = 'contant-page'

            const noReviewTextElement = document.createElement('p')
            noReviewTextElement.className = 'NoneText'
            noReviewTextElement.textContent = "리뷰가 없습니다."

            noReviewContainElement.appendChild(noReviewTextElement)
            comment_input.appendChild(noReviewContainElement)
        } else {
            //후기 생성
            const comment = document.getElementById('content-list');
            comments.forEach(comments => {
                const newCard = document.createElement("div")
                const newImage = document.createElement("img")
                const newText = document.createElement("div")
                const newUser = document.createElement("div")
                const newGrade = document.createElement("p")
                const newContent = document.createElement("p")
                const review_button = document.createElement("div")
                let starNum

                newCard.setAttribute("class", "review-card")
                newCard.setAttribute("id", `${comments.id}`)
                newImage.setAttribute("class", "review_image")

                newImage.setAttribute("src", `${backend_base_url}${comments.review_image}`)
                newImage.setAttribute("alt", "")
                newText.setAttribute("class", "review-txt")
                newGrade.setAttribute("class", "grade")
                switch (comments.grade) {
                    case 1:
                        starNum = "⭐️"
                        break
                    case 2:
                        starNum = "⭐️⭐️"
                        break
                    case 3:
                        starNum = "⭐️⭐️⭐️"
                        break
                    case 4:
                        starNum = "⭐️⭐️⭐️⭐️"
                        break
                    case 5:
                        starNum = "⭐️⭐️⭐️⭐️⭐️"
                        break
                }
                newGrade.innerText = "별점 : " + starNum
                newUser.setAttribute("class", "content")
                newUser.innerText = " 작성자 : " + comments.username
                newContent.setAttribute("class", "content")
                newContent.innerText = comments.content
                review_button.setAttribute("class", "review-button")

                comment.insertBefore(newCard, comment.firstChild);
                newCard.appendChild(newImage)
                newCard.appendChild(review_button)
                newText.appendChild(newUser)
                newText.appendChild(newGrade)
                newText.appendChild(newContent)


                review_button.appendChild(newText)

                //로그인사용자와 후기 작성자가 같으면 수정버튼 활성화
                if (payload) {
                    if (comments.user == payload_parse.user_id) {
                        const newBtnCase = document.createElement("div")
                        const newEditBtn = document.createElement("button")
                        const newDelBtn = document.createElement("button")

                        newBtnCase.setAttribute("class", "button-case")
                        newEditBtn.setAttribute("type", "button")
                        newEditBtn.setAttribute("class", "njs-button")
                        newDelBtn.setAttribute("type", "button")
                        newDelBtn.setAttribute("class", "njs-button")
                        newEditBtn.setAttribute("onclick", `EditComment(${comments.id})`)
                        newDelBtn.setAttribute("onclick", `DeleteComment(${comments.id})`)
                        newBtnCase.setAttribute("style", "display: flex;")
                        newEditBtn.innerText = "수정"
                        newDelBtn.innerText = "삭제"

                        review_button.appendChild(newBtnCase)
                        newBtnCase.appendChild(newEditBtn)
                        newBtnCase.appendChild(newDelBtn)
                    }
                }
            })
        }

    } else if (response.status == 404) {
        alert("존재하지 않는 페이지 입니다.")
        window.location.href = `${index_url}`
    } else {
        alert(response.status)
    }
}

async function SelectItem(hanbok_id) {
    if (payload) {
        window.location.href = `${frontend_base_url}/select_hanbok.html?hanbok_id=${hanbok_id}`
    } else {
        alert('로그인이 필요합니다')
        location.replace(`${frontend_base_url}/login.html`)
    }
}

async function KakaoMap(lng, lat, name) {
    var Position = new kakao.maps.LatLng(lat, lng);
    var mapContainer = document.getElementById('map')
    var mapOptions = {
        center: Position,
        level: 1
    }
    var map = new kakao.maps.Map(mapContainer, mapOptions);
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    var imageSize = new kakao.maps.Size(24, 35);
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    var marker = new kakao.maps.Marker({
        map: map,
        position: Position,
        title: name,
        image: markerImage,
        clickable: true
    })
}

async function submitComment(hanbokstore_id) {
    if (payload) {
        const newStar = document.getElementById("new-star")
        const grade = newStar.options[newStar.selectedIndex].value
        const content = document.getElementById("new-comment").value
        const review_image = document.getElementById("image").files[0]
        const maxSixe = 2 * 1024 * 1024
        if (!content) {
            alert("댓글 내용을 입력해주세요.")
            location.replace(`${frontend_base_url}/store-detail.html?hanbokstore_id=${hanbokstore_id}`)

        } else {
            if (content.length > 50) {
                alert("50자 이내로 작성해주세요.")
                location.replace(`${frontend_base_url}/store-detail.html?hanbokstore_id=${hanbokstore_id}`)

            } else if (grade == " ") {
                alert("별점을 선택해주세요.")
                location.replace(`${frontend_base_url}/store-detail.html?hanbokstore_id=${hanbokstore_id}`)

            } else if (!review_image) {
                alert("이미지를 넣어주세요.")
                location.replace(`${frontend_base_url}/store-detail.html?hanbokstore_id=${hanbokstore_id}`)
            } else {
                if (review_image.size >= maxSixe) {
                    alert("이미지가 너무 큽니다.")
                    location.replace(`${frontend_base_url}/store-detail.html?hanbokstore_id=${hanbokstore_id}`)
                } else {
                    const formdata = new FormData()

                    formdata.append("grade", grade)
                    formdata.append("content", content)
                    formdata.append("review_image", review_image)

                    if (token) {
                        const response = await fetch(`${backend_base_url}/api/v1/stores/${hanbokstore_id}/comments/`, {
                            method: 'POST',
                            headers: {
                                "Authorization": `Bearer ${token}`,
                            },
                            body: formdata
                        })
                        switch (response.status) {
                            case 200:
                                alert("후기작성 완료!")
                                location.replace(`${frontend_base_url}/store-detail.html?hanbokstore_id=${hanbokstore_id}`)
                                break
                            case 400:
                                alert("빈칸을 모두 채워주세요.")
                                break
                            case 401:
                                alert("로그인이 필요합니다.")
                                location.replace(`${frontend_base_url}/login.html`)
                                break
                        }
                    } else {
                        alert("로그인이 필요합니다.")
                        location.replace(`${frontend_base_url}/login.html`)
                    }
                }
            }
        } 
    } else {
        alert("로그인이 필요합니다.")
        location.replace(`${frontend_base_url}/login.html`)
    }
}


async function EditComment(comments_id) {

    const prevComment = document.getElementById(comments_id)
    const prevImg = prevComment.children[0].src
    const prevStar = prevComment.children[1].children[0].children[1].innerText.split(':')[1]
    const prevTxt = prevComment.children[1].children[0].children[2].innerText

    prevComment.children[0].setAttribute("style", "display:none")
    prevComment.children[1].setAttribute("style", "display:none")

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

    reviewCard.setAttribute("style", "width: 100%;")
    formCard.setAttribute("style", "width: 100%;")
    newFormReview1.setAttribute("class", "review-content")
    newFormReview2.setAttribute("class", "review-content")
    newSelect.setAttribute("id", "new-star-edit")
    newOption.setAttribute("value", " ")
    newOption1.setAttribute("value", "1")
    newOption2.setAttribute("value", "2")
    newOption3.setAttribute("value", "3")
    newOption4.setAttribute("value", "4")
    newOption5.setAttribute("value", "5")
    switch (prevStar) {
        case ' ⭐️':
            newOption1.setAttribute("selected", "selected")
            break
        case ' ⭐️⭐️':
            newOption2.setAttribute("selected", "selected")
            break
        case ' ⭐️⭐️⭐️':
            newOption3.setAttribute("selected", "selected")
            break
        case ' ⭐️⭐️⭐️⭐️':
            newOption4.setAttribute("selected", "selected")
            break
        case ' ⭐️⭐️⭐️⭐️⭐️':
            newOption5.setAttribute("selected", "selected")
            break
    }

    newInputTxt.setAttribute("type", "text")
    newInputTxt.setAttribute("id", "new-comment-edit")
    newInputTxt.setAttribute("style", "width:90%;")
    newInputTxt.setAttribute("placeholder", prevTxt)
    newInputImg.setAttribute("type", "file")
    newInputImg.setAttribute("id", "image-edit")
    newInputImg.setAttribute("class", "sh_input_img")
    newInputImg.setAttribute("onchange", "readURLEdit(this);")
    newPreImg.setAttribute("id", "preview-edit")
    newPreImg.setAttribute("src", prevImg)
    newFormBtn.setAttribute("type", "button")
    newFormBtn.setAttribute("class", "njs-button")
    newFormBtn.setAttribute("onclick", `saveEditComment(${comments_id},"${prevTxt}","${prevImg}")`)

    prevComment.appendChild(reviewCard)
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
    newFormBtn.innerText = "수정완료"
}

async function saveEditComment(comments_id, prevTxt, prevImg) {
    let standby = 0
    if (payload) {
        const newStar = document.getElementById("new-star-edit")
        const grade = newStar.options[newStar.selectedIndex].value
        const content = document.getElementById("new-comment-edit").value
        const review_image = document.getElementById("image-edit").files[0]
        const maxSixe = 2 * 1024 * 1024

        const formdata = new FormData()
        formdata.append("grade", grade)

        if (content.length > 50) {
            alert("50자 이내로 작성해주세요.")
            location.replace(`${frontend_base_url}/store-detail.html?hanbokstore_id=${hanbokstore_id}`)

        } else {
            if (!content) {
                formdata.append("content", prevTxt)

            } else {
                formdata.append("content", content)
            }

            if (!review_image) {
                alert("이미지를 넣어주세요.")

            } else if (review_image >= maxSixe) {
                alert("이미지가 너무 큽니다. 다른 이미지를 넣어주세요.")

            } else {
                formdata.append("review_image", review_image)
                standby = 1
            }

            if (standby == 1) {
                const response = await fetch(`${backend_base_url}/api/v1/stores/comments/${comments_id}/`, {
                    method: 'PUT',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    body: formdata
                }
                )
                switch (response.status) {
                    case 200:
                        alert("후기 수정 완료!")
                        location.replace(`${frontend_base_url}/store-detail.html?hanbokstore_id=${hanbokstore_id}`)
                        break
                    case 400:
                        alert("빈칸을 모두 채워주세요.")
                        break
                    case 401:
                        alert("로그인이 필요합니다")
                        location.replace(`${frontend_base_url}/login.html`)
                        break

                }
            }


        }
    }
}

async function DeleteComment(comments_id) {
    const response = await fetch(`${backend_base_url}/api/v1/stores/comments/${comments_id}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`
        },
    }
    )
    switch (response.status) {
        case 204:
            alert("삭제 완료!")
            location.replace(`${frontend_base_url}/store-detail.html?hanbokstore_id=${hanbokstore_id}`)
            break
        case 401:
            alert("로그인이 필요합니다")
            location.replace(`${frontend_base_url}/login.html`)
            break
    }
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('preview').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        document.getElementById('preview').src = "";
    }
}

function readURLEdit(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('preview-edit').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        document.getElementById('preview-edit').src = "";
    }
}

async function likeBtn(likeOn) {
    const response = await fetch(`${backend_base_url}/api/v1/stores/${hanbokstore_id}/like/`, {
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

            location.replace(`${frontend_base_url}/store-detail.html?hanbokstore_id=${hanbokstore_id}`)
            break
        case 400:
            alert(response.status)
            break
        case 401:
            alert("로그인이 필요합니다.")
            location.replace(`${frontend_base_url}/login.html`)
            break

    }
}

async function bookBtn(bookOn) {
    const response = await fetch(`${backend_base_url}/api/v1/stores/${hanbokstore_id}/bookmark/`, {
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

            location.replace(`${frontend_base_url}/store-detail.html?hanbokstore_id=${hanbokstore_id}`)
            break
        case 400:
            alert(response.status)
            break
        case 401:
            alert("로그인이 필요합니다")
            location.replace(`${frontend_base_url}/login.html`)
            break

    }
}
