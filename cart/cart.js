function Cart(){
	if(getCookie("cartData")){
		this.cartData = JSON.parse(getCookie("cartData"));
	}else{
		this.cartData = {};
	}
}
Cart.prototype.addData = function(id){
	//id 商品id
	if(this.cartData[id]===undefined){
		this.cartData[id] = 1;
	}else{
		this.cartData[id]++;
	}
	
	setCookie("cartData",JSON.stringify(this.cartData),7);
}
Cart.prototype.showList = function(){
	this.cartList = document.getElementById("cartList");
	let prodDatas = JSON.parse(getCookie("prodDatas"));
	let str = "";
	for(let id in this.cartData){
		str += `
			<li>
				<img src="${prodDatas[id].imgsrc}">
				<span>${prodDatas[id].title}</span>
				<span>${prodDatas[id].price}</span>
				<span>-</span>
				<input type="text" value="${this.cartData[id]}">
				<span>+</span>
				<span>${prodDatas[id].price*this.cartData[id]}</span>
				<span class="delBtn" data-id="${id}">删除</span>
			</li>
		`;
	}
	this.cartList.innerHTML = str;

}
Cart.prototype.removeData = function(){
	/*let aDelBtns = this.cartList.querySelectorAll(".delBtn");
	for(let i = 0; i < aDelBtns.length; i++){
		aDelBtns[i].onclick = ()=>{
			//移除DOM对象
			this.cartList.removeChild(aDelBtns[i].parentNode);
			//删除数据，存cookie
			let id = aDelBtns[i].getAttribute("data-id");
			delete this.cartData[id];
			
			setCookie("cartData",JSON.stringify(this.cartData),7);
			
		}
	}*/
	
	let aDelBtns = this.cartList.getElementsByClassName("delBtn");
	
	let _this = this;//用_this取保存实例对象
	
	for(let i = 0; i < aDelBtns.length; i++){
		aDelBtns[i].onclick = function(){
			
			//this指向点击的删除按钮
			
			//移除DOM对象
			_this.cartList.removeChild(this.parentNode);
			//删除数据，存cookie
			let id = this.getAttribute("data-id");
			
			delete _this.cartData[id];
			
			setCookie("cartData",JSON.stringify(_this.cartData),7);
			
		}
	}
}
