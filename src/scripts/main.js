/**
 * toogleMenu
 *
 * Blendet das Menü aus oder ein.
 *
 */

function toogleMenu() {
  const interactionElementClass = '.js-navigation-interaction-element';
  const interactionElementAdditionalClass = 'hamburger-button--is-open';
  const menuElementClass = 'main-header__menu-bar-nav--is-open';

  const interactionElement = document.querySelector(interactionElementClass);
  if (interactionElement === null) {
    return;
  }
  const interactionTarget = interactionElement.dataset.jsInteractionTarget;
  const menuElement = document.querySelector(interactionTarget);
  if (menuElement === null) {
    return;
  }

  interactionElement.addEventListener('click', () => {
    interactionElement.classList.toggle(interactionElementAdditionalClass);
    menuElement.classList.toggle(menuElementClass);
  });
}


/**
 * switchSlides
 *
 * Blättert in der Slideshow ein Bild vor oder zurück
 *
 */
function switchSlides() {
  const slideClassVisible = 'slide-show__slide--visible';
  const dotClassActive = 'dot-navigation__dot--active';
  const slides = document.querySelectorAll('[data-js-slide]');
  const interactionElementNext = document.querySelector('[data-js-nav-next-slide]');
  const interactionElementPrevious = document.querySelector('[data-js-nav-previous-slide]');
  const slideShowElement = document.querySelector('[data-js-slide-show]');
  if (slideShowElement === null) {
    return;
  }
  const configJSON = slideShowElement.getAttribute('data-js-slide-show');
  let wrapAround = false;
  let activeSlide = 0;
  const dots = [];


  function showSlide(slideID) {
    slides[slideID].classList.add(slideClassVisible);
    dots[slideID].classList.add(dotClassActive);
  }

  function hideSlide(slideID) {
    slides[slideID].classList.remove(slideClassVisible);
    dots[slideID].classList.remove(dotClassActive);
  }

  function changeSlide(direction) {
    hideSlide(activeSlide);

    if (direction === 'next') {
      if (activeSlide + 1 < slides.length) {
        activeSlide += 1;
      } else if (wrapAround) {
        activeSlide = 0;
      }
    } else if (wrapAround && activeSlide - 1 < 0) {
      activeSlide = slides.length - 1;
    } else {
      activeSlide -= 1;
    }

    showSlide(activeSlide);
  }

  function toggleFullScreen(e) {
    const target = e.currentTarget;

    if (!document.fullscreenElement) {
      target.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  function onClickDot(e) {
    const target = e.currentTarget;
    const index = parseInt(target.getAttribute('data-slide-index'), 10);

    if (activeSlide === index) {
      return;
    }

    hideSlide(activeSlide);
    showSlide(index);
    activeSlide = index;
  }

  const config = JSON.parse(configJSON);
  wrapAround = config.wrapAround;

  // Dots erzeugen
  const dotNavigationElement = document.createElement('ol');
  dotNavigationElement.classList.add('dot-navigation');
  slideShowElement.appendChild(dotNavigationElement);

  slides.forEach((slide, index) => {
    const dotElement = document.createElement('li');
    dotElement.classList.add('dot-navigation__dot');
    dotElement.setAttribute('data-slide-index', index);
    dotElement.addEventListener('click', onClickDot);
    dots[index] = dotElement;
    dotNavigationElement.appendChild(dotElement);
    slide.addEventListener('click', toggleFullScreen);
  });

  showSlide(activeSlide);
  

  interactionElementNext.addEventListener('click', () => {
    changeSlide('next');
  });
  interactionElementPrevious.addEventListener('click', () => {
    changeSlide('previous');
  });
}


toogleMenu();
switchSlides();
