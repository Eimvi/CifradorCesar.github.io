const alfabeto:string [] = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"]; //27
const inputOriginal = document.querySelector('#input-original') as HTMLInputElement;

const element = <HTMLInputElement> document.getElementById("check");
const cifrador = document.querySelector('#cifrador') as HTMLFormElement;
const resultado = document.querySelector('#resultado') as HTMLDivElement;
const rango = document.getElementById('rango') as HTMLInputElement;

function shifMessage ():void {
    const wordArray:string = inputOriginal.value.toUpperCase();
    printChar(0, wordArray);
}

function printChar(currentLetterIndex:number, wordArray:string){
    if(wordArray.length == currentLetterIndex) return;
    inputOriginal.value = inputOriginal.value.substring(1);

    const spanChar = document.createElement("span");
    resultado.appendChild(spanChar);
        animateChar(spanChar)
        .then( () => {
            const charSinCodificar = wordArray[currentLetterIndex];
            if(element.checked){              
                spanChar.innerHTML = alfabeto.includes(charSinCodificar) ? 
                    alfabeto[(alfabeto.indexOf(charSinCodificar) + parseInt(rango.value)) % alfabeto.length] : 
                    charSinCodificar;
                printChar(currentLetterIndex + 1, wordArray);
            }
            else{ 
                spanChar.innerHTML = alfabeto.includes(charSinCodificar) ? 
                    alfabeto[(alfabeto.indexOf(charSinCodificar) - parseInt(rango.value) + alfabeto.length) % alfabeto.length] : 
                    charSinCodificar;
                printChar(currentLetterIndex + 1, wordArray);
            }
        });
}

function animateChar(spanChar:HTMLSpanElement):Promise<void> {
    let cambiosDeLetra:number = 0;
    return new Promise(resolve => {
        const intervalo = setInterval(() => {
            spanChar.innerHTML = alfabeto[Math.floor(Math.random() * alfabeto.length)];
            cambiosDeLetra++;
            if(cambiosDeLetra === 3) {
                clearInterval(intervalo);
                resolve();
            }
        }, 50);
    });
}


const submit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    resultado.innerHTML = '';
    shifMessage();
}

cifrador.onsubmit = submit;