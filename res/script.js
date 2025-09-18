document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');

    // Функция для debounce (оптимизация обработки scroll)
  function debounce(func, wait = 15, immediate = true) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

    // Функция для плавной прокрутки
  function smoothScrollTo(target) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
        const duration = 800; // Длительность анимации в мс
        let startTime = null;
        
        function animation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const run = ease(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        // Функция для плавности анимации (easeOutQuad)
        function ease(t, b, c, d) {
          t /= d;
          return -c * t*(t-2) + b;
        }
        
        requestAnimationFrame(animation);
      }

    // Обработка кликов по навигации
      navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetSection = document.querySelector(targetId);

            // Удаляем активный класс у всех ссылок
          navLinks.forEach(lnk => lnk.classList.remove('active'));
            // Добавляем активный класс текущей ссылке
          this.classList.add('active');

            // Плавная прокрутка к разделу
          smoothScrollTo(targetSection);
        });
      });

    // Функция для определения и подсветки активного раздела
      function highlightActiveSection() {
        let current = '';
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;

          if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
          }
        });
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
          }
        });
      }

    // Обработчик скролла с debounce
      window.addEventListener('scroll', debounce(highlightActiveSection));

    // Инициализация - подсветка первого раздела при загрузке
      highlightActiveSection();
    });

let currentLightbox = null;

document.querySelectorAll('.gallery-item').forEach((item, index) => {
  item.addEventListener('click', () => {
    openLightbox(index + 1); // +1 потому что нумерация с 1
  });
});

