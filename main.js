const typeWriter = function (txtElement, words, wait){
	this.txtElement = txtElement;
	this.words = words;
	this.txt = '';
	this.wordIndex = 0;
	this.wait = parseInt(wait,10);
	// 10 represents base10 number
	this.type();
	this.isDel = false;
}

// Type Method
typeWriter.prototype.type = function() {
	// current index of word

	const current = this.wordIndex % this.words.length;

	//Get fulltext of the current word

	const fulltxt = this.words[current];

	//check if deleting

	if (this.isDel) {
		//Remove character
		this.txt = fulltxt.substring(0,this.txt.length - 1);
	} else {
		//Add character
		this.txt = fulltxt.substring(0,this.txt.length + 1);
	}
	//Insert txt into element span

	this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

	//type speed
	//Init typeSpeed
	let typeSpeed = 300;

	if (this.isDel) {
		typeSpeed /= 2;
	}

	//If word is cpmplete move on

	if (!this.isDel && this.txt === fulltxt) {
		//pause at end
		typeSpeed = this.wait;
		//set delete to trur
		this.isDel = true;		
	} else if (this.isDel && this.txt === '') {
		this.isDel = false;
		//move to next word

		this.wordIndex++;
		//pause before	typing
		typeSpeed = 500;

	}



	setTimeout(()=>this.type(),typeSpeed);
};

//Init on DOM Load

document.addEventListener('DOMContentLoaded',Init);

function Init() {
	const txtElement = document.querySelector('.txt-type');

	const words = JSON.parse(txtElement.getAttribute('data-words'));
	const wait = txtElement.getAttribute('data-wait');
	//init type writer

	new typeWriter(txtElement, words, wait);
}