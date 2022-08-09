/* --------Constantes -----------*/
//Constante cards que lo buscamos en el documento por medio del id
const cards = document.getElementById( 'cards' );
//Constante items que lo buscamos en el documento por medio del id
const items = document.getElementById( 'items' );
//Constante footer que lo buscamos en el documento por medio del id
const footer = document.getElementById( 'footer' );
//Constante de div donde se colocaran la galería de servicios
const laundryCard = document.getElementById('laundry-card');

//Constante templateFooter
const templateFooter = document.getElementById( 'template-footer' ).content;
//Constante templateCarrito
const templateCarrito = document.getElementById( 'template-carrito' ).content;
//Constante de una memoria fragment
const fragment = document.createDocumentFragment();

const agregar = document.querySelector('.btn-agregar');



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

/* Crea las tarjetas de los servicios */
let renderLaundry = document.createElement('div');

laundry.forEach (product => {
    laundryCard.innerHTML+=`<div class= "tarjeta">
                            <img src = "${product.ThumbnailUrl}" alt= "${product.altImg}" width= "200px"/>
                            <button class="btn-agregar" data-id="${product.id}">Agregar</button>
                            <h5>${product.title}</h5>
                            <p>$${product.precio}</p>
                            </div>`;
        
    
    laundryCard.appendChild(renderLaundry);
    
})

//eventos


// Función de  poner las cosas en el carrito


const addCarrito = (e) =>{
    console.log(e.target);
    if(e.target.classList.contains('btn-agregar')){
        setCarrito(e.target.parentElement)
    }
}

const setCarrito = objeto =>{
    const product ={
        id: objeto.querySelector('.btn-agregar').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }

    if (carrito.hasOwnProperty('product.id')) {
        product.cantidad = cantidad [product.id] + 1
    }

    carrito[product.id] = {...product};
    renderCarrito();
}

const renderCarrito = () =>{
    items.innerHTML = ' ';
    Object.values(carrito).forEach(product =>
        templateCarrito.querySelector('th').textContent = product.id,
        templateCarrito.querySelector('td')[0].textContent = product.title,
        templateCarrito.querySelector('td')[1].textContent = product.cantidad,
        templateCarrito.querySelector('.btn-danger').dataset.id = product.id,
        templateCarrito.querySelector('.res-cant-prec').textContent = product.cantidad * product.precio,
        )
}


agregar.addEventListener('click', e => {
    addCarrito(e);
})