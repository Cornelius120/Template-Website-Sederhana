// =================================================================
// SCRIPT.JS LENGKAP - WEBSITE MANGA
// Versi dengan: Filter Modal, Paginasi Dinamis, Reader Imersif
// =================================================================

// --- Konfigurasi Global ---
const ITEMS_PER_PAGE = 12; // Ubah angka ini untuk mengatur jumlah item per halaman

// --- Event Listener Utama ---
// Menunggu sampai seluruh konten halaman (DOM) dimuat sebelum menjalankan script
document.addEventListener("DOMContentLoaded", function () {
  // 1. Fungsionalitas Menu Mobile (Hamburger)
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const mainNav = document.querySelector(".main-nav");
  if (mobileMenuButton && mainNav) {
    mobileMenuButton.addEventListener("click", () =>
      mainNav.classList.toggle("active")
    );
  }

  // 2. Inisialisasi Halaman Daftar Manga (jika ada modal filter)
  if (document.getElementById("filter-modal")) {
    initializeFilterPage();
  }

  // 3. Inisialisasi Halaman Update Terbaru (jika ada list update)
  // Ini menggunakan fungsi paginasi yang sama tetapi tanpa filter kompleks
  if (
    document.querySelector(".update-list-container") &&
    !document.getElementById("filter-modal")
  ) {
    const allItems = Array.from(
      document.querySelectorAll(".update-list-container .update-item")
    );
    const paginationWrapper = document.getElementById("pagination-wrapper");
    setupPagination(allItems, paginationWrapper);
    displayPage(1, allItems, paginationWrapper);
  }

  // 4. Inisialisasi Halaman Baca (Reader)
  if (document.body.classList.contains("reader-page-body")) {
    initializeReaderPage();
  }
});

// =================================================================
// BAGIAN 1: FUNGSI UNTUK HALAMAN FILTER & DAFTAR MANGA
// =================================================================

/**
 * Fungsi utama untuk menginisialisasi semua logika di halaman daftar manga.
 */
function initializeFilterPage() {
  const allItems = Array.from(
    document.querySelectorAll(".manga-grid .manga-card")
  );
  const paginationWrapper = document.getElementById("pagination-wrapper");
  let currentFilteredItems = [...allItems];

  // --- Logika Modal ---
  const modal = document.getElementById("filter-modal");
  const openModalBtn = document.getElementById("filter-modal-trigger");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const applyFilterBtn = document.getElementById("apply-filter-btn");
  const resetFilterBtn = document.getElementById("reset-filter-btn");

  openModalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("visible");
    document.body.classList.add("modal-open");
  });

  const closeModal = () => {
    modal.classList.remove("visible");
    document.body.classList.remove("modal-open");
  };

  closeModalBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      // Hanya tutup jika klik di overlay
      closeModal();
    }
  });

  // Cek URL untuk perintah membuka modal saat halaman dimuat
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("action") === "open_filter") {
    openModalBtn.click(); // Simulasikan klik pada tombol untuk membuka modal
  }

  applyFilterBtn.addEventListener("click", () => {
    applyFilters();
    closeModal();
  });

  resetFilterBtn.addEventListener("click", () => {
    document
      .querySelector(".modal-body")
      .querySelectorAll('input[type="radio"]')
      .forEach((radio) => {
        if (radio.value === "semua" || radio.value === "update")
          radio.checked = true;
      });
    document
      .querySelector(".modal-body")
      .querySelectorAll('input[type="checkbox"]')
      .forEach((checkbox) => (checkbox.checked = false));
    applyFilters();
    closeModal();
  });

  // --- Logika Filter & Paginasi ---
  const applyFilters = () => {
    // 1. Baca semua nilai dari form filter di modal
    const type = document.querySelector(
      'input[name="filter-type"]:checked'
    ).value;
    const status = document.querySelector(
      'input[name="filter-status"]:checked'
    ).value;
    const order = document.querySelector(
      'input[name="filter-order"]:checked'
    ).value;
    const selectedGenres = Array.from(
      document.querySelectorAll('input[name="filter-genre"]:checked')
    ).map((el) => el.value);

    // 2. Filter item
    currentFilteredItems = allItems.filter((item) => {
      const itemType = item.dataset.type;
      const itemStatus = item.dataset.status;
      const itemGenres = item.dataset.genres.split(",");

      const typeMatch = type === "semua" || itemType === type;
      const statusMatch = status === "semua" || itemStatus === status;
      const genreMatch =
        selectedGenres.length === 0 ||
        selectedGenres.every((genre) => itemGenres.includes(genre));

      return typeMatch && statusMatch && genreMatch;
    });

    // 3. Urutkan item
    currentFilteredItems.sort((a, b) => {
      const titleA = a.dataset.title.toLowerCase();
      const titleB = b.dataset.title.toLowerCase();
      if (order === "a-z") return titleA.localeCompare(titleB);
      if (order === "z-a") return titleB.localeCompare(titleA);
      return 0; // 'update' defaultnya tidak diurutkan, asumsi urutan HTML adalah terbaru
    });

    // 4. Tampilkan hasilnya
    setupPagination(currentFilteredItems, paginationWrapper);
    displayPage(1, currentFilteredItems, paginationWrapper);
  };

  // Inisialisasi tampilan awal
  setupPagination(currentFilteredItems, paginationWrapper);
  displayPage(1, currentFilteredItems, paginationWrapper);
}

