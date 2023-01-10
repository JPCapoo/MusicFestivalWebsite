document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();

}

function navegacionFija() {

    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function() {
        console.log(sobreFestival.getBoundingClientRect());

        if (sobreFestival.getBoundingClientRect().top < 0) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }

    });
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach(function(enlace) {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const seccion = document.querySelector(e.target.attributes.href.value);

            seccion.scrollIntoView({
                behavior: "smooth"
            });
        });
    });
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i;

        imagen.onclick = mostrarImagen;

        const lista = document.createElement('LI');
        lista.appendChild(imagen);

        galeria.appendChild(lista);
    }
}

function mostrarImagen(e) {
    const id = parseInt(e.target.dataset.imagenId)

    //Genera la Imagen
    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`;

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    //Boton para cerrar Imagen
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('boton-cerrar');

    overlay.appendChild(cerrarImagen);

    //Mostrar en el HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');

    //Cuando se presiona se cierra la imagen
    cerrarImagen.onclick = () => {
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    //Cuando se da click, cerrar la imagen
    overlay.onclick = () => {
        overlay.remove();
        body.classList.remove('fijar-body');

    }
}