document.addEventListener('DOMContentLoaded', () => {
    // 選擇所有標記為資料夾的列表項目
    const folderItems = document.querySelectorAll('.file-tree-item[data-is-folder="true"]');

    // 遍歷每個資料夾項目
    folderItems.forEach(item => {
        // 為每個資料夾項目添加點擊事件監聽器
        item.addEventListener('click', (event) => {
            // 阻止事件冒泡，避免點擊子元素時也觸發父元素的點擊事件
            event.stopPropagation();

            // 取得目前的開啟狀態
            const isOpen = item.getAttribute('data-is-open') === 'true';

            // 切換開啟狀態
            // 這是唯一需要做的改變，因為 CSS 會根據這個屬性自動處理顯示與隱藏
            item.setAttribute('data-is-open', !isOpen);
        });
    });
});