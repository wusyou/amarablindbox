document.addEventListener("DOMContentLoaded", function () {
  const clickSound = new Audio("./audio/click.mp3");
  const bgMusic = document.getElementById("bg-music");
  const muteBtn = document.getElementById("mute-btn");

  if (bgMusic && muteBtn) {
    const musicStatus = localStorage.getItem("bgm_status");
    const musicTime = localStorage.getItem("bgm_time");

    if (musicStatus === "on") {
      bgMusic.muted = false;
      muteBtn.innerText = "🔊 MUSIC: ON";
      muteBtn.style.backgroundColor = "#49ba6f";

      if (musicTime) {
        bgMusic.currentTime = parseFloat(musicTime);
      }

      bgMusic.play().catch((err) => console.log("Playback prevented:", err));
    } else {
      bgMusic.muted = true;
      muteBtn.innerText = "🔇 MUTED";
      muteBtn.style.backgroundColor = "#ff66c4";
    }

    muteBtn.addEventListener("click", function () {
      bgMusic.play().catch((err) => console.log("Playback prevented:", err));

      if (bgMusic.muted) {
        bgMusic.muted = false;
        muteBtn.innerText = "🔊 MUSIC: ON";
        muteBtn.style.backgroundColor = "#49ba6f";
        localStorage.setItem("bgm_status", "on");
      } else {
        bgMusic.muted = true;
        muteBtn.innerText = "🔇 MUTED";
        muteBtn.style.backgroundColor = "#ff66c4";
        localStorage.setItem("bgm_status", "off");
      }
    });

    bgMusic.addEventListener("timeupdate", function () {
      if (!bgMusic.muted) {
        localStorage.setItem("bgm_time", bgMusic.currentTime);
      }
    });
  }

  const startButton = document.querySelector(".start-btn, a");

  if (startButton) {
    startButton.addEventListener("click", function (event) {
      event.preventDefault();

      clickSound.currentTime = 0;
      clickSound.play();

      if (bgMusic && !bgMusic.muted) {
        localStorage.setItem("bgm_time", bgMusic.currentTime);
      }

      const targetUrl = startButton.getAttribute("href") || "category.html";

      setTimeout(function () {
        window.location.href = targetUrl;
      }, 150);
    });
  }
});
