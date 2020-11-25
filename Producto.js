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


var productos = [];
/*Lectura de los productos desde productos.json con ajax*/
$.ajax('productos.json').done(function (data) {
   
  productos = data
  console.log (productos)
  // productos.forEach(function (producto) {
  var productos2 = productos.map(
     		(value) => new Producto (value.id, value.nombre, value.precio, value.imagen, value.descripcion, value.cantidadUsuario, value.stock)
     	);
//  })
  productos = productos2;
  console.log(productos)

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


/*Función para indicar que se agregó el pedido al carrito*/
$('.agregar').click(function (){
   var $this = $(this);
   var textoOriginal = $this.text();

   $this.text('Agregado');
   $this.removeClass('btn-dark');

   setTimeout(function () {
       $this.text(textoOriginal);
       $this.addClass('btn-dark');
   }, 1000);
});

 
 })



  

