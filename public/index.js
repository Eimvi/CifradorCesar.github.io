"use strict";
var alfabeto = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]; //27
var inputOriginal = document.querySelector('#input-original');
var element = document.getElementById("check");
var cifrador = document.querySelector('#cifrador');
var resultado = document.querySelector('#resultado');
var rango = document.getElementById('rango');
function shifMessage() {
    var wordArray = inputOriginal.value.toUpperCase();
    printChar(0, wordArray);
}
function printChar(currentLetterIndex, wordArray) {
    if (wordArray.length == currentLetterIndex)
        return;
    inputOriginal.value = inputOriginal.value.substring(1);
    var spanChar = document.createElement("span");
    resultado.appendChild(spanChar);
    animateChar(spanChar)
        .then(function () {
        var charSinCodificar = wordArray[currentLetterIndex];
        if (element.checked) {
            spanChar.innerHTML = alfabeto.includes(charSinCodificar) ?
                alfabeto[(alfabeto.indexOf(charSinCodificar) + parseInt(rango.value)) % alfabeto.length] :
                charSinCodificar;
            printChar(currentLetterIndex + 1, wordArray);
        }
        else {
            spanChar.innerHTML = alfabeto.includes(charSinCodificar) ?
                alfabeto[(alfabeto.indexOf(charSinCodificar) - parseInt(rango.value) + alfabeto.length) % alfabeto.length] :
                charSinCodificar;
            printChar(currentLetterIndex + 1, wordArray);
        }
    });
}
function animateChar(spanChar) {
    var cambiosDeLetra = 0;
    return new Promise(function (resolve) {
        var intervalo = setInterval(function () {
            spanChar.innerHTML = alfabeto[Math.floor(Math.random() * alfabeto.length)];
            cambiosDeLetra++;
            if (cambiosDeLetra === 3) {
                clearInterval(intervalo);
                resolve();
            }
        }, 50);
    });
}
var submit = function (e) {
    e.preventDefault();
    resultado.innerHTML = '';
    shifMessage();
};
cifrador.onsubmit = submit;
