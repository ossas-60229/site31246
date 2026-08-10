document.addEventListener("DOMContentLoaded", () => {
    // Select the tab container
    const tabsContainer = document.querySelector(".tabs");
    function initializeTabs(tabsContainer) {
        // Select tab headers and content
        const tabList = tabsContainer.querySelector(".tab__list");
        const tabItems = Array.from(tabList.children);
        const tabContent = tabsContainer.querySelector(".tab__content");
        const tabContentItems = Array.from(tabContent.children);
        let activeIndex = 0;
        // Set the active tab
        function setActiveTab(index) {
            tabItems.forEach(item => item.classList.remove("is--active"));
            tabContentItems.forEach(content => content.classList.remove("is--active"));
            tabItems[index].classList.add("is--active");
            tabContentItems[index].classList.add("is--active");
        }
        // Add click event listeners to tab headers
        tabItems.forEach((item, index) => {
            item.addEventListener("click", () => {
                activeIndex = index;
                setActiveTab(index);
            });
        });
        // Add click event listeners to prev and next buttons
        const prevButton = tabsContainer.querySelector(".prev");
        const nextButton = tabsContainer.querySelector(".next");
        prevButton.addEventListener("click", () => {
            activeIndex = (activeIndex - 1 + tabItems.length) % tabItems.length;
            setActiveTab(activeIndex);
        });
        nextButton.addEventListener("click", () => {
            activeIndex = (activeIndex + 1) % tabItems.length;
            setActiveTab(activeIndex);
        });
        // Set the initial active tab
        setActiveTab(activeIndex);
    }
    // Initialize the tabs if the element exists
    if (tabsContainer) {
        initializeTabs(tabsContainer);
    }
});

let scrollTimeout;
document.addEventListener('scroll', function () {
    document.body.classList.remove('hide-scrollbar');
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
        document.body.classList.add('hide-scrollbar');
    }, 1000);
});

let ticking = false;
window.addEventListener('scroll', function () {
    if (!ticking) {
        window.requestAnimationFrame(function () {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.scrollY > 300) {
                    navbar.classList.add('visible');
                } else {
                    navbar.classList.remove('visible');
                }
            }
            ticking = false;
        });
        ticking = true;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const cardTexts = document.querySelectorAll(".card-text.overview");
    const maxLength = 90; // Set maximum character count

    cardTexts.forEach(function (cardText) {
        const originalText = cardText.innerText;
        if (originalText.length > maxLength) {
            const truncatedText = originalText.substring(0, maxLength) + "……";
            cardText.innerText = truncatedText;
        }
    });
});
