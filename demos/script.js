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
            item.setAttribute('data-is-open', !isOpen);

            // 獲取該資料夾下的巢狀列表
            const subList = item.querySelector('ul');
            if (subList) {
                // 根據新的狀態顯示或隱藏巢狀列表
                subList.style.display = isOpen ? 'none' : 'block';
            }
        });
    });
});