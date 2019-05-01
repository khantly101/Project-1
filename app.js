const cardApi = "https://deckofcardsapi.com/api/deck/"
const newDeck = "new/shuffle/?deck_count=1"
const cor = "https://cors-anywhere.herokuapp.com/"

const rows = ["filler", "row1", "row2", "row3", "row4", "row5", "row6", "row7"]

let deckId
let drawn = []
let pile = []
let cardCounter = ""
let drawNum = 3

const cardSet = { 
				 	"2C" : "#AD, #AH",
				 	"2S" : "#AD, #AH",
				 	"2D" : "#AC, #AS",
					"2H" : "#AC, #AS",  
				 	"3C" : "#2D, #2H",
				 	"3S" : "#2D, #2H",
				 	"3D" : "#2C, #2S",
					"3H" : "#2C, #2S", 
					"4C" : "#3D, #3H",
					"4S" : "#3D, #3H", 
					"4D" : "#3C, #3S",
					"4H" : "#3C, #3S", 
					"5C" : "#4D, #4H",
					"5S" : "#4D, #4H", 
					"5D" : "#4C, #4S",
					"5H" : "#4C, #4S",
					"6C" : "#5D, #5H",
					"6S" : "#5D, #5H",
					"6D" : "#5C, #5S",
					"6H" : "#5C, #5S",  
					"7C" : "#6D, #6H",
					"7S" : "#6D, #6H",
					"7D" : "#6C, #6S",
					"7H" : "#6C, #6S",
					"8C" : "#7D, #7H",
					"8S" : "#7D, #7H", 
					"8D" : "#7C, #7S",
				 	"8H" : "#7C, #7S", 
					"9C" : "#8D, #8H",
					"9S" : "#8D, #8H",
					"9D" : "#8C, #8S",
				 	"9H" : "#8C, #8S", 
					"0C" : "#9D, #9H",
					"0S" : "#9D, #9H",
					"0D" : "#9C, #9S",
				 	"0H" : "#9C, #9S", 
					"JC" : "#0D, #0H",
					"JS" : "#0D, #0H", 
					"JD" : "#0C, #0S",
				 	"JH" : "#0C, #0S",
					"QC" : "#JD, #JH",
					"QS" : "#JD, #JH", 
					"QD" : "#JC, #JS",
				 	"QH" : "#JC, #JS", 
					"KC" : "#QD, #QH",
					"KS" : "#QD, #QH",
					"KD" : "#QC, #QS",
				 	"KH" : "#QC, #QS"}


////////////////////////
// Card Api funtions //
///////////////////////

const getDeck = async () => {

	let response = await fetch(cardApi + newDeck)
	let result = await response.json()
	deckId = result.deck_id

}	

const drawCard = async (num) => {

	const newDraw = `/draw/?count=${num}`

	let response = await fetch(cardApi + deckId + newDraw)
	let result = await response.json()
	drawn = result.cards

}

const addPileDeck = async (card) => {

	const pileName = `/pile/deck/add/?cards=${card}`

	let response = await fetch(cardApi + deckId + pileName)

}

const addPileRow = async (name, card, target) => {

	const pileName = `/pile/${name}/add/?cards=${card}`

	let response = await fetch(cardApi + deckId + pileName)

	const newCard = $("<div>").addClass("card").attr("id", card)
	$(`#${target}`).append(newCard).droppable().on("click", setFace)

}

