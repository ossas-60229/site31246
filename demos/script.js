document.addEventListener('DOMContentLoaded', () => {
    // 選擇整個樹狀結構容器
    const fileTreeContainer = document.querySelector('.file-tree-container');

    // 為容器添加單一的點擊事件監聽器
    fileTreeContainer.addEventListener('click', (event) => {
        // 找到被點擊的元素，並向上尋找最近的 .file-tree-item
        const clickedItem = event.target.closest('.file-tree-item');

        // 確保我們點擊的是一個資料夾
        if (clickedItem && clickedItem.getAttribute('data-is-folder') === 'true') {
            // 阻止事件冒泡，避免點擊子元素也觸發父元素
            event.stopPropagation();

            // 取得目前的開啟狀態
            const isOpen = clickedItem.getAttribute('data-is-open') === 'true';

            // 切換開啟狀態，這會觸發 CSS 樣式
            clickedItem.setAttribute('data-is-open', !isOpen);
        }
    });
});