document.addEventListener("DOMContentLoaded", () => {
  const imageContainer = document.getElementById("image-grid");

  // Función para cargar las imágenes de forma diferida
  const lazyLoadImages = (url, className) => {
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const html = parser.parseFromString(data, "text/html");
        const imageElements = Array.from(
          html.querySelectorAll('a[href$=".jpg"]')
        ).map((link) => {
          const img = document.createElement("img");
          img.classList.add("h-auto", "max-w-full", "rounded-lg");
          img.setAttribute("src", link.getAttribute("href"));
          img.alt = "";
          const div = document.createElement("div");
          div.classList.add("grid-item", className);
          div.appendChild(img);
          return div;
        });

        const fragment = document.createDocumentFragment();

        imageElements.forEach((element) => {
          fragment.appendChild(element);
          element.addEventListener("click", () => {
            element.classList.toggle("maximized");
          });
        });

        imageContainer.appendChild(fragment);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Cargar las imágenes de forma diferida para cada categoría
  lazyLoadImages("./assets/images/festival/closing/closing/", "closing");
  lazyLoadImages("./assets/images/festival/xeria/xeria/", "xeria");
  lazyLoadImages("./assets/images/festival/zenobia/zenobia/", "zenobia");
  lazyLoadImages("./assets/images/festival/delalma/delalma/", "delalma");
  lazyLoadImages("./assets/images/festival/saratoga/saratoga/", "saratoga");
});
