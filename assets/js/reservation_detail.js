window.onload = async function ReservationDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    tid = urlParams.get('tid');

    const response = await fetch(`${backend_base_url}/api/v1/stores/payment/${tid}/`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    if (response.status == 200) {
        const response_json = await response.json()
        console.log(response_json)

        const type = response_json.type
        const item_name = response_json.item_name

        const tid = response_json.tid
        const quantity = response_json.quantity
        const total = response_json.total_amount
        const order_id = String(response_json.partner_order_id).split('2023')[1]
        console.log(order_id)

        const origin_create = response_json.created_at.split("T")[0].split('-')
        const origin_date = response_json.rsrvt_date.split("T")[0].split('-')
        const origin_time = response_json.rsrvt_time.split(":")
        const create = origin_create[0]+'.'+origin_create[1]+'.'+origin_create[2]
        const rsrvt_date = origin_date[0]+'.'+origin_date[1]+'.'+origin_date[2]
        const rsrvt_time = origin_time[0]+":"+origin_time[1]
        
        const title = document.getElementById('title')
        const event_img = document.getElementById('event_img')
        const address = document.getElementById('store_address')
        const hanbok_name = document.getElementById('hanbok_name')
        const info_btn = document.getElementById('info')
        const tid_n = document.getElementById('tid_n')
        const tid_in = document.getElementById('tid_in')
        const date = document.getElementById('date')
        const time = document.getElementById('time')
        const count = document.getElementById('count')
        const people = document.getElementById('people')
        const count2 = document.getElementById('count2')
        const people2 = document.getElementById('people2')
        const created = document.getElementById('created')
        const created_date = document.getElementById('created_at')
        const status = document.getElementById('status')
        const total_in = document.getElementById('total')
        const hanbok_delete = document.getElementById('hanbok_delete')
        const receipt = document.getElementById('receipt')

        const i = document.createElement("i")
        i.setAttribute("class","xi-angle-right-min")

        date.innerText = rsrvt_date
        tid_in.innerText = `${tid}`
        created_date.innerText = create
        total_in.innerText = total
        receipt.setAttribute("onClick",`Receipt("${tid}")`)

        
        if (type == "hanbok") {
            
            document.getElementById("event_img").style.display = "none";
            
            const hanbok = await fetch(`${backend_base_url}/api/v1/stores/${order_id}/`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (hanbok.status == 200) {
                const hanbok_json = await hanbok.json()
                console.log(hanbok_json)
                
                const store_name = hanbok_json.Store.store_name
                const store_address = hanbok_json.Store.store_address
                const store_id = hanbok_json.Store.store_id
                
                title.innerText = store_name
                title.appendChild(i)
                address.innerText = store_address
                hanbok_name.innerText = item_name
                info_btn.setAttribute("onClick",`InfoHanbok(${store_id})`)
                time.innerText = rsrvt_time

                tid_n.innerText = "예약번호"
                count.innerText = "인원"
                count2.innerText = "인원"
                people.innerText = `${quantity}`+"명"
                people2.innerText = `${quantity}`+"명"
                created.innerText = "예약일"
                status.innerText = "예약"
                hanbok_delete.setAttribute("onClick",`HanbokDelete("${tid}")`)

            } else {
                (hanbok.status)
            }

        } else if (type == "event") {

            document.getElementById("addBox").style.display = "none";
            document.getElementById("hbname").style.display = "none";
            document.getElementById("hanbok_delete").style.display = "none";

            const event = await fetch(`${backend_base_url}/events/${order_id}/ticket/`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (event.status == 200) {
                const event_json = await event.json()
                const event_id = event_json.event
                const rsrvt_t = event_json.event_time

                const detail = await fetch(`${backend_base_url}/events/${event_id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                if (detail.status == 200) {
                    const detail_json = await detail.json()
                    console.log(detail_json)
                    
                    title.innerText = item_name
                    event_img.setAttribute("src",`${backend_base_url}${detail_json.image}`)
                    title.appendChild(i)
                    info_btn.setAttribute("onClick",`InfoEvent(${event_id})`)
                    time.innerText = rsrvt_t

                    tid_n.innerText = "예매번호"
                    count.innerText = "매수"
                    count2.innerText = "매수"
                    people.innerText = `${quantity}`+"매"
                    people2.innerText = `${quantity}`+"매"
                    created.innerText = "예매일"
                    status.innerText = "예매"

                } else {
                    (detail.status)
                }
            } else {
                (event.status)
            }

        } else {
            (response.status)
        }

    } else {
       (response.status)
    }
}


async function HanbokDelete(tid){
    let user_id = payload_parse.user_id
    const response = await fetch(`${backend_base_url}/api/v1/stores/payment/${user_id}/${tid}`,{
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: 'DELETE'
    })
    if (response.status == 200){
        response_json = await response.json()
        alert(response_json.message)
        window.location.href = `${frontend_base_url}/profile-storeReservation.html`
    } else {
        (response.status)
        window.location.href = `${frontend_base_url}`
    }
}


async function InfoHanbok(store_id){
    window.location.href = `${frontend_base_url}/store-detail.html?hanbokstore_id=${store_id}`
}


async function InfoEvent(event_id){
    window.location.href = `${frontend_base_url}/event-detail.html?event_id=${event_id}`
}


async function Receipt(tid){
    window.location.href = `${frontend_base_url}/receipt.html?tid=${tid}`
}