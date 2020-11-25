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


/*Inicio Creación y carga de productos en carrito*/
    var precioTotal = 0;
    carrito.forEach((producto) => {
     var lineaCarrito = crearLineaCarrito(producto);
     contenedorTr.appendChild(lineaCarrito);
     precioTotal = precioTotal +(producto.cantidadUsuario * producto.precio)
     console.log (precioTotal);
     var total = document.getElementById("total");
     total.innerHTML = precioTotal + " $";
 })

 
 function crearLineaCarrito (producto) {
     var lineaCarrito = document.createElement ("tr");

     var elementosHTML = `
     <td><img src='${producto.imagen}' width="50px" /> </td>
     <td>${[producto.nombre]}</td>
     <td>En stock</td>
     <td class="text-right">${[producto.cantidadUsuario]}</td>
     <td class="text-right">${[producto.cantidadUsuario] * [producto.precio]}</td>
     `
     lineaCarrito.innerHTML = elementosHTML;

     var tdButton = document.createElement("td");
     tdButton.classList = "text-right";

    var buttonEliminar = document.createElement ("button");
    buttonEliminar.classList = "btn btn-sm btn-danger eliminar"
    buttonEliminar.id = producto.id;
    buttonEliminar.innerHTML = "Eliminar"

    

    lineaCarrito.appendChild(tdButton);
    tdButton.appendChild(buttonEliminar);

    
     buttonEliminar.addEventListener("click", () => {
        carrito = carrito.filter(function (product) { return product.id != $(event.target).attr('id')})
        
        console.log (carrito)
        if (carrito.length) {
            localStorage.setItem('carrito', JSON.stringify(carrito))
            lineaCarrito.remove()
            
            
        } else {
            localStorage.removeItem('carrito')
            lineaCarrito.remove()
        }
        precioTotal = 0;
        carrito.forEach((producto) => {
            if (carrito.length) {
            precioTotal = precioTotal + (producto.cantidadUsuario * producto.precio)
            console.log (precioTotal);
            var total = document.getElementById("total");
            total.innerHTML = precioTotal + " $";
            } else{
                var total = document.getElementById("total");
                total.innerHTML = "";
            }
        })
       
        
   });


     return lineaCarrito;
    
}
/*Fin Creación y carga de productos en carrito*/

/*Función para elegir el Envio y sumar su precio*/
function elegirEnvio(){

        $("#precioEnvio").html($("#lugarDeEnvio option:selected" ).val());
         var total = document.getElementById("total");
         total.innerHTML = precioTotal + parseInt($( "#lugarDeEnvio option:selected" ).val()) + " $";
     }

 

