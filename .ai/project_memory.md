# 專案記憶 (Project Memory) - site31246

本文件記錄了 `site31246` 專案的目錄結構、核心功能、技術實現細節以及開發設計約定，旨在供 AI 助理或開發者快速理解該專案的上下文。

---

## 1. 專案概述 (Project Overview)
`site31246` 是一個前端網頁原型（Web Frontend Prototype）專案，主要由 HTML5、CSS3 及原生 JavaScript（Vanilla JS）構成。
專案的核心目的在於展示並實驗多種前端佈局和介面交互，包括：
* **互動式樹狀檔案結構樹 (Interactive File Tree)**
* **自訂垂直時間軸 / 目錄時間軸 (Vertical Timeline Layout)**
* **PDF 匯出工具 (jsPDF Image to PDF Utility)**
* **部落格風格儀表板與卡片外觀展示 ("邊緣人的垃圾桶" 概念頁面)**

---

## 2. 目錄與檔案結構 (Directory Structure)

```text
site31246/
├── .git/                        # Git 版本控制目錄
├── .ai/                         # AI 專案記憶與上下文快取
│   └── project_memory.md        # 本專案記憶說明檔 (本檔案)
├── README.md                    # 專案基本說明 (僅含 # site31246)
└── demos/                       # 核心 Demo 展示資源目錄
    ├── index.html               # 樹狀檔案瀏覽器的展示入口 (基本版)
    ├── script.js                # 樹狀檔案瀏覽器的收折交互邏輯
    ├── style.css                # 樹狀檔案瀏覽器的基本 CSS 樣式
    ├── filetree.css             # 樹狀檔案瀏覽器的進階版 CSS 樣式 (含縮排與層級引線)
    ├── test.html                # 垂直結構線與巢狀區塊階梯實驗頁面
    ├── test.js                  # 利用 jsPDF 將頁面圖片打包並下載為 PDF 的腳本
    ├── tmp.html                 # "邊緣人的垃圾桶" 部落格主入口頁面 (包含 Tab、時間軸、卡片等)
    ├── tmp.js                   # tmp.html 的 JS 控制邏輯 (Tab 切換、捲動視差、文字裁切、滾動條控制)
    ├── tmp1.css                 # "邊緣人的垃圾桶" 所使用的深色主題卡片與時間軸樣式表
    └── (靜態資源圖片)
        ├── logo.jpg             # 首頁與導航欄使用的 Logo 圖片
        ├── folder_1000dp_FFFFFF_FILL1_wght500_GRAD0_opsz48.png   # 收合狀態資料夾圖示
        ├── folder_open_1000dp_FFFFFF_FILL1_wght500_GRAD0_opsz48_改.png # 開啟狀態資料夾圖示
        └── home_1000dp_FFFFFF.png # 回首頁 / 根目錄的圖示
```

---

## 3. 核心模組與技術細節

### A. 樹狀檔案瀏覽器 (File Tree Browser)
* **相關檔案**: `demos/index.html`, `demos/script.js`, `demos/style.css`, `demos/filetree.css`
* **交互機制**:
  * 使用 HTML 屬性 `data-is-folder="true"` 與 `data-is-open="false"` 來定義資料夾結構。
  * `script.js` 採用 **事件委託 (Event Delegation)** 監聽 `.file-tree-container` 的 `click` 事件。當點擊具有 `data-is-folder="true"` 的節點時，會切換 `data-is-open` 的布林值。
  * `style.css` / `filetree.css` 通過屬性選擇器（例如 `[data-is-open="true"] > ul`）控制下方巢狀列表的遞迴 `display: block` 或 `display: none`。
* **層級引線設計 (Connector Lines)**:
  * `filetree.css` 中利用了自訂的 `.line-container::before`（水平線）與 `::after`（垂直線）來繪製資料夾的層級引線。
  * **引線尺寸比例**：一般項目的垂直線高度為 `24px`（豎的長度為橫的 `12px` 的兩倍），藉由 `top: 50%; transform: translateY(-50%)` 達成上下延展的字元居中連接線。
  * **尾節點處理**：針對最後一個子元素，利用 `ul li:last-child > .line-container::after` 將垂直線長度限制為 `12px`，位置調整為 `top: 50%; transform: translateY(-100%)`。此設計可使垂直引線只保留上半段並在中心點與水平引線重合，避免線條向下逸出，形成精確的 `└` 直角拐角。

### B. "邊緣人的垃圾桶" 概念頁面 (Trashcan Blog Portal)
* **相關檔案**: `demos/tmp.html`, `demos/tmp.js`, `demos/tmp1.css`
* **UI/UX 設計樣式**:
  * 一個精美的深色模式（Dark Mode，背景 `#000000`/`#121212`）UI 介面，搭配細緻的灰色框線（`#c3c3c3`/`#808080`）與發光陰影。
  * **隱藏式滾動條 (Hide Scrollbar on Rest)**: 在頁面不滾動時自動隱藏滾動條（加載 `hide-scrollbar` class），滾動時顯示滾動條，停止滾動 1 秒後再度隱藏。
  * **動態導航欄 (Scroll Toggle Navbar)**: 當頁面滾動距離超出 300px 時，頂部導航欄 `.navbar` 會加上 `.visible` 屬性優雅淡入，小於 300px 則淡出隱藏。
  * **文字自動裁切 (Description Truncation)**: 自動讀取卡片內容，將超過 90 個字元的文字進行截斷並附加 "……"，以保持卡片佈局的對稱與整潔。
  * **自訂時間軸**: 頁面下方包含完整的網頁目錄樹及垂直 timeline 技術展示 (利用 `.timeline` 的 `::after` 繪製垂直主軸，搭配 `.card:hover` 的橫向偏移 micro-animation)。

