/* Creacion de carrito*/
var carrito = [];
/*Comprobar si hay algo en el Local Storage*/
getProductosDesdeLocalStorage();

/*Función para Comprobar si hay algo en el Local Storage y cargar*/
function getProductosDesdeLocalStorage() {
	//	string traido de localstorage en formato JSON
	const carritoEnLocalStorage = localStorage.getItem("carrito");
	if (carritoEnLocalStorage) {
		// objetos parseados a partir del string
        const objetosEnLocalStorage = JSON.parse(carritoEnLocalStorage);
        console.log(carrito)
		objetosEnLocalStorage.forEach((object) => {
			// Transformamos nuestros objetos a Productos y los agregamos al carrito
			let producto = new Producto(
				object.id,
				object.nombre,
				object.precio,
                object.imagen,
                object.descripcion,
                object.cantidadUsuario,
				object.stock
			);
			carrito.push(producto);
		});
	}
}


/*Boton para sumar o restar cantidad de producto para agregar al carrito*/
$(document).on('click', '.sumar', function () {
    $(this).prev().val(+$(this).prev().val()+6);
});

$(document).on('click', '.restar', function () {
     if ($(this).next().val() > 0) $(this).next().val(+$(this).next().val()-6);
 });

function carritoVacio() {
    $('#carritoID').hide();
    var elementosHTML = `
    <div class="container carrito-vacio">
        <div class="d-flex justify-content-center align-items-center"> Oh no! :( Tu carrito está vacío! </div>
        <div class="d-flex justify-content-center align-items-center">
        <img src="images/cartEmpty.png" alt="">
        </div>
        <a href="index.html" class="text-decoration-none d-flex justify-content-center align-items-center">
                    <button class="btn btn-lg btn-block btn-warning shadow-sm rounded-pill m-2 col-3 ">Continuar
                        Comprando</button>
                </a>
    </div> 
    `
    var carritoVacio = document.getElementById("carritoVacio");
    carritoVacio.innerHTML= elementosHTML;
    

}
if (carrito == "") {
    carritoVacio();
}


/*Inicio Creación y carga de productos en carrito*/
     var precioTotal = 0;
    carrito.forEach((producto) => {
     var lineaCarrito = crearLineaCarrito(producto);
     contenedorDivCarrito.appendChild(lineaCarrito);
 })
/*Llamado a función para calcular el precio total*/
 precioAPagar(carrito);

/*Función que calcula el precio total*/
function precioAPagar(carrito) {
    
    carrito.forEach((producto) => {
        precioTotal = precioTotal +(producto.cantidadUsuario * producto.precio)
         console.log (precioTotal);
         var total = document.getElementById("total");
         total.innerHTML = precioTotal + " $";
    })
    
}

 /*Función para crear cada línea con el producto elegido en el carrito*/
 
 function crearLineaCarrito (producto) {
    
     var lineaCarrito = document.createElement ("div");
     lineaCarrito.classList = "row border-bottom d-flex align-items-center py-2 mx-1 rounded-lg shadow-sm";

     var elementosHTML = `
     
                <div class="col-3"><img src='${producto.imagen}' class=" img-pdto-encarrito img-fluid"></div>
                <div class="col-7 d-flex justify-content-around flex-wrap">
                    <div class="col-sm descripcion-pdto-encarrito">${[producto.nombre]}</div>
                    <div class="col-sm">
                        <div class="row d-flex justify-content-around">
                            <div>${[producto.cantidadUsuario]} u</div>
                            <div>$ ${[producto.cantidadUsuario] * [producto.precio]}</div>
                        </div>
                    </div>
                </div>
     `
      lineaCarrito.innerHTML = elementosHTML; 
    
    var divEliminar = document.createElement("div");
    divEliminar.classList = "col-2";

    var buttonEliminar = document.createElement ("button");
    buttonEliminar.classList = "btn btn-danger btn-sm";
    buttonEliminar.id = producto.id;
    buttonEliminar.innerHTML = "✖";
 
    lineaCarrito.appendChild(divEliminar);
    divEliminar.appendChild(buttonEliminar);

    /*Evento para eliminar items del carrito*/
     buttonEliminar.addEventListener("click", () => {
        carrito = carrito.filter(function (product) { return product.id != $(event.target).attr('id')})
        
        console.log (carrito)
        if (carrito.length) {
            localStorage.setItem('carrito', JSON.stringify(carrito))
            lineaCarrito.remove()
            
            
        } else {
            localStorage.removeItem('carrito')
            lineaCarrito.remove()
            carritoVacio();
        }
        precioTotal = 0;
            if (carrito.length) {
                precioAPagar(carrito); 
                elegirEnvio();
            } else {
                var total = document.getElementById("total");
                total.innerHTML = "";
            }  
            
            
   });

   

   $(document).on('click', '.sumar2', function () {
    producto.cantidadUsuario = $(this).prev().val()
     console.log (producto.cantidadUsuario);
    var hola = document.getElementById(producto.selector)
    hola.innerHTML = producto.cantidadUsuario * producto.precio;
    });

  
     return lineaCarrito;
    
}
/*Fin Creación y carga de productos en carrito*/

$(document).on('click', '.sumarTotal', function () {
    
    precioAPagar(carrito)
    });
/*Función para elegir el Envio y sumar su precio*/
function elegirEnvio(){

        $("#precioEnvio").html($("#lugarDeEnvio option:selected" ).val());
         var total = document.getElementById("total");
         total.innerHTML = precioTotal + parseInt($( "#lugarDeEnvio option:selected" ).val()) + " $";
     }
