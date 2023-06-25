const scroll_body = document.querySelector("#Gwolnadri-body");

document.querySelector('#Gwolnadri-body').addEventListener('scroll', (e) => {
    let y = scroll_body.scrollTop

    if (y > 5) {
        document.querySelector('.header').classList.add('on')
    }
    else if (y < 5) {
        document.querySelector('.header').classList.remove('on')
    }
});

const kchf = "https://www.chf.or.kr"

window.onload = async function loadEvents() {
    const payload = localStorage.getItem("payload");
    book_event = await eventList();
    scrap_event = await eventScrapList();
  
    const content_page = document.querySelector(".contant-page.nonscrap");
  
    book_event.forEach(async nonscrap => {

        if (nonscrap) {
            const sub_card = document.createElement("div")
            sub_card.setAttribute("class", "sub-card")
            sub_card.setAttribute("onclick", `eventDetail(${nonscrap.id})`)

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

            const event_date = document.createElement("p")
            event_date.setAttribute("class", "event-date")
            const start_date = nonscrap.event_start_date
            const end_date = nonscrap.event_end_date
            event_date.innerText = start_date + ' - ' + end_date

            const card_icon = document.createElement("div")
            card_icon.setAttribute("class", "card-icon")

            const heart = document.createElement("div")
            heart.setAttribute("class", "heart")

            const bookmark = document.createElement("div")
            bookmark.setAttribute("class", "bookmark")

            const heart_img = document.createElement("img")
            const bookmark_img = document.createElement("img")
            
            //로그인 여부 판단
            if (payload){
                const payload_parse = JSON.parse(payload)
                heart_img.setAttribute("src", "/assets/img/Heart-outline.svg")
                //북마크 표시
                if (nonscrap.event_bookmarks.includes(payload_parse.user_id)){
                    bookOn = 1
                    bookmark_img.setAttribute("src", "/assets/img/Bookmark-full.svg")
                } else {
                    bookOn = 0
                    bookmark_img.setAttribute("src", "/assets/img/Bookmark-outline.svg")
                }
            } else {
                bookmark_img.setAttribute("src", "/assets/img/Bookmark-outline.svg")
            }

            const heart_num = document.createElement("span")
            heart_num.innerText = `${nonscrap.likes_count}`

            heart.append(heart_img, heart_num)
            bookmark.append(bookmark_img)
            card_icon.append(heart, bookmark)
            sub_card_txt.append(category, title, event_date, card_icon)
            content_page.append(sub_card)
        }}

    )

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


async function HandleSearch() {

    const search_bar = document.getElementById("search_bar");

    if (search_bar.style.display == 'none') {
        search_bar.style.display = 'block';
    } else {
        search_bar.style.display = 'none';
    }
}


async function enterkey(event) {
    if (event.keyCode == 13) {
        // 엔터키가 눌렸을 때
        const word = document.getElementById("search_bar").value;
        window.location.href = `${frontend_base_url}/search.html?search=${word}`;
    }
}


async function eventDetail(event_id) {
    location.href = `${frontend_base_url}/event-detail.html?event_id=${event_id}`
}
