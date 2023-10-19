// ██╗░░░██╗██╗███████╗░██╗░░░░░░░██╗  ██████╗░░█████╗░░██████╗░███████╗
// ██║░░░██║██║██╔════╝░██║░░██╗░░██║  ██╔══██╗██╔══██╗██╔════╝░██╔════╝
// ╚██╗░██╔╝██║█████╗░░░╚██╗████╗██╔╝  ██████╔╝███████║██║░░██╗░█████╗░░
// ░╚████╔╝░██║██╔══╝░░░░████╔═████║░  ██╔═══╝░██╔══██║██║░░╚██╗██╔══╝░░
// ░░╚██╔╝░░██║███████╗░░╚██╔╝░╚██╔╝░  ██║░░░░░██║░░██║╚██████╔╝███████╗
// ░░░╚═╝░░░╚═╝╚══════╝░░░╚═╝░░░╚═╝░░  ╚═╝░░░░░╚═╝░░╚═╝░╚═════╝░╚══════╝

document.addEventListener("DOMContentLoaded", function () {
  const memesList = document.getElementById("memes-list");

  // Retrieve the saved memes array from localStorage
  const savedMemes = JSON.parse(localStorage.getItem("savedMemes")) || [];

  if (savedMemes.length === 0) {
    // If no saved memes, display a message
    const noMemesMessage = document.createElement("p");
    noMemesMessage.textContent =
      "Oops! You don't have any saved memes in localStorage.";
    memesList.appendChild(noMemesMessage);
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
        const captionInputs = document.querySelectorAll(".caption-input");

        const captionValues = [];

        captionInputs.forEach(function (input) {
          captionValues.push(input.value);
        });

        // The captionValues array now contains the values of all input boxes
        console.log(captionValues);
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
