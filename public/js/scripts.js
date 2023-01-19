// Load font
addStylesheetURL('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap')


document.addEventListener("DOMContentLoaded", function () {
	// Is there support for touch events or is it an apple device
	if (!is_touch_device() && !navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)) {
		document.documentElement.classList.add('custom_scroll')
	}


	// Set the width of the scrollbar
	document.documentElement.style.setProperty('--scroll_width', widthScroll() + 'px')
})



// Secondary functions
function addStylesheetURL(url) {
	var link = document.createElement('link')

	link.rel = 'stylesheet'
	link.href = url

	document.getElementsByTagName('head')[0].appendChild(link)

}


const is_touch_device = () => !!('ontouchstart' in window)


const widthScroll = () => {
	let div = document.createElement('div')

	div.style.overflowY = 'scroll'
	div.style.width = '50px'
	div.style.height = '50px'
	div.style.visibility = 'hidden'

	document.body.appendChild(div)

	let scrollWidth = div.offsetWidth - div.clientWidth
	document.body.removeChild(div)

	return scrollWidth
}