### C. PDF 打包工具 (Image to PDF Utility)
* **相關檔案**: `demos/test.js`
* **邏輯說明**:
  * 動態於頁面載入 `jsPDF` 函式庫，若瀏覽器支援則配合 `trustedTypes` 的安全性檢查政策 (CSP Safe URLs)。
  * 載入完成後，尋找頁面中所有的 `<img>` 標籤，讀取其 `src`（限制 blob 開頭的物件安全存取），並使用 Canvas 重新渲染為高畫質的 JPEG base64 資料流。
  * 利用 `pdf.addImage(imgData, 'JPEG', 0, 0)` 寫入 PDF 當中。如有多張圖片，自動調用 `pdf.addPage()` 實作多分頁匯出，最後下載為 `download.pdf`。

---

## 4. 已完成的程式碼重構 (Completed Refactorings)

本專案已完成以下優化，旨在提高網頁加載速度、交互效能、減少資源消耗並修正 HTML 語法缺失：

1. **圖示轉為 SVG DataURI (已完成)**
   * 將 `style.css` 與 `filetree.css` 中引用的外部 PNG 圖示（資料夾收合、資料夾開啟、首頁等圖片）改為 Inline SVG DataURI。此改動消除了多個 HTTP 資源請求，並避免高解析度螢幕下的失真問題，顯著降低了版面偏移風險。
2. **消滅 jQuery 依賴與原生轉移 (已完成)**
   * 移除 `tmp.html` 中的 jQuery CDN 庫載入。將底部的 Chart 繪製、導航欄滾動觸發器，以及 YT、巴哈按鈕的點擊監聽全部以原生 Vanilla JavaScript (ES6+) 與 Bootstrap 5 官方原生 API (`bootstrap.Tab.getOrCreateInstance`) 進行重寫。
3. **優化 `tmp.js` 執行效能與錯誤異常 (已完成)**
   * 增加防護代碼：當頁面無 `.tabs` 節點時不執行 `initializeTabs`，防止 runtime JavaScript 拋出未捕獲的 `TypeError`。
   * 將滾動條控制的 `scrollTimeout` 定義在區域作用域，防止全域 Window Pollution。
   * 針對導航欄的 scroll 監聽器，使用 `requestAnimationFrame` 進行節流（Throttling），移除高頻率觸發的控制台輸出，改善長網頁快速捲動時的 Jank（效能卡頓）。
4. **HTML 結構與重複 ID 修正 (已完成)**
   * 修正 Navbar 中 `<button>` 的不匹配閉合標籤（原 `</a>` 修正為 `</button>`），並刪除不合適的 `href` 屬性。
   * Navbar 按鈕的 ID 新增 `nav-` 前綴，隔絕與 Tabs 卡片內部的 ID 命名空間，解決重複 ID 的 DOM 規範衝突。
   * 將底端無人使用的 Chrome canvas ID 調整為 `myLineChartLarge`，修補重複 ID 問題，並將 inline `<style>` 樣式移至 `tmp1.css` 統一管理。

---

## 5. 框架與工具鏈導入建議 (Framework Integration)

隨著本原型專案擴展，可導入以下現代工具鏈與前端框架：

1. **開發建置工具: Vite**
   * **優勢**: Vite 具備極速的 ESM 開發伺服器、模組熱替換（HMR）以及開箱即用的 CSS 編譯與靜態資源打包技術。非常適合作為此專案的升級基石。
2. **組件化控制: Alpine.js (輕量推薦)**
   * **優勢**: 本專案主要由靜態 HTML 與微互動（檔案樹展開、標籤切換、按鈕點擊）構成。Alpine.js 非常輕巧，無須複雜打包流程，僅需透過聲明式 `x-data`、`x-show` 指令即可接管 DOM 狀態，最大程度維持 Vanilla 原汁原味並免去手動 DOM 監聽的脆弱性。
3. **頁面重構: Tailwind CSS**
   * **優勢**: 目前 `tmp1.css` 中包含大量的客製邊框、自訂顏色與排貼樣式。若導入 Tailwind CSS，可藉由 Utility-first 屬性在一處配置 Design System（包括 Dark Mode 規格、邊緣陰影、玻璃擬態 blur 效果），避免 CSS 隨著卡片和組件增加而無限膨脹。
4. **複雜狀態架構: Svelte 或 React**
   * **優勢**: 若後續需支援動態讀取多個 JSON 設定檔來即時繪製樹狀圖，或者要做為複雜 API 對接的部落格平台，推薦以 Svelte 作為優先框架（打包體積最小，編譯時生成響應），將「檔案瀏覽器 FileTree」、「垂直時間軸 Timeline」元件化。

