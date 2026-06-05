# TechNova 2026 – Future of Innovation

A modern, responsive event registration website for the **TechNova 2026** technology conference.
Built with vanilla **HTML5, CSS3, and JavaScript** — no frameworks, no backend.

---

## 📌 Project Overview

TechNova 2026 is a fictional technology summit focused on **AI, Cybersecurity, Cloud Computing,
and Entrepreneurship**, taking place on **August 15, 2026** at the **Hyderabad International
Convention Center**. This website presents the event, showcases speakers, and lets attendees
register through a fully validated form.

---

## ✨ Features

- Sticky, glassmorphic navigation with smooth scrolling
- Animated hero section with gradient background
- Event Highlights grid (4 themed feature cards)
- Keynote Speakers section with modern card design
- Animated counters (Attendees / Speakers / Workshops / Sponsors)
- Registration form with full client-side validation
  - All fields required
  - Email format validation
  - Phone must be exactly 10 digits
  - Inline, user-friendly error messages
- Success page with registration confirmation icon and details
- 🌓 Dark / Light mode toggle (preference saved in Local Storage)
- ⬆️ Back-to-top button
- Fully responsive (mobile, tablet, desktop)
- Smooth scroll-reveal animations
- Footer with social icons
- Data persisted in **Local Storage** (no backend needed)

---

## 🛠️ Technologies Used

- **HTML5** – Semantic structure
- **CSS3** – Custom properties, gradients, flexbox & grid, animations, responsive design
- **JavaScript (ES6)** – Validation, theme toggle, counters, IntersectionObserver, Local Storage
- **Font Awesome** – Icons
- **Google Fonts** – Space Grotesk + Inter

---

## 📁 Folder Structure

```
/
├── index.html        # Landing page
├── success.html      # Post-registration confirmation
├── style.css         # All styling
├── script.js         # All interactivity
└── README.md
```

---

## 📸 Screenshots

> Add your screenshots here:
> - `screenshots/home.png`
> - `screenshots/highlights.png`
> - `screenshots/speakers.png`
> - `screenshots/registration.png`
> - `screenshots/success.png`

---

## 🚀 How to Run

1. Clone or download this project.
2. Open `index.html` directly in any modern browser
   **— or —** serve the folder with a local server:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8000
   ```
3. Navigate to `http://localhost:8000`.

No installation, no build step, no backend.

---

## 🔮 Future Improvements

- Backend integration (Node.js / Firebase) to persist registrations
- Email confirmation via SendGrid / Mailgun
- Admin dashboard for organizers
- Payment gateway integration for paid tickets
- Multi-language support
- Speaker detail pages
- Live agenda / schedule builder
- PWA support for offline access

---

© 2026 TechNova. Built for learning & demonstration purposes.
