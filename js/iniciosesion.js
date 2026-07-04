let array = ["a", "b", "c", "d", "e"];

document.getElementById("parrafo").innerHTML = generarCaptcha();


//captcha//

function generarCaptcha() {

    let letra = "";
    for (let i = 0; i < array.length; i++) {
        letra += array[
            Math.floor(Math.random() * array.length)
        ];
    }
    return letra;
}
document
    .getElementById("enviar")
    .addEventListener("click", verificar);

//validar captcha//

function verificar(e) {

    e.preventDefault();

    let valor =

        document.getElementById("letras").value;

    if (valor ==
        document.getElementById("parrafo").innerHTML) {

        document.getElementById("mensaje")
            .innerHTML = "Captcha correcto";

        document.getElementById("mensaje")
            .style.color = "green";

    } else {
        document.getElementById("mensaje")
            .innerHTML = "Captcha inválido";

        document.getElementById("mensaje")
            .style.color = "red";

        document.getElementById("parrafo")
            .innerHTML = generarCaptcha();
    }
}