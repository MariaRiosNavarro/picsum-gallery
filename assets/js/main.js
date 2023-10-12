// Add a first & last page
let page = 1;
let maxPage = 47;

// add buttons for pagination

const prev = document.querySelector('[data-js="prev"]');
const next = document.querySelector('[data-js="next"]');

// for pagination add  ${page}, so we can change it

// const url = ;
const gallery = document.querySelector('[data-js="gallery"]');

// Event-Listener prev
prev.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchAndRender(page);
  }
});

// Event-Listener next
next.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    fetchAndRender(page);
  }
});

// fetch (Save fetch in one function, to call it in the prev und back eventListeners)

function fetchAndRender(page) {
  fetch(`https://picsum.photos/v2/list?page=${page}&limit=21`)
    .then((response) => response.json())
    .then((data) => {
      // remove the old render to add the new page
      gallery.innerHTML = "";
      const pictures = data;

      // Create Gallery

      pictures.forEach((pic) => {
        // Create the Card for each pic and add class (styles)
        let pictureCard = document.createElement("article");
        pictureCard.classList.add("picture-card");
        let picture = document.createElement("img");
        let artistName = document.createElement("h3");
        let seeMoreButton = document.createElement("button");

        // Give the data to the created elements
        artistName.textContent = pic.author;
        picture.src = pic.download_url;
        picture.width = pic.width;
        picture.height = pic.height;
        picture.alt = `${pic.author} Picture`;
        picture.classList.add("images");
        seeMoreButton.classList.add("button");
        seeMoreButton.textContent = "See More";

        //Create the dom structure of the card, add all elements to PictureCard and this one to gallery:
        pictureCard.append(picture, artistName, seeMoreButton);
        gallery.append(pictureCard);

        //EventListener for the seeMoreButton
        seeMoreButton.addEventListener("click", () => {
          window.open(pic.url, "_blank");
        });
      });
    })
    .catch((error) => {
      console.error("Some Issue", error);
    });
}

// initialisation of the first page

fetchAndRender(page);
