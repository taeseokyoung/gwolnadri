// 스크롤 시 네비바 색상 변경
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

window.onload = async function EventList() {
  const response = await fetch(`${backend_base_url}/events/`, { method: 'GET' });
  const response_json = await response.json();
  // console.log(response_json);

  // for (let i = 0; i < response_json.length; i++) {
  //     const booking = response_json[i]
  //     console.log(booking)}

  const eventListContainer = document.getElementById('event_list');

  response_json.forEach(element => {
    const get_title = element.title;
    const get_event_start_date = element.event_start_date;
    const get_event_end_date = element.event_end_date;
    const get_like_count = element.likes_count;
    const get_bookmarker = element.event_bookmarks;
    // console.log(get_title, get_event_start_date, get_event_end_date, get_like_count, get_bookmarker);

    const eventCard = document.createElement('div');
    eventCard.classList.add('sub-card');

    const eventImage = document.createElement('img');
    eventImage.src = '/assets/img/image-2.jpg';
    eventImage.alt = '';

    const reservationTag = document.createElement('p');
    reservationTag.classList.add('reservation');
    reservationTag.innerText = '기간한정';

    const eventCardTxt = document.createElement('div');
    eventCardTxt.classList.add('sub-card-txt');

    const eventCategory = document.createElement('a');
    eventCategory.classList.add('category');
    eventCategory.innerText = '전시/행사';

    const eventTitle = document.createElement('h3');
    eventTitle.id = 'event_title';
    eventTitle.classList.add('title');
    eventTitle.innerText = get_title;

    const eventDate = document.createElement('p');
    eventDate.id = 'event_date';
    eventDate.classList.add('event-date');
    eventDate.innerText = `${get_event_start_date} - ${get_event_end_date}`;

    const cardIcon = document.createElement('div');
    cardIcon.classList.add('card-icon');

    const likeIcon = document.createElement('div');
    likeIcon.id = 'like_icon';
    likeIcon.classList.add('heart');

    const likeIconImage = document.createElement('img');
    likeIconImage.src = '/assets/img/Heart-outline.svg';
    likeIconImage.alt = '';

    const likeCount = document.createElement('span');
    likeCount.id = 'like_count';
    likeCount.innerText = String(get_like_count);

    const bookmarkIcon = document.createElement('div');
    bookmarkIcon.id = 'bookmark_icon';
    bookmarkIcon.classList.add('bookmark');

    const bookmarkIconImage = document.createElement('img');
    if (get_bookmarker.includes(payload_parse.user_id)) {
      bookmarkIconImage.setAttribute("src", "/assets/img/Bookmark-full.svg")
    } else {  
      bookmarkIconImage.setAttribute("src", "/assets/img/Bookmark-outline.svg")
    }
    bookmarkIconImage.alt = '';



    likeIcon.appendChild(likeIconImage);
    likeIcon.appendChild(likeCount);

    bookmarkIcon.appendChild(bookmarkIconImage);

    cardIcon.appendChild(likeIcon);
    cardIcon.appendChild(bookmarkIcon);

    eventCardTxt.appendChild(eventCategory);
    eventCardTxt.appendChild(eventTitle);
    eventCardTxt.appendChild(eventDate);
    eventCardTxt.appendChild(cardIcon);

    eventCard.appendChild(eventImage);
    eventCard.appendChild(reservationTag);
    eventCard.appendChild(eventCardTxt);

    eventImage.addEventListener('click', function () {
      const event_id = parseInt(element.id, 10);
      window.location.href = `${frontend_base_url}/event-detail.html?event_id=${event_id}`;
    });


    bookmarkIcon.addEventListener('click', async () => {
      const event_id = parseInt(element.id, 10);
      const token = localStorage.getItem("access");

      // console.log(event_id);
      if (payload) {
        try {
          const bookmarkResponse = await fetch(`${backend_base_url}/events/${event_id}/bookmark/`, {
            method: 'POST',
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });

          const bookmarkData = await bookmarkResponse.json();
          alert(bookmarkData.message);
        } catch (error) {
          console.error('Error bookmarking event:', error);
        }
      } else {
        alert("로그인이 필요합니다")
      }
      window.location.reload()

    });

    eventListContainer.appendChild(eventCard);

  });

}