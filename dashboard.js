document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('username');
    const userGreeting = document.getElementById('userGreeting');
    const logoutBtn = document.getElementById('logoutBtn');

    if (!username) {
        window.location.href = 'index.html';
        return;
    }

    if (userGreeting) {
        userGreeting.textContent = `مرحبا، ${username}`;
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('user');
            localStorage.removeItem('username');
            window.location.href = 'index.html';
        });
    }

    const tabBtns = document.querySelectorAll('.tab-btn[data-tab]');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = btn.dataset.tab;

            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            btn.classList.add('active');
            const targetPanel = document.getElementById(target);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    const newsContainer = document.querySelector('.news-container');
    if (!newsContainer) {
        return;
    }

    const medicalNews = [
        {
            title: 'اختراق في علاج السرطان',
            content: 'طور العلماء علاجًا جديدًا يستهدف خلايا السرطان بشكل أكثر فعالية، مما يحسن نتائج المرضى.',
            image: 'https://cdn.pixabay.com/photo/2016/03/26/22/13/medical-1281248_1280.jpg',
            category: 'أورام'
        },
        {
            title: 'لقاح جديد معتمد',
            content: 'تم اعتماد لقاح جديد لمرض شائع من قبل السلطات الصحية، مما يوفر حماية أفضل.',
            image: 'https://cdn.pixabay.com/photo/2017/01/10/21/47/vial-1972637_1280.jpg',
            category: 'لقاحات'
        },
        {
            title: 'تقدم في صحة القلب',
            content: 'تظهر الأبحاث أن التغييرات الجديدة في نمط الحياة يمكن أن تقلل بشكل كبير من خطر أمراض القلب.',
            image: 'https://cdn.pixabay.com/photo/2016/11/18/16/05/heart-1839109_1280.jpg',
            category: 'قلب'
        },
        {
            title: 'التوعية بصحة النفس',
            content: 'يزداد التركيز على الصحة النفسية مما يؤدي إلى أنظمة دعم أفضل للمرضى.',
            image: 'https://cdn.pixabay.com/photo/2016/11/29/10/07/brain-1868555_1280.jpg',
            category: 'نفسي'
        },
        {
            title: 'تقدم في علاج السكري',
            content: 'أدوية جديدة لمرض السكري توفر تحكم أفضل في مستويات السكر بالدم.',
            image: 'https://cdn.pixabay.com/photo/2017/05/10/17/11/medical-2306000_1280.jpg',
            category: 'سكري'
        },
        {
            title: 'تقنيات الذكاء الاصطناعي في الطب',
            content: 'يستخدم الذكاء الاصطناعي لتشخيص الأمراض بدقة أعلى وسرعة أكبر.',
            image: 'https://cdn.pixabay.com/photo/2020/06/15/17/56/artificial-intelligence-5309801_1280.jpg',
            category: 'تكنولوجيا'
        },
        {
            title: 'أهمية التغذية السليمة',
            content: 'دراسات جديدة تؤكد أهمية التغذية المتوازنة في الوقاية من الأمراض.',
            image: 'https://cdn.pixabay.com/photo/2017/04/14/19/16/salad-2232254_1280.jpg',
            category: 'تغذية'
        },
        {
            title: 'مكافحة الأمراض المعدية',
            content: 'استراتيجيات جديدة لمكافحة الأمراض المعدية تحمي المجتمعات.',
            image: 'https://cdn.pixabay.com/photo/2018/02/24/06/36/fight-3177250_1280.jpg',
            category: 'معدية'
        },
        {
            title: 'تقدم في جراحة العظام',
            content: 'تقنيات جراحية جديدة تقلل من وقت التعافي وتحسن النتائج.',
            image: 'https://cdn.pixabay.com/photo/2018/03/06/22/57/doctor-3209746_1280.jpg',
            category: 'عظام'
        },
        {
            title: 'أدوية جديدة للضغط',
            content: 'أدوية مبتكرة لعلاج ارتفاع ضغط الدم بآثار جانبية أقل.',
            image: 'https://cdn.pixabay.com/photo/2018/02/15/10/29/blood-pressure-3158704_1280.jpg',
            category: 'ضغط'
        }
    ];

    function getSavedNews() {
        return JSON.parse(localStorage.getItem('userNews') || '[]');
    }

    function saveNewsItem(item) {
        const saved = getSavedNews();
        saved.unshift(item);
        localStorage.setItem('userNews', JSON.stringify(saved));
    }

    function loadDynamicNews() {
        const savedNews = getSavedNews();
        const combinedNews = [...savedNews, ...medicalNews];
        const availableNews = [...combinedNews];
        const selectedNews = [];

        while (selectedNews.length < 6 && availableNews.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableNews.length);
            selectedNews.push(availableNews.splice(randomIndex, 1)[0]);
        }

        newsContainer.innerHTML = '';

        selectedNews.forEach(news => {
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(news.title)}&tbm=isch`;
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <div class="news-icon">📰</div>
                <h3>${news.title}</h3>
                <p>${news.content} <span style="color: #2ec4b6; font-size: 12px;">(${news.category || 'عام'})</span></p>
                <div class="news-actions">
                    <a href="${searchUrl}" target="_blank" rel="noopener" class="action-btn image-search-btn">🔍 صورة الخبر</a>
                    <button class="action-btn like-btn">👍 إعجاب</button>
                    <button class="action-btn repost-btn">🔄 إعادة نشر</button>
                    <button class="action-btn save-btn">💾 حفظ</button>
                </div>
            `;
            newsContainer.appendChild(newsItem);
        });
    }

    function renderNewsPublisher() {
        const publisher = document.createElement('div');
        publisher.className = 'news-publisher';
        publisher.innerHTML = `
            <h3>انشر خبرًا طبيًا</h3>
            <div class="news-form-grid">
                <input id="newsTitle" type="text" placeholder="عنوان الخبر">
                <textarea id="newsContent" placeholder="أكتب الخبر هنا..." rows="4"></textarea>
                <input id="newsImageInput" type="file" accept="image/*">
                <label class="checkbox-label"><input id="newsVerified" type="checkbox"> لقد تحققت من صحة المعلومة قبل النشر</label>
                <button id="submitNewsBtn" class="publish-btn">نشر الخبر</button>
                <p id="newsFormMessage" class="news-form-message"></p>
            </div>
        `;

        newsContainer.parentElement.insertBefore(publisher, newsContainer);

        const submitBtn = publisher.querySelector('#submitNewsBtn');
        const titleInput = publisher.querySelector('#newsTitle');
        const contentInput = publisher.querySelector('#newsContent');
        const imageInput = publisher.querySelector('#newsImageInput');
        const verifiedInput = publisher.querySelector('#newsVerified');
        const messageEl = publisher.querySelector('#newsFormMessage');

        submitBtn.addEventListener('click', function() {
            const title = titleInput.value.trim();
            const content = contentInput.value.trim();
            const verified = verifiedInput.checked;
            const file = imageInput.files[0];

            if (!title || !content) {
                messageEl.textContent = 'يرجى كتابة عنوان ومحتوى الخبر.';
                messageEl.style.color = '#d9534f';
                return;
            }
            if (!verified) {
                messageEl.textContent = 'يجب أن تؤكد صحة المعلومة قبل النشر.';
                messageEl.style.color = '#d9534f';
                return;
            }

            function finishSubmission(imageSrc) {
                saveNewsItem({
                    title,
                    content,
                    category: 'من المستخدم',
                    image: imageSrc || 'https://via.placeholder.com/300x150?text=خبر+الزائر'
                });
                titleInput.value = '';
                contentInput.value = '';
                imageInput.value = '';
                verifiedInput.checked = false;
                messageEl.textContent = '✅ تم نشر الخبر بنجاح. سيتم عرضه بعد التحديث.';
                messageEl.style.color = '#28a745';
                loadDynamicNews();
            }

            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    finishSubmission(e.target.result);
                };
                reader.readAsDataURL(file);
            } else {
                finishSubmission('https://via.placeholder.com/300x150?text=خبر+الزائر');
            }
        });
    }

    function autoRefreshNews() {
        loadDynamicNews();
        setInterval(loadDynamicNews, 20000);
    }

    function addNewsListeners() {
        newsContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('like-btn')) {
                alert('تم الإعجاب بالخبر!');
            } else if (e.target.classList.contains('repost-btn')) {
                alert('تم إعادة نشر الخبر!');
            } else if (e.target.classList.contains('save-btn')) {
                alert('تم حفظ الخبر!');
            }
        });
    }

    function addNewsRefreshButton() {
        const refreshBtn = document.createElement('button');
        refreshBtn.className = 'news-refresh-btn';
        refreshBtn.textContent = '🔄 تحديث الأخبار';
        refreshBtn.addEventListener('click', loadDynamicNews);

        const newsSection = newsContainer.parentElement;
        if (newsSection) {
            newsSection.style.position = 'relative';
            newsSection.insertBefore(refreshBtn, newsContainer);
        }
    }

    loadDynamicNews();
    renderNewsPublisher();
    addNewsRefreshButton();
    autoRefreshNews();
    addNewsListeners();
});
