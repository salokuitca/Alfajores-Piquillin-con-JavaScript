/*Inicio Declaracion Objeto CarritoDeCompras*/

class CarritoDeCompras {

    constructor(compraEnCarrito) {
        this.compraEnCarrito = [];
        
    /*Función para comprobar si hay algo en el Local Storage*/
    this.comprobarLocalStorage = (compraEnCarrito) => {   
     if ((localStorage.getItem('carrito') != null)) {
        var recuperarLocalStorage = JSON.parse(localStorage.getItem('carrito'));
        for (var i=0; i<recuperarLocalStorage.compraEnCarrito.length; i++) {
            this.compraEnCarrito.push(recuperarLocalStorage.compraEnCarrito[i]);
            console.log(compraEnCarrito);
        }
        return(compraEnCarrito);
     }
    }
        /*Inicio Funcion AgregarAlCarrito*/
        this.agregarAlCarrito = (compraEnCarrito) => {
            this.compraEnCarrito.push(compraEnCarrito);
           

            /*Guardar el carrito en local storage*/
            localStorage.setItem (('carrito'), JSON.stringify (prueba));
        }
        /*Fin Funcion AgregarAlCarrito*/
    }

}
/*Fin Declaracion Objeto CarritoDeCOmpras*/