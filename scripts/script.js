const cardsContainer = document.querySelector('.main-cards-container');
const cards = {
    cardSource: [],
    cardName: [],
}

// CARD CHECKER
let flippedCardCounter = 0;
let foundMatches = 0;
let flippedCards = {
    flippedCardNames: [],
    flippedCardElements: [],
};

// GETTING THE CARDS DATA

async function gettingTheCardsData() {
    try {
        const response = await fetch('../data/cards.json');
        
        if (!response.ok) {
            throw new Error(response.status);
        };

        const data = await response.json();

        /* for (let i = 0; i < data.length; i++) {
            cards.cardSource.push(data[i].cardSrc);
            cards.cardName.push(data[i].cardName);
        }; */

        displayingTheCards(data);
    } catch(e) {
        console.error(e);
    };
};

gettingTheCardsData();

// DISPLAYING THE CARDS

function displayingTheCards(cardsData) {
    for (let i = 0; i < 6; i++) {
        for (let iterator = 0; iterator < 2; iterator++) {
            const cardItself = document.createElement('button');
            cardItself.setAttribute('data-card-name', cardsData[i].cardName);
            cardItself.classList.add('main-card-itself');
            const cardItselfImage = document.createElement('img');
            cardItselfImage.classList.add('main-card-itself-image-card');
            cardItselfImage.src = '../assets/cards/card_back.png';
            cardItself.appendChild(cardItselfImage);

            cardsContainer.appendChild(cardItself);

            // RANDOM ORDER
            function randomOrder() {
                const randomness = Math.floor(Math.random() * 12);
                cardItself.style.order = randomness;
            };

            randomOrder();

            // DISABLING THE CARDS
            function diablingTheCards() {
                for (const card of cardsContainer.children) {
                    card.disabled = true;
                };
            };

            // ENABLING THE CARDS
            function enablingTheCards() {
                for (const card of cardsContainer.children) {
                    card.disabled = false;
                };
            };

            // FLIPPING CARDS
            cardItself.addEventListener('click', () => {
                flippedCardCounter++;
                cardItself.classList.add('main-card-itself-flipped');
                setTimeout(() => cardItselfImage.src = cardsData[i].cardSrc, 100);
                flippedCards.flippedCardNames.push(cardsData[i].cardName);
                flippedCards.flippedCardElements.push(cardItself);

                if (flippedCardCounter === 2) {
                    diablingTheCards();
                    const firstCard = flippedCards.flippedCardNames[0];
                    const secondCard = flippedCards.flippedCardNames[1];
                    
                    if (firstCard === secondCard) {
                        foundMatches++;
                        setTimeout(() => {
                            flippedCards.flippedCardElements[0].classList.add('main-card-itself-found');
                            flippedCards.flippedCardElements[1].classList.add('main-card-itself-found');
                        }, 400);

                        if (foundMatches === 6) {
                            foundMatches = 0;
                            setTimeout(() => alert('Congratulations, You won!'), 1000);

                            setTimeout(() => {
                                cardsContainer.innerHTML = '';
                                gettingTheCardsData();
                            }, 2000);
                        };
                    } else {
                        setTimeout(() => {
                            flippedCards.flippedCardElements[0].classList.remove('main-card-itself-flipped');
                            flippedCards.flippedCardElements[1].classList.remove('main-card-itself-flipped');
                            flippedCards.flippedCardElements[0].firstElementChild.src = '../assets/cards/card_back.png';
                            flippedCards.flippedCardElements[1].firstElementChild.src = '../assets/cards/card_back.png';
                        }, 400);
                    };
                    setTimeout(() => {
                        enablingTheCards();
                        flippedCardCounter = 0;
                        flippedCards.flippedCardElements = [];
                        flippedCards.flippedCardNames = [];
                    }, 600);
                };
            });
        };
    };
};