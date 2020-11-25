/* Inicio Declaracion del Objeto Producto*/
//Cada producto se vende solo en las cantidades determinadas: 6, 12 o 24
class Producto {

    constructor(id, nombre, precio, imagen, descripcion, cantidadUsuario, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.cantidadUsuario = cantidadUsuario;
        this.stock = stock;
        
    }
}
/*Fin Declaracion del Objeto Producto*/


function getProductos() {
	var productosComoObjetos = JSON.parse(Productos_Desde_BaseDeDatos);

	var productos = productosComoObjetos.map(
		(value) => new Producto (value.id, value.nombre, value.precio, value.imagen, value.descripcion, value.cantidadUsuario, value.stock)
	);

	return productos;
}


const Productos_Desde_BaseDeDatos = `[{
    "id": "D",
    "nombre": "Alfajor de Dulce de Leche",
    "precio": 50,
    "imagen": "images/Dulce de leche.jpeg",
    "descripcion": "Mini Alfajor de Dulce de leche (~ 30g) ideal para ese bocadito que necesitas sin sentirte culpable",
    "cantidadUsuario": 0,
    "stock": 100
  }, {
    "id": "Z",
    "nombre": "Alfajor con Nuez",
    "precio": 60,
    "imagen": "images/Nuez.jpeg",
    "descripcion": "Mini Alfajor de Dulce de Leche con nuez",
    "cantidadUsuario": 0,
    "stock": 100
  }, {
    "id": "M",
    "nombre": "Bombón tipo Marroc",
    "precio": 30,
    "imagen": "images/marroc.jpg",
    "descripcion": "Bombón tipo Marroc con dos capas de chocolate con leche y una de maní",
    "cantidadUsuario": 0,
    "stock": 100
  }, {
    "id": "N",
    "nombre": "Bombón con Nutella",
    "precio": 35,
    "imagen": "images/nutella.jpg",
    "descripcion": "Exquisito Bombón de chocolate relleno con Nutella",
    "cantidadUsuario": 0,
    "stock": 100
  }]`;

  var productos = getProductos();

productos.forEach((producto) => {
    var cardProductos = crearCardProductos(producto);
    contenedorCards.appendChild(cardProductos);
})

/*Inicio Función para crear la card de cada producto*/
function crearCardProductos (producto) {
  var cardProducto = document.createElement ("div");
  cardProducto.id = producto.id;
  cardProducto.classList = "card mb-4 producto";

  var elementosHTML = ` 
  <div> 
      <img src='${producto.imagen}' alt="Alfajor de dulce de leche" title="Alfajor-dulce-de-leche" class="card-img-top imagen-card">
  </div>
  <div class="align-items-center card-body">
      <p class="card-text text-center">${[producto.descripcion]}</p>
  </div>
  `
  cardProducto.innerHTML = elementosHTML;


  var divContenedorBotones = document.createElement ("div");
  divContenedorBotones.classList = "btn-toolbar d-flex justify-content-between p-3";

  var divContenedorSumayResta = document.createElement ("div");
  divContenedorSumayResta.classList = "btn-group btn-group-toggle";

  var inputMenos = document.createElement("input");
  inputMenos.type = "button";
  inputMenos.value = "-";
  inputMenos.classList = "btn btn-secondary restar"
  inputMenos.innerHTML = "";

  var input = document.createElement("input");
  input.type = "number";
  input.value = "0";
  input.id = producto.id;
  input.classList = "cantidad-carrito btn btn-secondary";
  input.setAttribute('disabled','disabled');
  input.innerHTML = "";

  var inputMas = document.createElement("input");
  inputMas.type = "button";
  inputMas.value = "+";
  inputMas.classList = "btn btn-secondary sumar"
  inputMas.innerHTML = "";

  
  var divAgregarCarrito = document.createElement("div");
  
  var buttonCarrito = document.createElement ("button");
  buttonCarrito.type = "button";
  buttonCarrito.classList = "btn btn-group btn-dark btn-success agregar";
  buttonCarrito.innerHTML = "Agregar al Carrito"

  buttonCarrito.addEventListener("click", () => {
      
      producto.cantidadUsuario = input.value;
      carrito.push(producto);
      localStorage.setItem (('carrito'), JSON.stringify (carrito))
      
});

  cardProducto.appendChild(divContenedorBotones);
  divContenedorBotones.appendChild (divContenedorSumayResta);
  divContenedorSumayResta.appendChild(inputMenos);
  divContenedorSumayResta.appendChild(input);
  divContenedorSumayResta.appendChild(inputMas);
  divContenedorBotones.appendChild(divAgregarCarrito);
  divAgregarCarrito.appendChild(buttonCarrito);


  

  return cardProducto;
}

/*Fin Función para crear la card de cada producto*/