# Node.js-template
  
   ## Node.js REPL
    
   在終端機中輸入 node 直接按 enter 則可進入測試環境。
   
   此環境中不需 require 就能測試所有核心模塊的方法，離開測試狀態只需輸入兩次 control+C 即可。

   ## Node.js 中的第三方模塊

   ### 在 Node.js 中可以使用模板引擎 使用方式為：
    
   - 1. 下載/安裝 模板引擎 > npm install art-template <br>
   - 2. 使用 require 方法加載 art-template <br>
   - 3. 使用 template.render() 方法 參數1為創建的模板內容 參數2為對象

   ### 使用 Node.js + art-template 做一個留言本服務

   - 創建一個資料夾 下載 art-template 包
   - 創建一個 app.js 當開啟此服務的文件
   - 創建一個 views 資料夾放網頁頁面
   - 寫一個首頁頁面 和 一個發留言頁面 還有一個404頁面 把這三個頁面放入 views 資料夾
    
     * 此時先到 app.js 寫 http 服務 並且嘗試打開首頁頁面 
     * 就會發現當頁面遇到所有需發起請求的標籤時 瀏覽器會自動發起請求
     * 若請求為本地目錄中的文件 我們就要處理這些靜態資源的問題
     * 處理方式為 創建一個 public 資料夾 把所有需要被請求拿到的本地文件放進去
     * 統一通過請求地址為 /public/ 進行請求 獲取文件，這樣可以方便我們不用挨個去判斷資源的路徑

   - 創建一個 json 文件放所有留言反饋 並通過讀取文件+模板引擎渲染首頁內容
    
     * 這裏要注意切換數據類型，讀取文件、寫入文件 與 res.end() 方法 傳入的內容必須為字符串。

   - 回到發留言的頁面中去設定表單的提交
    
     * 這裏使用 ajax 的 GET 請求 請求網址設一個 /send 像這樣 > `＜form action="/send" method="get"＞`
   - 回到 app.js 文件寫 html 服務 讓網址為 /send 時使用 url.parse() 方法 獲取 GET 參數

     * url.parse() 參數1為網址 參數2為布爾值 布爾值為 true 時會幫你自動把參數轉為對象
     * 然後我們把 GET 請求傳入的參數設為一個對象 把對象轉為字符串寫入 json 文件
     * 再通過重定向 > res.statusCode = 302 ; res.setHeader('Location', '/') 把頁面跳轉回首頁 即完成。

