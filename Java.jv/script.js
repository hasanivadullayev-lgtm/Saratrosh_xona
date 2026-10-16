
"use strict";

/* =========================================================
   BARBERBOOK PREMIUM
   Sahifalar, sartaroshxonalar, xodimlar, bronlar,
   sevimlilar, profil va sartaroshxona qo'shish.
========================================================= */

const BarberBook = (() => {
    const STORAGE = {
        favorites: "barberbook_favorites_v1",
        bookings: "barberbook_bookings_v1",
        profile: "barberbook_profile_v1",
        applications: "barberbook_applications_v1",
        reviews: "barberbook_reviews_v1"
    };

    const state = {
        page: "home",
        category: "all",
        search: "",
        selectedShop: null,
        selectedWorker: null,
        bookingFilter: "all",
        profileTab: "details"
    };

    const shops = [
        {
            id: 1,
            name: "Barber Pro",
            category: "top",
            rating: 4.9,
            reviews: 186,
            price: 50000,
            distance: 1.2,
            address: "Samarqand shahri",
            hours: "09:00–22:00",
            experience: "8 yil",
            image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=85",
            description: "Premium xizmat, zamonaviy soch turmaklari va soqol parvarishi.",
            styles: ["Fade", "Classic", "Beard", "Modern"],
            workers: [
                { id: 101, name: "Azizbek Karimov", experience: "8 yil", rating: 4.9, price: 50000, styles: ["Fade", "Classic", "Pompadour"] },
                { id: 102, name: "Javohir Aliyev", experience: "5 yil", rating: 4.8, price: 45000, styles: ["Crop", "Taper", "Beard"] },
                { id: 103, name: "Bekzod Xasanov", experience: "6 yil", rating: 4.7, price: 40000, styles: ["Classic", "Fade", "Buzz cut"] },
                { id: 104, name: "Sardor Olimov", experience: "4 yil", rating: 4.6, price: 35000, styles: ["Modern", "Taper", "Beard"] }
            ]
        },
        {
            id: 2,
            name: "Royal Cut",
            category: "top",
            rating: 4.8,
            reviews: 154,
            price: 60000,
            distance: 1.5,
            address: "Samarqand shahri",
            hours: "09:00–21:00",
            experience: "7 yil",
            image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=85",
            description: "Hashamatli muhit, professional ustalar va sifatli xizmat.",
            styles: ["Classic", "Fade", "Beard"],
            workers: [
                { id: 201, name: "Islom Rahimov", experience: "7 yil", rating: 4.9, price: 60000, styles: ["Classic", "Fade"] },
                { id: 202, name: "Muhammad Saidov", experience: "5 yil", rating: 4.7, price: 50000, styles: ["Crop", "Beard"] },
                { id: 203, name: "Akmal Ergashev", experience: "4 yil", rating: 4.6, price: 45000, styles: ["Taper", "Classic"] }
            ]
        },
        {
            id: 3,
            name: "Gentleman",
            category: "top",
            rating: 4.8,
            reviews: 132,
            price: 55000,
            distance: 1.8,
            address: "Samarqand shahri",
            hours: "08:30–21:00",
            experience: "6 yil",
            image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=85",
            description: "Erkaklar soch turmagi va soqol dizayni.",
            styles: ["Fade", "Classic", "Beard"],
            workers: [
                { id: 301, name: "Diyorbek Nurmatov", experience: "6 yil", rating: 4.8, price: 55000, styles: ["Fade", "Classic"] },
                { id: 302, name: "Shoxrux Tursunov", experience: "3 yil", rating: 4.6, price: 40000, styles: ["Crop", "Taper"] }
            ]
        },
        {
            id: 4,
            name: "Class Barber",
            category: "medium",
            rating: 4.6,
            reviews: 98,
            price: 45000,
            distance: 2.1,
            address: "Samarqand shahri",
            hours: "09:00–20:00",
            experience: "5 yil",
            image: "https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=900&q=85",
            description: "Qulay narx va kundalik soch turmaklari.",
            styles: ["Classic", "Fade"],
            workers: [
                { id: 401, name: "Otabek Ismoilov", experience: "5 yil", rating: 4.6, price: 45000, styles: ["Classic", "Fade"] },
                { id: 402, name: "Jasur Abduqodirov", experience: "3 yil", rating: 4.5, price: 35000, styles: ["Crop", "Buzz cut"] }
            ]
        },
        {
            id: 5,
            name: "Elite Cut",
            category: "medium",
            rating: 4.5,
            reviews: 87,
            price: 50000,
            distance: 2.5,
            address: "Samarqand shahri",
            hours: "09:00–21:00",
            experience: "6 yil",
            image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=85",
            description: "Zamonaviy uslublar va professional parvarish.",
            styles: ["Modern", "Fade", "Beard"],
            workers: [
                { id: 501, name: "Kamron Boboyev", experience: "6 yil", rating: 4.7, price: 50000, styles: ["Modern", "Fade"] },
                { id: 502, name: "Farrux Qodirov", experience: "4 yil", rating: 4.4, price: 40000, styles: ["Classic", "Beard"] }
            ]
        },
        {
            id: 6,
            name: "Style Hair",
            category: "cheap",
            rating: 4.4,
            reviews: 75,
            price: 35000,
            distance: 1.0,
            address: "Samarqand shahri",
            hours: "09:00–20:00",
            experience: "4 yil",
            image: "https://images.unsplash.com/photo-1593702295094-aea2c3e6a6c5?auto=format&fit=crop&w=900&q=85",
            description: "Hamyonbop narx va chiroyli soch turmaklari.",
            styles: ["Classic", "Crop"],
            workers: [
                { id: 601, name: "Sirojiddin Xasanov", experience: "4 yil", rating: 4.5, price: 35000, styles: ["Classic", "Crop"] },
                { id: 602, name: "Sherzod Murodov", experience: "2 yil", rating: 4.3, price: 30000, styles: ["Buzz cut", "Taper"] }
            ]
        },
        {
            id: 7,
            name: "Modern Barbers",
            category: "medium",
            rating: 4.5,
            reviews: 66,
            price: 40000,
            distance: 1.7,
            address: "Samarqand shahri",
            hours: "09:00–21:00",
            experience: "5 yil",
            image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=85",
            description: "Yoshlar uchun zamonaviy uslublar.",
            styles: ["Fade", "Crop", "Taper"],
            workers: [
                { id: 701, name: "Abbos Karimov", experience: "5 yil", rating: 4.5, price: 40000, styles: ["Fade", "Crop"] },
                { id: 702, name: "Umidjon Aliyev", experience: "3 yil", rating: 4.4, price: 35000, styles: ["Taper", "Classic"] }
            ]
        },
        {
            id: 8,
            name: "Classic Style",
            category: "cheap",
            rating: 4.3,
            reviews: 61,
            price: 30000,
            distance: 2.3,
            address: "Samarqand shahri",
            hours: "09:00–19:00",
            experience: "3 yil",
            image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=85",
            description: "Oddiy, klassik va ozoda ko‘rinish.",
            styles: ["Classic", "Buzz cut"],
            workers: [
                { id: 801, name: "Odil Sobirov", experience: "3 yil", rating: 4.3, price: 30000, styles: ["Classic", "Buzz cut"] }
            ]
        },
        {
            id: 9,
            name: "City Barber",
            category: "extra",
            rating: 4.6,
            reviews: 91,
            price: 35000,
            distance: 2.9,
            address: "Samarqand shahri",
            hours: "08:00–22:00",
            experience: "5 yil",
            image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=85",
            description: "Oldindan yozilish va qulay xizmatlar.",
            styles: ["Fade", "Classic", "Beard"],
            workers: [
                { id: 901, name: "Sanjar Ergashev", experience: "5 yil", rating: 4.6, price: 35000, styles: ["Fade", "Beard"] }
            ]
        },
        {
            id: 10,
            name: "Trend Cut",
            category: "extra",
            rating: 4.5,
            reviews: 80,
            price: 38000,
            distance: 3.2,
            address: "Samarqand shahri",
            hours: "09:00–22:00",
            experience: "4 yil",
            image: "https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=900&q=85",
            description: "Trenddagi soch turmaklari va soqol parvarishi.",
            styles: ["Modern", "Fade", "Taper"],
            workers: [
                { id: 1001, name: "Temurbek Rasulov", experience: "4 yil", rating: 4.5, price: 38000, styles: ["Modern", "Fade"] }
            ]
        }
    ];

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

    function readStorage(key, fallback) {
        try {
            const value = localStorage.getItem(key);
            return value === null ? fallback : JSON.parse(value);
        } catch (error) {
            console.warn("Saqlangan ma’lumotni o‘qib bo‘lmadi:", key, error);
            return fallback;
        }
    }

    function writeStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error("Ma’lumotni saqlab bo‘lmadi:", error);
            notify("Brauzer ma’lumotni saqlay olmadi.", "error");
            return false;
        }
    }

    function getFavorites() {
        return readStorage(STORAGE.favorites, []);
    }

    function getBookings() {
        return readStorage(STORAGE.bookings, []);
    }

    function getProfile() {
        return readStorage(STORAGE.profile, {
            name: "",
            phone: "",
            email: "",
            language: "uz"
        });
    }

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);
    }

    function formatMoney(value) {
        return `${Number(value || 0).toLocaleString("uz-UZ")} so‘m`;
    }

    function notify(message, type = "success") {
        let container = $("#toastContainer");

        if (!container) {
            container = document.createElement("div");
            container.id = "toastContainer";
            container.className = "toast-container";
            container.setAttribute("aria-live", "polite");
            document.body.appendChild(container);
        }

        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.textContent = message;
        container.appendChild(toast);

        window.setTimeout(() => toast.remove(), 3500);
    }

    function findShop(id) {
        return shops.find(shop => shop.id === Number(id));
    }

    function findWorker(shopId, workerId) {
        const shop = findShop(shopId);
        return shop?.workers.find(worker => worker.id === Number(workerId)) || null;
    }

    function isFavorite(id) {
        return getFavorites().includes(Number(id));
    }

    function toggleFavorite(id) {
        const favorites = getFavorites();
        const numericId = Number(id);
        const index = favorites.indexOf(numericId);

        if (index >= 0) {
            favorites.splice(index, 1);
            notify("Sevimlilardan olib tashlandi.");
        } else {
            favorites.push(numericId);
            notify("Sevimlilarga qo‘shildi.");
        }

        writeStorage(STORAGE.favorites, favorites);
        renderFavorites();
        updateFavoriteButtons();
    }

    function updateFavoriteButtons() {
        $$("[data-favorite]").forEach(button => {
            const active = isFavorite(button.dataset.favorite);
            button.classList.toggle("is-favorite", active);
            button.setAttribute("aria-pressed", String(active));
            button.setAttribute("aria-label", active ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo‘shish");
        });
    }

    function shopCard(shop, index = 0) {
        const favorite = isFavorite(shop.id);

        return `
            <article class="shop-card" data-shop-card="${shop.id}">
                <div class="shop-card-image-wrap" data-open-shop="${shop.id}" role="button" tabindex="0" aria-label="${escapeHTML(shop.name)} haqida">
                    <img
                        class="shop-card-image"
                        src="${escapeHTML(shop.image)}"
                        alt="${escapeHTML(shop.name)} sartaroshxonasi"
                        loading="lazy"
                        onerror="this.style.opacity='.25'"
                    >
                    <span class="shop-rank">${index + 1}</span>
                </div>

                <div class="shop-card-title">
                    <h3>${escapeHTML(shop.name)}</h3>
                    <span class="shop-card-rating">★ ${shop.rating.toFixed(1)}</span>
                </div>

                <p class="shop-card-description">${escapeHTML(shop.description)}</p>

                <div class="shop-card-meta">
                    <span>⌖ ${shop.distance.toFixed(1)} km</span>
                    <span class="shop-card-price">${formatMoney(shop.price)}</span>
                </div>

                <div class="shop-card-meta">
                    <span>◷ ${escapeHTML(shop.hours)}</span>
                    <span>${shop.reviews} fikr</span>
                </div>

                <div class="shop-card-actions">
                    <button class="outline-button" type="button" data-open-shop="${shop.id}">
                        Batafsil ↗
                    </button>
                    <button
                        class="favorite-button ${favorite ? "is-favorite" : ""}"
                        type="button"
                        data-favorite="${shop.id}"
                        aria-pressed="${favorite}"
                        aria-label="Sevimlilarga qo‘shish"
                    >${favorite ? "♥" : "♡"}</button>
                </div>
            </article>
        `;
    }

    function workerCard(shop, worker) {
        return `
            <article class="worker-card">
                <div class="worker-card-header">
                    <div class="worker-avatar" aria-hidden="true">♙</div>
                    <div>
                        <h3>${escapeHTML(worker.name)}</h3>
                        <p>${escapeHTML(shop.name)}</p>
                        <span class="worker-rating">★ ${worker.rating.toFixed(1)}</span>
                    </div>
                </div>

                <p>Tajriba: ${escapeHTML(worker.experience)}</p>
                <p>Narxi: <strong>${formatMoney(worker.price)}</strong></p>
                <p>Uslublar: ${worker.styles.map(escapeHTML).join(", ")}</p>

                <div class="worker-card-actions">
                    <button class="outline-button" type="button"
                        data-open-worker="${worker.id}" data-shop-id="${shop.id}">
                        Profil
                    </button>
                    <button class="gold-button" type="button"
                        data-book-worker="${worker.id}" data-shop-id="${shop.id}">
                        Band qilish
                    </button>
                </div>
            </article>
        `;
    }

    function renderHome() {
        const container = $("#homeShops");
        if (container) {
            container.innerHTML = shops.slice(0, 4).map(shopCard).join("");
        }

        const stats = {
            "#userCount": "17 480+",
            "#shopCount": String(shops.length),
            "#workerCount": String(shops.reduce((sum, shop) => sum + shop.workers.length, 0)),
            "#bookingCount": String(getBookings().length)
        };

        Object.entries(stats).forEach(([selector, value]) => {
            const element = $(selector);
            if (element) element.textContent = value;
        });
    }

    function renderShops() {
        const container = $("#shopsGrid");
        if (!container) return;

        const query = state.search.trim().toLocaleLowerCase("uz");
        let filtered = shops.filter(shop => {
            const matchesSearch = !query || [
                shop.name,
                shop.address,
                shop.description,
                ...shop.styles
            ].join(" ").toLocaleLowerCase("uz").includes(query);

            const matchesCategory =
                state.category === "all" || shop.category === state.category;

            return matchesSearch && matchesCategory;
        });

        if (state.category === "top") {
            filtered = filtered.sort((a, b) => b.rating - a.rating);
        } else if (state.category === "cheap") {
            filtered = filtered.sort((a, b) => a.price - b.price);
        } else if (state.category === "nearby") {
            filtered = filtered.sort((a, b) => a.distance - b.distance);
        }

        container.innerHTML = filtered.length
            ? filtered.map(shopCard).join("")
            : `<div class="empty-state full-width">
                   <span>⌕</span>
                   <h3>Hech narsa topilmadi</h3>
                   <p>Boshqa so‘z bilan qidirib ko‘ring.</p>
                   <button class="outline-button" data-action="clear-search" type="button">Qidiruvni tozalash</button>
               </div>`;

        const count = $("#shopsCount");
        if (count) count.textContent = `${filtered.length} ta sartaroshxona`;

        updateFavoriteButtons();
    }

    function renderFavorites() {
        const container = $("#favoritesGrid");
        if (!container) return;

        const favorites = getFavorites();
        const favoriteShops = shops.filter(shop => favorites.includes(shop.id));

        container.innerHTML = favoriteShops.length
            ? favoriteShops.map(shopCard).join("")
            : `<div class="empty-state full-width">
                   <span>♡</span>
                   <h3>Hozircha sevimlilar yo‘q</h3>
                   <p>Yoqtirgan sartaroshxonangiz yonidagi yurakchani bosing.</p>
                   <button class="gold-button" type="button" data-page="shops">Sartaroshxonalarni ko‘rish</button>
               </div>`;

        updateFavoriteButtons();
    }

    function renderTop10() {
        const container = $("#top10Grid");
        if (!container) return;

        const top = [...shops]
            .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
            .slice(0, 10);

        container.innerHTML = top.map(shopCard).join("");
    }

    function renderWorkers(shopId) {
        const shop = findShop(shopId);
        if (!shop) {
            notify("Sartaroshxona topilmadi.", "error");
            return;
        }

        state.selectedShop = shop.id;
        const title = $("#workersTitle");
        const subtitle = $("#workersSubtitle");
        const container = $("#workersGrid");

        if (title) title.textContent = `${shop.name} — xodimlari`;
        if (subtitle) {
            subtitle.textContent = `${shop.address} · ★ ${shop.rating.toFixed(1)} · ${shop.hours}`;
        }

        if (container) {
            container.innerHTML = shop.workers.map(worker => workerCard(shop, worker)).join("");
        }

        showPage("workers");
    }

    function renderWorkerDetail(shopId, workerId) {
        const shop = findShop(shopId);
        const worker = findWorker(shopId, workerId);

        if (!shop || !worker) {
            notify("Usta ma’lumotlari topilmadi.", "error");
            return;
        }

        state.selectedShop = shop.id;
        state.selectedWorker = worker.id;

        const container = $("#workerDetailContent");
        if (!container) {
            notify("HTML ichida #workerDetailContent elementi kerak.", "error");
            return;
        }

        const reviews = readStorage(STORAGE.reviews, []);
        const workerReviews = reviews.filter(review =>
            review.workerId === worker.id && review.shopId === shop.id
        );

        container.innerHTML = `
            <article class="worker-detail-card">
                <button class="outline-button" type="button" data-action="back-workers">← Xodimlarga qaytish</button>

                <div class="worker-detail-header" style="margin-top:24px">
                    <div class="worker-detail-photo" style="display:grid;place-items:center;background:#171106;color:#f5c451;font-size:70px">♙</div>
                    <div>
                        <span class="eyebrow">PROFESSIONAL BARBER</span>
                        <h1>${escapeHTML(worker.name)}</h1>
                        <p>${escapeHTML(shop.name)}</p>
                        <div class="worker-detail-rating">★★★★★ <strong>${worker.rating.toFixed(1)}</strong></div>
                        <p>Usta tajribasi: ${escapeHTML(worker.experience)}</p>
                        <p>Manzil: ${escapeHTML(shop.address)}</p>
                    </div>
                </div>

                <div class="worker-detail-facts">
                    <div class="worker-detail-fact"><span>Bir xizmat narxi</span><strong>${formatMoney(worker.price)}</strong></div>
                    <div class="worker-detail-fact"><span>Ish vaqti</span><strong>${escapeHTML(shop.hours)}</strong></div>
                    <div class="worker-detail-fact"><span>Sartaroshxona reytingi</span><strong>★ ${shop.rating.toFixed(1)}</strong></div>
                    <div class="worker-detail-fact"><span>Usta uslublari</span><strong>${worker.styles.map(escapeHTML).join(", ")}</strong></div>
                </div>

                <h2>Mijozlar fikri</h2>
                <div class="review-list">
                    ${workerReviews.length
                        ? workerReviews.map(review => `
                            <article class="booking-card">
                                <strong>${escapeHTML(review.name || "Mijoz")}</strong>
                                <p class="worker-rating">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</p>
                                <p>${escapeHTML(review.text)}</p>
                            </article>
                        `).join("")
                        : `<p>Hozircha fikrlar yo‘q. Birinchi bo‘lib fikr qoldirishingiz mumkin.</p>`
                    }
                </div>

                <div class="form-actions" style="margin-top:24px">
                    <button class="gold-button" type="button" data-book-worker="${worker.id}" data-shop-id="${shop.id}">Vaqtni band qilish</button>
                    <button class="outline-button" type="button" data-review-worker="${worker.id}" data-shop-id="${shop.id}">Fikr qoldirish</button>
                </div>
            </article>
        `;

        showPage("workerDetail");
    }

    function renderShopDetail(shopId) {
        const shop = findShop(shopId);
        if (!shop) return;

        state.selectedShop = shop.id;
        const container = $("#shopDetailContent");
        if (!container) {
            renderWorkers(shop.id);
            return;
        }

        container.innerHTML = `
            <article class="shop-detail-hero">
                <img src="${escapeHTML(shop.image)}" alt="${escapeHTML(shop.name)}" onerror="this.style.opacity='.3'">
                <div class="shop-detail-body">
                    <span class="eyebrow">BARBERBOOK PREMIUM</span>
                    <h1>${escapeHTML(shop.name)}</h1>
                    <p>★ ${shop.rating.toFixed(1)} · ${shop.reviews} ta fikr · ${escapeHTML(shop.address)}</p>
                    <p>${escapeHTML(shop.description)}</p>

                    <div class="shop-detail-facts">
                        <span>⌖ ${shop.distance.toFixed(1)} km</span>
                        <span>◷ ${escapeHTML(shop.hours)}</span>
                        <span>${formatMoney(shop.price)} dan</span>
                        <span>${shop.workers.length} nafar usta</span>
                    </div>

                    <div class="form-actions" style="margin-top:24px">
                        <button class="gold-button" type="button" data-open-workers="${shop.id}">Xodimlarni ko‘rish</button>
                        <button class="outline-button" type="button" data-favorite="${shop.id}">${isFavorite(shop.id) ? "♥ Sevimlida" : "♡ Sevimlilarga"}</button>
                    </div>
                </div>
            </article>
        `;

        showPage("shopDetail");
    }

    function renderBookings() {
        const container = $("#bookingsList");
        if (!container) return;

        let bookings = getBookings();

        if (state.bookingFilter !== "all") {
            bookings = bookings.filter(booking => booking.status === state.bookingFilter);
        }

        container.innerHTML = bookings.length
            ? bookings.map(booking => `
                <article class="booking-card">
                    <div class="booking-card-header">
                        <div>
                            <span class="eyebrow">BRON RAQAMI: ${escapeHTML(booking.code)}</span>
                            <h3>${escapeHTML(booking.shopName)}</h3>
                            <p>Usta: ${escapeHTML(booking.workerName)}</p>
                        </div>
                        <span class="booking-status ${booking.status === "confirmed" ? "confirmed" : ""} ${booking.status === "cancelled" ? "cancelled" : ""}">
                            ${booking.status === "confirmed" ? "Tasdiqlandi" : booking.status === "cancelled" ? "Bekor qilindi" : "So‘rov yuborildi"}
                        </span>
                    </div>

                    <div class="booking-details">
                        <div class="booking-detail"><span>Sana</span><strong>${escapeHTML(booking.date)}</strong></div>
                        <div class="booking-detail"><span>Vaqt</span><strong>${escapeHTML(booking.time)}</strong></div>
                        <div class="booking-detail"><span>Narx</span><strong>${formatMoney(booking.price)}</strong></div>
                        <div class="booking-detail"><span>Manzil</span><strong>${escapeHTML(booking.address)}</strong></div>
                    </div>

                    ${booking.status !== "cancelled" ? `
                        <div class="booking-card-actions">
                            <button class="outline-button" type="button" data-cancel-booking="${escapeHTML(booking.id)}">Bronni bekor qilish</button>
                        </div>
                    ` : ""}
                </article>
            `).join("")
            : `<div class="empty-state">
                   <span>▣</span>
                   <h3>Bronlar mavjud emas</h3>
                   <p>Sartaroshxonani tanlab, o‘zingizga qulay vaqtni band qiling.</p>
                   <button class="gold-button" type="button" data-page="shops">Sartaroshxonalarni ko‘rish</button>
               </div>`;
    }

    function showPage(pageName) {
        state.page = pageName;

        const pageAliases = {
            home: ["home", "bosh-sahifa"],
            shops: ["shops", "sartaroshxonalar"],
            top10: ["top10", "top-10"],
            favorites: ["favorites", "sevimlilar"],
            bookings: ["bookings", "bronlar"],
            map: ["map", "location"],
            profile: ["profile", "profil"],
            about: ["about", "contact"],
            workers: ["workers", "xodimlar"],
            shopDetail: ["shopDetail", "shop-detail"],
            workerDetail: ["workerDetail", "worker-detail"],
            addShop: ["addShop", "add-shop"]
        };

        const names = pageAliases[pageName] || [pageName];

        $$(".page").forEach(page => {
            const matches = names.includes(page.dataset.page) ||
                names.includes(page.id) ||
                names.includes(page.id.replace(/^page-/, ""));

            page.hidden = !matches;
            page.classList.toggle("active", matches);
        });

        $$("[data-page]").forEach(button => {
            if (button.matches("button, a")) {
                const active = names.includes(button.dataset.page);
                button.classList.toggle("active", active);
                if (active) button.setAttribute("aria-current", "page");
                else button.removeAttribute("aria-current");
            }
        });

        const oldTitle = document.title;
        const titles = {
            home: "Bosh sahifa",
            shops: "Sartaroshxonalar",
            top10: "Top 10 sartaroshxona",
            favorites: "Sevimlilar",
            bookings: "Mening bronlarim",
            map: "Yaqin sartaroshxonalar",
            profile: "Profil",
            about: "Biz haqimizda",
            workers: "Xodimlar",
            shopDetail: "Sartaroshxona haqida",
            workerDetail: "Usta profili",
            addShop: "Sartaroshxona qo‘shish"
        };

        document.title = `${titles[pageName] || oldTitle} | BarberBook`;

        if (pageName === "home") renderHome();
        if (pageName === "shops") renderShops();
        if (pageName === "top10") renderTop10();
        if (pageName === "favorites") renderFavorites();
        if (pageName === "bookings") renderBookings();
        if (pageName === "profile") renderProfile();

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function openModal(id) {
        const modal = document.getElementById(id);
        if (!modal) {
            notify(`HTML ichida #${id} modal oynasi topilmadi.`, "error");
            return null;
        }

        modal.hidden = false;
        modal.classList.add("is-open");
        document.body.classList.add("modal-open");

        const focusable = $("input, select, textarea, button", modal);
        if (focusable) window.setTimeout(() => focusable.focus(), 50);

        return modal;
    }

    function closeModal(modal) {
        if (!modal) return;

        modal.hidden = true;
        modal.classList.remove("is-open");

        if (!$(".modal-overlay:not([hidden])")) {
            document.body.classList.remove("modal-open");
        }
    }

    function openBooking(shopId, workerId = null) {
        const shop = findShop(shopId);
        if (!shop) {
            notify("Sartaroshxona topilmadi.", "error");
            return;
        }

        const worker = workerId ? findWorker(shopId, workerId) : shop.workers[0];
        if (!worker) {
            notify("Usta topilmadi.", "error");
            return;
        }

        state.selectedShop = shop.id;
        state.selectedWorker = worker.id;

        const modal = openModal("bookingModal");
        if (!modal) return;

        const shopField = $("#bookingShop", modal);
        const workerField = $("#bookingWorker", modal);
        const priceField = $("#bookingPrice", modal);
        const dateField = $("#bookingDate", modal);

        if (shopField) {
            shopField.innerHTML = shops.map(item =>
                `<option value="${item.id}" ${item.id === shop.id ? "selected" : ""}>${escapeHTML(item.name)}</option>`
            ).join("");
        }

        if (workerField) {
            workerField.innerHTML = shop.workers.map(item =>
                `<option value="${item.id}" ${item.id === worker.id ? "selected" : ""}>${escapeHTML(item.name)}</option>`
            ).join("");
        }

        if (priceField) priceField.textContent = formatMoney(worker.price);
        if (dateField) dateField.min = new Date().toISOString().slice(0, 10);

        updateBookingPrice();
    }

    function updateBookingPrice() {
        const shopId = Number($("#bookingShop")?.value || state.selectedShop);
        const workerId = Number($("#bookingWorker")?.value || state.selectedWorker);
        const worker = findWorker(shopId, workerId);
        const price = $("#bookingPrice");

        if (price && worker) price.textContent = formatMoney(worker.price);
    }

    function submitBooking(form) {
        const data = new FormData(form);
        const shopId = Number(data.get("shopId") || $("#bookingShop")?.value || state.selectedShop);
        const workerId = Number(data.get("workerId") || $("#bookingWorker")?.value || state.selectedWorker);
        const shop = findShop(shopId);
        const worker = findWorker(shopId, workerId);

        const date = String(data.get("date") || $("#bookingDate")?.value || "");
        const time = String(data.get("time") || $("#bookingTime")?.value || "");
        const name = String(data.get("name") || $("#bookingName")?.value || "").trim();
        const phone = String(data.get("phone") || $("#bookingPhone")?.value || "").trim();

        if (!shop || !worker) {
            notify("Sartaroshxona va ustani tanlang.", "error");
            return;
        }

        if (!date || !time || !name || !phone) {
            notify("Barcha majburiy maydonlarni to‘ldiring.", "error");
            return;
        }

        const bookingDate = new Date(`${date}T${time}`);
        if (Number.isNaN(bookingDate.getTime()) || bookingDate < new Date()) {
            notify("Kelajakdagi sana va vaqtni tanlang.", "error");
            return;
        }

        const bookings = getBookings();
        const booking = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            code: `BB-${Date.now().toString().slice(-8)}`,
            shopId: shop.id,
            shopName: shop.name,
            workerId: worker.id,
            workerName: worker.name,
            address: shop.address,
            price: worker.price,
            date,
            time,
            name,
            phone,
            status: "pending",
            createdAt: new Date().toISOString()
        };

        bookings.unshift(booking);

        if (!writeStorage(STORAGE.bookings, bookings)) return;

        closeModal($("#bookingModal"));
        form.reset();
        renderBookings();

        notify("Bron so‘rovi saqlandi. Hozircha bu demo bron; sartaroshxona uni real vaqtda tasdiqlamaydi.");
        showPage("bookings");
    }

    function cancelBooking(id) {
        const bookings = getBookings();
        const booking = bookings.find(item => String(item.id) === String(id));
        if (!booking) return;

        if (!window.confirm("Ushbu bronni bekor qilmoqchimisiz?")) return;

        booking.status = "cancelled";
        writeStorage(STORAGE.bookings, bookings);
        renderBookings();
        notify("Bron bekor qilindi.");
    }

    function renderProfile() {
        const profile = getProfile();

        const nameField = $("#profileName");
        const phoneField = $("#profilePhone");
        const emailField = $("#profileEmail");
        const languageField = $("#profileLanguage");

        if (nameField && !nameField.value) nameField.value = profile.name || "";
        if (phoneField && !phoneField.value) phoneField.value = profile.phone || "";
        if (emailField && !emailField.value) emailField.value = profile.email || "";
        if (languageField) languageField.value = profile.language || "uz";

        const nameLabel = $("#profileDisplayName");
        if (nameLabel) nameLabel.textContent = profile.name || "Mehmon";

        const emailLabel = $("#profileDisplayEmail");
        if (emailLabel) emailLabel.textContent = profile.email || "Profilni to‘ldiring";
    }

    function saveProfile(form) {
        const data = new FormData(form);
        const profile = {
            name: String(data.get("name") || $("#profileName")?.value || "").trim(),
            phone: String(data.get("phone") || $("#profilePhone")?.value || "").trim(),
            email: String(data.get("email") || $("#profileEmail")?.value || "").trim(),
            language: String(data.get("language") || $("#profileLanguage")?.value || "uz")
        };

        if (!profile.name) {
            notify("Ismingizni kiriting.", "error");
            return;
        }

        writeStorage(STORAGE.profile, profile);
        renderProfile();
        notify("Profil brauzeringizda saqlandi.");
    }

    function submitApplication(form) {
        const data = new FormData(form);
        const application = {
            id: Date.now(),
            name: String(data.get("name") || "").trim(),
            phone: String(data.get("phone") || "").trim(),
            shopName: String(data.get("shopName") || "").trim(),
            address: String(data.get("address") || "").trim(),
            description: String(data.get("description") || "").trim(),
            createdAt: new Date().toISOString(),
            status: "pending"
        };

        if (!application.name || !application.phone || !application.shopName || !application.address) {
            notify("Ism, telefon, sartaroshxona nomi va manzilni kiriting.", "error");
            return;
        }

        const applications = readStorage(STORAGE.applications, []);
        applications.unshift(application);

        if (!writeStorage(STORAGE.applications, applications)) return;

        form.reset();
        notify("Ariza demo rejimida saqlandi. Haqiqiy yuborish uchun backend kerak.");
        showPage("home");
    }

    function openReview(shopId, workerId) {
        const modal = openModal("reviewModal");
        if (!modal) return;

        const form = $("form", modal);
        if (form) {
            form.dataset.shopId = String(shopId);
            form.dataset.workerId = String(workerId);
        }
    }

    function submitReview(form) {
        const data = new FormData(form);
        const text = String(data.get("text") || $("#reviewText")?.value || "").trim();
        const rating = Number(data.get("rating") || form.dataset.rating || 5);

        if (!text) {
            notify("Fikringizni yozing.", "error");
            return;
        }

        const reviews = readStorage(STORAGE.reviews, []);
        reviews.unshift({
            id: Date.now(),
            shopId: Number(form.dataset.shopId),
            workerId: Number(form.dataset.workerId),
            name: getProfile().name || "Mijoz",
            rating: Math.max(1, Math.min(5, rating)),
            text,
            createdAt: new Date().toISOString()
        });

        writeStorage(STORAGE.reviews, reviews);
        closeModal($("#reviewModal"));
        form.reset();
        notify("Fikringiz demo rejimida saqlandi.");

        if (state.selectedShop && state.selectedWorker) {
            renderWorkerDetail(state.selectedShop, state.selectedWorker);
        }
    }

    function renderMap() {
        const map = $("#mapContainer");
        if (!map) return;

        map.innerHTML = `
            <div class="map-placeholder">
                <span class="map-placeholder-icon">⌖</span>
                <h2>Yaqin sartaroshxonalar</h2>
                <p>Quyidagi ro‘yxat demo ma’lumotlardan tuzilgan. Haqiqiy joylashuv va masofani ko‘rsatish uchun xarita xizmati hamda geolokatsiya API ulanadi.</p>
                <button class="gold-button" type="button" data-action="find-nearby">Yaqin 5 tasini ko‘rish</button>
            </div>
        `;

        const list = $("#nearbyList");
        if (list) {
            const nearby = [...shops].sort((a, b) => a.distance - b.distance).slice(0, 5);
            list.innerHTML = nearby.map((shop, index) => `
                <article class="nearby-card">
                    <span class="eyebrow">Yaqin joy #${index + 1}</span>
                    <h3>${escapeHTML(shop.name)}</h3>
                    <p>⌖ ${shop.distance.toFixed(1)} km · ★ ${shop.rating.toFixed(1)}</p>
                    <p>${escapeHTML(shop.address)}</p>
                    <button class="outline-button" type="button" data-open-shop="${shop.id}">Batafsil</button>
                </article>
            `).join("");
        }
    }

    function findNearby() {
        renderMap();
        showPage("map");
        notify("Hozircha eng yaqin 5 ta demo manzil ko‘rsatildi.");
    }

    function setupSearch() {
        const inputs = $$("[data-search-input], #searchInput, #shopSearch");

        inputs.forEach(input => {
            input.addEventListener("input", () => {
                state.search = input.value;
                inputs.forEach(other => {
                    if (other !== input) other.value = input.value;
                });

                if (state.page !== "shops") showPage("shops");
                else renderShops();
            });
        });

        $$("[data-search-form]").forEach(form => {
            form.addEventListener("submit", event => {
                event.preventDefault();
                const input = $("input", form);
                state.search = input?.value.trim() || state.search;
                showPage("shops");
            });
        });
    }

    function setupCategoryButtons() {
        $$("[data-category]").forEach(button => {
            button.addEventListener("click", () => {
                state.category = button.dataset.category || "all";

                $$("[data-category]").forEach(item => {
                    item.classList.toggle("active", item === button);
                });

                showPage("shops");
                renderShops();
            });
        });
    }

    function setupForms() {
        document.addEventListener("submit", event => {
            const form = event.target;
            if (!(form instanceof HTMLFormElement)) return;

            if (form.matches("#bookingForm, [data-form='booking']")) {
                event.preventDefault();
                submitBooking(form);
            } else if (form.matches("#profileForm, [data-form='profile']")) {
                event.preventDefault();
                saveProfile(form);
            } else if (form.matches("#addShopForm, [data-form='add-shop']")) {
                event.preventDefault();
                submitApplication(form);
            } else if (form.matches("#reviewForm, [data-form='review']")) {
                event.preventDefault();
                submitReview(form);
            }
        });

        $("#bookingShop")?.addEventListener("change", event => {
            const shop = findShop(event.target.value);
            const workerField = $("#bookingWorker");
            if (!shop || !workerField) return;

            workerField.innerHTML = shop.workers.map(worker =>
                `<option value="${worker.id}">${escapeHTML(worker.name)}</option>`
            ).join("");

            state.selectedShop = shop.id;
            state.selectedWorker = shop.workers[0]?.id || null;
            updateBookingPrice();
        });

        $("#bookingWorker")?.addEventListener("change", event => {
            state.selectedWorker = Number(event.target.value);
            updateBookingPrice();
        });
    }

    function setupEvents() {
        document.addEventListener("click", event => {
            const target = event.target instanceof Element ? event.target : null;
            if (!target) return;

            const pageButton = target.closest("[data-page]");
            if (pageButton && pageButton.matches("button, a")) {
                event.preventDefault();
                const page = pageButton.dataset.page;

                if (page === "map") renderMap();
                showPage(page);
                return;
            }

            const categoryButton = target.closest("[data-category]");
            if (categoryButton) return;

            const favoriteButton = target.closest("[data-favorite]");
            if (favoriteButton) {
                event.preventDefault();
                event.stopPropagation();
                toggleFavorite(favoriteButton.dataset.favorite);
                return;
            }

            const openShopButton = target.closest("[data-open-shop]");
            if (openShopButton) {
                event.preventDefault();
                renderShopDetail(openShopButton.dataset.openShop);
                return;
            }

            const openWorkersButton = target.closest("[data-open-workers]");
            if (openWorkersButton) {
                event.preventDefault();
                renderWorkers(openWorkersButton.dataset.openWorkers);
                return;
            }

            const openWorkerButton = target.closest("[data-open-worker]");
            if (openWorkerButton) {
                event.preventDefault();
                renderWorkerDetail(
                    openWorkerButton.dataset.shopId,
                    openWorkerButton.dataset.openWorker
                );
                return;
            }

            const bookWorkerButton = target.closest("[data-book-worker]");
            if (bookWorkerButton) {
                event.preventDefault();
                openBooking(
                    bookWorkerButton.dataset.shopId,
                    bookWorkerButton.dataset.bookWorker
                );
                return;
            }

            const bookShopButton = target.closest("[data-book-shop]");
            if (bookShopButton) {
                event.preventDefault();
                openBooking(bookShopButton.dataset.bookShop);
                return;
            }

            const cancelButton = target.closest("[data-cancel-booking]");
            if (cancelButton) {
                cancelBooking(cancelButton.dataset.cancelBooking);
                return;
            }

            const reviewButton = target.closest("[data-review-worker]");
            if (reviewButton) {
                openReview(reviewButton.dataset.shopId, reviewButton.dataset.reviewWorker);
                return;
            }

            const closeButton = target.closest("[data-close-modal]");
            if (closeButton) {
                closeModal(closeButton.closest(".modal-overlay"));
                return;
            }

            const actionButton = target.closest("[data-action]");
            if (actionButton) {
                const action = actionButton.dataset.action;

                if (action === "clear-search") {
                    state.search = "";
                    $$("[data-search-input], #searchInput, #shopSearch").forEach(input => input.value = "");
                    renderShops();
                } else if (action === "back-workers") {
                    renderWorkers(state.selectedShop);
                } else if (action === "find-nearby") {
                    findNearby();
                } else if (action === "open-add-shop") {
                    showPage("addShop");
                } else if (action === "open-booking") {
                    openBooking(state.selectedShop || shops[0].id);
                }
            }
        });

        document.addEventListener("click", event => {
            const target = event.target;
            if (!(target instanceof Element)) return;

            const overlay = target.classList.contains("modal-overlay") ? target : null;
            if (overlay) closeModal(overlay);
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                $$(".modal-overlay:not([hidden])").forEach(closeModal);
            }

            if (event.key === "Enter") {
                const target = event.target;
                if (target instanceof Element && target.matches("[data-open-shop]")) {
                    renderShopDetail(target.dataset.openShop);
                }
            }
        });
    }

    function setupIntro() {
        const intro = $("#pageLoader") || $(".intro-screen") || $(".page-loader");

        if (!intro) {
            document.body.classList.remove("is-loading");
            return;
        }

        window.setTimeout(() => {
            intro.classList.add("is-hidden");
            intro.setAttribute("aria-hidden", "true");
            document.body.classList.remove("is-loading");
        }, 2200);
    }

    function setupDateMinimums() {
        const today = new Date().toISOString().slice(0, 10);
        $$('input[type="date"]').forEach(input => {
            if (!input.min) input.min = today;
        });
    }

    function init() {
        setupEvents();
        setupForms();
        setupSearch();
        setupCategoryButtons();
        setupIntro();
        setupDateMinimums();

        renderHome();
        renderShops();
        renderFavorites();
        renderTop10();
        renderBookings();
        renderMap();
        renderProfile();

        console.info("BarberBook JavaScript ishga tushdi.");
    }

    return {
        init,
        showPage,
        renderHome,
        renderShops,
        renderFavorites,
        renderTop10,
        renderBookings,
        renderMap,
        renderWorkers,
        renderShopDetail,
        renderWorkerDetail,
        openBooking,
        notify
    };
})();

document.addEventListener("DOMContentLoaded", BarberBook.init);
