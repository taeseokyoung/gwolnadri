

window.onload = async function CompletePgtoken() {
    const urlParams = new URLSearchParams(window.location.search);
    const pg_token = urlParams.get('pg_token');
    const cookie_tid = getCookie("tid")
    console.log(getCookie("tid"))
    
    const response = await fetch(`${backend_base_url}/api/v1/stores/payment/${cookie_tid}`, {
    })

    if (response.status == 200) {
        const response_json = await response.json()
        console.log(response_json)

        if (cookie_tid == response_json.tid) {

            const tid = response_json.tid
            const partner_order_id = response_json.partner_order_id
            const partner_user_id = response_json.partner_user_id
            const quantity = response_json.quantity
            const type = response_json.type
            console.log(type)
            console.log(quantity)

            if (type == "event") {

                const str_order = String(partner_order_id)
                console.log(str_order)

                const ticket_id = str_order.split('2023')[1]

                // booking 처리
                const ticket = await fetch(`${backend_base_url}/events/${ticket_id}/bookedticket/`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'content-type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        "quantity": quantity
                    })
                })
                console.log(ticket)

                if (ticket.status == 201) {
                    alert("티켓 예매완료")

                    // 결제 확정
                    const kakao_pay = await fetch("https://kapi.kakao.com/v1/payment/approve", {
                        headers:{
                            "Authorization": "KakaoAK c852f123396eb62c459e2f8c0ddf1a30",
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: 'POST',
                        body: new URLSearchParams({
                            "cid": "TC0ONETIME",
                            "tid": tid,
                            "partner_order_id": partner_order_id,
                            "partner_user_id": partner_user_id,
                            "pg_token": pg_token
                        })
                    })
                    console.log(kakao_pay)

                    if (kakao_pay.status == 200) {
                        alert("결제 완료")

                        const kakao_json = await kakao_pay.json()
                        console.log(kakao_json)
                        
                        const aid = kakao_json.aid
                        const payment_type = kakao_json.payment_method_type
                        const approved = kakao_json.approved_at

                        // DB에 결제완료건 저장
                        const send = await fetch(`${backend_base_url}/api/v1/stores/payment/${tid}/`, {
                            headers: {
                                "Authorization": `Bearer ${token}`,
                                'content-type': 'application/json'
                            },
                            method: 'PUT',
                            body: JSON.stringify({
                                "aid": aid,
                                "payment_method_type": payment_type,
                                "approved_at": approved
                            })
                        })
                        console.log(send)
            
                        if (send.status == 200) {
                            alert("db 저장완료")
                            // window.location.href = `${next_url_p}?tid=${tid}`
                        } else {
                            alert("db 저장실패",send.status)
                            // window.location.href = `${frontend_base_url}`
                        }

                    } else {
                        alert("발급 실패",kakao_pay.status)
                    }

                } else {
                    alert("수량 오류, 관리자에게 문의하세요", ticket.status)
                    window.location.href = `${frontend_base_url}`
                }

            } else if (type == "hanbok") {
                // 결제 확정
                const kakao_pay = await fetch("https://kapi.kakao.com/v1/payment/approve", {
                    headers:{
                        "Authorization": "KakaoAK c852f123396eb62c459e2f8c0ddf1a30",
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: 'POST',
                    body: new URLSearchParams({
                        "cid": "TC0ONETIME",
                        "tid": tid,
                        "partner_order_id": partner_order_id,
                        "partner_user_id": partner_user_id,
                        "pg_token": pg_token
                    })
                })
                console.log(kakao_pay)

                if (kakao_pay.status == 200) {
                    alert("결제 완료")

                    const kakao_json = await kakao_pay.json()
                    console.log(kakao_json)
                    
                    const aid = kakao_json.aid
                    const payment_type = kakao_json.payment_method_type
                    const approved = kakao_json.approved_at

                    // DB에 결제완료건 저장
                    const send = await fetch(`${backend_base_url}/api/v1/stores/payment/${tid}/`, {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            'content-type': 'application/json'
                        },
                        method: 'PUT',
                        body: JSON.stringify({
                            "aid": aid,
                            "payment_method_type": payment_type,
                            "approved_at": approved
                        })
                    })
                    console.log(send)
        
                    if (send.status == 200) {
                        alert("db 저장완료")
                        // window.location.href = `${next_url_p}?tid=${tid}`
                    } else {
                        alert("db 저장실패",send.status)
                        // window.location.href = `${frontend_base_url}`
                    }

                } else {
                    alert("발급 실패",kakao_pay.status)
                }

            } else {
                alert("DB type 오류")
            }

        } else {
            alert("DB tid 오류")
        }

    } else {
        console.log(response_json)
        alert(response.status,"잘못된 상품 정보입니다")
        window.location.href = `${frontend_base_url}`
    }
}


// 메인화면으로 location
async function MainRedirect() {
    window.location.href = `${frontend_base_url}`
}