const allowDrop = () => {
	event.preventDefault()
}

const drag = () => {
	event.dataTransfer.setData("text", event.target.id)
}

const drop = () => {
	event.preventDefault()
	let data = event.dataTransfer.getData("text")
	$(event.target).append($(data))
}