# Aadesh Pandey — Portfolio Website

A professional, stunning portfolio website with dark luxury theme, smooth animations, and a Node.js backend for contact form handling.

---

## 📁 Project Structure

```
portfolio/
├── frontend/                 # Static frontend files
│   ├── index.html            # Main HTML
│   ├── style.css             # Complete stylesheet
│   ├── script.js             # Animations & interactions
│   └── assets/               # Resume PDF, images, etc.
│       └── Aadesh_Pandey_Resume.pdf
│
├── backend/                  # Express.js API server
│   ├── server.js             # Main server file
│   ├── package.json          # Dependencies
│   ├── .env.example          # Environment variables template
│   └── .gitignore
│
└── README.md
```

---

## 🚀 Quick Start

### Frontend Only (Static Hosting)
Simply open `frontend/index.html` in your browser, or deploy the `frontend/` folder to:
- **Vercel** — `vercel --prod` from the frontend folder
- **Netlify** — Drag & drop the frontend folder
- **GitHub Pages** — Push to a repo & enable Pages

### With Backend (Full Stack)

1. **Setup backend:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your Gmail credentials
   ```

2. **Get Gmail App Password:**
   - Go to [Google Account → Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification
   - Go to App Passwords → Generate one for "Mail"
   - Paste it in `.env` as `EMAIL_PASS`

3. **Run:**
   ```bash
   npm run dev    # Development (with auto-reload)
   npm start      # Production
   ```

4. **Visit:** `http://localhost:5000`

---

## 🌐 Deployment Options

### Vercel (Recommended — Free)
1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Set root directory to `frontend/` for static, or use serverless functions

### Railway / Render (Full-Stack)
1. Push to GitHub
2. Create new project, point to `backend/` directory
3. Add environment variables from `.env.example`
4. Deploy!

### Netlify (Frontend Only)
1. Build command: (none needed)
2. Publish directory: `frontend/`
3. For the contact form, use Netlify Forms or Formspree

---

## ✏️ Customization

- **Resume:** Place your PDF in `frontend/assets/Aadesh_Pandey_Resume.pdf`
- **Project Links:** Update `href` attributes in the projects section
- **GitHub Link:** Update the GitHub URL in the footer
- **Colors:** Edit CSS variables in `:root` in `style.css`
- **Contact Form:** Either use the backend or switch to Formspree (add `action` attribute to form)

---

## 🎨 Features

- Dark luxury theme with electric purple accents
- Smooth scroll-triggered animations
- Interactive cursor glow effect
- Animated number counters
- 3D tilt effect on project cards
- Fully responsive (mobile, tablet, desktop)
- Page loader animation
- Active navigation highlighting
- Contact form with email notifications & auto-reply
- Rate limiting on API endpoints
- SEO-optimized meta tags

---

Built with ❤️ by Aadesh Pandey
