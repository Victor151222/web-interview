#### 获取一个元素的margin值的两种方法

1. JQuery

   $('#target').css('marginLeft');

2. js原生

   getComputedStyle(elem, null).marginLeft;

***

​     `jQuery`的`CSS()`方法，其底层运作就应用了`getComputedStyle`以及getPropertyValue方法。

​      `jQuery`的`CSS()`无法获取伪类元素样式，而`getComputedStyle`可以。但从这一点上将，熟悉`getComputedStyle`方法有必要

