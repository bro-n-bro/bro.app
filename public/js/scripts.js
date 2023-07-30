// Windows sizes for responsive
WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight


// Load font
addStylesheetURL('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,500;1,500&family=Inter:wght@400;500;600&display=swap')


document.addEventListener("DOMContentLoaded", function () {
	// Is there support for touch events or is it an apple device
	if (!is_touch_device() && !navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)) {
		document.documentElement.classList.add('custom_scroll')
	}


	// Set the width of the scrollbar
	document.documentElement.style.setProperty('--scroll_width', widthScroll() + 'px')


	// Mob. version
	fakeResize = false
	fakeResize2 = true

	if (document.body.clientWidth < 360) {
		document.getElementsByTagName('meta')['viewport'].content = 'width=360, user-scalable=no'
	}
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth


	// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 360) document.getElementsByTagName('meta')['viewport'].content = 'width=360, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
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