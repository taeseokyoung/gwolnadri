
window.onload = async function loadStoreList() {
    stores = await store()
    // console.log("여기여기여기 : ", stores["StoreList"][0]["store_name"])

    const store_card = document.getElementById("store-card")

    stores["StoreList"].forEach(store => {
        console.log(store.store_name)
        const newTitle = document.createElement("div")
        const newCate = document.createElement("p")
        const newStore = document.createElement("p")
        newTitle.appendChild(newCate)
        newTitle.appendChild(newStore)

        newTitle.setAttribute("class", "store-title")
        newCate.setAttribute("class", "hanbok_category")
        newStore.setAttribute("class", "hanbok_store")
        newStore.innerText=store.store_name
        // newCate = setAttribute("class", "hanbok_category")
        // newCate = setAttribute("id", store.store_name)
        // const newName = document.createElement("p")
        // newName = setAttribute("class", "hanbok_store")

        // 
        store_card.appendChild(newTitle)
    });
    
}

//한복집 리스트 가져오기
async function store() {
    const response = await fetch(`${backend_base_url}/api/v1/stores/`)
    if(response.status==200){
        const response_json = await response.json()
        return response_json 
    }else{
        alert("요청이 실패했습니다!")
    }
}