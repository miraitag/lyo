import Element from './Element';
import '../sass/navigator.scss';
//import json from '../json/name.json';

export default class Navigator extends Element{
	constructor(element) {
	  	super(element);
  		this.nav = {
			prev : this.getDotsIndex().num - 1,
			current :  this.getDotsIndex().num,
			next : this.getDotsIndex().num + 1
		};
		this.sections = { offset : [], hh : [] };
	}

	init(){
		super.init();
		super.ajax('../assets/json/name.json', 'json');
		this.dotsEvent();
		this.activeElement();
		this.scrollEvent();
		this.setArraySection();
		this.positionNavigator();
	}

	

	activeElement(){
		!super.getLayouts()[0].classList.contains('active') ? super.getLayouts()[0].classList.add('active') : false;
		!this.getDots()[0].classList.contains('active') ? this.getDots()[0].classList.add('active') : false;
	}

	dotsEvent(){
		let self = this;
		if( super.getLayouts().length == this.getDots().length ){
			for(let i = 0; i < this.getDots().length; i++){
				this.getDots()[i].addEventListener('click', function(){
					document.querySelector('.mt-navigator .mt-navigator__content-item.active').classList.remove('active');
					document.querySelector('.mt-layout.active').classList.remove('active');
					if(!this.classList.contains('active')){
						this.classList.add('active');
						window.scrollTo(0,self.getOffsetLayout(document.querySelectorAll('.mt-layout')[self.getDotsIndex().num]));
						document.querySelectorAll('.mt-layout')[self.getDotsIndex().num].classList.add('active');
					}
					self.setNavigator();
				}, false);
			}
		}else{
			console.warn("No coincide el número de elementos: Dots - " + this.getDots().length + " / Layouts - " + layouts.length);
		}
	}

	scrollEvent(){
		let self = this;
		let layouts = super.getLayouts();
		window.addEventListener("scroll", function(){
			if(parseInt(window.scrollY, 10) >= self.sections.offset[self.nav.current] + self.sections.hh[self.nav.current] ){
				if( (self.nav.prev < 0 && self.nav.current == 0) || ( self.nav.next > self.nav.current && self.nav.next <= self.getDots().length ) ){
					layouts[self.nav.current].classList.remove('active');
					self.getDots()[self.nav.current].classList.remove('active');
					layouts[self.nav.next].classList.add('active');
					self.getDots()[self.nav.next].classList.add('active');
					self.setNavigator();
				}        
			}else if(parseInt(window.scrollY, 10) <= self.sections.offset[self.nav.current] - self.sections.hh[self.nav.current] ){
				if( self.nav.current >= 0){
					layouts[self.nav.current].classList.remove('active');
					self.getDots()[self.nav.current].classList.remove('active');
					layouts[self.nav.prev].classList.add('active');
					self.getDots()[self.nav.prev].classList.add('active');
					self.setNavigator();
				}
			}
		}, false);
	}

	positionNavigator(){
		for(let i = 0; i < this.sections.offset.length; i++){
			if( parseInt(window.scrollY, 10) <= this.sections.offset[i] && super.getLayouts()[0].classList.contains('active')){
				super.getLayouts()[0].classList.remove('active');
				this.getDots()[0].classList.remove('active');
				super.getLayouts()[i].classList.add('active');
				this.getDots()[i].classList.add('active');
				this.setNavigator();
				break;
			}
		}
	}

	setNavigator(){
		this.nav = {
			prev : this.getDotsIndex().num - 1,
			current :  this.getDotsIndex().num,
			next : this.getDotsIndex().num + 1
		}
		//console.log(this.nav);
	}

	setArraySection(){
		for(let i = 0; i < super.getLayouts().length; i++){
			this.sections.offset.push(this.getOffsetLayout(super.getLayouts()[i]));
			this.sections.hh.push(this.getHeightLayout(super.getLayouts()[i]));
		}
	}
	getOffsetLayout(el){
		return el.offsetTop;
	}

	getHeightLayout(el){
		return el.offsetHeight;
	}

	getDots(){
		return document.querySelectorAll('.mt-navigator .mt-navigator__content-item');
	}

	getDotsIndex(){
		for(let i = 0; this.getDots().length; i++){
			if(this.getDots()[i].classList.contains('active')){
				return {
					el : this.getDots()[i],
					num: i
				}
			}
		}
	}
}