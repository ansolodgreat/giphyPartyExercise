const $gifArea = $("#gif-area");
const $searchInput = $("#search");

/* Use ajax result to add a gif */
const addGif = (responseData) => {
  const numResults = responseData.data.length;
  if (numResults) {
    const randomIdx = Math.floor(Math.random() * numResults);
    const gifUrl = responseData.data[randomIdx].images.original.url;
    const $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
    const $newGif = $("<img>", {
      src: gifUrl,
      class: "w-100"
    });
    $newCol.append($newGif);
    $gifArea.append($newCol);
  }
};

/* Handle form submission: clear search box & make ajax call */
$("form").on("submit", async (evt) => {
  evt.preventDefault();

  const searchTerm = $searchInput.val();
  $searchInput.val("");

  try {
    const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
      params: {
        q: searchTerm,
        api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
      }
    });
    addGif(response.data);
  } catch (error) {
    console.error("Error fetching GIF:", error);
  }
});

/* Remove gif */
$("#remove").on("click", () => {
  $gifArea.empty();
});
