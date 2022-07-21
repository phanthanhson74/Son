var swiper = new Swiper(".mySwiper", {

    slidesPerView: 2.5,
    spaceBetween: 40,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    autoplay: 3000,
    autoplayDisableOnInteraction: true,
    runCallbacksOnInit: true,
    onInit: function(sw){
        var offer = document.querySelector('.numberSlides');
        offer.innerHTML = (sw.activeIndex +  1) + '/' + sw.slides.length + 'Offers';
    },
    onSlideChangeEnd: function(sw){
        var offer = document.querySelector('.snumberSlides');
        offer.innerHTML = (sw.activeIndex +  1) + '/' + sw.slides.length + 'Offers';
    }
});






var swiper2 = new Swiper(".mySwiper2", {

    slidesPerView: 3,
    spaceBetween: 40,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    autoplay: 3000,
    autoplayDisableOnInteraction: false,
    runCallbacksOnInit: true,
    onInit: function(sw){
        var offer = document.querySelector('#numberSlides');
        offer.innerHTML = (sw.activeIndex +  1) + '/' + sw.slides.length + 'Offers';
    },
    onSlideChangeEnd: function(sw){
        var offer = document.querySelector('#numberSlides');
        offer.innerHTML = (sw.activeIndex +  1) + '/' + sw.slides.length + 'Offers';
    }
});


