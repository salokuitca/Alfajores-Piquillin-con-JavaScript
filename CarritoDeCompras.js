/*Inicio Declaracion Objeto CarritoDeCompras*/

// class CarritoDeCompras {

//     constructor(compraEnCarrito) {
//         this.compraEnCarrito = [];
        
//     /*Función para comprobar si hay algo en el Local Storage*/
//     //  this.comprobarLocalStorage = (compraEnCarrito) => {   
//     //  if ((localStorage.getItem('carrito') != null)) {
//     //      var recuperarLocalStorage = JSON.parse(localStorage.getItem('carrito'));
//     //      for (var i=0; i<recuperarLocalStorage.compraEnCarrito.length; i++) {
//     //          this.compraEnCarrito.push(recuperarLocalStorage.compraEnCarrito[i]);
//     //      }
//     //      return(compraEnCarrito);
//     //   }
//     //  }


//         /*Inicio Funcion AgregarAlCarrito*/
//         this.agregarAlCarrito = (compraEnCarrito) => {
            
//             this.compraEnCarrito.push(compraEnCarrito);
//             console.log (compraEnCarrito);
//             //var complementaria = this.compraEnCarrito;
//             /*for (var i=0; i<this.compraEnCarrito.length; i++){
                
//                     if (this.compraEnCarrito[i].tipoProducto == compraEnCarrito.tipoProducto){
//                         this.compraEnCarrito[i].cantidad = parseInt(this.compraEnCarrito[i].cantidad) + parseInt(compraEnCarrito.cantidad);
//                         this.compraEnCarrito[i].precio = parseInt(this.compraEnCarrito[i].precio) + parseInt(compraEnCarrito.precio);
//                         break;
                        
//                     } else {
//                         alert ("pasa")
//                         this.compraEnCarrito.push(compraEnCarrito);
//                     }
                
  
//             }*/
//             /*Guardar el carrito en local storage*/
//             localStorage.setItem (('carrito'), JSON.stringify (carrito));
//         }
//         /*Fin Funcion AgregarAlCarrito*/
//     }

// }
// /*Fin Declaracion Objeto CarritoDeCOmpras*/