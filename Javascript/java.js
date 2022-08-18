/* --------Constantes -----------*/
//Constante cards que lo buscamos en el documento por medio del id
const cards = document.getElementById( 'cards' );
//Constante items que lo buscamos en el documento por medio del id
const items = document.getElementById( 'items' );
//Constante footer que lo buscamos en el documento por medio del id
const footer = document.getElementById( 'footer' );
//Constante de div donde se colocaran la galería de servicios
const laundryCard = document.getElementById('laundry-card');

const formRecoleccion = document.getElementById('form-recoleccion');
//Constante templateFooter
const templateFooter = document.getElementById( 'template-footer' ).content;
//Constante templateCarrito
const templateCarrito = document.getElementById( 'template-carrito' ).content;
//Constante de una memoria fragment
const fragment = document.createDocumentFragment();




/* -----Declaraciones de variables ------ */
//Carrito
let carrito = {};

/* ------Array de productos ----- */
const laundry = [
    {
        precio: 210,
        id: 1,
        title: 'Carga (hasta 7 kilos)',
        ThumbnailUrl: 'https://media.nu.nl/m/1sfxabya3wm0_sqr256.jpg/getest-dit-is-de-beste-wasmachine-voor-kleinere-huishoudens.jpg',
        altImg: 'lavado de ropa'
    },
    {
        precio: 30,
        id: 2,
        title: 'Kilo Extra',
        ThumbnailUrl: 'https://tqpytokz.cdn.imgeng.in/media-adsa/static/3852/601.jpg',
        altImg: 'kilo extra de ropa'
    },
    {
        precio: 80,
        id: 3,
        title: 'Cobija (cualquier tamaño)',
        ThumbnailUrl: 'https://b3h2.scene7.com/is/image/BedBathandBeyond/mktplace-p-70dde9bf-26a6-42b5-bf64-b557d4209acc?$imagePLP$&wid=256&hei=256',
        altImg: 'Lavado de Sabanas'
    },
    {
        precio: 140,
        id: 4,
        title: 'Edredón (cualquier tamaño)',
        ThumbnailUrl: 'https://images.rappi.com.mx/products/bf083229-5ef3-4a29-be6b-8a56000e8be5.png?d=200x200&e=webp',
        altImg: 'Lavado de Edredón'
    },
    {
        precio: 60,
        id: 5,
        title: 'Almohada',
        ThumbnailUrl: 'https://images.meesho.com/images/products/131100688/8wm6d_256.jpg',
        altImg: 'Lavado de Almohada'
    },
    {
        precio: 35,
        id: 6,
        title: 'Gorra',
        ThumbnailUrl: 'https://cdn.shopify.com/s/files/1/0024/4668/8301/products/ADI_MULLY_PERF_Negro_DP1617_01_standard_256x.jpg?v=1601179204',
        altImg: 'Lavado de Gorra'
    },
    {
        precio: 60,
        id: 7,
        title: 'Tenis',
        ThumbnailUrl: 'https://www.score.com.mx/web/image/product.template/10997/image_256/Tenis%20Puma%20Softride%20Premier%20Slip-on%20para%20hombre?unique=6ff9cbf',
        altImg: 'Lavado de Tenis'
    }
] 

localStorage.setItem('laundry',JSON.stringify(laundry));
localStorage.setItem('carrito',JSON.stringify(carrito));

//eventos
laundryCard.addEventListener('click', e => {
    //función par agregar al carrito
    console.log('estoy haciendo click')
    addCarrito(e)
})

items.addEventListener('click', e =>{
    btnAccion(e)
})

// Función de  poner las cosas en el carrito

//constante de addCarrito que atrape un elemento
const addCarrito = e =>{
    //si le doy click en el botón de agregar, hacemos una acción
    if(e.target.classList.contains('btn-agregar')) {
        //movemos toda la info a setCarrito
        setCarrito(e.target.parentElement)
    }
    //detener cualquier otro evento que se pueda desarrollar 
    e.stopPropagation()
}

