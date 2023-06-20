window.onload = async function EventDetail() {
    const response = await fetch(`http://127.0.0.1:8000/events/`, { method: 'GET' });
    const response_json = await response.json();
    console.log(response_json);

    // for (let i = 0; i < response_json.length; i++) {
    //     const booking = response_json[i]
    //     console.log(booking)}

    const eventListContainer = document.getElementById('event_list');
  
    response_json.forEach(element => {
      const get_title = element.title;
      const get_event_start_date = element.event_start_date;
      const get_event_end_date = element.event_end_date;
      const get_like_count = element.likes_count;
      const get_review_count = element.review_count;
      console.log(get_title, get_event_start_date, get_event_end_date, get_like_count, get_review_count);
  
      const eventCard = document.createElement('div');
      eventCard.classList.add('sub-card');
  
      const eventImage = document.createElement('img');
      eventImage.src = 'assets/img/image-2.jpg';
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
  
      const reviewIcon = document.createElement('div');
      reviewIcon.id = 'review_icon';
      reviewIcon.classList.add('bookmark');
  
      const reviewIconImage = document.createElement('img');
      reviewIconImage.src = '/assets/img/Bookmark-outline.svg';
      reviewIconImage.alt = '';
  

  
      likeIcon.appendChild(likeIconImage);
      likeIcon.appendChild(likeCount);
  
      reviewIcon.appendChild(reviewIconImage);
  
      cardIcon.appendChild(likeIcon);
      cardIcon.appendChild(reviewIcon);
  
      eventCardTxt.appendChild(eventCategory);
      eventCardTxt.appendChild(eventTitle);
      eventCardTxt.appendChild(eventDate);
      eventCardTxt.appendChild(cardIcon);
  
      eventCard.appendChild(eventImage);
      eventCard.appendChild(reservationTag);
      eventCard.appendChild(eventCardTxt);
  
      eventListContainer.appendChild(eventCard);
    });
  }