/**
 * 007INFox News Website - Main Script
 * Handles routing, news rendering, category filtering, and mobile menu
 */

(function () {
    'use strict';

    // --- DOM References ---
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    // --- Utility: Get category from URL hash ---
    function getCategoryFromHash() {
        const hash = window.location.hash.replace('#', '').toLowerCase();
        const validCategories = ['home', 'trump', 'politics', 'military', 'diplomacy', 'society', 'economy', 'technology', 'about'];
        return validCategories.includes(hash) ? hash : 'home';
    }

    // --- Utility: Format date ---
    function formatDate(dateStr) {
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    // --- Utility: Category display name ---
    function categoryName(cat) {
        const names = {
            trump: 'Trump',
            politics: 'Politics',
            military: 'Military',
            diplomacy: 'Diplomacy',
            society: 'Society',
            economy: 'Economy',
            technology: 'Technology'
        };
        return names[cat] || cat;
    }

    // --- Render: Home page with featured + grid ---
    function renderHome(category) {
        let articles;
        if (category && category !== 'home') {
            articles = window.newsData.filter(a => a.category === category);
        } else {
            articles = [...window.newsData];
        }

        // Sort by date descending
        articles.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (articles.length === 0) {
            mainContent.innerHTML = `
                <div class="no-news">
                    <h2>No articles found in this category.</h2>
                    <a href="#home" class="back-link">← Back to Home</a>
                </div>`;
            return;
        }

        const featured = articles[0];
        const rest = articles.slice(1);

        let html = '';

        // Section title
        if (category && category !== 'home') {
            html += `<h2 class="section-title">${categoryName(category)}</h2>`;
        } else {
            html += `<h2 class="section-title">Latest News</h2>`;
        }

        // Featured hero article
        html += `
            <article class="hero-article" data-id="${featured.id}">
                <div class="hero-image">
                    <img src="${featured.image}" alt="${escapeHtml(featured.title)}" loading="lazy">
                </div>
                <div class="hero-body">
                    <div class="hero-category">${categoryName(featured.category)}</div>
                    <h1 class="hero-title">${escapeHtml(featured.title)}</h1>
                    <p class="hero-summary">${escapeHtml(featured.summary)}</p>
                    <div class="card-date">${formatDate(featured.date)}</div>
                </div>
            </article>
        `;

        // News grid
        if (rest.length > 0) {
            html += `<div class="news-grid">`;
            rest.forEach(article => {
                html += `
                    <article class="news-card" data-id="${article.id}">
                        <div class="card-image">
                            <img src="${article.image}" alt="${escapeHtml(article.title)}" loading="lazy">
                        </div>
                        <div class="card-body">
                            <div class="card-category">${categoryName(article.category)}</div>
                            <h3 class="card-title">${escapeHtml(article.title)}</h3>
                            <p class="card-summary">${escapeHtml(article.summary)}</p>
                            <div class="card-date">${formatDate(article.date)}</div>
                        </div>
                    </article>
                `;
            });
            html += `</div>`;
        }

        mainContent.innerHTML = html;

        // Attach click handlers
        attachArticleClickHandlers();
    }

    // --- Render: Single article detail ---
    function renderArticle(articleId) {
        const article = window.newsData.find(a => a.id === parseInt(articleId));
        if (!article) {
            renderHome();
            return;
        }

        const paragraphs = article.content.split('\n\n').map(p => `<p>${escapeHtml(p)}</p>`).join('');

        const html = `
            <div class="article-detail">
                <a href="#home" class="back-link">← Back to News</a>
                <div class="article-hero">
                    <img src="${article.image}" alt="${escapeHtml(article.title)}">
                </div>
                <div class="article-body">
                    <div class="article-category">${categoryName(article.category)}</div>
                    <h1 class="article-title">${escapeHtml(article.title)}</h1>
                    <div class="article-date">${formatDate(article.date)}</div>
                    <div class="article-content">
                        ${paragraphs}
                    </div>
                </div>
            </div>
        `;

        mainContent.innerHTML = html;
        window.scrollTo(0, 0);
    }

    // --- Render: About page ---
    function renderAbout() {
        const html = `
            <div class="about-page">
                <h1>About 007INFox</h1>
                <p>007INFox is an American news network dedicated to delivering bold, unfiltered journalism across politics, military affairs, the economy, technology, and society.</p>
                <p>Founded on the principle that the American people deserve transparent, fearless reporting, 007INFox operates independently of corporate and political influence. Our team of veteran journalists and analysts works around the clock to bring you the stories that matter.</p>
                <p>From the corridors of power in Washington to the frontlines of global conflict, 007INFox is your window into the forces shaping America and the world.</p>
                <p><strong>Contact:</strong> tips@007infox.news</p>
            </div>
        `;
        mainContent.innerHTML = html;
    }

    // --- Router ---
    function router() {
        const hash = window.location.hash;

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash || (hash === '' && link.dataset.category === 'home')) {
                link.classList.add('active');
            }
        });

        // Close mobile menu on navigation
        nav.classList.remove('open');

        // Route
        if (hash.startsWith('#article-')) {
            const id = hash.replace('#article-', '');
            renderArticle(id);
        } else if (hash === '#about') {
            renderAbout();
        } else {
            const category = getCategoryFromHash();
            renderHome(category === 'home' ? null : category);
        }
    }

    // --- Click handlers for articles ---
    function attachArticleClickHandlers() {
        const clickable = mainContent.querySelectorAll('.news-card, .hero-article');
        clickable.forEach(el => {
            el.addEventListener('click', () => {
                const id = el.dataset.id;
                window.location.hash = `article-${id}`;
            });
        });
    }

    // --- Utility: Escape HTML ---
    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // --- Mobile menu toggle ---
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
    }

    // --- Nav link click: close mobile menu ---
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
        });
    });

    // --- Hash change listener ---
    window.addEventListener('hashchange', router);

    // --- Initial render ---
    router();

})();
