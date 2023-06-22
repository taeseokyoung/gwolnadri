// 스크롤 시 네비바 색상 변경 및 main-page 높이 축소
const scroll_body = document.querySelector("#Gwolnadri-body");

document.querySelector('#Gwolnadri-body').addEventListener('scroll', (e) => {
    let y = scroll_body.scrollTop

    if (y > 5) {
        document.querySelector('.header').classList.add('on')
        document.querySelector('.main-page .image').style.transition = 'height 0.6s'
        document.querySelector('.main-page .image').style.height = '400px'

    }
    else if (y < 5) {
        document.querySelector('.header').classList.remove('on')
        document.querySelector('.main-page .image').style.height = '600px'
    }
});

// 뒤로가기
function goBack() {
    window.history.back();
}

// 내 정보 수정 : 이미지 미리보기
// document.querySelector('.profile-image-input').addEventListener('change', function () {
//     readURL(this)
// })

// function readURL(input) {
//     if (input.files && input.files[0]) {
//         var reader = new FileReader();
//         reader.onload = function (e) {
//             document.querySelector('.profile-image').src = e.target.result;
//         };
//         reader.readAsDataURL(input.files[0]);
//     } else {
//         document.querySelector('.profile-image').src = "";
//     }
// }