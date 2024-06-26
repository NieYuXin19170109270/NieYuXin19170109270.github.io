//用于存储数据信息
var poster = [{
    "name": "Introduction", "imageURL": "../imgs/0.jpg", "description": "2024 Alian. All rights reserved."
}, {
    "name": "Posters", "imageURL": "../imgs/1.jpg", "description": "Design makes everything possible. "
}, {
    "name": "The Ledge", "imageURL": "../imgs/2.jpg", "description": "Date: August 2017 mikekus"
}, {
    "name": "Eat Local", "imageURL": "../imgs/3.jpg", "description": "Date: February 2016 mikekus"
}]

// 创建一个名为UI的对象，用于存储系统的宽度和高度信息
var UI = {};
// 记录系统窗口的宽度和高度，并限制宽度不超过 600px
UI.deviceWidth = window.innerWidth > 600 ? 600 : window.innerWidth;
UI.deviceHeight = window.innerHeight;
// 计算默认字体大小
const Letters = 33; // 字母数量
const baseFont = UI.deviceWidth / Letters; // 基准字体大小
// 设置页面的字体大小为默认字体大小
document.body.style.fontSize = baseFont + 'px';
// 通过动态CSS设置页面全屏显示
document.body.style.width = UI.deviceWidth + 'px';
document.body.style.height = UI.deviceHeight + 'px';
if (window.innerWidth < 1000) {
    $("#aid").style.display = 'none';
}
$("#aid").style.width = window.innerWidth - UI.deviceWidth - baseFont * 3 + 'px';
$("#aid").style.height = UI.deviceHeight + 'px';


/*实现输入Enter键进行换行，BackSpace进行删除*/
$("body").addEventListener("keydown", function (ev) {
    let k = ev.key;
    let c = ev.keyCode;
    $("status").textContent = "您已按下键 ：" + k + " ，" + "字符编码 ：" + c;
});
$("body").addEventListener("keyup", function (ev) {
    let k = ev.key;
    let c = ev.keyCode;
    $("status").textContent = "松开按键 ：" + k + " ，" + "字符编码 ：" + c;
    /*判断键盘按下的是否为Enter键，如果是添p元素实现换行*/
    if (k === "Enter") {
        //有且只能在document中创建子节点
        let p = document.createElement("p");
        //通过创建p元素，添加子节点来实现换行。
        $("keyboard").appendChild(p);
    } else if (k === "Backspace") {
        /*没有字符可以删除了，则将该子节点删除*/
        if ($("keyboard").lastElementChild.textContent === "") {
            /*删除前保证keyboard中至少有一个字节点*/
            if ($("keyboard").childElementCount > 1) {
                $("keyboard").removeChild($("keyboard").lastElementChild);
            }
        } else {
            $("keyboard").lastElementChild.textContent = $("keyboard").lastElementChild.textContent.slice(0, -1);
        }
    } else if (printLetter(k)) {
        $("keyboard").lastElementChild.textContent += k;
    }

    /*判断是否是单个字符*/
    function printLetter(k) {
        //判断字符串长度是否大于1
        if (k.length > 1) {
            return false;
        }
        let puncs = ['~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', ',', '.', '<', '>', '?', '/', "'", ' '];
        /*字母输出*/
        if ((k >= 'a' && k <= 'z') || (k >= 'A' && k <= 'Z') || (k >= '0' && k <= '9')) {
            return true;
        }
        /*符号输出*/
        for (let p of puncs) {
            if (p === k) {
                return true;
            }
        }
        return false;
        //提出更高阶的问题，如何处理连续空格和制表键tab？
    }
});


/*实现翻页功能*/
var currentIndex = 0;
var posterContainer = $("poster-container");

function showPoster(index) {
    var currentPoster = poster[index];
    var posterHTML = `
            <div class="poster" style="width: 100%;height: 100%">
                <img src="${currentPoster.imageURL}" alt="${currentPoster.name}">
            </div>
        `;
    posterContainer.innerHTML = posterHTML;
    $("title").textContent = currentPoster.name;
    $("introduce").textContent = currentPoster.description;
}

// 初始化显示第一张海报
showPoster(currentIndex);
// 监听鼠标滑动事件
document.addEventListener('wheel', function (event) {
    // 鼠标向上滑动，显示前一张海报
    if (event.deltaY < 0) {
        currentIndex = (currentIndex === 0) ? poster.length - 1 : currentIndex - 1;
    }
    // 鼠标向下滑动，显示后一张海报
    else {
        currentIndex = (currentIndex === poster.length - 1) ? 0 : currentIndex + 1;
    }
    showPoster(currentIndex);
});

function $(ele) {
    if (typeof ele !== 'string') {
        throw("自定义的$函数参数的数据类型错误，实参必须是字符串！");
        return
    }
    let dom = document.getElementById(ele);
    if (dom) {
        return dom;
    } else {
        dom = document.querySelector(ele);
        if (dom) {
            return dom;
        } else {
            throw("执行$函数未能在页面上获取任何元素，请自查问题！");
            return;
        }
    }
}
