// ██╗░░░██╗██╗███████╗░██╗░░░░░░░██╗  ██████╗░░█████╗░░██████╗░███████╗
// ██║░░░██║██║██╔════╝░██║░░██╗░░██║  ██╔══██╗██╔══██╗██╔════╝░██╔════╝
// ╚██╗░██╔╝██║█████╗░░░╚██╗████╗██╔╝  ██████╔╝███████║██║░░██╗░█████╗░░
// ░╚████╔╝░██║██╔══╝░░░░████╔═████║░  ██╔═══╝░██╔══██║██║░░╚██╗██╔══╝░░
// ░░╚██╔╝░░██║███████╗░░╚██╔╝░╚██╔╝░  ██║░░░░░██║░░██║╚██████╔╝███████╗
// ░░░╚═╝░░░╚═╝╚══════╝░░░╚═╝░░░╚═╝░░  ╚═╝░░░░░╚═╝░░╚═╝░╚═════╝░╚══════╝

document.addEventListener("DOMContentLoaded", function () {
  const memesList = document.getElementById("memes-list");
  function saveMemesLocally() {
    localStorage.setItem("savedMemes", JSON.stringify(savedMemes));
  }
  // Retrieve the saved memes array from localStorage
  const savedMemes = JSON.parse(localStorage.getItem("savedMemes")) || [];
  const ids = savedMemes.map((meme) => meme.id);
  console.log(ids);

  if (savedMemes.length === 0) {
    // If no saved memes, display a message
    const memeHero = document.getElementsByClassName("view-meme-hero")[0];
    memeHero.classList.add("show");
  } else {
    // Iterate through the saved memes and create a display for each meme
    savedMemes.forEach((meme, index) => {
      const memeCard = document.createElement("div");
      memeCard.classList.add("meme-card");

      const imageElement = document.createElement("img");
      imageElement.src = meme.imageUrl;

      memeCard.appendChild(imageElement);

      meme.captions.forEach((caption, captionIndex) => {
        const captionInput = document.createElement("input");
        captionInput.value = caption;
        captionInput.classList.add("caption-input");
        memeCard.appendChild(captionInput);
      });

      // Create buttons for update and delete
      const actionButtons = document.createElement("div");
      actionButtons.classList.add("action-buttons");

      const updateButton = document.createElement("button");
      updateButton.textContent = "Update Meme";
      updateButton.addEventListener("click", function () {
        const captionInputs = memeCard.querySelectorAll(".caption-input");
        const captionValues = Array.from(captionInputs).map(
          (input) => input.value
        );
        const memeId = savedMemes[index].id;

        // Call the Imgflip API to update the meme with new captions
        fetch(
          `https://api.imgflip.com/caption_image?template_id=${memeId}&username=DHRUVARORA1&password=674022sd&boxes[0][text]=${captionValues[0]}&boxes[1][text]=${captionValues[1]}&boxes[2][text]=${captionValues[2]}&boxes[3][text]=${captionValues[3]}&boxes[4][text]=${captionValues[4]}`,
          {
            method: "POST",
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            if (data.success) {
              imageElement.src = data.data.url;
              savedMemes[index].imageUrl = data.data.url;
              saveMemesLocally();
            } else {
              alert("Please Enter Some Input");
            }
          })
          .catch((error) => {
            console.error(error);
            alert(
              "An error occurred while generating the meme. Please try again later."
            );
          });

        console.log("DONE");
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete Meme";
      deleteButton.addEventListener("click", function () {
        savedMemes.splice(index, 1);
        localStorage.setItem("savedMemes", JSON.stringify(savedMemes));
        memeCard.remove();
        location.reload();
      });

      actionButtons.appendChild(updateButton);
      actionButtons.appendChild(deleteButton);

      memeCard.appendChild(actionButtons);

      memesList.appendChild(memeCard);
    });
  }
});

// ██╗░░██╗░█████╗░███╗░░░███╗███████╗
// ██║░░██║██╔══██╗████╗░████║██╔════╝
// ███████║██║░░██║██╔████╔██║█████╗░░
// ██╔══██║██║░░██║██║╚██╔╝██║██╔══╝░░
// ██║░░██║╚█████╔╝██║░╚═╝░██║███████╗
// ╚═╝░░╚═╝░╚════╝░╚═╝░░░░░╚═╝╚══════╝

const menuButton = document.getElementById("menu-icon");
const navList = document.getElementById("navlist");

menuButton.addEventListener("click", () => {
  if (navList.classList.contains("open")) {
    navList.classList.remove("open");
  } else {
    navList.classList.add("open");
  }
});

// ░█████╗░██╗░░██╗░█████╗░██╗░█████╗░███████╗
// ██╔══██╗██║░░██║██╔══██╗██║██╔══██╗██╔════╝
// ██║░░╚═╝███████║██║░░██║██║██║░░╚═╝█████╗░░
// ██║░░██╗██╔══██║██║░░██║██║██║░░██╗██╔══╝░░
// ╚█████╔╝██║░░██║╚█████╔╝██║╚█████╔╝███████╗
// ░╚════╝░╚═╝░░╚═╝░╚════╝░╚═╝░╚════╝░╚══════╝

function fetchMemes() {
  const apiUrl = "https://api.imgflip.com/get_memes";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayMemes(data);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
}

function displayMemes(data) {
  const memes = data.data.memes;
  const memesContainer = document.getElementById("memes-container");

  memes.forEach((meme) => {
    const memeLink = document.createElement("a");
    const memeContainer = document.createElement("div");
    const memeImage = document.createElement("img");
    const memeText = document.createElement("p");

    memeLink.href =
      "memeGen.html?url=" +
      meme.url +
      "&id=" +
      meme.id +
      "&boxCount=" +
      meme.box_count;

    memeImage.src = meme.url;
    memeImage.alt = meme.name;
    memeImage.height = 300;
    memeImage.width = 400;

    memeText.textContent = meme.name;

    memeContainer.className = "meme-container";

    memeContainer.appendChild(memeImage);
    memeContainer.appendChild(memeText);

    memeLink.appendChild(memeContainer);
    memesContainer.appendChild(memeLink);
  });
}
fetchMemes();

// ░██████╗░███████╗███╗░░██╗███████╗██████╗░░█████╗░████████╗███████╗  ██████╗░░█████╗░░██████╗░███████╗
// ██╔════╝░██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔════╝  ██╔══██╗██╔══██╗██╔════╝░██╔════╝
// ██║░░██╗░█████╗░░██╔██╗██║█████╗░░██████╔╝███████║░░░██║░░░█████╗░░  ██████╔╝███████║██║░░██╗░█████╗░░
// ██║░░╚██╗██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██╔══██║░░░██║░░░██╔══╝░░  ██╔═══╝░██╔══██║██║░░╚██╗██╔══╝░░
// ╚██████╔╝███████╗██║░╚███║███████╗██║░░██║██║░░██║░░░██║░░░███████╗  ██║░░░░░██║░░██║╚██████╔╝███████╗
// ░╚═════╝░╚══════╝╚═╝░░╚══╝╚══════╝╚═╝░░╚═╝╚═╝░░╚═╝░░░╚═╝░░░╚══════╝  ╚═╝░░░░░╚═╝░░╚═╝░╚═════╝░╚══════╝

let clicked = false;
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(urlParams);
const imageUrl = urlParams.get("url");
const boxCount = parseInt(urlParams.get("boxCount"));
if (window.location.pathname.endsWith("memeGen.html")) {
  if (!id || !imageUrl) {
    window.location.href = "choosememe.html";
  }
}
const memeImage = document.getElementById("meme-image");
memeImage.src = imageUrl;

const textForm = document.getElementById("text-form");
const textBoxesContainer = document.getElementById("text-boxes");

for (let i = 1; i <= boxCount; i++) {
  const textBox = document.createElement("input");
  textBox.type = "text";
  textBox.placeholder = "Text Box " + i;
  textBoxesContainer.appendChild(textBox);
}

textForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // Gather text inputs from the user
  const textInputs = document.querySelectorAll("#text-boxes input");
  const captions = Array.from(textInputs).map((input) => input.value);
  if (captions[0] === "") alert("Please Enter input");
  // Call the Imgflip API to generate the meme
  else {
    fetch(
      `https://api.imgflip.com/caption_image?template_id=${id}&username=DHRUVARORA1&password=674022sd&boxes[0][text]=${captions[0]}&boxes[1][text]=${captions[1]}&boxes[2][text]=${captions[2]}&boxes[3][text]=${captions[3]}&boxes[4][text]=${captions[4]}`,
      {
        method: "POST",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          memeImage.src = data.data.url;
        } else {
          alert("Please Enter Some Input");
        }
      })
      .catch((error) => {
        console.error(error);
        alert(
          "An error occurred while generating the meme. Please try again later."
        );
      });
    clicked = true;
  }
});
document.getElementById("save-button").addEventListener("click", function () {
  event.preventDefault();
  if (!clicked) alert("Generate a Meme First!");
  else {
    const imageUrl = document.getElementById("meme-image").src;
    const textInputs = document.querySelectorAll("#text-boxes input");
    const captions = Array.from(textInputs).map((input) => input.value);

    // const id = urlParams.get("id");

    let savedMemes = JSON.parse(localStorage.getItem("savedMemes")) || [];
    const newMeme = {
      id: id,
      imageUrl,
      captions,
    };
    savedMemes.push(newMeme);

    localStorage.setItem("savedMemes", JSON.stringify(savedMemes));
    clicked = false;

    alert("Meme saved successfully!");
  }
});

document
  .getElementById("view-work-button")
  .addEventListener("click", function () {
    event.preventDefault();
    window.location.href = "viewmemes.html";
  });
