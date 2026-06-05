#  TechNova 2026 – Future of Innovation

> A modern, responsive event registration website for the **TechNova 2026** technology conference.
> Built with vanilla **HTML5, CSS3, and JavaScript** — no frameworks, no backend.

---

## Project Overview

TechNova 2026 is a fictional technology summit focused on **AI, Cybersecurity, Cloud Computing, and Entrepreneurship**, taking place on **August 15, 2026** at the **Hyderabad International Convention Center**. This website presents the event, showcases speakers, and lets attendees register through a fully validated form.

---

## Features

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
- Dark / Light mode toggle (preference saved in Local Storage)
- Back-to-top button
- Fully responsive (mobile, tablet, desktop)
- Smooth scroll-reveal animations
- Footer with social icons
- Data persisted in **Local Storage** (no backend needed)


## Technologies Used

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic structure |
| **CSS3** | Custom properties, gradients, flexbox & grid, animations, responsive design |
| **JavaScript (ES6)** | Validation, theme toggle, counters, IntersectionObserver, Local Storage |
| **Font Awesome** | Icons |
| **Google Fonts** | Space Grotesk + Inter |

---

## Folder Structure

```
technova-2026/
│
├── index.html              # Main HTML file
├── README.md               # Project documentation
│
├── css/
│   ├── style.css           # Core styles, variables, layout
│   ├── animations.css      # Scroll-reveal & transition effects
│   └── responsive.css      # Media queries for all screen sizes
│
├── js/
│   ├── main.js             # Navigation, back-to-top, scroll behavior
│   ├── theme.js            # Dark/Light mode toggle & Local Storage
│   ├── counter.js          # Animated statistics counters
│   ├── form.js             # Registration form validation & submission
│   └── animations.js       # IntersectionObserver scroll animations
│
└── assets/
    ├── images/             # Speaker photos, event images
    └── icons/              # Favicon and custom icons
```

---

## Getting Started

### Prerequisites

No installations or build tools required. Just a modern web browser.

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/technova-2026.git
   ```

2. **Navigate to the project folder**
   ```bash
   cd technova-2026
   ```

3. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html
   ```
   Or use a live server extension (e.g., VS Code Live Server) for the best experience.

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Full-screen animated banner with CTA button |
| **Highlights** | 4 feature cards covering event themes |
| **Speakers** | Keynote speaker cards with bios |
| **Stats** | Animated counters for key event numbers |
| **Register** | Validated multi-field registration form |
| **Footer** | Links, social icons, and copyright |


## Dark / Light Mode

Click the toggle button in the navigation bar to switch between dark and light themes. Your preference is automatically saved to **Local Storage** and restored on your next visit.


## Form Validation Rules

| Field | Rule |
|---|---|
| Full Name | Required, non-empty |
| Email | Required, valid email format |
| Phone | Required, exactly 10 digits |
| Session | Required, must select one |
| All fields | Inline error messages on invalid input |

On successful submission, the user is shown a **confirmation screen** with their registration details.

##  Responsive Breakpoints

| Breakpoint | Target |
|---|---|
| `< 480px` | Mobile (small) |
| `480px – 768px` | Mobile (large) / Tablet |
| `768px – 1024px` | Tablet / Small desktop |
| `> 1024px` | Desktop |

---

## Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---


## Author

Jyothika Korakuti
- GitHub: https://github.com/jyothikaKorakuti/eventregistrationwebsitewebdevelopment




