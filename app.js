const cardApi = "https://deckofcardsapi.com/api/deck/"
const newDeck = "new/shuffle/?deck_count=1"
const cor = "https://cors-anywhere.herokuapp.com/"

const rows = ["filler", "row1", "row2", "row3", "row4", "row5", "row6", "row7"]

let deckId
let drawn 

////////////////////////
// Card Api funtions //
///////////////////////



const getDeck = async () => {

	let response = await fetch(cardApi + newDeck)
	deckId = await response.json()

}	

const drawCard = async () => {

	const newDraw = `/draw/?count=1`

	let response = await fetch(cardApi + deckId.deck_id + newDraw)
	drawn = await response.json()

}

const addPile = async (name, card) => {

	const pileName = `/pile/${name}/add/?cards=${card}`

	let response = await fetch(cardApi + deckId.deck_id + pileName)
	let report = response.json()
	console.log(await report)


}

const pileList = async (name) => {

	const pileUrl = `/pile/${name}/list`

	let response = await fetch(cor + cardApi + deckId.deck_id + pileUrl)
	let report = response.json()
	console.log(await report)


}


const pileUrl = `/pile/${name}/list`

const startGame = async () => {

	await getDeck()

	for (let i = 1; i < 8; i+=1) {
		for (let e = 0; e < i; e+=1) {
			await drawCard()
			addPile(rows[i], drawn.cards[0].code)
			// await pileList(rows[i])
		}

	}

	for (let i = 0; i < 24; i+=1) {
			await drawCard()
			addPile("deck", drawn.cards[0].code)
			// await pileList("deck")
	}


}

$(()=>{

	// getDeck()

})