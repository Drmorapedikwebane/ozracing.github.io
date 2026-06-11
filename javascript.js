/* ======================================
   OZRACING SPARES
   PROFESSIONAL JAVASCRIPT
====================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       MOBILE MENU
    ========================== */

    const menuBtn = document.querySelector(".mobile-menu");
    const navbar = document.querySelector(".navbar");

    if(menuBtn && navbar){

        menuBtn.addEventListener("click", () => {

            navbar.classList.toggle("mobile-active");

            const icon = menuBtn.querySelector("i");

            if(navbar.classList.contains("mobile-active")){
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-times");
            }else{
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }

        });

    }

    /* ==========================
       HEADER SCROLL EFFECT
    ========================== */

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if(window.scrollY > 100){

            header.style.background = "rgba(0,0,0,0.98)";
            header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.3)";

        }else{

            header.style.background = "rgba(0,0,0,0.95)";
            header.style.boxShadow = "none";

        }

    });

    /* ==========================
       SMOOTH SCROLL LINKS
    ========================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(e){

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if(target){

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

    /* ==========================
       FADE-IN ANIMATION
    ========================== */

    const fadeElements = document.querySelectorAll(
        ".product-card, .feature-box, .about-content, .vehicle-grid div, .stat-box"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    }, {
        threshold: 0.15
    });

    fadeElements.forEach(el => {

        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 0.8s ease";

        observer.observe(el);

    });

    /* ==========================
       STATS COUNTER
    ========================== */

    const counters = document.querySelectorAll(".stat-box h2");

    const startCounter = (counter) => {

        const text = counter.innerText;

        const number = parseInt(text.replace(/\D/g, ""));

        if(isNaN(number)) return;

        let current = 0;

        const increment = Math.ceil(number / 80);

        const updateCounter = () => {

            current += increment;

            if(current >= number){

                counter.innerText = text;

            }else{

                if(text.includes("%")){
                    counter.innerText = current + "%";
                }
                else if(text.includes("+")){
                    counter.innerText = current + "+";
                }
                else{
                    counter.innerText = current;
                }

                requestAnimationFrame(updateCounter);

            }

        };

        updateCounter();

    };

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                startCounter(entry.target);

                counterObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    /* ==========================
       ACTIVE NAVIGATION
    ========================== */

    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav-links a").forEach(link => {

        const href = link.getAttribute("href");

        if(href === currentPage || (currentPage === "" && href === "index.html")){
            link.classList.add("active");
        }

    });

    /* ==========================
       PRODUCT CARD EFFECT
    ========================== */

    const cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-12px)";
            card.style.boxShadow = "0 15px 35px rgba(0,0,0,0.2)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0)";
            card.style.boxShadow = "";

        });

    });

    /* ==========================
       BUTTON RIPPLE EFFECT
    ========================== */

    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("click", function(e){

            const circle = document.createElement("span");

            const diameter = Math.max(
                this.clientWidth,
                this.clientHeight
            );

            const radius = diameter / 2;

            circle.style.width = circle.style.height =
                `${diameter}px`;

            circle.style.left =
                `${e.clientX - this.offsetLeft - radius}px`;

            circle.style.top =
                `${e.clientY - this.offsetTop - radius}px`;

            circle.classList.add("ripple");

            const ripple = this.querySelector(".ripple");

            if(ripple){
                ripple.remove();
            }

            this.appendChild(circle);

        });

    });

    /* ==========================
       BACK TO TOP BUTTON
    ========================== */

    const backToTop = document.createElement("button");

    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';

    backToTop.className = "back-to-top";

    document.body.appendChild(backToTop);

    window.addEventListener("scroll", () => {

        if(window.scrollY > 500){

            backToTop.style.opacity = "1";
            backToTop.style.visibility = "visible";

        }else{

            backToTop.style.opacity = "0";
            backToTop.style.visibility = "hidden";

        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});

/* ======================================
   EXTRA CSS INJECTION
====================================== */

const style = document.createElement("style");

style.innerHTML = `

.mobile-active{
    display:block !important;
    position:absolute;
    top:80px;
    left:0;
    width:100%;
    background:#111;
    padding:20px;
}

.mobile-active .nav-links{
    flex-direction:column;
    gap:20px;
}

.back-to-top{
    position:fixed;
    bottom:90px;
    right:20px;
    width:50px;
    height:50px;
    border:none;
    border-radius:50%;
    background:#e10600;
    color:white;
    cursor:pointer;
    font-size:18px;
    z-index:999;
    opacity:0;
    visibility:hidden;
    transition:0.3s;
    box-shadow:0 5px 15px rgba(0,0,0,0.3);
}

.back-to-top:hover{
    transform:translateY(-3px);
}

.btn{
    position:relative;
    overflow:hidden;
}

.ripple{
    position:absolute;
    border-radius:50%;
    transform:scale(0);
    animation:ripple 600ms linear;
    background-color:rgba(255,255,255,0.5);
}

@keyframes ripple{

    to{
        transform:scale(4);
        opacity:0;
    }

}

`;

document.head.appendChild(style);

console.log("OZRacing Spares Website Loaded Successfully");
