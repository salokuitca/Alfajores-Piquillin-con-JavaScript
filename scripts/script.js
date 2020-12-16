/*Cierre automático del navbar en mobile al hacer click en link*/
$('.navbar-nav>li>a').on('click', function () {
    $('.navbar-collapse').collapse('hide');
});

/* Creacion de carrito*/
let carrito = [];

/*Comprobar si hay algo en el Local Storage*/
getProductosDesdeLocalStorage();

/*Función para Comprobar si hay algo en el Local Storage y cargar*/
function getProductosDesdeLocalStorage() {
    /*	string traido de localstorage en formato JSON */
    const carritoEnLocalStorage = localStorage.getItem("carrito");
    if (carritoEnLocalStorage) {
        /* objetos parseados a partir del string */
        const objetosEnLocalStorage = JSON.parse(carritoEnLocalStorage);
        
        objetosEnLocalStorage.forEach((object) => {
            /* Transformamos nuestros objetos a Productos y los agregamos al carrito */
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


/* Inicio Boton para sumar o restar cantidad de producto para agregar al carrito.*/
//Los productos se venden de a 6 unidades
$(document).on('click', '.sumar', function () {
    $(this).prev().val(+$(this).prev().val() + 6);
});

$(document).on('click', '.restar', function () {
    if ($(this).next().val() > 0) $(this).next().val(+$(this).next().val() - 6);
});
/* Fin Boton para sumar o restar cantidad de producto para agregar al carrito*/

/* Inicio Función que se ejecuta cuando no hay productos en el carrito*/
function carritoVacio() {
    $('#carritoID').hide();
    let elementosHTML = `
    <div class="container carrito-vacio">
        <div class="d-flex justify-content-center align-items-center"> Oh no! :( Tu carrito está vacío! </div>
        <div class="d-flex justify-content-center align-items-center">
        <img src="images/cartEmpty.png" alt="">
        </div>
        <a href="index.html#productos" class="text-decoration-none d-flex justify-content-center align-items-center">
                    <button class="btn btn-lg btn-block btn-warning shadow-sm rounded-pill m-2 col-12 col-md-6 "> Quiero comprar!!!</button>
                </a>
    </div> 
    `
    let carritoVacio = document.getElementById("carritoVacio");
    if (carritoVacio) {
    carritoVacio.innerHTML = elementosHTML;
    }
}
/* Fin Función que se ejecuta cuando no hay productos en el carrito*/

/*Llamada a la función de carritoVacio() si no hay productos en carrito*/
if (carrito == "") {
    carritoVacio();
}


/*-------------------Inicio Creación y carga de productos en carrito*/
let precioTotal = 0;
contenedorDivCarrito = document.getElementById("contenedorDivCarrito");
carrito.forEach((producto) => {
    /*Llama a la función que crea cada linea del carrito*/
    let lineaCarrito = crearLineaCarrito(producto);
    if (contenedorDivCarrito) {
    contenedorDivCarrito.appendChild(lineaCarrito);
    }
})

/*Llamado a función para calcular el precio total*/
precioAPagar(carrito);

/*Función que calcula el precio total*/
function precioAPagar(carrito) {

    carrito.forEach((producto) => {
        precioTotal = precioTotal + (producto.cantidadUsuario * producto.precio);
    })

}

/* Inicio Función para crear cada línea con el producto elegido en el carrito*/
function crearLineaCarrito(producto) {

    let lineaCarrito = document.createElement("div");
    lineaCarrito.classList = "row border-bottom d-flex align-items-center py-2 mx-1 rounded-lg shadow-sm";

    let elementosHTML = `
     
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

    let divEliminar = document.createElement("div");
    divEliminar.classList = "col-2";

    let buttonEliminar = document.createElement("button");
    buttonEliminar.classList = "btn btn-danger btn-sm";
    buttonEliminar.id = producto.id;
    buttonEliminar.innerHTML = "✖";

    lineaCarrito.appendChild(divEliminar);
    divEliminar.appendChild(buttonEliminar);

    /*Inicio Evento para eliminar items del carrito*/
    buttonEliminar.addEventListener("click", () => {
        carrito = carrito.filter(function (product) {
            return product.id != $(event.target).attr('id');
        })

        
        if (carrito.length) {
            localStorage.setItem('carrito', JSON.stringify(carrito));
            lineaCarrito.remove();


        } else {
            localStorage.removeItem('carrito');
            lineaCarrito.remove();
            carritoVacio();
        }
        precioTotal = 0;
        if (carrito.length) {
            precioAPagar(carrito);
            elegirEnvio();
        } else {
            let total = document.getElementById("total");
            total.innerHTML = "";
        }
    });
    /*Fin Evento para eliminar items del carrito*/

    return lineaCarrito;

}
/* Fin Función para crear cada línea con el producto elegido en el carrito*/

/*-------------------Fin Creación y carga de productos en carrito*/


/*El lugar de envio por default es Villa General Belgrano, agrego su precio al total*/
let precioEnvio = 80;
let total = document.getElementById("total");
if (total) {
total.innerHTML = precioTotal + precioEnvio + " $";
}

/*Función para elegir el Envio y sumar su precio*/
function elegirEnvio() {

    $("#precioEnvio").html($("#lugarDeEnvio option:selected").val());
    let total = document.getElementById("total");
    precioEnvio = parseInt($("#lugarDeEnvio option:selected").val());
    total.innerHTML = precioTotal + precioEnvio + " $";
}

var verificarPromo;
/*Función para aplicar promo piquibola*/
function promo() {
    verificarPromo = true;

    sessionStorage.setItem('promo', JSON.stringify(verificarPromo));   
}


/*Función para el resumen de la compra en modal para envio del pedido*/
function resumenCompra() {
   
    let lineaPedido = ""
    carrito.forEach((producto) => {
        lineaPedido += `<div>${producto.nombre} x ${producto.cantidadUsuario}u </div>`;
    })
    resumenPedido.innerHTML = `<div class="card container "> <div class="card-title font-weight-bold">Resumen de tu pedido:</div> ${lineaPedido} <hr> <div>Precio Envio: $ ${precioEnvio}</div> <strong>Precio a pagar: $ ${precioTotal + precioEnvio}</strong></div>`
   
}

/*Inicio Función para armar el mensaje de pedido en whatsapp*/
function datosWhatsapp() {
    let promoRecuperada = JSON.parse (sessionStorage.getItem('promo'));
    let nombre = document.getElementById("nombreCliente").value; 
    let dire = document.getElementById("descripcion-dire").value; 
    let fecha = document.getElementById("FechaEnvio").value; 

    let mensajeNombre = (`Hola!%20Mi%20nombre%20es%20${nombre},%20quisiera%20los%20siguientes%20productos:%20`);
    let lineaPedidoWhatsapp = "";
    let productoNombre = "";
    carrito.forEach((producto) => {
        productoNombre = producto.nombre.replaceAll(' ', '%20');
        
        lineaPedidoWhatsapp += `${productoNombre} x ${producto.cantidadUsuario}u %0A`;

    });
    let lineaPedidoWhatsapp2 = lineaPedidoWhatsapp.replaceAll(' ', '%20');
    

    let lugarEnvio = document.getElementById("lugarDeEnvio").value;

    switch (lugarEnvio) {
        case "80":
            lugarEnvio = "Villa%20General%20Belgrano";
            break;
        case "50":
            lugarEnvio = "Villa%20Rumipal";
            break;
        case "70":
            lugarEnvio = "Santa%20Rosa%20de%20Calamuchita";
            break;
        case "60":
            lugarEnvio = "Villa%20del%20Dique";
            break;

    }

    /*Aplicar promo piquibola en el pedido en whatsapp*/
    let promoAgregada = ""
    if (promoRecuperada) {
        
        promoAgregada = "Aplicar%20promo%20Piquibola";
    } else {
        promoAgregada = "";
    }


    let fechaDireEnvio = (`Para%20enviar%20el%20${fecha}%20a%20${dire}%20en%20${lugarEnvio}`)

    let totalWhatsapp = (`Por%20un%20total%20de:%20$${precioTotal+precioEnvio}`)

    let mensaje = `${mensajeNombre}%0A${lineaPedidoWhatsapp2}${fechaDireEnvio}%0A${totalWhatsapp}%0A${promoAgregada}`

    let link = `https://api.whatsapp.com/send?phone=34685497874&text=${mensaje}`
    
    
    let wp = document.getElementById("whatsapp");
    wp.setAttribute('href', link);
    wp.setAttribute('target', '_blank');

}
/*Fin Función para armar el mensaje de pedido en whatsapp*/