const setCarrito = objeto => {
    //objeto de un producto
    const product = {
        //contiene: id, title, precio y cantidad (empieza en 1)
        id: objeto.querySelector('.btn-agregar').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }

    // si carrito tiene product id
    if (carrito.hasOwnProperty(product.id)){
        //si se esta duplicando el producto id aumenta 1 a cantidad
        product.cantidad = carrito[product.id].cantidad + 1
    }

    //estamos haciendo una copia de lo que hay en producto
    carrito[product.id] = {...product}
    crearCarrito()

}

const crearCarrito = () => {
    //el carrito comienza vacío
    items.innerHTML = ''
    //valores del carrito
    Object.values(carrito).forEach(producto => {
        /* id del producto */
        templateCarrito.querySelector('th').textContent = producto.id
        /* title pero entramos a querySelectorAll 0 para entrar al primer td */
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        /* cantidad pero entramos a querySelectorAll 1 para entrar al segundo td */
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelectorAll('td')[2].textContent = producto.precio
        /* boton menos */
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        /* precio va a multiplicar la cantidad por el precio*/
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio.split('$').join('')

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)

    /* Cambiar footer */
    cambiarFooter()
}

const cambiarFooter = () => {
    footer.innerHTML = ''
    //si el carrito está vacío
    if(Object.keys(carrito).length === 0){
        footer.innerHTML = `
        <th scope="row" colspan="5">Comience a cotizar!</th>
        `
        return
    }

    /* sumando cantidad */
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    /* multiplicando cantidad por precio */
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio.split('$').join(''),0)

    //para que aparezca
    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    /* Botón vaciar carrito */
    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        crearCarrito()
    })
}

/* boton accion */

const btnAccion = e => {
    console.log(e.target)
    //si la clase es btn info + (acción de aumentar)
    if(e.target.classList.contains('btn-agregar')) {
        carrito[e.target.dataset.id] 
        const producto = carrito[e.target.dataset.id] 
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        crearCarrito()
    }

    //si la clase es btn danger - (acción de restar)
    if(e.target.classList.contains('material-symbols-outlined')) {
        /* const producto = carrito[e.target.dataset.id] 
        producto.cantidad == 0
        //desaparecer el producto
        if(producto.cantidad == 0) { */
            delete carrito[e.target.dataset.id]
        /* } */
        crearCarrito()
    }

    e.stopPropagation()



}



console.log(addCarrito);

/* Crea las tarjetas de los servicios */
let renderLaundry = document.createElement('div');

let storageLaundry = JSON.parse(localStorage.getItem('laundry'));

storageLaundry.forEach (product => {
    laundryCard.innerHTML+=`<div class= "tarjeta">
                            <img src = "${product.ThumbnailUrl}" alt= "${product.altImg}" width= "200px"/>
                            <button class="btn-agregar" data-id="${product.id}">Agregar</button>
                            <h5>${product.title}</h5>
                            <p>$${product.precio}</p>
                            </div>`;
        
    
    laundryCard.appendChild(renderLaundry);
    
})

console.log(localStorage.getItem('laundry'));

const renderFormRecoleccion = () => {
    formRecoleccion.innerHTML = ''
    //si el carrito es mayor a 0
    if(Object.keys(carrito).length > 0){
        formRecoleccion.innerHTML = `
        <form action="recoleccion">
            <label for="fname">Nombre:</label> 
            <input type="text" id="fname" name="fname"><br>
            <label for="lname">Apellidos:</label> 
            <input type="text" id="lname" name="lname"><br>
            <label for="adress">Dirección:</label>
            <input type="text" id="adress" name="adress"><br>
            <label for="Colonia">Colonia:</label>
            <input type="text" id="colonia" name="colonia"><br>
            <label for="City">Ciudad:</label>
            <input type="text" id="city" name="city"><br>
            <label for="BetweenAdress">Entre que calles</label>
            <input type="text" id="betweenAdress" name="betweenAdress"><br>
            <label for="Phone">Celular:</label>
            <input type="number" id="phone" name="phone"><br>
        </form>
        `
        return
    }
}