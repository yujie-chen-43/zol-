function getStyle(domobj, attr) {
	if(window.getComputedStyle) {
		return getComputedStyle(domobj, null)[attr];
	}
	return domobj.currentStyle[attr];
}

function startMove(domobj,json,fn){
	clearInterval(domobj.timer);
	domobj.timer = setInterval(()=>{
		let flag = true;
		for(let attr in json){
			let iCur;
			if(attr == "opacity"){
				iCur = parseInt(getStyle(domobj,"opacity")*100);
			}else{
				iCur = parseInt(getStyle(domobj,attr));
			}
			
			let iTarget = parseInt(json[attr]);
			
			let iSpeed = (iTarget-iCur)/10;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			
			if(attr == "opacity"){
				domobj.style.opacity = (iCur + iSpeed)/100;
				domobj.style.filter = "alpha(opcity="+(iCur+iSpeed)+")";
			}else{
				domobj.style[attr] = iCur + iSpeed + "px";
			}
			
			if(iSpeed != 0){
				flag = false;
			}
			
			
		}
		
		if(flag){
			clearInterval(domobj.timer);
			if(fn!==undefined){
				fn();
			}
			
		}
		
		
	},20);
}
