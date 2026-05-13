// 性能优化代码（数据缓存、防抖、节流由 data.js 提供，避免全局重复声明）

// ================= 图片懒加载 =================
function initLazyLoading() {
    // 使用 Intersection Observer API
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px' // 提前50px开始加载
        });
        
        // 观察所有带 data-src 的图片
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // 降级方案：直接加载所有图片
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// ================= 滚动动画（Intersection Observer） =================
function initScrollAnimations() {
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // 动画完成后可以停止观察
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // 10%可见时触发
            rootMargin: '0px 0px -50px 0px'
        });
        
        // 观察所有需要动画的元素
        document.querySelectorAll('.fade-in-up').forEach(el => {
            animationObserver.observe(el);
        });
    }
}

// ================= 初始化所有性能优化 =================
function initPerformanceOptimizations() {
    // 图片懒加载
    initLazyLoading();
    
    // 滚动动画
    initScrollAnimations();
    
    // 预加载关键资源
    preloadCriticalResources();
}

// ================= 预加载关键资源 =================
function preloadCriticalResources() {
    // 预加载字体（如果有）
    // 预加载关键图片
    const criticalImages = [
        // 可以添加关键图片路径
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}
