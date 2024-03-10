const wordList = [
    {
        word: "python",
        hint: "programming language"
    },
    {
        word: "guitar",
        hint: "a musical instrument"
    },
    {
        word: "aim",
        hint: "a purpose or intention"
    },
    {
        word: "venus",
        hint: "planet of our solar system"
    },
    {
        word: "gold",
        hint: "a yellow precious metal"
    },
    {
        word: "ebay",
        hint: "online shopping site"
    },
    {
        word: "golang",
        hint: "programming language"
    },
    {
        word: "coding",
        hint: "related to programming"
    },
    {
        word: "matrix",
        hint: "science fiction movie"
    },
    {
        word: "bugs",
        hint: "related to programming"
    },
    {
        word: "avatar",
        hint: "epic science fiction film"
    },
    {
        word: "gif",
        hint: "a file format for image"
    },
    {
        word: "mental",
        hint: "related to the mind"
    },
    {
        word: "map",
        hint: "diagram represent of an area"
    },
    {
        word: "island",
        hint: "land surrounded by water"
    },
    {
        word: "hockey",
        hint: "a famous outdoor game"
    },
    {
        word: "chess",
        hint: "related to an indoor game"
    },
    {
        word: "viber",
        hint: "a social media app"
    },
    {
        word: "github",
        hint: "code hosting platform"
    },
    {
        word: "png",
        hint: "a image file format"
    },
    {
        word: "silver",
        hint: "precious greyish-white metal"
    },
    {
        word: "mobile",
        hint: "an electronic device"
    },
    {
        word: "gpu",
        hint: "computer component"
    },
    {
        word: "java",
        hint: "programming language"
    },
    {
        word: "google",
        hint: "famous search engine"
    },
    {
        word: "venice",
        hint: "famous city of waters"
    },
    {
        word: "excel",
        hint: "microsoft product for windows"
    },
    {
        word: "mysql",
        hint: "a relational database system"
    },
    {
        word: "nepal",
        hint: "developing country name"
    },
    {
        word: "flute",
        hint: "a musical instrument"
    },
    {
        word: "crypto",
        hint: "related to cryptocurrency"
    },
    {
        word: "tesla",
        hint: "unit of magnetic flux density"
    },
    {
        word: "mars",
        hint: "planet of our solar system"
    },
    {
        word: "proxy",
        hint: "related to server application"
    },
    {
        word: "email",
        hint: "related to exchanging message"
    },
    {
        word: "html",
        hint: "markup language for the web"
    },
    {
        word: "air",
        hint: "related to a gas"
    },
    {
        word: "idea",
        hint: "a thought or suggestion"
    },
    {
        word: "server",
        hint: "related to computer or system"
    },
    {
        word: "svg",
        hint: "a vector image format"
    },
    {
        word: "jpeg",
        hint: "a image file format"
    },
    {
        word: "search",
        hint: "act to find something"
    },
    {
        word: "key",
        hint: "small piece of metal"
    },
    {
        word: "egypt",
        hint: "a country name"
    },
    {
        word: "joker",
        hint: "psychological thriller film"
    },
    {
        word: "dubai",
        hint: "developed country name"
    },
    {
        word: "photo",
        hint: "representation of person or scene"
    },
    {
        word: "nile",
        hint: "largest river in the world"
    },
    {
        word: "rain",
        hint: "related to a water"
    },
]



const keyboardDiv=document.querySelector(".keyboard");
const guessText=document.querySelector(".guesses-text b");
const wordDisplay=document.querySelector(".word-display");
const hangmanImage=document.querySelector(".hangman-box img");
const gameModal=document.querySelector(".game-modal")
const playAgainButton=document.querySelector(".play-again")

let currentWord,correctLetters,wrongGuessCount;
const maxGuess=6;

// Creating keyboard buttons dynamically and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button=document.createElement("button");
    button.innerText=String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click",e=>initGame(e.target,String.fromCharCode(i)));
}


const resetGame=()=>{
    correctLetters=[];
    wrongGuessCount=0;
hangmanImage.src=`/images/hangman-${wrongGuessCount}.svg`;
guessText.innerText=`${wrongGuessCount}/${maxGuess}`;
keyboardDiv.querySelectorAll("button").forEach(btn=>btn.disabled=false);
    wordDisplay.innerHTML=currentWord.split("").map(()=>`<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}


// Get random words and hints from wordlist array
const getRandomWord=()=>{
    const{word,hint}=wordList[Math.floor(Math.random()*wordList.length)];
    currentWord=word;
    console.log(word,hint);
    document.querySelector(".hint-text b").innerText=hint;
    resetGame();
}
getRandomWord();


const gameOver=(isVictory)=>{
     setTimeout(()=>{
     const modalText=isVictory?`You found the word : ` : `The correct word is : `;
     gameModal.querySelector("img").src=`images/${isVictory?'victory':'lost'}.gif`;
     gameModal.querySelector("h4").innerText=`${isVictory?'Congrats!': 'Game Over'}`;
gameModal.querySelector("p").innerHTML=`${modalText} <b>${currentWord}</b>`;

        gameModal.classList.add("show");
     },300)
}



const initGame=(button,clickedLetter)=>{
    console.log(button,clickedLetter);
    if(currentWord.includes(clickedLetter)){
          [...currentWord].forEach((letter,index)=>{
               if(letter===clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText=letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
               }
    });
 } else{
     console.log(`${clickedLetter} does not exist in word`);
wrongGuessCount++;
hangmanImage.src=`/images/hangman-${wrongGuessCount}.svg`;
    }

  button.disabled=true;  guessText.innerText=`${wrongGuessCount}/${maxGuess}`;

//   GameOver function call
if(wrongGuessCount===maxGuess) return gameOver(false);
if(correctLetters.length===currentWord.length) return gameOver(true);

}


playAgainButton.addEventListener("click",getRandomWord);


