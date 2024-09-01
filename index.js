const videoCardContainer = document.querySelector(".videos-container");

let api_key = "AIzaSyBPreDQnNKcBVQ5mQ0elgdyQwAHFErdfLw";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(
  video_http +
    new URLSearchParams({
      key: api_key,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 10, // Increase this value to fetch more videos
      regionCode: "IN",
    })
)
  .then((res) => res.json())
  .then((data) => {
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  })
  .catch((err) => console.log(err));

const getChannelIcon = (video_data) => {
  fetch(
    channel_http +
      new URLSearchParams({
        key: api_key,
        part: "snippet",
        id: video_data.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.items && data.items[0] && data.items[0].snippet && data.items[0].snippet.thumbnails) {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
      } else {
        video_data.channelThumbnail = "default-thumbnail.jpg";
      }
      makeVideoCard(video_data);
    })
    .catch((err) => console.log(err));
};

const makeVideoCard = (data) => {
  videoCardContainer.innerHTML += `
    <div class="video">
      <div class="video-thumbnail" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
          <img src="${data.snippet.thumbnails.high.url}" alt="Video Thumbnail">
      </div>
      <div class="video-details">
        <div class="author">
            <img src="${data.channelThumbnail}" alt="Channel Thumbnail">
       </div>
        <div class="title">
            <h3>${data.snippet.title}</h3>
            <a href="#">${data.snippet.channelTitle}</a>
          </div>
        </div>
      </div>
    </div>`;
};

const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector("#Search-button");
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener("click", () => {
  if (searchInput.value.length) {
    location.href = searchLink + searchInput.value;
  }
});
