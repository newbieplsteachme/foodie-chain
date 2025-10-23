// Load favorites from localStorage
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Mock restaurant data (same as index.js)
const MOCK_RESTAURANTS = [
    { id: 1, 
        name: "Jollibee Baliwag", 
        rating: 4.5, reviews: 242, 
        cuisine: "Filipino", 
        address: "DRT Hi-way, corner Santiago S. Aquino...", 
        price: "PPP", 
        tags: ["Spicy", "Family-Friendly", "Quick-Bite"], 
        isOpen: true, 
        imageUrl: "src/asset/images/jabi.png" 
    },
    { id: 2, 
        name: "Max's Restaurant", 
        rating: 4.3, reviews: 187, 
        cuisine: "Malaysian", 
        address: "Sofia Remedios Trinidad Hiway, Tanco...", 
        price: "PPP", 
        tags: ["Authentic", "Family-Friendly", "Comfort-Food"], 
        isOpen: true, 
        imageUrl: "src/asset/images/kenny.png" 
    },
    { id: 3, 
        name: "D' Grill House", 
        rating: 4.2, 
        reviews: 321, 
        cuisine: "Filipino", 
        address: "J.P. Cale Road, Baliwag, 3006 Bulacan", 
        price: "PPP", 
        tags: ["Spicy", "Family", "Comfort-Food"], 
        isOpen: true, 
        imageUrl: "src/asset/images/gdrills.png" 
    },
    { id: 4, 
        name: "Millhouse", 
        rating: 4.6, 
        reviews: 367, 
        cuisine: "Filipino", 
        address: "224 A. Mabini St, Baliwag, Bulacan...", 
        price: "PPP", 
        tags: ["Family", "Comfort-Food"], 
        isOpen: true, 
        imageUrl: "src/asset/images/mill.png" 
    },
    { id: 5, 
        name: "Mang Inasal - SM", 
        rating: 4.6, 
        reviews: 445, 
        cuisine: "Filipino", 
        address: "DRT Hi-way, corner Santiago S. Aquino...", 
        price: "PPP", 
        tags: ["Spicy", "Family", "Comfort-Food"], 
        isOpen: true, 
        imageUrl: "src/asset/images/inasal.png" 
    },
    { id: 6, 
        name: "EC Cafe", 
        rating: 4.6, 
        reviews: 154, 
        cuisine: "Filipino", 
        address: "828 F. Vergel de Dios St, Bali...", 
        price: "PPP", 
        tags: ["Family", "Comfort-Food"], 
        isOpen: true, 
        imageUrl: "src/asset/images/cafe.png" 
    },
];

// DOM elements
const favoritesGrid = document.getElementById('favorites-grid');
const emptyState = document.getElementById('empty-state');
const favCountBadge = document.getElementById('fav-count');

/**
 * Update the favorites count badge
 */
function updateFavoritesCount() {
    if (favCountBadge) {
        favCountBadge.textContent = favorites.length;
        if (favorites.length > 0) {
            favCountBadge.classList.remove('hidden');
        } else {
            favCountBadge.classList.add('hidden');
        }
    }
}

/**
 * Check if a restaurant is favorited
 */
function isFavorite(restaurantId) {
    return favorites.includes(restaurantId);
}

/**
 * Toggle favorite status
 */
function toggleFavorite(restaurantId, event) {
    event.stopPropagation();
    event.preventDefault();
    
    const index = favorites.indexOf(restaurantId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(restaurantId);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesCount();
    renderFavorites();
}

/**
 * Create restaurant card HTML
 */
function createRestaurantCard(restaurant) {
    const starIcon = `<svg class="w-4 h-4 text-loyalty-gold fill-current flex-shrink-0" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;

    const heartIcon = `<svg class="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;

    const statusBadge = restaurant.isOpen 
        ? `<span class="status-badge open flex items-center gap-2 ">
                <img src="src/asset/images/clock.png" alt="Open" class="clock-icon w-3 h-3 color-white ">
                Open
           </span>` 
        : `<span class="status-badge closed">
                <img src="src/asset/images/clock.png" alt="Open" class="clock-icon w-3 h-3">
                Closed
           </span>`;

    const tagElements = restaurant.tags.slice(0, 3).map(tag => 
        `<span class="bg-tag-bg text-gray-700 text-xs px-2 py-1 rounded-full whitespace-nowrap transition duration-200 hover:bg-gray-200">${tag}</span>`
    ).join('');

    return `
        <div class="bg-card-bg rounded-xl overflow-hidden figma-shadow transition duration-300 cursor-pointer border border-gray-100 restaurant-card" data-id="${restaurant.id}">
            <div class="relative h-40 w-full">
                <img src="${restaurant.imageUrl}" alt="${restaurant.name}" onerror="this.onerror=null;this.src='https://placehold.co/400x250/F8D8D8/333?text=Restaurant+Image';" class="w-full h-full object-cover">
                <div class="absolute top-2 left-2 p-1 bg-black bg-opacity-60 rounded-full text-white text-xs font-medium">
                    ${statusBadge}
                </div>
                <button class="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform favorite-btn" data-id="${restaurant.id}">
                    ${heartIcon}
                </button>
            </div>
            <div class="p-4 flex flex-col justify-between h-auto">
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <h3 class="text-lg font-bold text-gray-800 truncate">${restaurant.name}</h3>
                        <div class="flex items-center text-sm font-medium ml-2 flex-shrink-0">
                            ${starIcon}
                            <span class="ml-1 text-gray-700">${restaurant.rating.toFixed(1)}</span>
                            <span class="text-xs text-gray-500 ml-1">(${restaurant.reviews})</span>
                        </div>
                    </div>
                    
                    <p class="text-sm text-gray-500 mb-1">${restaurant.address.substring(0, 30)}...</p>
                    <p class="text-xs text-foodie-brand font-semibold mb-3">${restaurant.cuisine}</p>
                </div>

                <div class="flex justify-between items-end border-t pt-3">
                    <span class="text-lg font-extrabold text-gray-700">${restaurant.price}</span>
                    <div class="flex flex-wrap gap-2 justify-end">
                        ${tagElements}
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Render favorite restaurants
 */
function renderFavorites() {
    const favoriteRestaurants = MOCK_RESTAURANTS.filter(r => favorites.includes(r.id));

    if (favoriteRestaurants.length === 0) {
        emptyState.classList.remove('hidden');
        favoritesGrid.innerHTML = '';
    } else {
        emptyState.classList.add('hidden');
        favoritesGrid.innerHTML = favoriteRestaurants.map(createRestaurantCard).join('');

        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const restaurantId = parseInt(this.getAttribute('data-id'));
                toggleFavorite(restaurantId, e);
            });
        });

        document.querySelectorAll('.restaurant-card').forEach(card => {
            card.addEventListener('click', function() {
                const restaurantId = this.getAttribute('data-id');
                window.location.href = `restaurant-detail.html?id=${restaurantId}`;
            });
        });
    }
}

/**
 * Initialize favorites page
 */
function initializeFavorites() {
    updateFavoritesCount();
    renderFavorites();
}

window.onload = initializeFavorites;
