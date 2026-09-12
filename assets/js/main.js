/**
 * لمستي بيوتي | LAMSETY BEAUTY
 * Main Interactive Logic & Experience Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const header = document.querySelector('.header');
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  // --- Sticky Header on Scroll ---
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Scroll to Top ---
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // --- Mobile Navigation Drawer ---
  const openDrawer = () => {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // --- Services Filter Tabs ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.5s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- Services Data for Live Booking Calculation ---
  const serviceCatalog = {
    'hair-styling': { name: 'تسريحات وصبغات الشعر الملكية', price: 180, duration: '90 دقيقة' },
    'bridal-makeup': { name: 'مكياج سهرات وعرائس ملكي', price: 350, duration: '75 دقيقة' },
    'skincare-facial': { name: 'تنظيف عميق وعناية هيدرافيشل', price: 250, duration: '60 دقيقة' },
    'luxury-nails': { name: 'مانيكير وبديكير سبا مع أوراق الذهب', price: 140, duration: '60 دقيقة' },
    'moroccan-spa': { name: 'حمام مغربي ملكي ومساج استرخائي', price: 300, duration: '90 دقيقة' },
    'lashes-brows': { name: 'تحديد الحواجب وتركيب الرموش', price: 120, duration: '45 دقيقة' },
    'pkg-royal-bride': { name: 'باقة العروس الملكية الشاملة', price: 1299, duration: '4.5 ساعات' },
    'pkg-weekend-glow': { name: 'باقة دلال نهاية الأسبوع', price: 499, duration: '2.5 ساعة' },
    'pkg-renewal': { name: 'باقة النضارة والتجديد الأسبوعية', price: 399, duration: '2 ساعة' }
  };

  // --- Quick Book from Service & Package Cards ---
  const quickBookButtons = document.querySelectorAll('.js-quick-book');
  const bookingSelect = document.getElementById('bookingService');

  quickBookButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceKey = btn.getAttribute('data-service-id');
      if (serviceKey && bookingSelect) {
        bookingSelect.value = serviceKey;
        updateBookingSummary();
        const bookingSection = document.getElementById('booking');
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // --- Booking Form Real-time Summary Update ---
  const bookingSpecialist = document.getElementById('bookingSpecialist');
  const bookingDate = document.getElementById('bookingDate');
  const bookingTime = document.getElementById('bookingTime');

  const summaryServiceName = document.getElementById('summaryServiceName');
  const summaryDuration = document.getElementById('summaryDuration');
  const summarySpecialist = document.getElementById('summarySpecialist');
  const summaryDateTime = document.getElementById('summaryDateTime');
  const summaryTotalPrice = document.getElementById('summaryTotalPrice');

  const updateBookingSummary = () => {
    const selectedServiceKey = bookingSelect ? bookingSelect.value : '';
    const serviceInfo = serviceCatalog[selectedServiceKey];

    if (serviceInfo) {
      if (summaryServiceName) summaryServiceName.textContent = serviceInfo.name;
      if (summaryDuration) summaryDuration.textContent = serviceInfo.duration;
      if (summaryTotalPrice) summaryTotalPrice.textContent = `${serviceInfo.price} ر.س`;
    } else {
      if (summaryServiceName) summaryServiceName.textContent = 'يرجى اختيار الخدمة';
      if (summaryDuration) summaryDuration.textContent = '--';
      if (summaryTotalPrice) summaryTotalPrice.textContent = '0 ر.س';
    }

    if (summarySpecialist && bookingSpecialist) {
      summarySpecialist.textContent = bookingSpecialist.options[bookingSpecialist.selectedIndex]?.text || 'أي أخصائية متاحة';
    }

    if (summaryDateTime && bookingDate && bookingTime) {
      const dateVal = bookingDate.value;
      const timeVal = bookingTime.value;
      if (dateVal && timeVal) {
        summaryDateTime.textContent = `${dateVal} | ${timeVal}`;
      } else if (dateVal) {
        summaryDateTime.textContent = dateVal;
      } else {
        summaryDateTime.textContent = 'يرجى تحديد الموعد';
      }
    }
  };

  if (bookingSelect) bookingSelect.addEventListener('change', updateBookingSummary);
  if (bookingSpecialist) bookingSpecialist.addEventListener('change', updateBookingSummary);
  if (bookingDate) bookingDate.addEventListener('change', updateBookingSummary);
  if (bookingTime) bookingTime.addEventListener('change', updateBookingSummary);

  // Set default minimum date for booking input to today
  if (bookingDate) {
    const today = new Date().toISOString().split('T')[0];
    bookingDate.min = today;
  }

  // --- Booking Form Submit & Confirmation Modal ---
  const bookingForm = document.getElementById('bookingForm');
  const confirmationModal = document.getElementById('confirmationModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBookingDetails = document.getElementById('modalBookingDetails');
  const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const serviceKey = bookingSelect.value;
      const specialistText = bookingSpecialist.options[bookingSpecialist.selectedIndex].text;
      const date = bookingDate.value;
      const time = bookingTime.value;
      const notes = document.getElementById('bookingNotes')?.value.trim() || 'لا توجد ملاحظات خاصة';

      if (!name || !phone || !serviceKey || !date || !time) {
        alert('يرجى ملء جميع الحقول الأساسية لإتمام الحجز.');
        return;
      }

      const service = serviceCatalog[serviceKey];
      const serviceName = service ? service.name : 'خدمة مخصصة';
      const servicePrice = service ? `${service.price} ر.س` : 'حسب التحديد';

      // Populate details in modal
      if (modalBookingDetails) {
        modalBookingDetails.innerHTML = `
          <p><strong>اسم العميلة:</strong> ${name}</p>
          <p><strong>رقم الجوال:</strong> ${phone}</p>
          <p><strong>الخدمة المختارة:</strong> ${serviceName}</p>
          <p><strong>الأخصائية:</strong> ${specialistText}</p>
          <p><strong>التاريخ والوقت:</strong> ${date} في تمام الساعة ${time}</p>
          <p><strong>المبلغ التقديري:</strong> <span style="color: #9A6F1D; font-weight: bold;">${servicePrice}</span></p>
        `;
      }

      // Prepare WhatsApp message link
      const waMessage = encodeURIComponent(
        `مرحباً صالون لمستي بيوتي ✨\n\nأرغب في تأكيد حجز موعد جديد:\n- الاسم: ${name}\n- الجوال: ${phone}\n- الخدمة: ${serviceName}\n- الأخصائية: ${specialistText}\n- التاريخ: ${date}\n- الوقت: ${time}\n- الملاحظات: ${notes}\n\nشكراً لكم!`
      );
      if (modalWhatsappBtn) {
        modalWhatsappBtn.href = `https://wa.me/966500000000?text=${waMessage}`;
      }

      // Open Modal
      confirmationModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      bookingForm.reset();
      updateBookingSummary();
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      confirmationModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // --- Lightbox Gallery Modal ---
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-title')?.textContent || '';
      const category = item.querySelector('.gallery-category')?.textContent || '';

      if (lightboxImg && img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      }
      if (lightboxCaption) {
        lightboxCaption.textContent = `${title} • ${category}`;
      }
      if (lightboxModal) {
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      if (confirmationModal) confirmationModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // --- Testimonials Slider ---
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  const sliderDotsContainer = document.getElementById('sliderDots');
  let currentSlide = 0;
  let sliderInterval = null;

  if (testimonialCards.length > 0 && sliderDotsContainer) {
    // Generate dots
    testimonialCards.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(idx));
      sliderDotsContainer.appendChild(dot);
    });

    const dots = sliderDotsContainer.querySelectorAll('.slider-dot');

    const goToSlide = (index) => {
      testimonialCards.forEach(card => card.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));

      currentSlide = (index + testimonialCards.length) % testimonialCards.length;
      testimonialCards[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        resetAutoSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        resetAutoSlide();
      });
    }

    const startAutoSlide = () => {
      sliderInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 6500);
    };

    const resetAutoSlide = () => {
      clearInterval(sliderInterval);
      startAutoSlide();
    };

    startAutoSlide();
  }

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Initial summary sync
  updateBookingSummary();
});
