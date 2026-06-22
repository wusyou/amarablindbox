const mainBox = document.getElementById("main-box");
const prizeDisplay = document.getElementById("prize-display");
const actionBtn = document.getElementById("action-btn");
const backBtn = document.querySelector(".back-btn");
const bgMusic = document.getElementById("bg-music");
const muteBtn = document.getElementById("mute-btn");

const collBtn = document.getElementById("coll-btn");
const closeModalBtn = document.getElementById("close-coll-btn");
const inventoryModal = document.getElementById("inventory-modal");
const inventoryGrid = document.getElementById("inventory-grid");

const achievementModal = document.getElementById("achievement-modal");
const closeAchievementBtn = document.getElementById("close-achievement-btn");

const clickSound = new Audio("./audio/click.MP3");
const drumrollSound = new Audio("./audio/drumroll.MP3");
const tingSound = new Audio("./audio/ting.MP3");
const successSound = new Audio("./audio/success.MP3");
let isBoxOpened = false;

const totalTamagotchiCharacters = 35;
let unlockedTamagotchis =
  JSON.parse(localStorage.getItem("unlocked_tamagotchis")) || [];

if (bgMusic && muteBtn) {
  const musicStatus = localStorage.getItem("bgm_status");
  const musicTime = localStorage.getItem("bgm_time");

  if (musicStatus === "on") {
    bgMusic.muted = false;
    muteBtn.innerText = "🔊 ON";
    muteBtn.style.backgroundColor = "#49ba6f";
    if (musicTime) bgMusic.currentTime = parseFloat(musicTime);
    bgMusic.play().catch((err) => console.log("BGM playback delayed:", err));
  } else {
    bgMusic.muted = true;
    muteBtn.innerText = "🔇 MUTED";
    muteBtn.style.backgroundColor = "#2696d3";
  }

  muteBtn.addEventListener("click", function () {
    bgMusic.play().catch((err) => console.log("BGM activated:", err));
    if (bgMusic.muted) {
      bgMusic.muted = false;
      muteBtn.innerText = "🔊 ON";
      muteBtn.style.backgroundColor = "#49ba6f";
      localStorage.setItem("bgm_status", "on");
    } else {
      bgMusic.muted = true;
      muteBtn.innerText = "🔇 OFF";
      muteBtn.style.backgroundColor = "#2696d3";
      localStorage.setItem("bgm_status", "off");
    }
  });

  bgMusic.addEventListener("timeupdate", function () {
    if (!bgMusic.muted) localStorage.setItem("bgm_time", bgMusic.currentTime);
  });
}

function updateInventoryUI() {
  if (!inventoryGrid) return;
  inventoryGrid.innerHTML = "";
  for (let i = 1; i <= totalTamagotchiCharacters; i++) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("inventory-item");
    const img = document.createElement("img");
    img.src = `./images/Tamagotchi/${i}.png`;
    img.alt = `Tamagotchi ${i}`;

    if (unlockedTamagotchis.includes(i)) itemDiv.classList.add("unlocked");
    else itemDiv.classList.add("locked");

    itemDiv.appendChild(img);
    inventoryGrid.appendChild(itemDiv);
  }
}

if (collBtn) {
  collBtn.addEventListener("click", function () {
    clickSound.currentTime = 0;
    clickSound.play();
    updateInventoryUI();
    inventoryModal.classList.remove("hidden");
  });
}
if (closeModalBtn) {
  closeModalBtn.addEventListener("click", function () {
    clickSound.currentTime = 0;
    clickSound.play();
    inventoryModal.classList.add("hidden");
  });
}
window.addEventListener("click", function (e) {
  if (e.target === inventoryModal) inventoryModal.classList.add("hidden");
});

actionBtn.addEventListener("click", function () {
  const prizeWrapper = document.getElementById("prize-wrapper");
  clickSound.currentTime = 0;
  clickSound.play();

  if (!isBoxOpened) {
    actionBtn.disabled = true;
    mainBox.classList.add("shake-animation");
    drumrollSound.currentTime = 0;
    drumrollSound.play();

    setTimeout(function () {
      drumrollSound.pause();
      drumrollSound.currentTime = 0;
      tingSound.currentTime = 0;
      tingSound.play();

      const randomNumber =
        Math.floor(Math.random() * totalTamagotchiCharacters) + 1;
      prizeDisplay.src = `./images/Tamagotchi/${randomNumber}.png`;

      prizeDisplay.classList.remove("popIn");
      prizeDisplay.classList.add("super-pop");

      if (!unlockedTamagotchis.includes(randomNumber)) {
        unlockedTamagotchis.push(randomNumber);
        localStorage.setItem(
          "unlocked_tamagotchis",
          JSON.stringify(unlockedTamagotchis),
        );
      }

      mainBox.classList.add("hidden");
      mainBox.classList.remove("shake-animation");
      prizeWrapper.classList.remove("hidden");

      actionBtn.innerText = "OPEN ANOTHER";
      actionBtn.disabled = false;
      isBoxOpened = true;
      updateInventoryUI();

      if (unlockedTamagotchis.length === totalTamagotchiCharacters) {
        setTimeout(function () {
          successSound.currentTime = 0;
          successSound.play();

          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
          });

          if (achievementModal) {
            achievementModal.classList.remove("hidden");
          }
        }, 400);
      }
    }, 2000);
  } else {
    prizeWrapper.classList.add("hidden");
    mainBox.classList.remove("hidden");
    actionBtn.innerText = "OPEN";
    isBoxOpened = false;
  }
});

if (closeAchievementBtn) {
  closeAchievementBtn.addEventListener("click", function () {
    clickSound.currentTime = 0;
    clickSound.play();
    achievementModal.classList.add("hidden");
  });
}

if (backBtn) {
  backBtn.addEventListener("click", function (e) {
    e.preventDefault();
    clickSound.currentTime = 0;
    clickSound.play();
    if (bgMusic && !bgMusic.muted)
      localStorage.setItem("bgm_time", bgMusic.currentTime);
    setTimeout(function () {
      window.location.href = backBtn.getAttribute("href");
    }, 150);
  });
}
if (mainBox)
  mainBox.addEventListener("click", function () {
    if (!actionBtn.disabled) actionBtn.click();
  });

updateInventoryUI();
