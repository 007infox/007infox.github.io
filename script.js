(function() {
    const app = document.getElementById('app');
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });

    // Helper: sort by date descending
    function getSortedNews() {
        return [...window.newsData].sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Category display names
    const categoryNames = {
        trump: 'Trump',
        politics: 'Politics',
        military: 'Military',
        diplomacy: 'Diplomacy',
        society: 'Society',
        economy: 'Economy',
        technology: 'Technology'
    };

    // Render news list
    function renderNewsList(category = null) {
        const news = getSortedNews();
        const filtered = category ? news.filter(item => item.category === category) : news;
        const title = category ? categoryNames[category] || 'News' : 'Latest News';

        let html = `<div class="news-list"><h2>${title}</h2><div class="news-grid">`;
        if (filtered.length === 0) {
            html += `<p>No news articles found in this category.</p>`;
        } else {
            filtered.forEach(item => {
                const imgSrc = item.image || 'https://picsum.photos/400/200?random=' + item.id;
                html += `
                <div class="news-card" data-id="${item.id}">
                    <img class="card-img" src="${imgSrc}" alt="${item.title}" loading="lazy">
                    <div class="card-body">
                        <span class="card-category">${categoryNames[item.category] || item.category}</span>
                        <h3 class="card-title">${item.title}</h3>
                        <div class="card-date">${item.date}</div>
                        <p class="card-summary">${item.summary}</p>
                    </div>
                </div>`;
            });
        }
        html += `</div></div>`;
        app.innerHTML = html;

        // Add click event listeners to cards
        document.querySelectorAll('.news-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                window.location.hash = `#article/${id}`;
            });
        });
    }

    // Render article detail
    function renderArticle(id) {
        const news = getSortedNews();
        const article = news.find(item => item.id == id);
        if (!article) {
            app.innerHTML = `<div class="article-detail"><p>Article not found. <a href="#home">Go back home</a></p></div>`;
            return;
        }

        const imgSrc = article.image || 'https://picsum.photos/800/300?random=' + article.id;
        app.innerHTML = `
        <div class="article-detail">
            <button class="back-btn" onclick="window.location.hash='#home'">← Back to Home</button>
            <span class="category-badge">${categoryNames[article.category] || article.category}</span>
            <h1>${article.title}</h1>
            <div class="date">${article.date}</div>
            <img src="${imgSrc}" alt="${article.title}" style="width:100%; max-height:400px; object-fit:cover; border-radius:8px; margin-bottom:1.5rem;">
            <div class="article-content">${article.content}</div>
        </div>`;
    }

    // Route based on hash
    function handleRoute() {
        const hash = window.location.hash.slice(1); // remove '#'
        mainNav.classList.remove('open'); // close mobile menu on navigation

        if (!hash || hash === 'home') {
            renderNewsList();
        } else if (hash.startsWith('category/')) {
            const category = hash.replace('category/', '');
            renderNewsList(category);
        } else if (hash.startsWith('article/')) {
            const articleId = hash.replace('article/', '');
            renderArticle(articleId);
        } else {
            renderNewsList();
        }
    }

    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('load', handleRoute);

    // Highlight active nav link (optional)
    function updateActiveLink() {
        const hash = window.location.hash;
        document.querySelectorAll('#main-nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('hashchange', updateActiveLink);
    window.addEventListener('load', updateActiveLink);
})();