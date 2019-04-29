const cardApi = "https://deckofcardsapi.com/api/deck/"
const newDeck = "new/shuffle/?deck_count=1"
// const pileName = {
// 				deck 		: "deck", 
// 				drawn		: "drawn",
// 				row1 		: "row1",
// 				row1Shown 	: "row1Shown",
// 				row2		: "row2",
// 				row2Shown 	: "row2Shown",
// 				row3		: "row3",
// 				row3Shown	: "row3Shown",
// 				row4		: "row4",
// 				row4Shown 	: "row4Shown",
// 				row5		: "row5",
// 				row5Shown 	: "row5Shown",
// 				row6		: "row6",
// 				row6Shown	: "row6Shown",	
// 				row7		: "row7",
// 				row7Shown 	: "row7Shown",
// 				firstPile 	: "firstPile",
// 				secondPile	: "secondPile",
// 				thirdPile 	: "thirdPile",
// 				fourthPile	: "fourthPile"
// 				}

////////////////////////
// Card Api funtions //
///////////////////////

const getDeck = () => {

	$.ajax({
		url: cardApi + newDeck
	}).then((deck) => {
		$(".deckId").text(deck.deck_id)
	}, (error) => {
		console.error(error)
	})

}

const drawCard = () => {

	const newDraw = `/draw/?count=1`

	$.ajax({
		url: cardApi + $(".deckId").text() + newDraw
	}).then((card) => {
		$(".cardId").text(card.cards[0].code)
	}, (error) => {
		console.error(error)
	})

}

const addPile = (name, card) => {

	const pileName = `/pile/${name}/add/?cards=${card}`

	$.ajax({
		url: cardApi + $(".deckId").text() + pileName
	}).then((card) => {
		console.log(card)
	}, (error) => {
		console.error(error)
	})
}

const pileList = (name) => {

	const pileUrl = `/pile/${name}/list`

	$.ajax({
		url: cardApi + $(".deckId").text() + pileUrl
	}).then((card) => {
		console.log(card)
	}, (error) => {
		console.error(error)
	})

}

const startGame = () => {

	drawCard()
	addPile("row1", $(".cardId").text())

}

$(()=>{

	getDeck()

})