// =================================================================
// BAGIAN 2: FUNGSI UNTUK HALAMAN BACA (READER)
// =================================================================

/**
 * Fungsi untuk menginisialisasi semua logika di halaman baca yang imersif.
 */
function initializeReaderPage() {
  const imageContainer = document.getElementById("image-container");
  const allUI = document.querySelectorAll(".reader-ui");
  let uiVisibilityTimer = null;

  // Fungsi untuk menampilkan UI
  const showUI = () => {
    document.body.classList.add("ui-visible");
    clearTimeout(uiVisibilityTimer); // Hentikan timer jika ada
    startHideTimer(); // Mulai timer baru
  };

  // Fungsi untuk menyembunyikan UI
  const hideUI = () => {
    document.body.classList.remove("ui-visible");
    document.body.classList.remove("mobile-menu-open");
  };

  // Fungsi untuk memulai timer hide otomatis
  const startHideTimer = () => {
    clearTimeout(uiVisibilityTimer);
    uiVisibilityTimer = setTimeout(hideUI, 3000); // UI akan hilang setelah 3 detik
  };

  // Event listener utama pada area gambar
  if (imageContainer) {
    imageContainer.addEventListener("click", () => {
      if (document.body.classList.contains("ui-visible")) {
        hideUI();
      } else {
        showUI();
      }
    });
  }

  // Jaga UI tetap terlihat jika mouse berada di atasnya
  allUI.forEach((uiElement) => {
    uiElement.addEventListener("mouseenter", () =>
      clearTimeout(uiVisibilityTimer)
    );
    uiElement.addEventListener("mouseleave", () => startHideTimer());
  });

  // Logika untuk menu mobile
  const openMenuBtn = document.getElementById("mobile-reader-options-btn");
  const closeMenuBtn = document.getElementById("close-mobile-menu-btn");

  if (openMenuBtn) {
    openMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Hentikan event agar tidak memicu hideUI
      document.body.classList.add("mobile-menu-open");
      clearTimeout(uiVisibilityTimer);
    });
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", () => {
      document.body.classList.remove("mobile-menu-open");
      startHideTimer();
    });
  }

  // Mulai dengan UI tersembunyi
  hideUI();
}

// =================================================================
// BAGIAN 3: FUNGSI PEMBANTU (HELPERS) UNTUK PAGINASI
// =================================================================

/**
 * Menampilkan item untuk halaman tertentu.
 * @param {number} page - Nomor halaman yang ingin ditampilkan.
 * @param {Array<HTMLElement>} items - Array dari semua item yang akan dipaginasi.
 * @param {HTMLElement} wrapper - Elemen pembungkus paginasi.
 */
function displayPage(page, items, wrapper) {
  // Sembunyikan semua item terlebih dahulu
  items.forEach((item) => (item.style.display = "none"));

  page--; // Ubah ke format index (halaman 1 -> index 0)

  const start = ITEMS_PER_PAGE * page;
  const end = start + ITEMS_PER_PAGE;
  const paginatedItems = items.slice(start, end);

  paginatedItems.forEach((item) => {
    const displayStyle = item.classList.contains("manga-card")
      ? "block"
      : "flex";
    item.style.display = displayStyle;
  });

  // Update tombol paginasi yang aktif
  const currentActive = wrapper.querySelector(".page-num.active");
  if (currentActive) currentActive.classList.remove("active");

  const newActive = wrapper.querySelector(`.page-num[data-page="${page + 1}"]`);
  if (newActive) newActive.classList.add("active");
}

/**
 * Membuat dan mengatur tombol-tombol paginasi.
 * @param {Array<HTMLElement>} items - Array dari item yang akan dipaginasi.
 * @param {HTMLElement} wrapper - Elemen pembungkus untuk menaruh tombol paginasi.
 */
function setupPagination(items, wrapper) {
  if (!wrapper) return;
  wrapper.innerHTML = ""; // Kosongkan tombol paginasi lama

  const pageCount = Math.ceil(items.length / ITEMS_PER_PAGE);
  if (pageCount <= 1) return; // Tidak perlu paginasi jika hanya 1 halaman

  for (let i = 1; i <= pageCount; i++) {
    const btn = createPaginationButton(i, items, wrapper);
    wrapper.appendChild(btn);
  }
}

/**
 * Membuat satu tombol paginasi.
 * @param {number} page - Nomor halaman untuk tombol ini.
 * @param {Array<HTMLElement>} items - Array dari semua item.
 * @param {HTMLElement} wrapper - Elemen pembungkus paginasi.
 * @returns {HTMLElement} - Elemen tombol paginasi yang sudah jadi.
 */
function createPaginationButton(page, items, wrapper) {
  const button = document.createElement("a");
  button.href = "#";
  button.innerText = page;
  button.classList.add("page-num");
  button.dataset.page = page;

  button.addEventListener("click", function (e) {
    e.preventDefault();
    displayPage(page, items, wrapper);
  });

  return button;
}
