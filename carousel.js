document.addEventListener("DOMContentLoaded", () => {
  const imageContainer = document.getElementById("image-grid");

  // Función para cargar las imágenes de forma diferida
  const lazyLoadImages = (url, className) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const data = xhr.responseText;
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
            resolve();
          } else {
            reject(new Error("Request failed"));
          }
        }
      };

      xhr.open("GET", url, true);
      xhr.send();
    });
  };

  // Cargar las imágenes de forma diferida para cada categoría
  Promise.all([
    lazyLoadImages("./assets/images/festival/closing/closing/", "closing"),
    lazyLoadImages("./assets/images/festival/xeria/xeria/", "xeria"),
    lazyLoadImages("./assets/images/festival/zenobia/zenobia/", "zenobia"),
    lazyLoadImages("./assets/images/festival/delalma/delalma/", "delalma"),
    lazyLoadImages("./assets/images/festival/saratoga/saratoga/", "saratoga"),
  ])
    .then(() => {
      console.log("Todas las imágenes se cargaron correctamente");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
