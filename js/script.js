/*
#Consegna
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. 
Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - 
la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare 
sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti 
(ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, 
cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

# MILESTONE 1
Prepariamo "qualcosa" per tenere il punteggio dell'utente.
Quando l'utente clicca su una cella, incrementiamo il punteggio.
Se riusciamo, facciamo anche in modo da non poter più cliccare la stessa cella.
# MILESTONE 2
Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
Generiamoli e stampiamo in console per essere certi che siano corretti
# MILESTONE 3
Quando l'utente clicca su una cella, verifichiamo se ha calpestato una bomba, controllando se il numero di cella è presente nell'array di bombe. Se si, la cella diventa rossa (raccogliamo il punteggio e scriviamo in console che la partita termina) altrimenti diventa azzurra e dobbiamo incrementare il punteggio.
# MILESTONE 4
Quando l'utente clicca su una cella, e questa non è una bomba, dobbiamo controllare se il punteggio incrementato ha raggiunto il punteggio massimo perchè in quel caso la partita termina. Raccogliamo quindi il messaggio è scriviamo un messaggio appropriato.
(Ma come stabiliamo quale sia il punteggio massimo?)
# MILESTONE 5
Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata una bomba o se perchè l'utente ha raggiunto il punteggio massimo. Dobbiamo poi stampare in pagina il punteggio raggiunto ed il messaggio adeguato in caso di vittoria o sconfitta.
#BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
#SUPER BONUS
Quando l'utente clicca una bomba, scopriamo tutte le caselle del tabellone, colorando di rosso tutte le bombe
Forza ragazzi!!!!
*/

const grid = document.getElementById('grid');
const button = document.getElementById('button');

const container = document.querySelector('.container');
const scorePlayer =document.getElementById('score-player');

let isGameOver = false;

 
const startGame = () => {
    button.innerText = 'Ricomincia';
    container.classList.add('d-show');
    grid.innerText = '';

    const createCell = () => {
        const newCell = document.createElement('div');
        newCell.className = ('cell')
        return newCell;
    }

    const rows = 10;
    const cols = 10;
    const totCell = rows * cols;

    let score = 0;
    scorePlayer.innerText = score;


   
    

    //creare 16 numeri casuali
    const generateBombs = (maxBomb, totalBombs) => {

         // preparo variabili bombe
         totalBombs = 16;
         maxPoints = totCell - totalBombs;

        const bombs = [ ];
        while(bombs.length < totalBombs){
            const randomNumber = Math.floor(Math.random () * (maxBomb))+1;
            if(!bombs.includes(randomNumber))bombs.push(randomNumber);
        }
        console.log(bombs)
        console.log(maxBomb, totalBombs)
        return bombs;
        
    }

    const endGame = (score, hasWon = false) => {
        const message = hasWon ? `Hai vinto!` : `Hai perso! Hai totalizzato ${score} punti.`
        alert(message);
        isGameOver = true;
    }

    bombs = generateBombs(totCell);

    //numero celle
    for(let i = 0; i < totCell; i++){
   
        //creare cella
        const cell = createCell();
        cell.innerText = i +1;
    
        // al click mettiamo o togliamo la classe clicked
        cell.addEventListener('click', () => {
          if(isGameOver) return;
          cell.classList.toggle('clicked');
          console.log(cell.innerText)

           //controllo se ha cliccato una bomba
           const hasHitBomb = bombs.includes(parseInt(cell.innerText));

           if(hasHitBomb){
              cell.classList.add('bomb');
              endGame(score, false)
           }else{
             //incremento il punteggio
             scorePlayer.innerText = ++score;

             //ha vinto?
             if(score === maxPoints){
                console.log('hai vinto')
                endGame(score, true)
             }
            }
        })
       
        //aggiungo in pagina la cella
        grid.appendChild(cell);
    }
}

// ADDEVENTLISTENER
button.addEventListener('click', startGame)


//TODO: COSE DA FINIRE

// non puoi cliccare due volte nella stessa cella
