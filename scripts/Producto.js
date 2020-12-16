/* Inicio Declaracion del Objeto Producto*/

class Producto {

  constructor(id, nombre, precio, imagen, descripcion, cantidadUsuario) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.descripcion = descripcion;
    this.cantidadUsuario = cantidadUsuario
  }
}
/*Fin Declaracion del Objeto Producto*/

/*Función para mostrar cantidad de productos en carrito en el widget*/
function badgeCarrito(carrito) {
  let carritoMenu = document.getElementById("cantidadCarrito");
  if (carrito.length) {

    cantidadCarrito = 0;
    carrito.forEach((producto) => {
      cantidadCarrito = cantidadCarrito + parseInt(producto.cantidadUsuario);
    })
    if (carritoMenu) {
      carritoMenu.innerHTML = cantidadCarrito;
    }
  }
}

let productos = [];

/*---------------------------------------------------------------INICIO AJAX*/
/*Lectura de los productos desde productos.json con ajax*/
$.ajax('database/productos.json').done(function (data) {

  productos = data;


  let productos2 = productos.map(
    (value) => new Producto(value.id, value.nombre, value.precio, value.imagen, value.descripcion, value.cantidadUsuario)
  );


  productos = productos2;

  var contenedorCards = document.getElementById("contenedorCards");
  /*Creación cards de Productos en home*/
  productos.forEach((producto) => {
    let cardProductos = crearCardProductos(producto);
    if (contenedorCards) {
      contenedorCards.appendChild(cardProductos);
    }
  })

  /*Función para indicar que se agregó el pedido al carrito*/
  $('.agregar').click(function () {
    let $this = $(this);
    let textoOriginal = $this.text();

    $this.text('Agregado');
    $this.removeClass('btn-dark');

    setTimeout(function () {
      $this.text(textoOriginal);
      $this.addClass('btn-dark');
    }, 1000);
  });


  badgeCarrito(carrito);

  /*Inicio Función para crear la card de cada producto*/
  function crearCardProductos(producto) {
    let cardProducto = document.createElement("div");
    cardProducto.id = producto.id;
    cardProducto.classList = "card mb-4 producto";

    let elementosHTML = ` 
  <div> 
      <img src='${producto.imagen}' alt='${producto.nombre}' title='${producto.nombre}' class="card-img-top imagen-card">
  </div>
  <div class="align-items-center card-body">
      <p class="card-text text-center">${[producto.descripcion]}</p>
  </div>
  `
    cardProducto.innerHTML = elementosHTML;


    let divContenedorBotones = document.createElement("div");
    divContenedorBotones.classList = "btn-toolbar d-flex justify-content-between p-3";

    let divContenedorSumayResta = document.createElement("div");
    divContenedorSumayResta.classList = "btn-group btn-group-toggle";

    let inputMenos = document.createElement("input");
    inputMenos.type = "button";
    inputMenos.value = "-";
    inputMenos.classList = "btn btn-secondary restar"
    inputMenos.innerHTML = "";

    let input = document.createElement("input");
    input.type = "number";
    input.value = "0";
    input.id = producto.id;
    input.classList = "cantidad-carrito btn btn-secondary";
    input.setAttribute('disabled', 'disabled');
    input.innerHTML = "";

    let inputMas = document.createElement("input");
    inputMas.type = "button";
    inputMas.value = "+";
    inputMas.classList = "btn btn-secondary sumar";
    inputMas.innerHTML = "";


    let divAgregarCarrito = document.createElement("div");

    let buttonCarrito = document.createElement("button");
    buttonCarrito.type = "button";
    buttonCarrito.classList = "btn btn-group btn-dark btn-success agregar";
    buttonCarrito.innerHTML = "Agregar al Carrito";

    if (input.value == 0) {
      buttonCarrito.setAttribute('disabled', 'disabled');
    }

    inputMas.addEventListener("click", () => {
      buttonCarrito.removeAttribute('disabled');
    })

    inputMenos.addEventListener("click", () => {
      if (input.value == 6)
        buttonCarrito.setAttribute('disabled', 'disabled');
    })

    buttonCarrito.addEventListener("click", () => {
      let pruebaDeId = producto.id;
      let verificar = false;

      carrito.forEach((producto) => {
        if (pruebaDeId == producto.id) {
          producto.cantidadUsuario = parseInt(producto.cantidadUsuario) + parseInt(input.value);
          verificar = true;
        }
      })

      if (verificar == false) {
        producto.cantidadUsuario = input.value;
        carrito.push(producto);
      }
      input.value = 0
      buttonCarrito.setAttribute('disabled', 'disabled');
      localStorage.setItem(('carrito'), JSON.stringify(carrito));
      badgeCarrito(carrito);

    });

    cardProducto.appendChild(divContenedorBotones);
    divContenedorBotones.appendChild(divContenedorSumayResta);
    divContenedorSumayResta.appendChild(inputMenos);
    divContenedorSumayResta.appendChild(input);
    divContenedorSumayResta.appendChild(inputMas);
    divContenedorBotones.appendChild(divAgregarCarrito);
    divAgregarCarrito.appendChild(buttonCarrito);




    return cardProducto;
  }

  /*Fin Función para crear la card de cada producto*/
})
/*------------------------------------------------------------------FIN AJAX*/