const addPileDrawn = async (card, target) => {

	const pileDrawn = `/pile/drawn/add/?cards=${card}`

	let response = await fetch(cardApi + deckId + pileDrawn)
	
	const newCard = $("<div>").addClass("card").attr("id", card).css("background-image", `url(images/${card}.jpg)`).droppable().addClass("drawn")
	$(`#${target}`).append(newCard).droppable()

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

const checkRow = (box) => {

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

const setDeck = () => {

	if (pile.length > 0) {
		$(`#deck`).css("background-image", `url(images/blue_back.jpg)`)
	} else {
		$(`#deck`).css("background-image", ``)
	}
}

const setFace = () => {

	let id = $(event.target).attr("id")
	if ($(event.target).prop("flippable") === true) {
			$(`#${id}`).css("background-image", `url(images/${id}.jpg)`).draggable({
				containment: ".gameboard",
				snap: ".gameboard",
				revert: true,
				revertDuration: 0
		}).droppable({
			accept: cardSet[id],
			drop: cardDrop
		})
	}

}

////////////////////////
// Draggable Function //
///////////////////////

const cardDrop = (event, ui) => {

	let parent = ui.draggable.parent()
	let id = parent.attr("id")

	if (parent.length === 1) {
		parent.droppable("enable")
	}
	if (parent.hasClass("card")) {
		parent.prop("flippable", true)
	}
	if (parent.hasClass("drawn")) {
		parent.draggable({
				containment: ".gameboard",
				snap: ".gameboard",
				revert: true,
				revertDuration: 0
		}).droppable({
			accept: cardSet[id],
			drop: cardDrop
		})
	}

	$(event.target).append(ui.draggable)
	$(event.target).droppable("disable")
}

const addDroppableRow = (i) => {

	$(`#${rows[i]}`).droppable({
		accept: "#KH, #KD, #KS, #KC",
		drop: cardDrop
	})
	$(`#${rows[i]}`).droppable("disable")
}

const addDroppableCard = () => {

	if (["AH", "AD", "AS", "AC"].includes($(`#${drawn[drawn.length - 1].code}`).attr("id")) === false) {
		$(`#${drawn[drawn.length - 1].code}`).droppable({
			accept: cardSet[drawn[drawn.length - 1].code],
			drop: cardDrop
		})
	}
}

////////////////////////
// Drawing Functions //
///////////////////////

const drawPile = async (num) => {

	const drawDeck = `/pile/deck/draw/?count=${num}`

	let response = await fetch(cardApi + deckId + drawDeck) 
	let result = await response.json()
	drawn = result.cards
}

const drawDrawn = async (num) => {

	const drawDeck = `/pile/drawn/draw/?cards=${num}`

	let response = await fetch(cardApi + deckId + drawDeck)
	let result = await response.json()
	drawn = result.cards
}

const resetDeck = async (cards) => {

	await pileList("drawn")
	await drawDrawn(pile.length)
	await addPileDeck(cards)
	await pileList("deck")
}

const showDrawn = async () => {

	$("#drawn").empty()

	if (pile.length === 0) {
		await resetDeck(cardCounter)
	}

	if (pile.length > drawNum) {
		await drawPile(drawNum)
	} else {
		await drawPile(pile.length)
	}

	cardCounter = drawn[0].code + "," + drawn[1].code + "," + drawn[2].code + "," + cardCounter

	for (let i = 0; i < drawn.length; i+=1) {
		if (i === 0) {
			await addPileDrawn(drawn[i].code, "drawn")
		} else {
			await addPileDrawn(drawn[i].code, drawn[i - 1].code)
		}
	}

	$(`#${drawn[drawn.length - 1].code}`).draggable({
				containment: ".gameboard",
				snap: ".gameboard",
				revert: true,
				revertDuration: 0
		}).droppable({
			accept: cardSet[drawn[drawn.length - 1].code],
			drop: cardDrop
		})

	await pileList("deck")
	await setDeck()

}


////////////////////////
// Start Game Function //
///////////////////////

const startGame = async () => {

	await getDeck()

	$(`#deck`).css("background-image", `url(images/blue_back.jpg)`)

	for (let i = 1; i < 8; i+=1) {
		await drawCard(i)
		for (let e = 0; e < i; e+=1) {
			if (e === 0) {
				await addPileRow(rows[i], drawn[e].code, rows[i])
			} else {
				await addPileRow(rows[i], drawn[e].code, drawn[e - 1].code)
			}
		}
		await addDroppableRow(i)
		await addDroppableCard()

		$(`#${drawn[drawn.length - 1].code}`).css("background-image", `url(images/${drawn[drawn.length - 1].code}.jpg)`).draggable({
				containment: ".gameboard",
				snap: ".gameboard",
				revert: true,
				revertDuration: 0
		})
	}

	await drawCard(24)
	for (let i = 0; i < 24; i+=1) {
			addPileDeck(drawn[i].code)
	}

	await pileList("deck")

}


////////////////////////
// Ready funtion //
///////////////////////

$(()=>{


})