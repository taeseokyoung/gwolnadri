window.onload = async function SelectTicket(event_id) {
    let urlParams = new URLSearchParams(window.location.search);
    event_id = urlParams.get('event_id');

    const eventData = await fetch(`${backend_base_url}/events/${event_id}`, {
    })
    if (eventData.status == 200) {
        const eventData_json = await eventData.json()
        console.log(eventData_json)

        const title = eventData_json.title
        const start_date = eventData_json.event_start_date
        const end_date = eventData_json.event_end_date
        const info_cost_txt = eventData_json.money
        const info_max = eventData_json.max_booking

        const e_title = document.getElementById("title")
        e_title.innerText = title

        const start_end = document.getElementById("start_end")
        start_end.innerText = start_date +" ~ "+end_date

        const info_cost = document.getElementById("info_cost")
        info_cost.innerText = "1매 : "+info_cost_txt+"원 (VAT별도)"

        let time_slots = document.getElementById('time_slots')
        
        const time_slot_txt = eventData_json.time_slots
        for(var turn in time_slot_txt) {
            let e_turn = document.createElement("p")
            e_turn.setAttribute("class","info_start")          
            e_turn.innerText = turn+"회차 : "+time_slot_txt[turn]
            time_slots.append(e_turn)
        }

        const e_max = document.createElement("p")
        e_max.setAttribute("class","info_start")
        e_max.innerText = "회차 당 좌석 수 : "+info_max
        time_slots.append(e_max)

        let now_utc = Date.now()
        let timeOff = new Date().getTimezoneOffset() * 60000;
        let tomorrow = new Date(now_utc - timeOff + 86400000).toISOString().split("T")[0];

        const date = document.getElementById('rsrvt_date');

        if (start_date < tomorrow) {
            date.setAttribute("min", `${tomorrow}`)
        } else {
            date.setAttribute("min", `${start_date}`)
        }

        date.setAttribute("max", `${end_date}`)

    } else {
        alert(eventData.status, "잘못된 상품 정보입니다")
        window.location.href = `${index_url}`
    }
}

