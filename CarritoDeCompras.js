/*Inicio Declaracion Objeto CarritoDeCompras*/

class CarritoDeCompras {

    constructor(compraEnCarrito) {
        this.compraEnCarrito = [];
        

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