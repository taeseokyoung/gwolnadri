window.onload = async function HanbokReservation() {
    const response = await fetch(`${backend_base_url}/api/v1/stores/payment/${payload_parse.user_id}/hanbok/`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    if (response.status == 200) {
        const response_json = await response.json()

        for (let i = 0; i < response_json.length; i++) {
            let tid = response_json[i].tid
            const item_name = response_json[i].item_name
            const quantity = response_json[i].quantity

            const origin_date = response_json[i].rsrvt_date.split('T')[0].split('-')
            const origin_time = response_json[i].rsrvt_time.split(":")
            const rsrvt_date = origin_date[0].split('0')[1] + "." + origin_date[1] + "." + origin_date[2]
            const rsrvt_time = origin_time[0] + ":" + origin_time[1]


            const card_list = document.getElementById('card_list');

            const subCard = document.createElement("div")
            subCard.setAttribute("class", "store-sub-card")

            const f_tid = document.createElement("p")
            f_tid.setAttribute("class", "sh-lift")
            f_tid.innerText = "예약번호 : " + `${tid}`

            const a = document.createElement("i")
            a.setAttribute("class", "xi-angle-right-min")

            const button = document.createElement("button")
            button.setAttribute("class", "sh-right2")
            button.setAttribute("onClick", `ReservationDetail("${tid}")`)
            button.innerText = "상세보기"

            const div = document.createElement("div")
            div.setAttribute("class", "store-txt")

            const date = document.createElement("p")
            date.setAttribute("class", "hanbok_address")
            date.innerText = "예약일 : " + `${rsrvt_date}`

            const time = document.createElement("span")
            time.setAttribute("class", "sh-event-date time")
            time.innerText = rsrvt_time

            const item = document.createElement("h3")
            item.setAttribute("class", "hanbok-title")
            item.innerText = `${item_name}` + " " + `${quantity}` + "명"

            subCard.appendChild(f_tid)
            subCard.appendChild(button)
            button.appendChild(a)
            subCard.appendChild(div)
            div.appendChild(date)
            div.appendChild(time)
            div.appendChild(item)

            card_list.insertBefore(subCard, card_list.firstChild);

        }

    } else {
        window.location.href = `${index_url}`

    }
}

async function ReservationDetail(tid) {
    window.location.href = `${frontend_base_url}/reservation_detail.html?tid=${tid}`
}