window.onload = () => {
    let now_utc = Date.now()
    let timeOff = new Date().getTimezoneOffset() * 60000;
    let tomorrow = new Date(now_utc - timeOff + 86400000).toISOString().split("T")[0];

    const date = document.getElementById('rsrvt_date');

    date.setAttribute("min", `${tomorrow}`)
}


async function handleSelectHanbok(hanbok_id) {
    const urlParams = new URLSearchParams(window.location.search);
    hanbok_id = urlParams.get('hanbok_id');

    const date = document.getElementById('rsrvt_date').value;
    const time = document.querySelector('input[type=radio][name=time]:checked').value;
    let quantity = document.getElementById('quantity').value;

if (date == null || time == null) {
        alert("다시 선택해주세요")
    
    } else {

        let int_quantity = Number(quantity)

        first = date.split('-')
        first1 = first[2].split('')
        middle = time.split(':')
        middle1 = middle[0].split('')

        const response = await fetch(`${backend_base_url}/api/v1/stores/hanbok/${hanbok_id}`, {
        })

        if (response.status == 200) {
        
            const response_json = await response.json()
            const store_id = response_json.store

            order_id = `${payload_parse.user_id}` + middle1[1] + first1[0] + middle1[0] + middle[1] + first[0] + `${store_id}`

            const item = response_json.hanbok_name
            const order_stf_id = response_json.owner
            const hanbok_price = response_json.hanbok_price

            const price = hanbok_price * int_quantity
            const vat = price * 0.1
            const total = price + vat

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
                // alert("결제요청 완료")

                const kakao_json = await kakao_pay.json()
                const tid = kakao_json.tid
                const created_at = kakao_json.created_at
                const next_url_m = kakao_json.next_redirect_mobile_url
                const next_url_p = kakao_json.next_redirect_pc_url

                setCookie("tid", tid, 2);

                const send = await fetch(`${backend_base_url}/api/v1/stores/payment/`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'content-type': 'application/json',
                        "X-CSRFToken": '{{csrf_token}}'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        "tid": tid,
                        "type": "hanbok",
                        "created_at": created_at,
                        "partner_order_id": order_id,
                        "partner_user_id": order_stf_id,
                        "item_name": item,
                        "quantity": int_quantity,
                        "total_amount": total,
                        "vat_amount": vat,
                        "rsrvt_date": date,
                        "rsrvt_time": time
                    })
                })

                if (send.status == 200) {
                    
                    if (matchMedia("screen and (max-width: 431px)").matches) {
                        // 1060px 미만에서 사용할 JavaScript
                        window.location.href = `${next_url_m}`
                    } else {
                        // 1060px 이상에서 사용할 JavaScript
                        window.location.href = `${next_url_p}`
                    }
                } else {
                    alert("db 저장실패", send.status)
                    window.location.href = `${index_url}`
                }

            } else {
                alert(kakao_pay.status, "결제요청 실패")
                window.location.href = `${index_url}`
            }

        } else {
            alert(response.status, "잘못된 상품 정보입니다")
            window.location.href = `${index_url}`
        }
    }

}