function openLightbox(imgNumber) {
  if (currentLightbox) currentLightbox.remove();
  
  currentImageIndex = imgNumber - 1;
  totalImages = document.querySelectorAll('.gallery-item').length; // Динамическое определение количества

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <span class="close-btn">&times;</span>
      <div class="image-container">
        <img src="img/house${imgNumber}.jpg" class="lightbox-img">
      </div>
      <span class="nav-arrow prev">&#10094;</span>
      <span class="nav-arrow next">&#10095;</span>
    </div>
  `;
  document.body.appendChild(lightbox);
  currentLightbox = lightbox;

  // Обработчики событий
  const handleKeyDown = (e) => {
    if(e.key === 'Escape') lightbox.remove();
    if(e.key === 'ArrowLeft') navigate(-1);
    if(e.key === 'ArrowRight') navigate(1);
  };

  const navigate = (direction) => {
    currentImageIndex = (currentImageIndex + direction + totalImages) % totalImages;
    const newImgNumber = currentImageIndex + 1;
    lightbox.querySelector('.lightbox-img').src = `img/house${newImgNumber}.jpg`;
  };

  lightbox.querySelector('.close-btn').addEventListener('click', () => lightbox.remove());
  lightbox.querySelector('.prev').addEventListener('click', () => navigate(-1));
  lightbox.querySelector('.next').addEventListener('click', () => navigate(1));
  document.addEventListener('keydown', handleKeyDown);
  lightbox.addEventListener('click', (e) => e.target === lightbox && lightbox.remove());
}

document.addEventListener('DOMContentLoaded', function() {
  const thumbnailsContainer = document.getElementById('thumbnailsContainer');
  const mainThumb = document.getElementById('mainThumb');
  
  // Очищаем контейнер перед добавлением миниатюр
  thumbnailsContainer.innerHTML = '';
  
  // Создаем миниатюры
  for (let i = 1; i <= 20; i++) {
    const thumb = document.createElement('img');
    thumb.src = `img/house${Math.min(i, 20)}.jpg`; // Используем первые 20 изображений
    thumb.alt = `Миниатюра ${i}`;
    thumb.className = 'thumb-item';
    
    thumb.addEventListener('click', function() {
      // Обновляем основное изображение
      mainThumb.src = this.src;
      mainThumb.alt = this.alt;
      
      // Удаляем класс active у всех миниатюр
      document.querySelectorAll('.thumb-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // Добавляем класс active к текущей миниатюре
      this.classList.add('active');
    });
    
    thumbnailsContainer.appendChild(thumb);
  }
  
  // Активируем первую миниатюру по умолчанию
  if (thumbnailsContainer.firstChild) {
    thumbnailsContainer.firstChild.classList.add('active');
  }
});

// Обработчики для табов услуг
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.service-tab');
  const contents = document.querySelectorAll('.service-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Удаляем активный класс у всех табов и контента
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      
      // Добавляем активный класс текущему табу
      this.classList.add('active');
      
      // Показываем соответствующий контент
      const serviceId = this.getAttribute('data-service');
      document.getElementById(serviceId).classList.add('active');
    });
  });
  
  // Инициализация миниатюр для всех услуг
  initServiceThumbnails('bath', 8); // 8 изображения для бани
  initServiceThumbnails('decor', 4); // 4 изображения для оформления
  initServiceThumbnails('photo', 5); // фотосессия 
  initServiceThumbnails('hookah', 1); // кальян
  initServiceThumbnails('atv', 3); // квадроциклы
});

function initServiceThumbnails(service, count) {
  const container = document.querySelector(`#${service} .thumbnails`);
  if (!container) return;
  
  container.innerHTML = '';
  
  for (let i = 1; i <= count; i++) {
    const thumb = document.createElement('img');
    thumb.src = `img/${service}${i}.jpg`;
    thumb.alt = `Миниатюра ${i}`;
    thumb.className = 'thumb-item';
    
    thumb.addEventListener('click', function() {
      // Обновляем основное изображение
      const mainImg = this.closest('.service-content').querySelector('.main-thumbnail img');
      mainImg.src = this.src;
      mainImg.alt = this.alt;
      
      // Удаляем класс active у всех миниатюр
      this.closest('.thumbnails').querySelectorAll('.thumb-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // Добавляем класс active к текущей миниатюре
      this.classList.add('active');
    });
    
    container.appendChild(thumb);
  }
  
  // Активируем первую миниатюру
  if (container.firstChild) {
    container.firstChild.classList.add('active');
  }
}

// Бронирование
document.addEventListener('DOMContentLoaded', function() {
  const checkAvailabilityBtn = document.getElementById('checkAvailability');
  const changeDatesBtn = document.getElementById('changeDates');
  const successOverlay = document.getElementById('successOverlay');
  const errorOverlay = document.getElementById('errorOverlay');
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const selectedDatesSpan = document.getElementById('selectedDates');
  const bookingInstructions = document.getElementById('bookingInstructions');

    // Проверка доступности дат
  checkAvailabilityBtn.addEventListener('click', function() {
    const checkinDate = document.getElementById('checkinDate');
    const checkoutDate = document.getElementById('checkoutDate');

        // Скрыть все сообщения об ошибках
    document.querySelectorAll('.error-text').forEach(el => el.style.display = 'none');

    let isValid = true;

    if (!checkinDate.value) {
      checkinDate.nextElementSibling.style.display = 'block';
      isValid = false;
    }

    if (!checkoutDate.value) {
      checkoutDate.nextElementSibling.style.display = 'block';
      isValid = false;
    }

    if (!isValid) return;

        // Имитация запроса к серверу
    setTimeout(() => {
      const isAvailable = checkDatesAvailability(checkinDate.value, checkoutDate.value);

      if (isAvailable) {
                // Показываем сообщение об успехе
        successOverlay.style.display = 'flex';

                // Обновляем отображаемые даты
        const checkinFormatted = new Date(checkinDate.value).toLocaleDateString();
        const checkoutFormatted = new Date(checkoutDate.value).toLocaleDateString();
        selectedDatesSpan.textContent = `${checkinFormatted} - ${checkoutFormatted}`;

                // Через 1 секунды переходим к следующему шагу
        setTimeout(() => {
          successOverlay.style.display = 'none';
          step1.classList.remove('active');
          step2.classList.add('active');
                    bookingInstructions.style.display = 'none'; // Скрываем инструкцию
                  }, 1500);
      } else {
                // Показываем сообщение о занятых датах
        errorOverlay.style.display = 'flex';
        setTimeout(() => {
          errorOverlay.style.display = 'none';
        }, 2000);
      }
    }, 500);
  });

    // Изменить даты
  changeDatesBtn.addEventListener('click', function() {
    step2.classList.remove('active');
    step1.classList.add('active');
        bookingInstructions.style.display = 'block'; // Показываем инструкцию снова
      });

    // Сброс подсветки при вводе
  document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', function() {
      if (this.value) {
        this.nextElementSibling.style.display = 'none';
      }
    });
  });

    // Заглушка для проверки доступности дат
  function checkDatesAvailability(checkin, checkout) {
        // В реальном приложении здесь будет запрос к серверу
        // Для демонстрации сделаем случайный результат (50% chance доступно)
    return Math.random() > 0.5;
  }
});

// Копирование телефона
document.addEventListener('DOMContentLoaded', function() {
  const phoneLink = document.querySelector('.copy-phone');
  
  if (phoneLink) {
    phoneLink.addEventListener('click', function(e) {
      e.preventDefault();
      const phone = this.getAttribute('data-phone');
      
      // Создаем временный элемент для копирования
      const tempInput = document.createElement('input');
      tempInput.value = phone;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      
      // Показываем уведомление
      const tooltip = this.querySelector('.copy-tooltip');
      tooltip.textContent = 'Скопировано!';
      setTimeout(() => {
        tooltip.textContent = 'Нажмите, чтобы скопировать';
      }, 2000);
    });
  }
});

