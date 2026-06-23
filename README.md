# 🎁 Amara's Blind Box Game

A cute, interactive, and responsive client-side web application designed as a blind box unboxing game! It features popular collectible categories such as **Sanrio**, **Labubu**, and **Tamagotchi**.

🌐 **Live Demo:** [https://wusyou.github.io/amarablindbox/](https://wusyou.github.io/amarablindbox/)

---

## ✨ Features

* **Interactive Unboxing Experience:** Immersive animations including a realistic box shake effect, background drumrolls, and a pop-up reveal effect when a blind box is opened.
* **Collection Tracker (Inventory Grid):** Displays a fully responsive 5x7 or 4x4 grid showcasing unlocked toys. Locked characters remain heavily grayed out until found.
* **Persistent Progress (Local Storage):** Automatically saves the player's unlocked collections and background music preferences (BGM ON/OFF) so progress isn't lost upon refreshing or closing the browser.
* **Full Mobile Responsiveness:** Layouts and UI proportions are fully optimized via CSS Media Queries, preventing unwanted horizontal or vertical scrolling on mobile viewports.
* **Custom Emoji Favicons:** Features context-matching heart emoji icons in the browser tab depending on the active game theme.

---

## 🛠️ Tech Stack

* **HTML5** - Semantic structure for all game interfaces and routing.
* **CSS3** - Custom keyframe animations (`boxShake`, `superPopIn`), pixelated art rendering configs, and fluid mobile layouts.
* **JavaScript (Vanilla)** - Game logic, mathematical randomization for blind box drops, Local Storage manipulation, and audio state orchestration.
* **Canvas Confetti API** - Visual reward integration that triggers a colorful confetti burst upon completing a full collection set.

---

## 📂 Project Structure

```text
amarablindbox/
├── audio/               # Background tracks and sound effects (.MP3)
├── css/                 # Independent stylesheets for each game page (.css)
├── images/              # Blind box vectors and character sprite assets
├── js/                  # Game engine and audio handlers (.js)
├── index.html           # Landing / Home page
├── category.html        # Category selection portal
├── sanrio-game.html     # Sanrio collection playground
├── labubu-game.html     # Labubu collection playground
└── tamagotchi-game.html # Tamagotchi collection playground
```

---

## 🚀 Local Setup
1. Clone the repository to your machine:
git clone [https://github.com/wusyou/amarablindbox.git](https://github.com/wusyou/amarablindbox.git)

2. Open the project directory using your preferred text editor (e.g., VS Code).
3. Run the application locally by opening index.html with a local server extension (such as VS Code Live Server).
