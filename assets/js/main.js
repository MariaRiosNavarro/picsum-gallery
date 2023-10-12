const url = "https://picsum.photos/v2/list?page=3&limit=21";

const gallery = document.querySelector('[data-js="gallery"]');

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const pictures = data;
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
    console.error("Error Message", error);
  });
