const stores = [
    {
      id: "himalayan-tandoori",
      name: "Himalayan Tandoori",
      tags: "Nepali • Indian",
      rating: 4.8,
      etaMin: 20,
      category: "food",
    },
    {
      id: "boudha-cafe",
      name: "Boudha Cafe",
      tags: "Cafe • Pizza",
      rating: 4.7,
      etaMin: 15,
      category: "food",
    },
    {
      id: "tashi-momo",
      name: "Tashi Momo Corner",
      tags: "Tibetan • Dumplings",
      rating: 4.6,
      etaMin: 10,
      category: "food",
    },
    {
      id: "everest-fresh",
      name: "Everest Fresh Kitchen",
      tags: "Local Cuisine",
      rating: 4.9,
      etaMin: 25,
      category: "food",
    },
    {
      id: "boudha-mart",
      name: "Boudha Mart",
      tags: "Vegetables • Snacks",
      rating: 4.5,
      etaMin: 22,
      category: "grocery",
    },
    {
      id: "daily-essentials",
      name: "Daily Essentials",
      tags: "Household • Stationery",
      rating: 4.4,
      etaMin: 18,
      category: "essentials",
    },
    {
      id: "boudha-pharmacy",
      name: "Boudha Pharmacy",
      tags: "Medicine • Wellness",
      rating: 4.6,
      etaMin: 20,
      category: "pharmacy",
    },
  ];
  
  const storeGrid = document.getElementById("storeGrid");
  const searchInput = document.getElementById("searchInput");
  const emptyState = document.getElementById("emptyState");
  const categoryButtons = Array.from(document.querySelectorAll(".cat"));
  
  let activeCategory = "food";
  let query = "";
  
  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (m) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[m]));
  }
  
  function renderStores(list) {
    storeGrid.innerHTML = list.map((s) => `
      <article class="card" role="button" tabindex="0" data-id="${s.id}">
        <div class="card__img" aria-hidden="true"></div>
        <div class="card__body">
          <div class="card__title">${escapeHtml(s.name)}</div>
          <div class="card__sub">${escapeHtml(s.tags)}</div>
          <div class="card__meta">
            <span class="star" aria-label="Rating ${s.rating}">
              <svg class="icon" aria-hidden="true"><use href="#i-star"></use></svg>
              ${s.rating.toFixed(1)}
            </span>
            <span class="dot">•</span>
            <span>${s.etaMin} min</span>
            <span class="badge">Free</span>
          </div>
        </div>
      </article>
    `).join("");
  
    emptyState.hidden = list.length !== 0;
  
    // click + keyboard open
    storeGrid.querySelectorAll(".card").forEach((card) => {
      const open = () => {
        const id = card.getAttribute("data-id");
        const store = stores.find(s => s.id === id);
        alert(`Open store: ${store?.name ?? "Store"}`);
      };
  
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });
  }
  
  function applyFilters() {
    const q = query.trim().toLowerCase();
  
    const filtered = stores.filter((s) => {
      const name = (s.name || "").toLowerCase();
      const tags = (s.tags || "").toLowerCase();
      const category = (s.category || "").toLowerCase();
  
      // Match search by name/tags/category
      const matchQuery = !q || `${name} ${tags} ${category}`.includes(q);
  
      // If user is typing a search, DON'T lock to activeCategory
      const matchCategory = q ? true : (s.category === activeCategory);
  
      return matchQuery && matchCategory;
    });
  
    renderStores(filtered);
  }
  
  function setActiveCategory(cat) {
    activeCategory = cat;
  
    categoryButtons.forEach((btn) => {
      const isActive = btn.dataset.category === cat;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    });
  
    applyFilters();
  }
  
  // category events
  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => setActiveCategory(btn.dataset.category));
  });
  
  // search event
  searchInput.addEventListener("input", (e) => {
    query = e.target.value;
    applyFilters();
  });
  
  // smooth scroll for CTA buttons
  document.querySelectorAll("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.querySelector(btn.getAttribute("data-scroll"));
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
  
  // initial render
  setActiveCategory(activeCategory);