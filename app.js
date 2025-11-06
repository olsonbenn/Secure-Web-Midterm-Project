    document.addEventListener('DOMContentLoaded', () => {
    const emojiGrid = document.getElementById('emoji-grid');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const searchInput = document.getElementById('search-input');
    const loader = document.getElementById('loader');

    let allEmojis = [];
    let url = "https://olsonbenn.github.io/Secure-Web-Dev-Team06/data.json";
    // Fetch emoji data from JSON file
    const fetchEmojis = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allEmojis = await response.json();
            // Simulate loading time
            setTimeout(() => {
                loader.classList.add('d-none');
                emojiGrid.classList.remove('d-none');
                populateCategories();
                renderEmojis(allEmojis);
            }, 1500); // 1.5 second delay
        } catch (error) {
            console.error("Could not fetch emojis:", error);
            loader.innerText = "Failed to load emojis.";
        }
    };

    // Render emojis in the grid
    const renderEmojis = (emojis) => {
        emojiGrid.innerHTML = '';
        if (emojis.length === 0) {
            emojiGrid.innerHTML = '<p class="col-12 text-center">No emojis found.</p>';
            return;
        }

        emojis.forEach(emoji => {
            const card = `
                <div class="col">
                    <div class="card h-100 text-center emoji-card">
                        <div class="card-img-top">${emoji.unicode}</div>
                        <div class="card-body">
                            <h5 class="card-title">${emoji.name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${emoji.category}</h6>
                            <p class="card-text">${emoji.description}</p>
                        </div>
                    </div>
                </div>
            `;
            emojiGrid.insertAdjacentHTML('beforeend', card);
        });
    };

    // Populate category dropdown with unique categories
    const populateCategories = () => {
        const categories = [...new Set(allEmojis.map(emoji => emoji.category))];
        categories.sort();
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    };

    // Filter and sort emojis based on user input
    const applyFiltersAndSort = () => {
        let filteredEmojis = [...allEmojis];

        // Search filter
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filteredEmojis = filteredEmojis.filter(emoji => 
                emoji.name.toLowerCase().includes(searchTerm)
            );
        }

        // Category filter
        const selectedCategory = categoryFilter.value;
        if (selectedCategory) {
            filteredEmojis = filteredEmojis.filter(emoji => emoji.category === selectedCategory);
        }

        // Sort
        const sortValue = sortFilter.value;
        if (sortValue === 'a-z') {
            filteredEmojis.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortValue === 'z-a') {
            filteredEmojis.sort((a, b) => b.name.localeCompare(a.name));
        }

        renderEmojis(filteredEmojis);
    };

    // Event Listeners
    searchInput.addEventListener('input', applyFiltersAndSort);
    categoryFilter.addEventListener('change', applyFiltersAndSort);
    sortFilter.addEventListener('change', applyFiltersAndSort);

    // Initial fetch
    fetchEmojis();
});