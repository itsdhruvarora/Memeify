const url = "https://api.imgflip.com/caption_image"; // Replace with the actual API endpoint

const params = new URLSearchParams();
params.append("template_id", 87743020);
params.append("username", "DHRUVARORA1");
params.append("password", "674022sd");
params.append("font", "arial");
params.append("boxes[0][text]", "top");
// params.append("boxes[0][color]", "");
params.append("boxes[1][text]", "bottom");
// params.append("boxes[1][color]", "#ffffff");
params.append("boxes[2][text]", "side");

const requestOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: params,
};

fetch(url, requestOptions)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
