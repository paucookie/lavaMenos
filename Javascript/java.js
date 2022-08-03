/* --------Constantes -----------*/
//Constante cards que lo buscamos en el documento por medio del id
const cards = document.getElementById( 'cards' )
//Constante items que lo buscamos en el documento por medio del id
const items = document.getElementById( 'items' )
//Constante footer que lo buscamos en el documento por medio del id
const footer = document.getElementById( 'footer' )
//Contante templateCard que la buscamos por el id, buscando las tarjetas de los productos
const templateCard = document.getElementById( 'template-card' ).content
//Constante templateFooter
const templateFooter = document.getElementById( 'template-footer' ).content
//Constante templateCarrito
const templateCarrito = document.getElementById( 'template-carrito' ).content
//Constante de una memoria fragment
const fragment = document.createDocumentFragment()


/* -----Declaraciones de variables ------ */
//Carrito
let carrito = {}


/* ------- Eventos ------- */
document.addEventListener('DOMContentLoaded', () => {
    fetchData()
});
//los cards detecten el click
cards.addEventListener('click', e => {
    //función par agregar al carrito
    addCarrito(e)
})

items.addEventListener('click', e =>{
    btnAccion(e)
})


/*------ Para acceder a la base de datos------*/
const fetchData = async () => {
    try {
        //respuesta
        const res = await fetch('api.json') //espera y leamos la base de datos
        const data = await res.json() // espera y la respuesta esta en jason 
        crearCards(data)
    //error
    } catch (error) {
        console.log(error)
    }
}

/* Creamos tarjetas de productos mediante una función buscando en la base de datos */
const crearCards = data =>{
    //busca el data por cada elecmento de producto
    data.forEach(producto => { 
        //dentro del templateCard acceder a h5 y el contenido será el title de la base de datos
        templateCard.querySelector('h5').textContent = producto.title
        //dentro del templateCard acceder a p y el contenido será el precio de la base de datos
        templateCard.querySelector('p').textContent = producto.precio
        //dentro del templateCard acceder a img, determina el atributo de la etiqueta ya creada
        templateCard.querySelector('img').setAttribute('src', producto.ThumbnailUrl)
        //dentro del templateCard acceder a .btn-dark que es el botón y determina el id del producto
        templateCard.querySelector('.btn-dark').dataset.id = producto.id

        //clonamos la tarjeta
        const clone = templateCard.cloneNode( true )
        fragment.appendChild( clone)
    })
    //aquí es donde vamos a colocar los hijos
    cards.appendChild(fragment)
}

//constante de addCarrito que atrape un elemento
const addCarrito = e =>{
    //si le doy click en el botón de agregar, hacemos una acción
    if(e.target.classList.contains('btn-dark')) {
        //movemos toda la info a setCarrito
        setCarrito(e.target.parentElement)
    }
    //detener cualquier otro evento que se pueda desarrollar 
    e.stopPropagation()
}

//constante que nos permita modificar el carro
const setCarrito = objeto => {
    //objeto de un producto
    const producto = {
        //contiene: id, title, precio y cantidad (empieza en 1)
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }

    // si carrito tiene product id
    if (carrito.hasOwnProperty(producto.id)){
        //si se esta duplicando el producto id aumenta 1 a cantidad
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    //estamos haciendo una copia de lo que hay en producto
    carrito[producto.id] = {...producto}
    crearCarrito()

}

const crearCarrito = () => {
    /* console.log(carrito) */
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
        /* boton más */
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        /* boton menos */
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        /* precio va a multiplicar la cantidad por el precio*/
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

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
        <th scope="row" colspan="5">Carrito vacío - comience a cotizar!</th>
        `
        return
    }

    /* sumando cantidad */
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    /* multiplicando cantidad por precio */
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio,0)

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
    if(e.target.classList.contains('btn-info')) {
        carrito[e.target.dataset.id] 
        const producto = carrito[e.target.dataset.id] 
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        crearCarrito()
    }

    //si la clase es btn danger - (acción de restar)
    if(e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id] 
        producto.cantidad--
        //desaparecer el producto
        if(producto.cantidad == 0) {
            delete carrito[e.target.dataset.id]
        }
        crearCarrito()
    }

    e.stopPropagation()



}
