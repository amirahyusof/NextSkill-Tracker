# 📘 Self-Taught Learning Tracker (STLT)

A personal learning roadmap platform to help self-learners stay organized, motivated, and consistent.

![Made with Love](https://img.shields.io/badge/Made%20with%20%E2%9D%A4%EF%B8%8F-for%20Self--Learners-blueviolet)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Learning Streak](https://img.shields.io/badge/Feature-Learning%20Streak-orange)
![Achievements](https://img.shields.io/badge/Feature-Achievement%20Badges-yellow)
![Learning Tracker](https://img.shields.io/badge/Focus-Learning%20Tracker-ff69b4)

## 🚀 Overview

Self-Taught Learning Tracker (STLT) ialah aplikasi web yang membolehkan pengguna merancang dan menjejaki pembelajaran kendiri berdasarkan kerjaya impian.
Pengguna boleh mencipta kerjaya utama, menetapkan topik pembelajaran mingguan, menambah subtopik, serta mengikuti perkembangan pembelajaran dengan sistem progress tracker yang komprehensif.

Aplikasi ini direka untuk menyerupai gaya pembelajaran platform seperti Coursera, tetapi lebih fleksibel dan boleh disesuaikan dengan jalan pembelajaran sendiri.

## ✨ Key Features
### 🧭 1. Career-Based Learning Paths

Cipta satu atau lebih kerjaya utama.

Setiap kerjaya mempunyai halaman khas tersendiri.

Progress bar untuk menunjukkan kemajuan keseluruhan kerjaya.

Edit atau padam kerjaya pada bila-bila masa.

### 📅 2. Weekly Topic Planning

Tambah minggu pembelajaran dalam setiap kerjaya.

Set tajuk topik utama untuk minggu tersebut.

Lihat progress setiap minggu secara individu.

### 📝 3. Subtopic Breakdown

Setiap minggu boleh mengandungi beberapa subtopik:

Auto timestamp createdAt bila subtopik ditambah.

Checkbox untuk menanda selesai.

Nota tambahan (optional).

Tahap kesukaran (optional).

Anggaran masa belajar (optional).

Menandakan subtopik selesai akan mengemaskini progress minggu dan progress kerjaya secara automatik.

### 📊 4. Progress Tracking System

Career Progress – progress global untuk satu kerjaya.

Weekly Progress – progress berdasarkan subtopik dalam minggu.

Progress dikira secara automatik.

### 🔥 5. Learning Streak (NEW)

Sistem “berapa hari berturut-turut pengguna belajar”.
Ciri ini:

Mengira streak harian.

Memberi pengingat untuk terus belajar.

Meningkatkan motivasi dengan visual streak counter.

### 🏅 6. Achievement Badges (NEW)
Dapatkan badge apabila mencapai milestone tertentu seperti:
-Menyiapkan 10 subtopik
-Menyelesaikan 1 minggu
-Menjaga streak selama 7 hari
-Menamatkan satu kerjaya
-Badges dipaparkan di halaman utama dan halaman kerjaya.

### 📁 7. Notes & Resource Storage (Optional Feature)
Anda boleh menyimpan:
-Link YouTube
-Artikel
-Course notes
-Catatan pembelajaran

### 🌙 8. Dark Mode (Coming)
Tema gelap untuk pembelajaran yang lebih selesa.

### 📤 9. Export Progress (Coming)
Eksport kemajuan pembelajaran dalam bentuk:
-PDF Summary
-CSV
-Markdown

## 🧱 Tech Stack
Bergantung kepada implementasi, berikut ulasan ringkas terhadap stack yang digunakan dalam projek ini dan cadangan peningkatan:

Apa yang digunakan dalam repo ini:
- **Frontend:** React (Vite) — projek dibina dengan Vite dan React (`src/main.jsx`, `App.jsx`).
- **Bundler / Dev server:** Vite (pantas untuk development dan HMR).
- **Styling:** Plain CSS (fail CSS per-komponen seperti `App.css`, `index.css`, dan beberapa fail CSS di `src/components/Shared`).
- **State & logic:** React hooks tersuai (`useLocalStorage.js`, `useBadges.js`, `useStreak.js`) — tiada store luaran seperti Redux/Zustand.
- **Persistence / Backend:** Tiada backend luaran; projek nampak menggunakan `localStorage` untuk penyimpanan setempat.

Cadangan dan pilihan alternatif (mengikut skop projek):
- **Jika mahu cepat dengan Auth + realtime DB:** Gunakan **Firebase (Auth + Firestore)** — mudah diintegrasi, tiada server sendiri, sesuai untuk aplikasi peribadi/Prototipe.
- **Jika perlukan logik backend tersuai:** Gunakan **Node.js + Express** dengan **MongoDB** — lebih fleksibel untuk API kompleks, kawalan penuh terhadap data dan endpoints.
- **UI / Styling (opsional):** Tambah **Tailwind CSS** untuk produktiviti styling, atau **Chakra UI** untuk komponen siap guna dan aksesibiliti.
- **State management (skala):** Teruskan dengan hooks untuk projek kecil; pertimbangkan **Zustand** (ringan) atau **Redux Toolkit** jika state menjadi kompleks.
- **Tooling & best practices:** Tambah `ESLint`, `Prettier`, unit/integration tests dengan **Jest + React Testing Library**, dan CI (GitHub Actions) untuk kualiti kod.
- **Deployment:** Gunakan **Vercel** atau **Netlify** untuk frontend; jika ada backend gunakan **Render** / **Heroku** / cloud provider pilihan anda.

Ringkasan: stack semasa (React + Vite + CSS + hooks + localStorage) sesuai untuk prototaip dan penggunaan peribadi. Untuk fitur multi-user, auth, atau penyimpanan awan, pilih antara Firebase (pantas) atau Node+MongoDB (fleksibel).

## 📁 Project Structure

```
NextSkill-Tracker/
├── public/                    # Static assets
├── src/
│   ├── components/            # Reusable React components
│   │   └── Shared/            # Shared UI components
│   │       ├── Badge.jsx      # Achievement badge display
│   │       ├── ConfirmDialog.jsx  # Confirmation dialog
│   │       └── ProgressBar.jsx    # Progress visualization
│   ├── hooks/                 # Custom React hooks
│   │   ├── useBadges.js       # Badge logic management
│   │   ├── useLocalStorage.js # localStorage persistence
│   │   └── useStreak.js       # Learning streak tracking
│   ├── pages/                 # Page components
│   │   ├── Dashboard.jsx      # Main dashboard/homepage
│   │   ├── CareerDetails.jsx  # Career-specific page
│   │   └── Settings.jsx       # Settings page
│   ├── utils/                 # Utility functions
│   │   ├── badgeSystem.js     # Badge unlock logic
│   │   ├── progressCalculator.js  # Progress calculation
│   │   └── streakCalculator.js    # Streak calculation
│   ├── App.jsx                # Root component
│   ├── main.jsx               # React entry point
│   ├── App.css                # Global styles
│   └── index.css              # Base styles
├── .eslintrc.config.js        # ESLint configuration
├── vite.config.js             # Vite configuration
├── package.json               # Dependencies & scripts
└── README.md                  # This file
```

## 🛠 Installation & Setup

### Syarat Prasyarat
- Node.js (v14 atau lebih tinggi)
- npm atau yarn

### Langkah-langkah Pemasangan

1. **Clone repositori:**
   ```bash
   git clone https://github.com/amirahyusof/NextSkill-Tracker.git
   cd NextSkill-Tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173`

4. **(Pilihan) Build untuk production:**
   ```bash
   npm run build
   ```

## 🚀 How to Use

1. **Buka laman utama (Dashboard)**
   - Halaman awal menunjukkan ringkasan semua kerjaya, streak, dan badges.

2. **Klik "Add Career" untuk menambah kerjaya baru**
   - Masukkan nama kerjaya yang ingin anda pelajari.
   - Setiap kerjaya akan mempunyai halaman terpisah.

3. **Di halaman kerjaya → tambah minggu dan topik utama**
   - Buat struktur pembelajaran mingguan.
   - Set tajuk topik untuk setiap minggu pembelajaran.

4. **Tambah subtopik di dalam minggu**
   - Pecahkan topik mingguan ke dalam subtopik-subtopik kecil.
   - Tambah nota, tahap kesukaran, dan anggaran masa belajar (pilihan).

5. **Tick subtopik untuk menandakan selesai**
   - Setiap subtopik yang diselesaikan akan menyumbang kepada progress minggu dan kerjaya.
   - Progress bar akan dikemas kini secara automatik.

6. **Lihat progress bar, streak, dan achievement badges**
   - Pantau kemajuan pembelajaran anda.
   - Lihat achievement badges yang telah dikunci berdasarkan milestone.
   - Jejaki learning streak anda untuk motivasi berterusan.

## 🗺 Roadmap (Future Updates)

- **📅 Calendar View** — Visualisasi pembelajaran dalam format kalendar mingguan/bulanan.
- **🤖 AI-based Learning Recommendations** — Cadangan topik/sumber pembelajaran berdasarkan kemajuan anda.
- **🎮 Gamification System** — Sistem points, leaderboard, dan challenges untuk meningkatkan engagement.
- **📱 Mobile App Version** — Versi native mobile (React Native / Flutter) untuk pembelajaran on-the-go.
- **🔗 Social Sharing** — Kongsikan pencapaian dan progress dengan komuniti.

## 🤝 Contributing

Pull requests are welcome. Untuk perubahan berskala besar, sila buka issue terlebih dahulu untuk membincangkan cadangan anda.

## 📜 License

MIT License — Bebas digunakan untuk tujuan komersial dan peribadi.
