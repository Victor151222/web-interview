- [001--透明遮罩](#请用原生js实现一个函数给页面制定的任意一个元素添加一个透明遮罩透明度可变默认02使这个区域点击无效要求兼容ie8及各主流浏览器遮罩层效果如下图所示)
- 002--仿百度下拉框
- [003--今天是星期几](#请用代码写出今天是星期x其中x表示当天是星期几如果当天是星期一输出应该是今天是星期一)
- [004--闭包与单线程纠错](#下面这段代码想要循环延时输出结果0 1 2 3 4请问输出结果是否正确如果不正确请说明为什么并修改循环内的代码使其输出正确结果)




### 请用原生js实现一个函数,给页面制定的任意一个元素添加一个透明遮罩(透明度可变,默认0.2),使这个区域点击无效,要求兼容IE8+及各主流浏览器,遮罩层效果如下图所示

![透明遮罩](images/element-mask.jpg)
### 请用代码写出(今天是星期x)其中x表示当天是星期几,如果当天是星期一,输出应该是"今天是星期一"

### 下面这段代码想要循环延时输出结果0 1 2 3 4,请问输出结果是否正确,如果不正确,请说明为什么,并修改循环内的代码使其输出正确结果

```javascript
for (var i = 0; i < 5; ++i) {
  setTimeout(function () {
    console.log(i + ' ');
  }, 100);
}
```