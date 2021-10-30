let menu = document.querySelector('#menu_bar');
let navbar = document.querySelector('.navbar');

menu.onClick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

document.querySelector('#search').onClick = () =>{
    document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onClick = () =>{
    document.querySelector('#search-form').classList.remove('active');
}




var swiper = new Swiper(".review-slide", {
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
      delay: 7500,
      disableOnInteraction: false,
    },
    loop:true,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
});

