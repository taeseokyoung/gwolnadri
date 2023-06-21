const kchf = "https://www.chf.or.kr"

window.onload = async function loadEvents() {
    book_event = await eventList()
    scrap_event = await eventScrapList()

    const content_page = document.querySelector(".contant-page.nonscrap")

    book_event.forEach(nonscrap => {

        if (nonscrap) {
            const sub_card = document.createElement("div")
            sub_card.setAttribute("class", "sub-card")

            const card_image = document.createElement("img")
            card_image.setAttribute("src", `${nonscrap.image}`)
            card_image.setAttribute("onerror", "this.src='https://cdn.eyesmag.com/content/uploads/posts/2023/03/23/NEWMAIN-6bfe982d-aaed-4f32-952d-d2f794c5a155.jpg'")
            sub_card.append(card_image)

            const sub_card_txt = document.createElement("div")
            sub_card_txt.setAttribute("class", "sub-card-txt")
            sub_card.append(sub_card_txt)


            const category = document.createElement("a")
            category.setAttribute("class", "category")
            category.innerText = "전시/행사"
            const title = document.createElement("h3")
            title.setAttribute("class", "title")
            title.innerText = nonscrap.title
            // 행사 시작 - 행사 종료 기간 입력
            const event_date = document.createElement("p")
            event_date.setAttribute("class", "event-date")
            const start_date = nonscrap.event_start_date
            const end_date = nonscrap.event_end_date
            event_date.innerText = start_date + ' - ' + end_date

            // 좋아요, 북마크 아이콘
            const card_icon = document.createElement("div")
            card_icon.setAttribute("class", "card-icon")

            const heart = document.createElement("div")
            heart.setAttribute("class", "heart")

            const bookmark = document.createElement("div")
            bookmark.setAttribute("class", "bookmark")

            const heart_img = document.createElement("img")
            heart_img.setAttribute("src", "/assets/img/Heart-outline.svg")

            const bookmark_img = document.createElement("img")
            bookmark_img.setAttribute("src", "/assets/img/Bookmark-outline.svg")

            // 좋아요 숫자 변경 필요
            const heart_num = document.createElement("span")
            heart_num.innerText = "2"

            heart.append(heart_img, heart_num)
            bookmark.append(bookmark_img)
            card_icon.append(heart, bookmark)
            sub_card_txt.append(category, title, event_date, card_icon)
            content_page.append(sub_card)
        }

    })


    const content_scrap_page = document.querySelector(".contant-page.scrap")

    scrap_event.forEach(scrap => {

        if (scrap) {
            const sub_card = document.createElement("div")
            sub_card.setAttribute("class", "sub-card")

            const card_image = document.createElement("img")
            card_image.setAttribute("src", `${kchf}${scrap.image}`)
            sub_card.append(card_image)

            const sub_card_txt = document.createElement("div")
            sub_card_txt.setAttribute("class", "sub-card-txt")
            sub_card.append(sub_card_txt)


            const category = document.createElement("a")
            category.setAttribute("class", "category")
            category.innerText = "전시/행사"
            const title = document.createElement("h3")
            title.setAttribute("class", "title")
            title.innerText = scrap.title
            // 행사 시작 - 행사 종료 기간 입력
            const event_date = document.createElement("p")
            event_date.setAttribute("class", "event-date")
            const start_date = scrap.start_date.substr(2).replaceAll('-', '.')
            const end_date = scrap.end_date.substr(2).replaceAll('-', '.')
            event_date.innerText = start_date + ' - ' + end_date
            sub_card_txt.append(category, title, event_date)
            content_scrap_page.append(sub_card)
        }

    })



}





/* <div class="sub-card">
    <img src="assets/img/image-2.jpg" alt="">
    <div class="sub-card-txt">
        <a class="category">전시/행사</a>
        <h3 class="title">경복궁 야간관람</h3>
        <p class="event-date">23.05.10 - 23.06.10</p>
        <div class="card-icon">
            <div class="heart">
                <img src="/assets/img/Heart-outline.svg" alt=""><span>1</span>
            </div>
            <div class="bookmark">
                <img src="/assets/img/Bookmark-outline.svg" alt=""><span>1</span>
            </div>
        </div>
    </div>
</div> */
