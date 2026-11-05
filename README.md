# ⚡ Website Portofolio Superhero & Adventure Quest - Ravael Asarya Rompas
### "The Code Guardian & Tech Hero"

Website portofolio statis dengan tema **Superhero & Cyber-Adventure Quest** yang interaktif, penuh efek **Multi-Layer Parallax**, namun dirancang tetap elegan, seimbang, dan sangat nyaman dibaca. Siap langsung dideploy ke **GitHub Pages**.

---

## 🎮 Fitur Interaktif & Parallax:

1. **Parallax Progress Energy Bar**: Bar daya energi neon di bagian atas layar yang bergerak mengikuti kedalaman scroll halaman.
2. **Interactive Cosmic Particles Canvas**: Partikel energi kosmik melayang di latar belakang menggunakan HTML5 Canvas 60 FPS.
3. **3D Tilt Holographic Cards**: Efek kartu holografik 3D yang miring mengikuti gerakan kursor mouse (*mouse parallax*).
4. **Synthesizer Audio FX (Web Audio API)**: Efek suara sci-fi interaktif saat tombol disentuh atau diklik tanpa membutuhkan file MP3 eksternal (dilengkapi tombol ON/OFF Mute di navbar).
5. **Multi-Speed Parallax Runes**: Elemen rune dan simbol komik melayang yang bergeser dengan kecepatan berbeda saat di-scroll.
6. **Interactive Mission Filter Tabs**: Filter instan untuk memilah project berdasarkan kategori: *All Missions*, *Web Systems*, *Mobile Apps*, dan *ERP / Network*.
7. **Telemetry Copy Toast**: Klik pada email atau nomor telepon untuk menyalin langsung ke clipboard dengan respon HUD.
8. **Back to Orbit Jet Button**: Tombol roket pendorong untuk meluncur kembali ke puncak halaman secara halus.

---

## 📁 Struktur Berkas

```
web porto statis/
├── index.html        # Halaman utama (dibutuhkan untuk GitHub Pages)
├── porto.html        # Salinan halaman portofolio
├── porto.css         # Styling tema Superhero Parallax & Responsif
├── porto.js          # Engine Parallax, 3D tilt, Web Audio API, Filter & Partikel
└── README.md         # Panduan penggunaan & deploy
```

---

## 🖼️ Cara Mengganti Foto Placeholder ke Foto Asli Anda:

Foto saat ini menggunakan placeholder dari web. Untuk memasukkan foto asli Anda:

1. Letakkan file foto Anda di dalam folder ini (`c:\web porto statis\`), misal bernama `foto-hero.jpg`.
2. Buka berkas `index.html` dan `porto.html`.
3. Cari elemen gambar dengan `id="heroDossierImage"`:
   ```html
   <img 
     src="https://images.unsplash..." 
     alt="Ravael Asarya Rompas - The Tech Hero"
     id="heroDossierImage"
   >
   ```
4. Ganti `src` tersebut menjadi nama file foto Anda:
   ```html
   <img 
     src="foto-hero.jpg" 
     alt="Ravael Asarya Rompas - The Tech Hero"
     id="heroDossierImage"
   >
   ```

---

## 🚀 Cara Deploy ke GitHub Pages:

1. Buat repository baru di GitHub akun Anda: `https://github.com/new` (misalnya diberi nama: `portfolio`).
2. Buka terminal di folder proyek ini (`c:\web porto statis`) dan jalankan:
   ```bash
   git init
   git add .
   git commit -m "Epic Superhero Parallax Portfolio - Ravael Rompas"
   git branch -M main
   git remote add origin https://github.com/azariaravael-arch/portfolio.git
   git push -u origin main
   ```
3. Di GitHub: buka tab **Settings** > **Pages** > pada bagian **Branch** pilih `main` dan folder `/ (root)` > klik **Save**.
4. Website akan live dalam 1-2 menit di:
   `https://azariaravael-arch.github.io/portfolio/`
