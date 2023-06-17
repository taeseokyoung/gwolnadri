
window.onload = async function loadStoreList() {
    stores = await store()
    console.log("여기여기여기 : ", stores["StoreList"][0])

    const storeCard = document.getElementById("store-list-body")

    stores["StoreList"].forEach(store => {
        console.log(store.store_name)

        
        const newCon = document.createElement("div")
        const newTitle = document.createElement("div")
        const newCate = document.createElement("p")
        const newStore = document.createElement("p")
        const newAdd = document.createElement("p")
        const newIcon = document.createElement("div")
        const newHeart = document.createElement("div")
        const newBook = document.createElement("div")
        const newHeartImg = document.createElement("img")
        const newBookImg = document.createElement("img")
        const newHeartNum = document.createElement("span")

        
        storeCard.appendChild(newCon)

        newCon.appendChild(newTitle)
        newTitle.appendChild(newCate)
        newTitle.appendChild(newStore)
        newCon.appendChild(newAdd)

        newCon.append(newIcon)
        newIcon.appendChild(newHeart)
        newIcon.appendChild(newBook)
        newHeart.appendChild(newHeartImg)
        newHeart.appendChild(newHeartNum)
        newBook.appendChild(newBookImg)
        

        newCon.setAttribute("class", "contant-card")
        newTitle.setAttribute("class", "store-title")
        newCate.setAttribute("class", "hanbok_category")
        newStore.setAttribute("class", "hanbok_store")
        newAdd.setAttribute("class", "hanbok_address")
        newIcon.setAttribute("class", "card-icon")
        newHeart.setAttribute("class", "heart")
        newBook.setAttribute("class", "bookmark")
        newHeartImg.setAttribute("src", "../assets/img/Heart-outline.svg")
        newHeartImg.setAttribute("alt", "")
        newBookImg.setAttribute("src", "../assets/img/Bookmark-outline.svg")
        newBookImg.setAttribute("alt", "")

        newStore.innerText=store.store_name
        newAdd.innerText=store.store_address
        newHeartNum.innerText=store.total_likes
        newCate.innerText = "전통한복"  //카테고리 가져오기
        
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