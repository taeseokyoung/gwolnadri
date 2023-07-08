if (!localStorage.getItem("access")) {
  alert("로그인 후 이용해주세요");
  window.location.replace(`${frontend_base_url}/home.html`);
}

window.onload = async function EventReservation() {

    const card_list = document.getElementById('card_list');

    // event 예약내역 조회
    const response = await fetch(`${backend_base_url}/api/v1/stores/payment/${payload_parse.user_id}/event/`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    if (response.status == 200) {
        const response_json = await response.json()
        
        if (response_json.length == 0) {

            const none_list = document.createElement('div')
            none_list.setAttribute('class', 'sh_col')

            const i = document.createElement('i')
            i.setAttribute('class', 'xi-calendar-cancle')

            const none_content = document.createElement('p')
            none_content.setAttribute('class', 'sh_small')
            none_content.innerText = "예매한 행사가 없습니다"

            none_list.appendChild(i)
            none_list.appendChild(none_content)
            card_list.insertBefore(none_list, card_list.firstChild);
        } else {

            // tid 출력
            for (let i = 0; i < response_json.length; i++) {

                const tid = response_json[i].tid
                const order_id = response_json[i].partner_order_id
                const item_name = response_json[i].item_name
                const quantity = response_json[i].quantity
                const ticket_id = String(order_id).split('2023')[1]

                // ticket 조회
                const eventDetail = await fetch(`${backend_base_url}/events/${ticket_id}/ticket/`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                if (eventDetail.status == 200) {
                    const eventDetail_json = await eventDetail.json()
                    const origin_date = eventDetail_json.event_date.split('-')
                    const rsrvt_date = origin_date[0].split('0')[1] + "." + origin_date[1] + "." + origin_date[2]
                    const rsrvt_time = eventDetail_json.event_time
                    const event_id = eventDetail_json.event

                    // event 조회
                    const event = await fetch(`${backend_base_url}/events/${event_id}`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    if (event.status == 200) {

                        const event_json = await event.json()
                        const event_img = event_json.image
                        const card_list = document.getElementById('card_list');

                        const subCard = document.createElement("div")
                        subCard.setAttribute("class", "sub-card")

                        const img = document.createElement("img")
                        img.setAttribute("class", "reser_img")
                        img.setAttribute("src", `${backend_base_url}${event_img}`)

                        const f_tid = document.createElement("p")
                        f_tid.setAttribute("class", "sh")
                        f_tid.innerText = "예매번호 : " + `${tid}`

                        const i = document.createElement("i")
                        i.setAttribute("class", "xi-angle-right-min")

                        const button = document.createElement("button")
                        button.setAttribute("class", "sh-right")
                        button.setAttribute("onClick", `ReservationDetail("${tid}")`)
                        button.innerText = "상세보기"

                        const div = document.createElement("div")
                        div.setAttribute("class", "sub-card-txt sh-sub")

                        const date = document.createElement("p")
                        date.setAttribute("class", "sh-event-date")
                        date.innerText = "이용일 : " + rsrvt_date

                        const time = document.createElement("p")
                        time.setAttribute("class", "sh-event-date time")
                        time.innerText = rsrvt_time

                        const item = document.createElement("h3")
                        item.setAttribute("class", "title")
                        item.innerText = `${item_name}` + " " + `${quantity}` + "매"

                        subCard.appendChild(img)
                        subCard.appendChild(f_tid)
                        subCard.appendChild(button)
                        button.appendChild(i)
                        subCard.appendChild(div)
                        div.appendChild(date)
                        div.appendChild(time)
                        div.appendChild(item)

                        card_list.insertBefore(subCard, card_list.firstChild);

                    } else {
                        alert(event.status)
                        window.location.href = `${frontend_base_url}/profile.html`
                    }

                } else {
                    alert(eventDetail.status)
                    window.location.href = `${frontend_base_url}/profile.html`
                }
            }
        }
        
    } else {
        alert(response.status)
        window.location.href = `${frontend_base_url}/profile.html`

    }

}

async function ReservationDetail(tid) {
    window.location.href = `${frontend_base_url}/reservation_detail.html?tid=${tid}`
}