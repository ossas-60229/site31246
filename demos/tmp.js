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
    // Initialize the tabs
    initializeTabs(tabsContainer);
});