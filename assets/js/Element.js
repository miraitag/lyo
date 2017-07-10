export default class Element{
	constructor(element) {
		this.el = element;
		this.layouts = [];
		this.xhr;
	}

	init(){
		this.pushLayouts();
	}

	pushLayouts(){
		let el = document.querySelectorAll(this.el);
		for(let i = 0; i < el.length; i++){
			this.layouts.push(el[i]);
		}
	}

	ajax(url, type){
		let ajax = this.getObjectXHR();

		ajax.onreadystatechange = () => {
			  if (ajax.readyState == 4) {
	            if (ajax.status == 200 && ajax.responseType == type) {
	                console.log( ajax.response );
	            } else {
	                alert('Hubo problemas con la petición.');
	            }
	        }
		};

		ajax.open('GET', url, true);
		ajax.responseType = type;
		ajax.send();
	}

	getObjectXHR(){
		if (window.XMLHttpRequest) { // Mozilla, Safari, ...
		    this.xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) { // IE
		    this.xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}

		return this.xhr;
	}

	getLayouts(){
		return this.layouts; 
	}

	
}
