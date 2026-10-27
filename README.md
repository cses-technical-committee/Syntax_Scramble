# THINK FORGE — SYNTAX SCRAMBLE
### Live College Coding Event Website & Digital Puzzle Arena

**Host Organization:** Computer Science Engineering Society (CSES) — JNGEC Sundernagar  
**Event Name:** THINK FORGE  
**Challenge Phase:** SYNTAX SCRAMBLE  
**Architecture:** Pure Vanilla Web Standards (HTML5, CSS3, Vanilla ES6+ JavaScript, Web Audio API)

---

## 🚀 Overview

**THINK FORGE: SYNTAX SCRAMBLE** is an intense, futuristic coding competition platform and digital escape room designed for live collegiate programming events. 

Teams are presented with a target nested-loop ASCII pattern on the left ($n = 5$) and scrambled lines of source code on the right. Teams must rearrange the code lines into the correct executable sequence, maintain proper indentation levels, and verify their logic against the compiler.

### Key Highlights
- **100% Framework-Free:** Built exclusively using semantic HTML5, modern responsive CSS3, and modular vanilla JavaScript.
- **15 Official College Event Challenges:** Includes all 15 official event patterns with no arbitrary difficulty labels—all challenges stand on equal competitive footing.
- **Live Individual Problem Timer:** An active stopwatch timer tracks the exact duration each team spends solving a problem, rendering live in the HUD and submitting to Formspree.
- **Dynamic CSES Society Emblem Reveal:** When the team submits registration or their solution logic, the official CSES emblem (`logo.png`) seamlessly replaces the cyber logo with a glowing radial animation.
- **Bi-Language Support (Python & C++):** Real-time switching between Python and C++ syntax that preserves the participant's line ordering and indentation progress via semantic mapping.
- **Terminal Code Review:** After a challenge ends, compare the final submitted arrangement with the correct Python or C++ solution.
- **Dual Drag-and-Drop Engine:** Desktop HTML5 Drag-and-Drop and mobile-optimized Pointer Events with accessible keyboard (`Alt + Arrows`) and button (`▲`/`▼`, `◀`/`▶`) alternatives.
- **Procedural & Sampled Audio:** Zero-dependency Web Audio API synthesizer for clicks, typewriter effects, vault unlock ratchets, success fanfares, and error hums, with automatic local sound file fallback in `sounds/`.
- **Formspree Integration:** Configurable endpoints for automatic team registration dispatch and final score submission (including elapsed seconds and formatted time) with full retry and offline fail-safe handling.

---

## 📁 Project Structure

```text
/think-forge (Syntax Scramble)
│
├── index.html          # Semantic HTML5 multi-screen layout, HUD, & ARIA live regions
├── style.css           # Design system, CSS variables, glassmorphism, & animations
├── script.js           # Central state, audio synth, problem timer, drag-and-drop, Formspree
├── patterns.js         # Official database containing all 15 pattern programs
├── logo.png            # Official CSES Society emblem (revealed on submit)
├── sounds/             # Sound assets directory (with automatic procedural synthesizer fallback)
│   ├── click.wav       # Snappy cyber click
│   ├── type.wav        # Soft mechanical typewriter keystroke
│   ├── flash.wav       # Warm atmospheric swell
│   ├── unlock.wav      # Mechanical ratchet clicks & latch slide
│   ├── success.wav     # Harmonious major chord chime
│   ├── error.wav       # Subdued coral red buzzer
│   ├── ambient.wav     # Ambient drone loop
│   └── README.md       # Audio asset guide
└── README.md           # Setup, customization, and deployment documentation
```

---

## 🖥️ How to Run Locally

You can run the project locally using any simple HTTP static server.

