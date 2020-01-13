//引入建立服務器的核心模塊 http
var http = require('http')
//引入處理文件的核心模塊 fs
var fs = require('fs')
//引入處理網址的核心模塊 url
var url = require('url')
//引入處理模板引擎的第三方模塊 art-template
var template = require('art-template')

//創建服務器
http.createServer(function (req, res) {
    if (req.url === '/') { //如果是首頁則響應 index.html 文件 並讀取數據文件使用模板引擎渲染頁面
        fs.readFile('./views/index.html', function (err, html) {
            if (err) {
                return fs.readFile('./views/404.html', function (err, data) {
                    if (err) {
                        return res.end("<h1 style='margin-top:100px;text-align:center'>Sorry!Node.js Can't find 404 page!</h1>")
                    }
                    res.end(data)
                })
            }
            fs.readFile('./public/data/comments.json', function (err, data) {
                if (err) {
                    return res.end("<h1 style='margin-top:100px;text-align:center'>Sorry!Node.js Can't find json file!</h1>")
                }
                var comments = data.toString()
                comments = JSON.parse(comments).comments
                comments.reverse()
                var ret = template.render(html.toString(), { comments: comments })
                res.end(ret)
            })
        })
    } else if (req.url === '/post') { //如果是發表頁面則響應 post.html 文件
        fs.readFile('./views/post.html', function (err, data) {
            if (err) {
                return res.end("<h1 style='margin-top:100px;text-align:center'>Sorry!Node.js Can't find post page!</h1>")
            }
            res.end(data)
        })
    } else if (req.url.indexOf('/public/') !== -1) { //如果是跟 public 資料夾有關的請求則響應該資料夾下的對應文件
        fs.readFile('.' + req.url, function (err, data) {
            if (err) {
                return res.end("<h1 style='margin-top:100px;text-align:center'>Sorry!Node.js Can't find public file!</h1>")
            }
            res.end(data)
        })
    } else if (req.url.indexOf('/send') !== -1) { //如果是發送表單請求 則把 GET 參數寫入數據文件 並重定向回首頁
        //url.parse() 方法獲取到的是對象
        var obj = url.parse(req.url, true).query
        //這裏直接往對象裡面添加日期
        obj.dateTime = '2020-01-13'
        //然後把這個對象轉成字符串(因為這裏得到的對象 前面會有"[Object: null prototype]")
        var newobj = JSON.stringify(obj)
        //開始讀取 json 文件
        fs.readFile('./public/data/comments.json', function (err, data) {
            if (err) {
                return fs.readFile('./views/404.html', function (err, data) {
                    if (err) {
                        return res.end("<h1 style='margin-top:100px;text-align:center'>Sorry!Node.js Can't find json file!</h1>")
                    }
                    res.end(data)
                })
            }
            //把獲取到的數據轉為 JSON 對象
            var mydata = JSON.parse(data)
            //往數據的最後面添加一個新對象 為剛剛我們獲取到的 GET 參數對象
            //這裏要記得把字符串轉回對象才能添加到數據文件中 > JSON.parse(newobj)
            newobj = JSON.parse(newobj)
            mydata.comments[mydata.comments.length] = newobj
            //然後把整個 JSON 對象轉成字符串 寫入 JSON 文件
            fs.writeFile('./public/data/comments.json', JSON.stringify(mydata), function (err) {
                if (err) {
                    return fs.readFile('./views/404.html', function (err, data) {
                        if (err) {
                            return res.end("<h1 style='margin-top:100px;text-align:center'>Sorry!Node.js Can't upload json file!</h1>")
                        }
                        res.end(data)
                    })
                }
            })
            //最後重定向回首頁 並結束響應
            res.statusCode = 302 //302是臨時重定向
            res.setHeader('Location', '/') //通過 Location 告訴瀏覽器重定向到啥網址
            res.end()
        })
    } else if(req.url==='/data'){
        fs.readFile('./public/data/comments.json', function (err, data) {
            if (err) {
                return fs.readFile('./views/404.html', function (err, data) {
                    if (err) {
                        return res.end("<h1 style='margin-top:100px;text-align:center'>Sorry!Node.js Can't find json file!</h1>")
                    }
                    res.end(data)
                })
            }
            res.end(data)
        })
    } else { //如果是其他網址 則返回404頁面
        fs.readFile('./views/404.html', function (err, data) {
            if (err) {
                return res.end("<h1 style='margin-top:100px;text-align:center'>Sorry!Node.js Can't find 404 page!</h1>")
            }
            res.end(data)
        })
    }
}).listen(2222, function () {
    console.log('Server is running ...')
})