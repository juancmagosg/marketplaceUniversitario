/********************
FUNCIÓN DONDE SE GENERA LA SUMA DE LOS PRODUCTOS QUE ELIGE EL USUARIO
*********************/

//Se declaran variables en cero
let productosACobrar = [];
let total = 0;

//Función que realiza la suma
function agregarAlCarrito(productoAComprar, precioProducto) {    
    productosACobrar.push(productoAComprar);
    total = total + precioProducto;
    document.getElementById("checkout").innerHTML = `Total a pagar: $${total}`
}
/**********************************************************************************/

//Se declaran variables globales
const clicBoton = document.querySelectorAll('.button');
const tbody = document.querySelector('.tbody');
let carrito = [];

clicBoton.forEach(btn => {
  btn.addEventListener('click', agregarProductoAlCarrito);
})

/********************
FUNCIÓN PARA AGREGAR PRODUCTOS AL CARRITO
*********************/
function agregarProductoAlCarrito(e){
  const button = e.target;
  //Obtener la clase más cercana con card
  const item = button.closest('.card');
  const itemTitle = item.querySelector('.card-title').textContent;
  const itemPrice = item.querySelector('.precio').textContent;
  const itemImg = item.querySelector('.card-img-top').src;
  
  //Nuevo producto
  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1
  }

  agregarItemCarrito(newItem);
}
/**********************************************************************************/

/********************
FUNCIÓN PARA GUARDAR EL NUEVO PRODUCTO
*********************/
function agregarItemCarrito(newItem){

  const alert = document.querySelector('.alert');

  setTimeout( function(){
    alert.classList.add('hide')
  }, 2000)
    alert.classList.remove('hide')

  const InputElemnto = tbody.getElementsByClassName('input__elemento')
  for(let i =0; i < carrito.length ; i++){
    if(carrito[i].title.trim() === newItem.title.trim()){
      carrito[i].cantidad ++;
      const inputValue = InputElemnto[i]
      inputValue.value++;
      carritoTotal();
      return null;
    }
  }
  
  carrito.push(newItem);
  renderizarCarrito();
} 
/**********************************************************************************/

/********************
FUNCIÓN PARA RENDERIZAR EL CARRITO
*********************/
function renderizarCarrito(){
  tbody.innerHTML = ''
  carrito.map(item => {
    const tr = document.createElement('tr');
    tr.classList.add('ItemCarrito');

    //Se genera la tabla
    const Content = `    
    <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img}  alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>    
    `
    tr.innerHTML = Content;
    tbody.append(tr);

    tr.querySelector(".delete").addEventListener('click', quitarItemCarrito);
    tr.querySelector(".input__elemento").addEventListener('change', sumatoriaDeCantidad);
  })
  carritoTotal();
}
/**********************************************************************************/

/********************
FUNCIÓN PARA GENERAR LA SUMA DEL TOTAL DEL CARRITO
*********************/
function carritoTotal(){
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal');
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''));
    Total = Total + precio*item.cantidad;
  })

  itemCartTotal.innerHTML = `Total $${Total}`;
  agregarLocalStorage();
}
/**********************************************************************************/

/********************
FUNCIÓN PARA QUITAR PRODUCTOS DEL CARRITO
*********************/
function quitarItemCarrito(e){
  const buttonDelete = e.target;
  const tr = buttonDelete.closest(".ItemCarrito");
  const title = tr.querySelector('.title').textContent;
  for(let i=0; i<carrito.length ; i++){
    if(carrito[i].title.trim() === title.trim()){
      carrito.splice(i, 1);
    }
  }

  const alert = document.querySelector('.remove');

  setTimeout(function(){
    alert.classList.add('remove')
  }, 2000)
    alert.classList.remove('remove')

  tr.remove();
  carritoTotal();
}
/**********************************************************************************/

/********************
FUNCIÓN PARA REALIZAR EL INCREMENTO DE PRODUCTOS
*********************/
function sumatoriaDeCantidad(e){
  const sumaInput  = e.target;
  const tr = sumaInput.closest(".ItemCarrito");
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if(item.title.trim() === title){
      sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      carritoTotal();
    }
  })
}
/**********************************************************************************/

/********************
FUNCIÓN PARA ALMACENAR EL CARRITO EN EL LOCAL STORAGE
*********************/
function agregarLocalStorage(){
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

window.onload = function(){
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if(storage){
    carrito = storage;
    renderizarCarrito();
  }
}
/**********************************************************************************/