async function SelectDate() {
    let urlParams = new URLSearchParams(window.location.search);
    event_id = urlParams.get('event_id');

    const v_date = document.getElementById('rsrvt_date').value;
    const eventTime = await fetch(`${backend_base_url}/events/${event_id}/${v_date}/ticket/`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    if (eventTime.status == 200) {
        const eventTime_json = await eventTime.json()
        let e_date = document.getElementById('rsrvt_date');
        let btn_date = document.getElementById('select_date');
        e_date.disabled = true;
        btn_date.disabled = true;

        const selectTime = document.getElementById('selectTime');
        const timeList = document.getElementById('timeList');
        const opt_title = document.getElementById('opt_title');
        timeList.disabled = false;
        selectTime.disabled = false;
        opt_title.innerText = "행사 시간 || 잔여 좌석"


        for (let i = 0; i < eventTime_json.length; i++) {
            const times = eventTime_json[i]

            const current = times.current_booking
            const max_booking = times.max_booking_count
            const num = max_booking - current
            const event_time = times.event_time
            const ticket_id = times.id

            const opt = document.createElement("option")
            opt.innerText = event_time + " || " + "잔여 : " + num + "석"

            timeList.appendChild(opt)
        }

    } else if (eventTime.status == 404 || v_date == null) {
        alert("다시 선택해주세요")

    } else {
        alert(eventTime.status, "잘못된 상품 정보입니다")
        window.location.href = `${index_url}`
    }
}


async function SelectTime() {
    const v_date = document.getElementById('rsrvt_date').value;
    const v_time = document.getElementById('timeList').value;
    const s_time = v_time.split(' ')[0]

    if (s_time == "행사") {
        alert("다시 선택해주세요")

    } else {
        const eventBooking = await fetch(`${backend_base_url}/events/${event_id}/${v_date}/${s_time}/ticket/`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if (eventBooking.status == 200) {
            const eventBooking_json = await eventBooking.json()

            let e_time = document.getElementById('timeList');
            let btn_time = document.getElementById('selectTime');
            let selectQuantity = document.getElementById('quantity');
            let Kakaopay = document.getElementById('select')
            e_time.disabled = true;
            btn_time.disabled = true;
            selectQuantity.disabled = false;

            for (let i = 0; i < eventBooking_json.length; i++) {
                const booking = eventBooking_json[i]

                const max_booking = booking.max_booking_count
                const current = booking.current_booking
                const ticket_id = booking.id
                const now = max_booking - current

                selectQuantity.setAttribute("max", `${now}`)
                Kakaopay.setAttribute("onClick", `handleSelectEvent(${ticket_id})`)
            }
        } else {
            alert(eventBooking.status, "잘못된 상품 정보입니다")
            window.location.href = `${index_url}`
        }
    }
}

function printPrice() {
    const quantity = document.getElementById('quantity').value;
    const origin_price = document.getElementById('info_cost').innerText;
    console.log(origin_price)

    const original_price = origin_price.split(': ')[1].split('원')[0]
    console.log(original_price)
    const int_quantity = Number(quantity)

    const price = original_price * int_quantity
    const vat = price * 0.1
    const total = price + vat

    document.getElementById("price").innerText = price;
    document.getElementById("vat").innerText = vat;
    document.getElementById("total").innerText = total;
}

async function handleSelectEvent(ticket_id) {

    const quantity = document.getElementById('quantity').value;
    const int_quantity = Number(quantity)


    if (int_quantity == 0) {
        alert("다시 선택해주세요")
        location.reload()

    } else {
        const eventticket = await fetch(`${backend_base_url}/events/${ticket_id}/ticket/`, {
        })
        if (eventticket.status == 200) {
            const eventticket_json = await eventticket.json()

            const max_booking = eventticket_json.max_booking_count
            const current = eventticket_json.current_booking

            if (int_quantity + current > max_booking) {
                alert("티켓의 잔여 수량이 모자랍니다")
                location.reload()

            } else if (int_quantity + current <= max_booking) {

                const date = document.getElementById('rsrvt_date').value;
                const v_time = document.getElementById('timeList').value;
                const time = v_time.split(' ')[0]
                const r_time = time.split('~')[0]

                first = date.split('-')
                first2 = first[2].split('')
                middle1 = time.split(':')[0].split('')
                middle2 = time.split(':')[1].split('~')[1].split('')

                const order_id = first2[1] + middle1[1] + middle2[1] + first2[0] + first[0] + `${ticket_id}`

                const response = await fetch(`${backend_base_url}/events/${event_id}/`, {
                })

                if (response.status == 200) {
                    const response_json = await response.json()

                    const item = response_json.title
                    const order_stf_id = response_json.author
                    const original_price = response_json.money

                    const price = original_price * int_quantity
                    const vat = price * 0.1
                    const total = price + vat

                    if (total == 0) {

                        // const tid = kakao_json.tid
                        // const created_at = created_at

                        setCookie("tid", tid, 2);

                        // DB에 결제요청건 저장
                        const send = await fetch(`${backend_base_url}/api/v1/stores/payment/`, {

                            headers: {
                                "Authorization": `Bearer ${token}`,
                                'content-type': 'application/json',
                            },
                            method: 'POST',
                            body: JSON.stringify({
                                "tid": tid,
                                "type": "event",
                                "created_at": created_at,
                                "partner_order_id": order_id,
                                "partner_user_id": order_stf_id,
                                "item_name": item,
                                "quantity": int_quantity,
                                "total_amount": total,
                                "vat_amount": vat,
                                "rsrvt_date": date,
                                "rsrvt_time": r_time
                            })
                        })
                        const send_json = await send.json()

                        if (send.status == 200) {
                            window.location.href = `${frontend_base_url}/complete.html`

                        } else {
                            alert(send_json.message)
                            window.location.href = `${index_url}`
                        }

                    } else {

                        const kakao_pay = await fetch("https://kapi.kakao.com/v1/payment/ready", {
                            headers: {
                                "Authorization": "KakaoAK c852f123396eb62c459e2f8c0ddf1a30",
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                            method: 'POST',
                            body: new URLSearchParams({
                                "cid": "TC0ONETIME",
                                "partner_order_id": order_id,
                                "partner_user_id": order_stf_id,
                                "item_name": item,
                                "quantity": int_quantity,
                                "total_amount": total,
                                "vat_amount": vat,
                                "tax_free_amount": 0,
                                "approval_url": `${frontend_base_url}/complete.html`,
                                "fail_url": `${frontend_base_url}`,
                                "cancel_url": `${frontend_base_url}`
                            })
                        });


                        if (kakao_pay.status == 200) {

                            const kakao_json = await kakao_pay.json()
                            const tid = kakao_json.tid
                            const created_at = kakao_json.created_at
                            const next_url_m = kakao_json.next_redirect_mobile_url
                            const next_url_p = kakao_json.next_redirect_pc_url

                            setCookie("tid", tid, 2);

                            // DB에 결제요청건 저장
                            const send = await fetch(`${backend_base_url}/api/v1/stores/payment/`, {

                                headers: {
                                    "Authorization": `Bearer ${token}`,
                                    'content-type': 'application/json',
                                },
                                method: 'POST',
                                body: JSON.stringify({
                                    "tid": tid,
                                    "type": "event",
                                    "created_at": created_at,
                                    "partner_order_id": order_id,
                                    "partner_user_id": order_stf_id,
                                    "item_name": item,
                                    "quantity": int_quantity,
                                    "total_amount": total,
                                    "vat_amount": vat,
                                    "rsrvt_date": date,
                                    "rsrvt_time": r_time
                                })
                            })
                            console.log(send)

                            if (send.status == 200) {
                                
                                if (matchMedia("screen and (max-width: 431px)").matches) {
                                    // 1060px 미만에서 사용할 JavaScript
                                    window.location.href = `${next_url_m}`
                                } else {
                                    // 1060px 이상에서 사용할 JavaScript
                                    window.location.href = `${next_url_p}`
                                }
                            } else {
                                // alert("db 저장실패", send.status)
                                // window.location.href = `${index_url}`
                            }

                        } else {
                            console.log(kakao_pay.status)
                            // alert("결제요청 실패", kakao_pay.status)
                        }
                    }

                } else {
                    console.log(response_json)
                    alert(response.status, "잘못된 상품 정보입니다")
                    window.location.href = `${index_url}`
                }
            }
        } else {
            console.log(eventticket_json)
            alert(eventticket.status, "잘못된 상품 정보입니다")
            window.location.href = `${index_url}`
        }
    }
}

async function onClickReload() {
    location.reload()
}