// Reviews Section
document.addEventListener('DOMContentLoaded', function() {
  // Элементы DOM
  const reviewsTrack = document.querySelector('.reviews-track');
  const prevBtn = document.querySelector('.slider-arrow.prev');
  const nextBtn = document.querySelector('.slider-arrow.next');
  const addReviewBtn = document.getElementById('addReviewBtn');
  const backToReviewsBtn = document.getElementById('backToReviews');
  const reviewForm = document.querySelector('.review-form');
  const ratingStars = document.querySelectorAll('.rating-star');
  const ratingInput = document.getElementById('ratingValue');
  
  // Данные отзывов
  const reviews = [
    {
      date: '15-17 июля 2023',
      services: 'Банный чан, Кальян',
      rating: 5,
      text: 'Отличное место для отдыха! Домик очень уютный, все продумано до мелочей. Банный чан - просто восторг, особенно вечером. Персонал внимательный и отзывчивый. Обязательно вернемся снова!'
    },
    {
      date: '22-24 июня 2023',
      services: 'Фотосессия',
      rating: 5,
      text: 'Прекрасное место для романтического отдыха. Фотосессия получилась просто волшебная, фотограф профессионал. Домик очень стильный и комфортный, вид на лес из окна - завораживает. Рекомендую всем парам!'
    },
    {
      date: '8-10 мая 2023',
      services: 'Квадроциклы',
      rating: 5,
      text: 'Отдыхали с друзьями, все в восторге! Квадроциклы - это что-то невероятное, маршруты продуманы отлично. Домик чистый, уютный, все необходимое есть. Особенно понравилась терраса с видом на лес.'
    },
    {
      date: '1-3 апреля 2023',
      services: 'Оформление праздника',
      rating: 5,
      text: 'Отмечали годовщину свадьбы. Оформление было просто шикарное, создали нужную атмосферу. Персонал очень внимательный, помогли организовать сюрприз для жены. Обязательно вернемся!'
    },
    {
      date: '12-14 марта 2023',
      services: 'Без дополнительных услуг',
      rating: 5,
      text: 'Идеальное место для уединения. Тишина, природа, уютный домик. Все очень понравилось, даже лучше чем на фото. Кровать очень удобная, кухня оборудована всем необходимым. Рекомендую всем кто хочет отдохнуть от города.'
    }
  ];

  // Инициализация
  initReviews();

  function initReviews() {
    // Установка среднего рейтинга
    document.querySelector('.reviews-count').textContent = `На основе ${reviews.length} отзывов`;
    
    // Заполнение звезд рейтинга
    const avgStars = document.querySelectorAll('.average-rating .star');
    avgStars.forEach(star => star.classList.add('filled'));
    
    // Рендеринг отзывов
    renderReviews();
    
    // Настройка слайдера
    setupSlider();
    
    // Настройка обработчиков событий
    setupEventListeners();
  }

  function renderReviews() {
    reviewsTrack.innerHTML = '';
    
    reviews.forEach(review => {
      const reviewCard = document.createElement('div');
      reviewCard.className = 'review-card';
      
      reviewCard.innerHTML = `
        <div class="review-header">
          <div class="review-date">${review.date}</div>
          <div class="review-services">${review.services}</div>
        </div>
        <div class="review-rating">
          ${'<span class="star filled">★</span>'.repeat(review.rating)}
        </div>
        <div class="review-text">${review.text}</div>
      `;
      
      reviewsTrack.appendChild(reviewCard);
    });
    
    // После рендеринга обновляем слайдер
    setupSlider();
  }

  function setupSlider() {
    prevBtn.addEventListener('click', () => {
      reviewsTrack.scrollBy({ left: -reviewsTrack.offsetWidth, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
      reviewsTrack.scrollBy({ left: reviewsTrack.offsetWidth, behavior: 'smooth' });
    });
    
    // Обновляем состояние кнопок при скролле
    reviewsTrack.addEventListener('scroll', () => {
      prevBtn.disabled = reviewsTrack.scrollLeft <= 10;
      nextBtn.disabled = reviewsTrack.scrollLeft >= 
        reviewsTrack.scrollWidth - reviewsTrack.offsetWidth - 10;
    });
  }

  function setupEventListeners() {
    // Кнопка "Добавить отзыв"
    addReviewBtn.addEventListener('click', function() {
      this.style.display = 'none';
      reviewForm.style.display = 'block';
    });
    
    // Кнопка "Назад к отзывам"
    backToReviewsBtn.addEventListener('click', function() {
      addReviewBtn.style.display = 'block';
      reviewForm.style.display = 'none';
    });
    
    // Звезды рейтинга в форме
    ratingStars.forEach(star => {
      star.addEventListener('click', function() {
        const value = parseInt(this.getAttribute('data-value'));
        ratingInput.value = value;
        
        ratingStars.forEach((s, index) => {
          if (index < value) {
            s.classList.add('active');
          } else {
            s.classList.remove('active');
          }
        });
      });
    });
    
    // Отправка формы
    document.getElementById('reviewForm').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Спасибо за ваш отзыв! После проверки он будет опубликован.');
      this.reset();
      ratingStars.forEach(star => star.classList.remove('active'));
      addReviewBtn.style.display = 'block';
      reviewForm.style.display = 'none';
    });
  }
});