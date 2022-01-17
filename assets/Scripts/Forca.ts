const {ccclass, property} = cc._decorator;

@ccclass
export default class Forca extends cc.Component {
   
    @property(cc.Label)
    wordLabel: cc.Label = null;

	@property(cc.Label)
	numberOfChar: cc.Label = null;

	@property(cc.Label)
	fails: cc.Label = null;

	@property(cc.Label)
	victories: cc.Label = null;

	@property(cc.Label)
	result: cc.Label = null;

	turno: number = 0
    buttons: cc.Node[]
	
	emptyLabel: string[] = [];
	erros: number = 0;
	pontos: number = 0;
	
	palavras: string[][] = 
	[
		this.insertNewPalavra("alemanha"),
		this.insertNewPalavra("russia"),
		this.insertNewPalavra("brasil"),
		this.insertNewPalavra("japao"),
		this.insertNewPalavra("junqueiro"),

	];
	palavraSecreta: string[];

    onLoad(){
        const keyboard = this.node.children;
        this.buildKeyboardList();
		let i: number = 0;
        keyboard.forEach( k => {
			i++;
            this.buttons[i] = k;
        })
		
		this.victories.string = `Vitórias: ${this.pontos}`;
		this.fails.string = `Erros: ${this.erros}`;
		this.startGame();
    }

	arrayToString(a: string[]): string{
		let aux: string = "";
		a.forEach((s)=>{
			aux = aux + s;
		})
		return aux;
	}

    buildKeyboardList(){
        this.buttons = [];
        for(let i = 0; i < 26; i++){
            this.buttons.push()
        }
    }

    start () {
		
    }

    updateSecretWord(event: cc.Event, letter: string){
		let acertou: boolean = false;
		for(let i = 0; i < this.wordLabel.string.length; i++){
			if(letter == this.palavraSecreta[i]){
				this.emptyLabel[i] = letter;
				acertou = true;
			}
		}
		if(acertou){
			this.wordLabel.string = this.arrayToString(this.emptyLabel);
			this.verifyVictory();
			
		}else{
			this.erros++;
			this.fails.string = `Erros: ${this.erros}`;
			this.verifyFail();
			
		}
		this.node.getChildByName("keyboard")
		.getChildByName(letter).active = false;
    }

	verifyFail() {
		if(this.erros >= 5){
			console.log("perdeu!");
			this.erros = 0;
			this.fails.string = `Erros: ${this.erros}`;
			this.activeDesativeButton(false); 
			this.result.string = "PERDEU\nF"
			
		}
	}

	verifyVictory() {
		if(this.wordLabel.string == this.arrayToString(this.palavraSecreta)){
			this.pontos++;
			this.victories.string = `Vitórias: ${this.pontos}`;
			this.activeDesativeButton(false);
			this.result.string = "GANHOU. FLAMENGO O O O O";
		}
	}

	activeDesativeButton(actived: boolean){
		this.buttons.forEach((b)=>{
			b.active = actived;
		})
	}

	startGame(){	
		this.palavraSecreta = this.palavras[Math.floor(Math.random() * this.palavras.length)];
		console.log(this.palavraSecreta);
		this.generateEmptyLabel();
		this.wordLabel.string = this.arrayToString(this.emptyLabel);
		this.result.string = "";
		this.activeDesativeButton(false);
		this.activeDesativeButton(true);
	}

	generateEmptyLabel(): number{
		this.emptyLabel = [""];
		for(var i = 0; i < this.palavraSecreta.length; i++){
			this.emptyLabel[i] = "_";
		}
		return i; //return the number of chars
	}

    insertNewPalavra(word: string ): string[]{
        var newWord: string[] = [];
        for(let i = 0; i < word.length; i++){
            newWord.push(word.toUpperCase().charAt(i)); 
        }
        return newWord;
    }

    // update (dt) {}
}
