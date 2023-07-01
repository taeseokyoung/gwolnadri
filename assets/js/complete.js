window.onload = async function CompletePgtoken() {
    const urlParams = new URLSearchParams(window.location.search);
    const pg_token = urlParams.get('pg_token');
    const cookie_tid = getCookie("tid")

    const response = await fetch(`${backend_base_url}/api/v1/stores/payment/${cookie_tid}`, {
    })

    if (response.status == 200) {
        const response_json = await response.json()

        if (cookie_tid == response_json.tid) {

            const tid = response_json.tid
            const partner_order_id = response_json.partner_order_id
            const partner_user_id = response_json.partner_user_id
            const quantity = response_json.quantity
            const type = response_json.type

            if (type == "event") {

                const str_order = String(partner_order_id)
                const ticket_id = str_order.split('2023')[1]

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

                if (ticket.status == 201) {

                    const kakao_pay = await fetch("https://kapi.kakao.com/v1/payment/approve", {
                        headers: {
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

                    if (kakao_pay.status == 200) {

                        const kakao_json = await kakao_pay.json()
                        const aid = kakao_json.aid
                        const payment_type = kakao_json.payment_method_type
                        const approved = kakao_json.approved_at

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

                        if (send.status == 200) {
                            console.log("db 저장완료")
                            // window.location.href = `${next_url_p}?tid=${tid}`
                        } else {
                            // alert("db 저장실패",send.status)
                            // window.location.href = `${index_url}`
                        }

                    } else {
                        // alert("발급 실패",kakao_pay.status)
                    }

                } else {
                    alert("수량 오류, 관리자에게 문의하세요", ticket.status)
                    window.location.href = `${index_url}`
                }

            } else if (type == "hanbok") {
                // 결제 확정
                const kakao_pay = await fetch("https://kapi.kakao.com/v1/payment/approve", {
                    headers: {
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
                if (kakao_pay.status == 200) {
                    // alert("결제 완료")

                    if (kakao_pay.status == 200) {
                        const kakao_json = await kakao_pay.json()
                        const aid = kakao_json.aid
                        const payment_type = kakao_json.payment_method_type
                        const approved = kakao_json.approved_at
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
                        if (send.status == 200) {

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

                            } else {
                                alert("결제 실패, 관리자에게 문의하세요", send.status)
                                window.location.href = `${index_url}`
                            }

                        } else {
                            // alert("이미 처리된 요청입니다",kakao_pay.status)
                            console.log("이미 처리된 요청입니다")
                        }

                    } else {
                        alert("DB type 오류")
                        window.location.href = `${index_url}`
                    }

                } else {
                    alert("결제번호 오류, 관리자에게 문의하세요", response_json.status)
                    window.location.href = `${index_url}`
                }
            }
        }
    }
}

async function MainRedirect() {
    window.location.href = `${index_url}`
}

async function Reservation() {
    const cookie_tid = getCookie("tid")
    window.location.href = `${frontend_base_url}/reservation_detail.html?tid=${cookie_tid}`
}
