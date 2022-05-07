/*
	Astral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$main = $('#main'),
		$panels = $main.children('.panel'),
		$nav = $('#nav'), $nav_links = $nav.children('a');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '361px',   '736px'  ],
			xsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		$nav_links
			.on('click', function(event) {

				var href = $(this).attr('href');

				// Not a panel link? Bail.
					if (href.charAt(0) != '#'
					||	$panels.filter(href).length == 0)
						return;

				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Change panels.
					if (window.location.hash != href)
						window.location.hash = href;

			});

	// Panels.

		// Initialize.
			(function() {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

					}

				// No panel/link? Default to first.
					if (!$panel
					||	$panel.length == 0) {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Deactivate all panels except this one.
					$panels.not($panel)
						.addClass('inactive')
						.hide();

				// Activate link.
					$link
						.addClass('active');

				// Reset scroll.
					$window.scrollTop(0);

			})();

		// Hashchange event.
			$window.on('hashchange', function(event) {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

						// No target panel? Bail.
							if ($panel.length == 0)
								return;

					}

				// No panel/link? Default to first.
					else {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Deactivate all panels.
					$panels.addClass('inactive');

				// Deactivate all links.
					$nav_links.removeClass('active');

				// Activate target link.
					$link.addClass('active');

				// Set max/min height.
					$main
						.css('max-height', $main.height() + 'px')
						.css('min-height', $main.height() + 'px');

				// Delay.
					setTimeout(function() {

						// Hide all panels.
							$panels.hide();

						// Show target panel.
							$panel.show();

						// Set new max/min height.
							$main
								.css('max-height', $panel.outerHeight() + 'px')
								.css('min-height', $panel.outerHeight() + 'px');

						// Reset scroll.
							$window.scrollTop(0);

						// Delay.
							window.setTimeout(function() {

								// Activate target panel.
									$panel.removeClass('inactive');

								// Clear max/min height.
									$main
										.css('max-height', '')
										.css('min-height', '');

								// IE: Refresh.
									$window.triggerHandler('--refresh');

								// Unlock.
									locked = false;

							}, (breakpoints.active('small') ? 0 : 500));

					}, 250);

			});

	// IE: Fixes.
		if (browser.name == 'ie') {

			// Fix min-height/flexbox.
				$window.on('--refresh', function() {

					$wrapper.css('height', 'auto');

					window.setTimeout(function() {

						var h = $wrapper.height(),
							wh = $window.height();

						if (h < wh)
							$wrapper.css('height', '100vh');

					}, 0);

				});

				$window.on('resize load', function() {
					$window.triggerHandler('--refresh');
				});

			// Fix intro pic.
				$('.panel.intro').each(function() {

					var $pic = $(this).children('.pic'),
						$img = $pic.children('img');

					$pic
						.css('background-image', 'url(' + $img.attr('src') + ')')
						.css('background-size', 'cover')
						.css('background-position', 'center');

					$img
						.css('visibility', 'hidden');

				});

		}

})(jQuery);

// FUNCIONES DE MENU AGREGADO - Quizas poner todas las funciones y demas dentro del segundo ".then" no es lo mejor
var entrada = 0
var principal = 1
var postre = 2
var bebida = 3

let slideIndex = 0;
let slideIndex2 = 0;
let slideIndex3 = 0;
let slideIndex4 = 0;
fetch('https://run.mocky.io/v3/2ab15c91-c1ca-4ed9-862b-46988b5cb5e2')
.then( res => res.text() )
.then( datos => {
    menu = JSON.parse(datos)

    categoriasMenu = Object.getOwnPropertyNames(menu) // Array con las categorias del menu: "entrada", "principal", "postre", "bebida"
    
    for(opcion in categoriasMenu) {
        var categoriaPlato = categoriasMenu[opcion]
        var numeroPlato = 1 // Contador para poner "1. nombrePlatoRico"
        var itemCategoria = 'item-' + categoriaPlato
        var slideCategoria = 'slide-' + categoriaPlato
        var menuItem = document.getElementById(itemCategoria)
        var slideMenu = document.getElementById(slideCategoria)
        for(plato in menu[categoriaPlato]) {
            insertarPlato(menu[categoriaPlato][plato], numeroPlato)
            insertarFotosMenu(menu[categoriaPlato][plato], numeroPlato)
            numeroPlato = numeroPlato + 1
        }
    }
    mostrarFotosMenu()
    mostrarFotosMenu2()
    mostrarFotosMenu3()
    mostrarFotosMenu4()
    
    function insertarPlato(plato, numero) {
        menuItem.insertAdjacentHTML('beforebegin', `
            <div class="menu-item">
                <div class="menu-img">
                    <img src="img/menu/${categoriaPlato}/${numero}.jpg" alt="Image">
                </div>
                <div class="menu-text">
                    <h3><span>${numero}. ${plato.nombre}</span> <strong>$${plato.precio}</strong></h3>
                    <p>${plato.descripcion}</p>
                </div>
            </div>`)
    }
    
    function insertarFotosMenu(plato, numero) {
        var slideCategoria = 'slide-' + categoriaPlato
        var fotoMenu = 'fotoMenu-' + categoriaPlato
        slideMenu.insertAdjacentHTML('beforeend', `
            <div class="mySlides fade ${fotoMenu} ${slideCategoria}">
                <img src="img/menu/${categoriaPlato}/${numero}.jpg" style="width:100%">
                <div class="text-align-center">${numero}. ${plato.nombre}</div>
            </div>`)
    }
    
    /* arreglar esta parte de los "mostrarFotoMenu - CORECCION PARA SACARLO RAPIDO ANDANDO */
    function mostrarFotosMenu() {        
        let i;
        let slides = document.getElementsByClassName("slide-entrada"); // Aca ver de armar slidesCategoria asi toma slides.length
        let dots = document.getElementsByClassName("fotoMenu-entrada");
        
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";  
        dots[slideIndex-1].className += " active";
        setTimeout(mostrarFotosMenu, 2000); // Change image every 2 seconds
    }
    function mostrarFotosMenu2() {
        let i;
        let slides = document.getElementsByClassName("slide-principal"); // Aca ver de armar slidesCategoria asi toma slides.length
        let dots = document.getElementsByClassName("fotoMenu-principal");
        
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex2++;
        if (slideIndex2 > slides.length) {slideIndex2 = 1}    
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex2-1].style.display = "block";  
        dots[slideIndex2-1].className += " active";
        setTimeout(mostrarFotosMenu2, 2000); // Change image every 2 seconds
    }
    function mostrarFotosMenu3() {
        let i;
        let slides = document.getElementsByClassName("slide-postre"); // Aca ver de armar slidesCategoria asi toma slides.length
        let dots = document.getElementsByClassName("fotoMenu-postre");
        
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex3++;
        if (slideIndex3 > slides.length) {slideIndex3 = 1}    
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex3-1].style.display = "block";  
        dots[slideIndex3-1].className += " active";
        setTimeout(mostrarFotosMenu3, 2000); // Change image every 2 seconds
    }
    function mostrarFotosMenu4() {
        let i;
        let slides = document.getElementsByClassName("slide-bebida"); // Aca ver de armar slidesCategoria asi toma slides.length
        let dots = document.getElementsByClassName("fotoMenu-bebida");
        
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex4++;
        if (slideIndex4 > slides.length) {slideIndex4 = 1}    
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex4-1].style.display = "block";  
        dots[slideIndex4-1].className += " active";
        setTimeout(mostrarFotosMenu4, 2000); // Change image every 2 seconds
    }
})