/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    

        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
     

        // append the game to the games-container
         for (const game of games) {
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Backers:</strong> ${game.backers.toLocaleString()}</p>
            <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
            <p><strong>Goal:</strong> $${game.goal.toLocaleString()}</p>
        `;

        gamesContainer.appendChild(gameCard);
    }

    addCardClickHandlers();
       
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalBackers = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers
}, 0);

console.log(totalBackers)

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalBackers.toLocaleString()}`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalAmount = GAMES_JSON.reduce( (akk, game) => {
    return akk + game.pledged
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalAmount.toLocaleString()}`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const numGames = GAMES_JSON.reduce ( (ahk, game) => {
    return ahk + 1
}, 0)
gamesCard.innerHTML = `${numGames}`


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let poorGames = GAMES_JSON.filter ( (game) => {
        return game.pledged < game.goal
    })

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(poorGames)
}
filterUnfundedOnly()

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let raisedGames = GAMES_JSON.filter ( (game) => {
        return game.pledged >= game.goal
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(raisedGames)
}
filterFundedOnly();
// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON)
   
    // add all games from the JSON data to the DOM
}
showAllGames()
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly)
fundedBtn.addEventListener("click", filterFundedOnly)
allBtn.addEventListener("click", showAllGames)

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnfundedGames = GAMES_JSON.reduce ( (count, game) => {
    return game.pledged < game.goal ? count + 1 : count;
}, 0)



// create a string that explains the number of unfunded games using the ternary operator
const totalAmont = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);

// Use a template string with ternary operator to generate the description
const descriptionText = `
    We've raised a total of $${totalAmount.toLocaleString()} for ${numGames} games. 
    ${numUnfundedGames === 1 
        ? `Currently, there is 1 game that remains unfunded.` 
        : `Currently, there are ${numUnfundedGames} games that remain unfunded.`}
`;

// Set the inner HTML of the description container
//descriptionContainer.innerHTML = descriptionText;
descriptionContainer.innerHTML = "<p>The purpose of our company is to fund independent games. We've been in operation for 12 years</p>"

// create a new DOM element containing the template string and append it to the description container
const descriptionParagraph = document.createElement("p");
descriptionParagraph.innerHTML = descriptionText;
descriptionContainer.appendChild(descriptionParagraph)
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item


// Destructure the top 2 games
const [topGame, secondGame, ...rest] = sortedGames;

// Create and append name of top game
const topGameElement = document.createElement("p");
topGameElement.textContent = topGame.name;
firstGameContainer.appendChild(topGameElement);

// Create and append name of second game
const secondGameElement = document.createElement("p");
secondGameElement.textContent = secondGame.name;
secondGameContainer.appendChild(secondGameElement);

const modal = document.getElementById('gameModal');
const modalBody = document.getElementById('modal-body');
const closeButton = document.querySelector('.close-button');


closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});


window.addEventListener('click', (e) => {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
});

function addCardClickHandlers() {
  document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', () => {
      modalBody.innerHTML = card.innerHTML;
      modal.style.display = 'block';
    });
  });
}