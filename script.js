document.addEventListener('DOMContentLoaded', () => {
    // 1. セクションのフェードイン効果 (既存のコードを微調整)
    const sections = document.querySelectorAll('section.fade-in');
    const observerOptions = {
        threshold: 0.1 // ビューポートの10%が見えたら発動
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 2. ヒーローセクションのタイプライターアニメーション
    const typewriterElement = document.querySelector('.typewriter');
    const textToType = typewriterElement.dataset.text;
    typewriterElement.textContent = ''; // 初期テキストをクリア

    // CSSアニメーションが完了した後にJSでtextContentをセット
    typewriterElement.addEventListener('animationend', () => {
        typewriterElement.textContent = textToType;
    });

    // 3. ヘッダーの背景変化
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // 50pxスクロールしたら
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. ギャラリーの画像ポップアップ (モーダル)
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('img01');
    const captionText = document.getElementById('caption');
    const closeButton = document.querySelector('.close-button');
    const galleryImages = document.querySelectorAll('#gallery img');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = img.src;
            captionText.innerHTML = img.dataset.caption || img.alt; // data-captionがなければaltテキストを使用
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) { // モーダル背景をクリックした場合
            modal.style.display = 'none';
        }
    });

    // キーボードのEscキーで閉じる
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });

    // 5. スクロールインジケーター
    const scrollIndicator = document.getElementById('scroll-indicator');
    window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPos = window.scrollY;
        const scrollPercentage = (scrollPos / docHeight) * 100;
        scrollIndicator.style.width = scrollPercentage + '%';
    });

    // 6. 「トップへ戻る」ボタン
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // 300pxスクロールしたら表示
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});