### Option 1: Python 3 (Recommended)
Open your terminal in the project directory and run:
```bash
python -m http.server 8080
```
Then visit: [http://localhost:8080](http://localhost:8080)

### Option 2: Node.js (npx)
```bash
npx serve .
```

### Option 3: VS Code Live Server
1. Install the **Live Server** extension in VS Code.
2. Right-click `index.html` and select **"Open with Live Server"**.

---

## ⚙️ Formspree Endpoint Configuration

Near the top of `script.js`, locate the endpoint constant:

```javascript
// script.js (Line 16)
const FORMSPREE_ENDPOINT = "YOUR_FORMSPREE_ENDPOINT";
```

### Setup Steps:
1. Create a free account at [Formspree.io](https://formspree.io).
2. Create a new form (e.g., `Think Forge 2026`).
3. Copy your unique form ID URL (e.g. `https://formspree.io/f/mqazknyz`).
4. Replace `"YOUR_FORMSPREE_ENDPOINT"` with your copied endpoint URL:
   ```javascript
   const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqazknyz";
   ```

### Formspree Submissions Schema:

#### 1. Team Registration Submission:
Dispatched when a team enters their callsign on Screen 2:
```json
{
  "team_name": "NullPointer",
  "event_name": "THINK FORGE",
  "phase_name": "SYNTAX SCRAMBLE",
  "submission_type": "registration",
  "timestamp": "2026-10-23T14:00:00.000Z"
}
```

#### 2. Final Score & Time Submission:
Dispatched immediately when a challenge is solved or when all 3 attempts are exhausted:
```json
{
  "submission_id": "1-1782146700000-example",
  "team_name": "NullPointer",
  "event_name": "THINK FORGE",
  "phase_name": "SYNTAX SCRAMBLE",
  "pattern_id": 1,
  "pattern_number": "01",
  "pattern_title": "Decreasing Star Triangle",
  "selected_language": "python",
  "final_score": 130,
  "result_status": "success",
  "failed_attempts": 1,
  "attempts_used": 2,
  "total_attempts": 2,
  "max_attempts": 3,
  "time_taken_seconds": 84,
  "time_taken_formatted": "01:24",
  "completion_status": "solved",
  "submitted_code": "n = 5\nfor flux in range(n, 0, -1):\n    for nova in range(flux):\n        print(\"*\", end=\" \")\n    print()",
  "correct_solution": "n = 5\nfor flux in range(n, 0, -1):\n    for nova in range(flux):\n        print(\"*\", end=\" \")\n    print()",
  "submission_type": "final_result",
  "timestamp": "2026-10-23T14:05:00.000Z"
}
```
*Note: If the network request fails or the endpoint is unreachable, a prominent **RETRY SUBMISSION** button is presented to prevent lost scores.*

---

## 🧩 The 15 Official Event Challenges

All 15 programs are defined in `patterns.js` using $n = 5$:

1. **Challenge 01 (Pattern 3):** Decreasing Star Triangle
2. **Challenge 02 (Pattern 4):** Right-Aligned Increasing Star Triangle
3. **Challenge 03 (Pattern 5):** Right-Aligned Decreasing Star Triangle
4. **Challenge 04 (Pattern 6):** Star Pyramid
5. **Challenge 05 (Pattern 7):** Inverted Star Pyramid
6. **Challenge 06 (Pattern 8):** Diamond Star Pattern
7. **Challenge 07 (Pattern 10):** Hollow Increasing Star Triangle
8. **Challenge 08 (Pattern 11):** X Pattern
9. **Challenge 09 (Pattern 16):** Decreasing Number Triangle
10. **Challenge 10 (Pattern 17):** Reverse Counting Triangle
11. **Challenge 11 (Pattern 18):** Continuous Counting Triangle (Floyd's Triangle)
12. **Challenge 12 (Pattern 20):** Number Pyramid
13. **Challenge 13 (Pattern 21):** Repeated Row Number Pyramid
14. **Challenge 14 (Pattern 13):** Alternating Star Rows
15. **Challenge 15 (Pattern 19):** Repeated Digit Triangle

### Explaining `mapsTo` for Python ⇄ C++ Switching:
- Setting `mapsTo: "p1_cpp_4"` on a Python line links it directly to the corresponding C++ statement.
- When teams switch languages midway through solving, their current line ordering and indentation levels are preserved.
- Boilerplate C++ lines (such as closing brackets `}` and includes) have `mapsTo: null` and remain gracefully handled.

---

## 🏆 Scoring Rules & Formula

1. **Initial Score:** Each team starts with **150 points**.
2. **Attempt Allocation:** Teams have **3 attempts** per challenge.
3. **Cumulative Penalties:** Unsuccessful validations deduct **20**, **30**, then **40** points.
4. **Final Scores:**
   - Correct on the first attempt = **150 points**
   - Correct on the second attempt = **130 points**
   - Correct on the third attempt = **100 points**
   - Three unsuccessful attempts = **60 points** (exhausted)
5. **Score Floor:** The score cannot drop below 0.
6. **Individual Timer:** Stopwatch begins when the workspace opens and stops on completion.
7. **No-Penalty Actions:**
   - Switching between Python and C++ does **not** consume attempts or deduct points.
   - Adjusting indentation does **not** deduct points.
   - Using the **"SHUFFLE AGAIN"** button does **not** consume attempts or deduct points.
8. **Auto-Reshuffle:** After any failed evaluation attempt, the code rows are automatically reshuffled to prevent brute-force trial and error.

---

## 🔊 Sound System Customization

The game includes a hybrid audio engine:
1. **Procedural Web Audio API:** Synthesizes clean audio in memory without relying on network requests.
2. **Local Sample Fallback:** If sound files are found in `sounds/`, they are automatically played:
   - `sounds/click.wav`
   - `sounds/type.wav`
   - `sounds/flash.wav`
   - `sounds/unlock.wav`
   - `sounds/success.wav`
   - `sounds/error.wav`
   - `sounds/ambient.wav`

To customize audio effects, simply replace the corresponding WAV file in `sounds/`.

---

## 🚢 Deployment Guide

This project contains zero build steps and can be deployed directly to any static hosting provider.

### 1. GitHub Pages
1. Push this repository to GitHub.
2. In your repository, go to **Settings** > **Pages**.
3. Under **Build and deployment**, set source to **Deploy from a branch** and select `main` (root).
4. Save, and your live site URL will be ready in under a minute!

### 2. Vercel
1. Install Vercel CLI: `npm i -g vercel`.
2. Run `vercel` in the project root directory.

### 3. Netlify
1. Drag and drop the project folder directly into the [Netlify Drop](https://app.netlify.com/drop) dashboard.

---

*Think Forge © 2026. Computer Science Engineering Society (CSES) — JNGEC Sundernagar.*
