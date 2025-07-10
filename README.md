# 📖 Template Website Baca Manga

Template website statis yang dirancang khusus untuk menampilkan dan membaca komik/manga. Dibangun dengan **HTML**, **CSS**, dan **JavaScript murni (vanilla JS)**, proyek ini berfokus pada pengalaman pengguna yang **modern**, **bersih**, dan **responsif**.

---

## 🚀 Live Demo

Coba langsung demonya di sini:  
🌐 [https://web-baca-komik.netlify.app/](https://web-baca-komik.netlify.app/)

---

## ✨ Fitur Utama

- **Desain Responsif**  
  Tampilan dioptimalkan untuk berbagai perangkat, dari desktop hingga mobile.

- **Halaman Utama**  
  Menampilkan grid manga dengan pembaruan terbaru.

- **Halaman Detail Manga**  
  Informasi lengkap: sinopsis, author, genre, dan daftar chapter.

- **Halaman Baca Imersif**  
  - UI navigasi muncul saat layar disentuh/diklik.
  - Otomatis menghilang setelah beberapa detik (full-screen experience).
  - Navigasi khusus mobile yang tidak mengganggu.

- **Pencarian & Filter Lanjutan**  
  - Modal pop-up filter yang komprehensif.
  - Filter berdasarkan Kategori (Manga, Manhwa, dll).
  - Filter Status (Ongoing, Completed).
  - Urutkan Judul (A-Z, Z-A).
  - Filter berdasarkan Genre (multi-select).

- **Paginasi Dinamis**  
  Jumlah halaman otomatis sesuai jumlah item. Terintegrasi dengan sistem filter.

- **Struktur Kode Bersih**  
  Pemisahan file HTML, CSS, dan JavaScript memudahkan pengembangan.

---

## 💻 Cara Menjalankan Secara Lokal

### 1. Clone atau Download Repository
Jika menggunakan Git:
```bash
git clone https://github.com/username/nama-repository.git
```
Atau cukup **download file ZIP**-nya dan ekstrak.

### 2. Buka di Browser
Cukup buka file `index.html` di browser favorit Anda.

### 3. Rekomendasi (Live Server)
Untuk pengalaman terbaik:

- Buka folder proyek di **Visual Studio Code**
- Gunakan ekstensi **Live Server**
- Klik kanan `index.html` > "Open with Live Server"

---

## 🗃️ Struktur & "Database" Saat Ini

Proyek ini adalah **website statis**, tanpa backend atau database tradisional.

### 🔸 Bagaimana Data Disimpan?

Semua data disimpan secara **hardcoded** dalam HTML.

Contoh struktur di `daftar-manga.html`:

```html
<article class="manga-card" 
  data-type="manga" 
  data-status="ongoing"
  data-genres="harem,isekai,romance,shounen"
  data-title="Danjo Hi 1:5 no Sekai...">
  <!-- ... -->
</article>
```

Konten `manga-detail.html` dan `reader.html` berisi data manual seperti judul, gambar, dan sinopsis.

### 🔸 Bagaimana Filter & Pencarian Bekerja?

Semua logika berada di sisi **klien (client-side)** menggunakan JavaScript. Script akan membaca `data-*` attributes dari elemen, lalu menampilkan/menyembunyikan sesuai kriteria **tanpa reload halaman**.

---

## 🔐 Rekomendasi Fitur Login/Logout

Untuk fitur otentikasi, disarankan menggunakan **Firebase Authentication**.

### ✅ Mengapa Firebase?

- **Mudah Diintegrasikan**: Hanya butuh beberapa baris JS.
- **Gratis**: Tier gratis mendukung ribuan pengguna.
- **Aman**: Ditangani langsung oleh Google.
- **Multi-Login**: Email/Password, Google, Facebook, GitHub, dll.

---

## 🔧 Cara Memulai dengan Firebase Authentication

### 1. Buat Proyek di Firebase
- Kunjungi [Firebase Console](https://console.firebase.google.com/)
- Klik "Add project", ikuti langkah-langkah

### 2. Aktifkan Authentication
- Buka menu `Authentication` > "Get started"
- Di tab **Sign-in method**, aktifkan metode seperti Email/Password

### 3. Dapatkan Konfigurasi
- Klik roda gigi (⚙️) > Project Settings
- Di tab "General", scroll ke bagian "Your apps"
- Klik ikon web (`</>`) dan daftarkan aplikasi
- Salin **konfigurasi Firebase**

### 4. Integrasikan di Kode HTML/JS

Tambahkan di `index.html` sebelum `script.js`:

```html
<script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-auth-compat.js"></script>
```

Lalu inisialisasi di `script.js`:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "proyek-anda.firebaseapp.com",
  // ...data lainnya
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
```

Setelah itu, gunakan fungsi seperti:

```javascript
auth.createUserWithEmailAndPassword(email, password)
auth.signInWithEmailAndPassword(email, password)
```

---

## 🎯 Penutup

Template ini ideal untuk proyek pribadi, koleksi manga digital, atau sekadar belajar membangun website interaktif dengan frontend-only stack. Jangan ragu untuk menyesuaikan atau mengembangkan lebih lanjut! 🚀
