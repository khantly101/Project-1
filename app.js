const cardApi = "https://deckofcardsapi.com/api/deck/"
const newDeck = "new/shuffle/?deck_count=1"
const cor = "https://cors-anywhere.herokuapp.com/"

const rows = ["filler", "row1", "row2", "row3", "row4", "row5", "row6", "row7"]

let deckId
let drawn 
let pile


////////////////////////
// Card Api funtions //
///////////////////////

const getDeck = async () => {

	let response = await fetch(cardApi + newDeck)
	let result = await response.json()
	deckId = result.deck_id

}	

const drawCard = async () => {

	const newDraw = `/draw/?count=1`

	let response = await fetch(cardApi + deckId + newDraw)
	result = await response.json()
	drawn = result.cards[0].code

}

const addPile = async (name, card) => {

	const pileName = `/pile/${name}/add/?cards=${card}`

	let response = await fetch(cardApi + deckId + pileName)
	let report = response.json()
	$(`#${card}`).removeClass("hidden").addClass("inPlay")
	$(`#${name}`).append($(`#${card}`))

}

const pileList = async (name) => {

	const pileUrl = `/pile/${name}/list`

	let response = await fetch(cor + cardApi + deckId + pileUrl)
	let result = await response.json()
	pile = result.piles[name].cards
	
}


////////////////////////
// Render //
///////////////////////

const checkRow = async (box) => {

	if (pile.length > 0) {
		$(`#${box}`).css("background-image", `url(images/${box}.jpg)`)
	} 
}

const setRow = async () => {

	for (let i = 1; i < 8; i+=1) {
		await pileList(rows[i])
		await checkRow(pile[pile.length -1].code, fillerId[i])
	}

}

const setDeck = async () => {

	if (pile.length > 0) {
		$(`#deck`).css("background-image", `url(images/blue_back.jpg)`)
	} else {
		$(`#deck`).css("background-image", ``)
	}
}


////////////////////////
// Draggable Function //
///////////////////////

const cardDrop = (event, ui) => {

	$(event.target).append(ui.draggable)

}


////////////////////////
// Start Game Function //
///////////////////////

const startGame = async () => {

	await getDeck()

	$(`#deck`).css("background-image", `url(images/blue_back.jpg)`)

	for (let i = 1; i < 8; i+=1) {
		for (let e = 0; e < i; e+=1) {
			await drawCard()
			addPile(rows[i], drawn)
		}
		$(`#${rows[i]}`).droppable({
			drop: cardDrop
		})
		$(`#${drawn}`).css("background-image", `url(images/${drawn}.jpg)`).draggable({
				containment: ".gameboard",
				snap: ".gameboard",
				revert: true,
				revertDuration: 0
			})
	}


	for (let i = 0; i < 24; i+=1) {
			await drawCard()
			addPile("deck", drawn)
			$(`#${drawn}`).css("display", "none")
	}

}


////////////////////////
// Ready funtion //
///////////////////////

$(()=>{


})