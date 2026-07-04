document.addEventListener("DOMContentLoaded", () => {


    "use strict";

    let url = "https://6a0f5d05d2a9857070352ffc.mockapi.io/cafe";
    let lista = document.getElementById("lista");
    let formulario = document.getElementById("formCafe");
    let idEditando = null;


    cargarTabla();

    // =====================
    // CARGAR TABLA (GET)
    
    async function cargarTabla() {
        lista.innerHTML = "";
        try {
            let response = await fetch(url);
            if (response.ok) {
                let dato = await response.json();
                console.log(dato);
                for (let i = 0; i < dato.length; i++) {
                    let col1 = `<td>${dato[i].categoria}</td>`;
                    let col2 = `<td>${dato[i].descripcion}</td>`;
                    let col3 = `<td>${dato[i].precio}</td>`;
                    let col4 = `<td>
                    <button class="btn-borrar" data-id="${dato[i].id}">Borrar</button>
                    <button class="btn-editar" data-id="${dato[i].id}">Editar</button>
                </td>`;
                    lista.innerHTML += `<tr>${col1}${col2}${col3}${col4}</tr>`;

                }
                let btnBorrar = document.querySelectorAll(".btn-borrar");
                btnBorrar.forEach(element => {
                    element.addEventListener("click", () => {
                        let id = element.dataset.id;
                        borrarCafe(id);
                    })

                });
                let btnEditar = document.querySelectorAll(".btn-editar");
                btnEditar.forEach(element => {
                    element.addEventListener("click", () => {
                        idEditando = element.dataset.id;
                        let fila = element.parentElement.parentElement;

                        document.querySelector("#categoria").value = fila.cells[0].textContent;
                        document.querySelector("#descripcion").value = fila.cells[1].textContent;
                        document.querySelector("#precio").value = fila.cells[2].textContent;
                    });
                });
            }
            else {
                lista.innerHTML = "error de url";
            }
        } catch (e) {
            lista.innerHTML = 'error de servidor'

        }
    }
    
    async function borrarCafe(id) {
        try {
            let response = await fetch(url + "/" + id, {
                "method": "DELETE",
            });
            if (response.ok) {
                cargarTabla();
            }

        } catch (error) {
            console.error(error);
        }
    }
    
    async function editarCafe(id) {
        let nuevaCategoria = document.querySelector("#categoria").value;
        let nuevaDescripcion = document.querySelector("#descripcion").value;
        let nuevoPrecio = document.querySelector("#precio").value;

        let datoNuevo = {
            categoria: nuevaCategoria,
            descripcion: nuevaDescripcion,
            precio: nuevoPrecio

        }
        try {
            let response = await fetch(url + "/" + id, {
                'method': 'PUT',
                'headers': {
                    'Content-Type': 'application/json'
                },
                'body': JSON.stringify(datoNuevo)
            });
            if (response.ok) {
                formulario.reset();
                idEditando = null;
                cargarTabla();
            }
        } catch (error) {
            console.error("Hubo un error:", error);
        }
    }
    
    // FORMULARIO
    
    formulario.addEventListener("submit", function (e) {
        e.preventDefault();
        if (idEditando == null) {
            crearCafe();
        } else {
            editarCafe(idEditando);
        }
    });
    
    async function crearCafe() {

        let categoria = document.querySelector("#categoria").value;
        let descripcion = document.querySelector("#descripcion").value;
        let precio = document.querySelector("#precio").value;

        let datoNuevo = {
            categoria: categoria,
            descripcion: descripcion,
            precio: precio
        };

        try {

            let response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datoNuevo)
            });

            if (response.ok) {
                formulario.reset();
                cargarTabla();
            }

        } catch (error) {
            console.error(error);
        }
    }























})