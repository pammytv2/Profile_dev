document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    // ป้องกันคลาสค้าง
    link.classList.remove("animate-click");
    void link.offsetWidth; // รีเซ็ต animation
    link.classList.add("animate-click");
    // ปิดเมนูเมื่อคลิกบนมือถือเพื่อไม่ให้บังเนื้อหา
    const menuToggle = document.getElementById("menu-toggle");
    if (menuToggle) {
      menuToggle.checked = false;
    }
  });
});
      // Create twinkling stars
      // สร้างดาวกระพริบแบบสุ่ม
      function createStars() {
        const starsContainer = document.querySelector(".stars-layer");
        const starCount = 300;

        for (let i = 0; i < starCount; i++) {
          const star = document.createElement("div");
          star.className = "star";

          // ขนาดสุ่มของดาว
          const size = Math.random();
          if (size < 0.7) {
            star.classList.add("small");
          } else if (size < 0.9) {
            star.classList.add("medium");
          } else {
            star.classList.add("large");
          }

          // ตำแหน่งและเอฟเฟกต์สุ่ม
          star.style.left = Math.random() * 100 + "%";
          star.style.top = Math.random() * 100 + "%";
          star.style.animationDelay = Math.random() * 3 + "s";
          star.style.animationDuration = Math.random() * 2 + 2 + "s";

          starsContainer.appendChild(star);
        }
      }
      // ตรวจว่า element อยู่ใน viewport ไหม
      function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
          rect.top <=
          (window.innerHeight || document.documentElement.clientHeight)
        );
      }
      function revealSectionsOnScroll() {
        const sections = document.querySelectorAll(".section");
        const windowHeight = window.innerHeight;

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= windowHeight - 100) {
            section.classList.add("visible");
          }
        });
      }

      function revealSectionsOnScroll() {
        const sections = document.querySelectorAll(".section");
        sections.forEach((section) => {
          if (isInViewport(section)) {
            section.classList.add("visible");
          }
        });
      }

      // Run เมื่อ scroll และเมื่อโหลด
      window.addEventListener("scroll", revealSectionsOnScroll);
      window.addEventListener("DOMContentLoaded", revealSectionsOnScroll);

      // สร้างดาวตกแบบสุ่ม
      function createShootingStars() {
        setInterval(() => {
          const shootingStar = document.createElement("div");
          shootingStar.className = "shooting-star";

          shootingStar.style.left = Math.random() * 50 + "%";
          shootingStar.style.top = Math.random() * 50 + "%";
          shootingStar.style.width = Math.random() * 150 + 100 + "px";
          shootingStar.style.animationDuration = Math.random() * 1 + 1.5 + "s";

          document.body.appendChild(shootingStar);

          // ลบดาวตกหลังจากจบ animation
          setTimeout(() => {
            if (document.body.contains(shootingStar)) {
              document.body.removeChild(shootingStar);
            }
          }, 2000); // กำหนดให้อยู่แค่ 2 วินาที
        }, 4000); // สร้างใหม่ทุก 4 วินาที
      }
      

      // เรียกใช้งานเมื่อโหลดหน้าเว็บ
      window.addEventListener("DOMContentLoaded", () => {
        createStars();
        createShootingStars();
      });
