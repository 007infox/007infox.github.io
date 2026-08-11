(function() {
    const app = document.getElementById('app');
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');

    // 移动端菜单
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });

    function getSortedNews() {
        return [...window.newsData].sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    const categoryNames = {
        trump: 'Trump',
        politics: 'Politics',
        military: 'Military',
        diplomacy: 'Diplomacy',
        society: 'Society',
        economy: 'Economy',
        technology: 'Technology'
    };

    function renderNewsList(category) {
        var news = getSortedNews();
        if (category) {
            news = news.filter(function(item) {
                return item.category === category;
            });
        }
        var title = category ? (categoryNames[category] || 'News') : 'Latest News';
        var html = '<div class="news-list"><h2>' + title + '</h2><div class="news-grid">';
        if (news.length === 0) {
            html += '<p>No news articles found in this category.</p>';
        } else {
            news.forEach(function(item) {
                var imgSrc = item.image || ('https://picsum.photos/400/200?random=' + item.id);
                html += '<div class="news-card" data-id="' + item.id + '">' +
                    '<img class="card-img" src="' + imgSrc + '" alt="' + item.title + '" loading="lazy">' +
                    '<div class="card-body">' +
                    '<span class="card-category">' + (categoryNames[item.category] || item.category) + '</span>' +
                    '<h3 class="card-title">' + item.title + '</h3>' +
                    '<div class="card-date">' + item.date + '</div>' +
                    '<p class="card-summary">' + item.summary + '</p>' +
                    '</div></div>';
            });
        }
        html += '</div></div>';
        app.innerHTML = html;

        document.querySelectorAll('.news-card').forEach(function(card) {
            card.addEventListener('click', function() {
                window.location.hash = '#article/' + this.dataset.id;
            });
        });
    }

    function renderArticle(id) {
        var news = getSortedNews();
        var article = news.find(function(item) { return item.id == id; });
        if (!article) {
            app.innerHTML = '<div class="article-detail"><p>Article not found. <a href="#home">Go back home</a></p></div>';
            return;
        }
        var imgSrc = article.image || ('https://picsum.photos/800/300?random=' + article.id);
        app.innerHTML = '<div class="article-detail">' +
            '<button class="back-btn" onclick="window.location.hash=\'#home\'">← Back to Home</button>' +
            '<span class="category-badge">' + (categoryNames[article.category] || article.category) + '</span>' +
            '<h1>' + article.title + '</h1>' +
            '<div class="date">' + article.date + '</div>' +
            '<img src="' + imgSrc + '" alt="' + article.title + '" style="width:100%;max-height:400px;object-fit:cover;border-radius:8px;margin-bottom:1.5rem;">' +
            '<div class="article-content">' + article.content + '</div>' +
            '</div>';
    }

    function renderAbout() {
        var html = '<div class="article-detail">' +
            '<h1>About 007INFox</h1>' +
            '<div class="article-content">' +
            '<p><strong>007INFox</strong> is a U.S.-based digital news platform dedicated to delivering timely, accurate, and in-depth coverage of American politics, policy, and global affairs.</p>' +
            '<p>Founded in <strong>August 2021</strong> in <strong>Austin, Texas</strong>, 007INFox was launched by a small team of journalists and technologists who believed that independent, non-partisan reporting could thrive in a fast-changing media landscape. The company is operated by <strong>Infox Media Group LLC</strong>, a privately held Texas corporation.</p>' +
            '<p>From breaking political developments and military updates to social trends and technology breakthroughs, our mission is to provide readers with clear, contextualized news without sensationalism. We cover the White House, Capitol Hill, the Pentagon, and Main Street with equal rigor.</p>' +
            '<p>Our editorial team adheres to strict standards of verification and fairness. 007INFox does not accept government funding or partisan sponsorship; we are supported entirely by our readers and select advertising partners who share our commitment to press freedom.</p>' +
            '<p>Thank you for making us a part of your daily news habit.</p>' +
            '</div></div>';
        app.innerHTML = html;
    }

    function handleRoute() {
        var hash = window.location.hash.slice(1);
        mainNav.classList.remove('open');

        if (!hash || hash === 'home') {
            renderNewsList();
        } else if (hash.startsWith('category/')) {
            var category = hash.replace('category/', '');
            renderNewsList(category);
        } else if (hash.startsWith('article/')) {
            var articleId = hash.replace('article/', '');
            renderArticle(articleId);
        } else if (hash === 'about') {
            renderAbout();
        } else {
            renderNewsList();
        }
    }

    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('load', handleRoute);

    function updateActiveLink() {
        var hash = window.location.hash;
        document.querySelectorAll('#main-nav a').forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('hashchange', updateActiveLink);
    window.addEventListener('load', updateActiveLink);
})();