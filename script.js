const images = document.querySelectorAll("img.lazy");


function loadImage(img) {
  const src = img.getAttribute("data-src");
  if (!src) return;
  img.src = src;
  img.onload = () => {
    img.classList.add("loaded"); 
  };
}


const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        
        const img = entry.target;
        loadImage(img);
        observer.unobserve(img); 
      }
    });
  },
  {
    root: null,
    rootMargin: "0px",
    threshold: 0.1, 
  },
);

// Спостерігаємо всі зображення з data-src
images.forEach((img) => {
  observer.observe(img);
});


document.getElementById("loadAll").addEventListener("click", () => {
  images.forEach((img) => {
    loadImage(img);
    observer.unobserve(img);
  });
});
