const cardApi = "https://deckofcardsapi.com/api/deck/"
const newDeck = "new/shuffle/?deck_count=1"

let deckId
let drawn

////////////////////////
// Card Api funtions //
///////////////////////

const getDeck = () => {

	$.ajax({
		url: cardApi + newDeck
	}).then((card) => {
		deckId = card.deck_id
	}, (error) => {
		console.error(error)
	})

}

const drawCard = (num) => {

	const newDraw = `/draw/?count=${num}`

	$.ajax({
		url: cardApi + deckId + newDraww
	}).then((card) => {
		drawn = card.cards
	}, (error) => {
		console.error(error)
	})

}

const addPile = (name, card) => {

	const pileName = `/pile/${name}/add/?cards=${card}`

	$.ajax({
		url: cardApi + deckId + newDraww
	}).then((card) => {
		drawn = card.cards
	}, (error) => {
		console.error(error)
	})

}




$(()=>{

	getDeck()

})