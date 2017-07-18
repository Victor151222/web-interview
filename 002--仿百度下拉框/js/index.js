window.onload=function(){
	var textInput=document.getElementById('txtInput');
	EventUtil.addHandler(txtInput,'input',onInput);
	EventUtil.addHandler(txtInput,'focus',showList);
	EventUtil.addHandler(window,'click',hideList);
	EventUtil.addHandler(window,'keydown',onKeydown);
}

var EventUtil={
	addHandler:function(element,type,handler){
		if(element.addEventListener){//DOM2级事件处理程序
			element.addEventListener(type,handler,false);

		}else if(element.attachEvent){//IE
			element.attachEvent('on'+type,handler);
		}else{
			element['on'+type]=handler;
		}
	},
	removeHandler:function(element,type,handler){
		if(element.removeListener){
			element.removeListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent('on'+type,handler);
		}else{
			element['on'+type]=null;
		}
	},
	hasClass:function(obj,cls){
		if(!obj.className){
			return false;
		}
		return obj.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	},

	addClass:function(obj,cls){
		if(!this.hasClass(obj,cls)){
			obj.className=(obj.className===" ")?cls:obj.className+""+cls;
		}
	},
	removeClass:function(obj,cls){
		if(this.hasClass(obj,cls)){
			var reg=new RegExp('(\\s|^)'+cls+'(\\s|$)');
			obj.className=obj.className.replace(reg,'');
		}
	},
	toggleClass:function(obj,cls){
		if(this.hasClass(obj,cls)){
			this.removeClass(obj,cls);
		}else{
			this.addClass(obj,cls);
		}
	}
	
};
function onInput(e){
	if(e.target.value.trim()!=' '){	
		var s=document.createElement('script');
		s.src='http://www.baidu.com/su?&wd='+encodeURIComponent(this.value.trim())+'&p=3&cb=fn';
//encodeURI()对整个URI进行编码
//encodeURIComponent()对URL中的参数进行编码
//与encodeURIComponent()区别在于编码的范围不一样(后者对/线进行编码)
// 此处输入#报错，因为encodeURI()没有对#进行编码，故
		document.body.appendChild(s);
	}
}
function fn(data){
	var ulList=document.getElementsByTagName('ul')[0];
	var newUlist=document.createElement('ul');
	newUlist.dataset.query=data.q;
	newUlist.dataset.listIndex=-1;
	data.s.forEach(function(item){
		var li=document.createElement('li');
		li.textContent=item;
		newUlist.appendChild(li);
	});
	document.getElementsByTagName('div')[0].replaceChild(newUlist,ulList);
	ulList=null;//垃圾回收
	// mouseenter不支持冒泡，此处通过循环遍历给每一个li标签绑定一个事件
/*	[].forEach.call(newUlist.childNodes,function(item){
		EventUtil.addHandler(item,'mouseenter',function(event){
			 var target = event.target ||event.srcElement;
			if(target.tagName.toLowerCase()==='li'){
				resetStyle(target);
			}
		});
		EventUtil.addHandler(item,'mouseout',function(event){
			var target=event.target||event.srcElement;
			if(target.tagName.toLowerCase()==="li"){
				resetStyle(target);
				EventUtil.removeClass(item,'hover');
			}
		})
	});   */ 

	//事件委托：也就是利用冒泡的原理，把事件加到父级上，触发执行效果。
	// 避免给每一个li标签绑定一个事件，提高了性能
	EventUtil.addHandler(newUlist,'mouseover',function(event){
		 var target = event.target ||event.srcElement;
		 console.log(target.nodeName);
		if(target.nodeName.toLowerCase()==='li'){
			resetStyle(target);
		}
	});
	EventUtil.addHandler(newUlist,'mouseout',function(event){
		var target=event.target||event.srcElement;
		if(target.nodeName.toLowerCase()==="li"){
			resetStyle(target);
			EventUtil.removeClass(target,'hover');
		}
	});  



	EventUtil.addHandler(newUlist,'click',function(event){
		var e=event||window.event;
		var target=e.target||e.srcElement;
		if(target.tagName.toLowerCase()==="li"){
			var wd=target.innerHTML;
			window.open('https://www.baidu.com/s?word=' + wd);
			//打开新窗口，搜索新页面
		}
	});
	//删除 scripts
	var s=document.body.querySelectorAll('script');
	for(var i=1,len=s.length;i<len;i++){
		document.body.removeChild(s[i]);
	}
}
//输入框失去焦点触发
function hideList(e){
	var target=e.target||e.srcElement;
	var tagName=target.tagName.toLowerCase();
	var ulList=document.getElementsByTagName('ul')[0];
	if(tagName!=='li'&&tagName!=='input'){
		EventUtil.addClass(ulList,'hide');
	}
}
//获得焦点触发
function showList(){
	var ulList=document.getElementsByTagName('ul')[0];
	EventUtil.removeClass(ulList,'hide');
	ulList.dataset.listIndex=-1;
	//设置当前搜索列表的索引，初始化为-1
}
function resetStyle(target){
	[].forEach.call(target.parentNode.childNodes,function(item){
		EventUtil.removeClass(item,'hover');
		EventUtil.addClass(target,'hover');
	});
}
function onKeydown(e){
if(e.keyCode!='38'&&e.keyCode!='40'&&e.keyCode!='13'){
	return;
}
var ulList=document.getElementsByTagName('ul')[0];
var txtInput=document.getElementById('txtInput');
	if(!EventUtil.hasClass(ulList,'hide')){
		switch(e.keyCode){
			case 13:  //回车
			var wd=txtInput.value;
			window.open('https://www.baidu.com/s?word=' + wd);
			break;
			case 38:  //向上的方向键
			if(ulList.dataset.listIndex==-1){
			ulList.dataset.listIndex=parseInt(ulList.childNodes.length)-1;
			}else if(ulList.dataset.listIndex==0){
				ulList.dataset.listIndex=parseInt(ulList.childNodes.length)-1;
			}else{
				ulList.dataset.listIndex=parseInt(ulList.dataset.listIndex)-1;
			}
			break;
			case 40:  //向下的方向键
			if(ulList.dataset.listIndex==parseInt(ulList.childNodes.length)-1){
				ulList.dataset.listIndex=parseInt(0);
			}else{
				ulList.dataset.listIndex=parseInt(ulList.dataset.listIndex)+1;
			}
			break;
		}
		txtInput.value=(ulList.dataset.listIndex==-1)?ulList.dataset.query:ulList.childNodes[ulList.dataset.listIndex].innerHTML;
		//重新设置样式
		if (ulList.dataset.listIndex!=-1) {
			resetStyle(ulList.childNodes[ulList.dataset.listIndex]);
		};
	}
}

