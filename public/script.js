import { SquidClient } from '@squidcloud/client';

const squid = new SquidClient({
    appId: '0awfi4i2awmyqqu59y',
    region: 'us-east-1.aws',
    environmentId: 'dev',
});

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        const testimonials = testimonialSlider.querySelectorAll('.testimonial');
        let currentTestimonial = 0;

        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
        }

        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }

        showTestimonial(0);
        setInterval(nextTestimonial, 5000);
    }

    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message. We will get back to you soon!');
            this.reset();
        });
    }

    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .about-content, .testimonial-slider').forEach(el => {
        observer.observe(el);
    });

    // New code block to handle form submission for coaching inquiry
    const form = document.getElementById('coaching-inquiry');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    } else {
        console.error('Form with id "coaching-inquiry" not found');
    }
});

async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const appointmentData = Object.fromEntries(formData);

    try {
        // Assuming you have a 'appointments' collection in Squid
        await squid.collection('appointments').add(appointmentData);
        alert('Appointment scheduled successfully!');
        form.reset();
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
}
