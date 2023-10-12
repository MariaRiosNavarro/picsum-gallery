// ! 1--------PAGINATION: Add a first & last page

let page = 1;
let maxPage = 47;

// ! 2--------PAGINATION: Add pagination Buttons

const prev = document.querySelector('[data-js="prev"]');
const next = document.querySelector('[data-js="next"]');

// ! 3--------Add Gallery Container
const gallery = document.querySelector('[data-js="gallery"]');

// ! 4--------PAGINATION: Add Event Listeners for prev & mext

prev.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchAndRender(page);
  }
});

next.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    fetchAndRender(page);
  }
});

//# FOR the Pagination: Normally I would have
//# the address (url) stored in a variable if I render only
//# once, but for pagination we need it inside the
//# function (to change the page number).
//# So that when we call it in the
//# event listener (prev/back)
//# it works, outside it does not work (scope).

// let url = `https://picsum.photos/v2/list?page=${page}&limit=21`;

// ! 5-------- fetch (Save fetch in one function,
// !        with the parameter of the page that we change with the prev/next buttons
// !        to call it in the prev und back eventListeners)

function fetchAndRender(page) {
  fetch(`https://picsum.photos/v2/list?page=${page}&limit=21`)
    .then((response) => response.json())
    .then((data) => {
      // !  5A-----------IMPORTANT for Pagination:
      // !    remove the old render/page to add the new page
      // !    AND handle the visibility of the prev/next
      // !    buttons in der first und last page
      gallery.innerHTML = "";

      if (page === 1) {
        prev.style.visibility = "hidden";
      } else if (page === 47) {
        next.style.visibility = "hidden";
      } else {
        prev.style.visibility = "visible";
        next.style.visibility = "visible";
      }

      // !  5B-----------Create Gallery
      const pictures = data;
      pictures.forEach((pic) => {
        // !  5C-----------Create the Card for each pic and add class (styles)
        let pictureCard = document.createElement("article");
        pictureCard.classList.add("picture-card");
        let picture = document.createElement("img");
        let artistName = document.createElement("h3");
        let seeMoreButton = document.createElement("button");

        // !  5D-----------Give the data to the created elements
        artistName.textContent = pic.author;
        picture.src = pic.download_url;
        picture.width = pic.width;
        picture.height = pic.height;
        picture.alt = `${pic.author} Picture`;
        picture.classList.add("images");
        seeMoreButton.classList.add("button");
        seeMoreButton.textContent = "See More";

        // !  5E-----------Create the dom structure of the card,
        // !  add all elements to PictureCard and this one to gallery:
        pictureCard.append(picture, artistName, seeMoreButton);
        gallery.append(pictureCard);

        // !  5F-----------EventListener for the seeMoreButton
        seeMoreButton.addEventListener("click", () => {
          window.open(pic.url, "_blank");
        });
      });
    })
    .catch((error) => {
      console.error("Some Issue", error);
    });
}

// !  6----------- initialisation of the first page

fetchAndRender(page);
