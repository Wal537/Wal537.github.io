// Configuración del canvas y contexto
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Cargar la imagen
const imagen = new Image();
imagen.src = "no-gordas.jpg";

// Seleccionar el audio y los botones
const audio = document.getElementById("audio");
const calculateButton = document.getElementById("calculateButton");
const imageContainer = document.getElementById("imageContainer");
const closeButton = document.getElementById("closeButton");

// Variables de rotación
let angulo = 0;
let imagenCargada = false; // Variable para confirmar que la imagen está cargada

// Función para rotar la imagen
function rotarImagen() {
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Guardar el estado actual
    ctx.save();

    // Mover el punto de origen al centro de la imagen
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Rotar el contexto
    ctx.rotate(angulo * Math.PI / 180);

    // Dibujar la imagen en el centro del canvas
    ctx.drawImage(imagen, -200, -200, 400, 400); // Centramos la imagen

    // Restaurar el estado original
    ctx.restore();

    // Aumentar el ángulo para la próxima rotación
    angulo += 1;

    // Repetir la animación
    requestAnimationFrame(rotarImagen);
}

// Confirmar que la imagen está cargada
imagen.onload = () => {
    imagenCargada = true;
};

// Calcular IMC al hacer clic en el botón
calculateButton.addEventListener("click", () => {
    const peso = parseFloat(document.getElementById("peso").value);
const altura = parseFloat(document.getElementById("altura").value);
    
if (!peso || !altura) {
    alert("Por favor, ingresa valores válidos para peso y altura.");
    return;
}
const alturaEnMetros = altura / 100; // Convertir altura de cm a m
const imc = peso / (altura * altura);
const resultadoDiv = document.getElementById("resultado");
resultadoDiv.textContent = `Tu IMC es: ${imc.toFixed(2)}`;

// Condición para mostrar imagen y reproducir música
if (imc > 25) { // Cambia el valor 25 al límite deseado
    resultadoDiv.textContent += " ¡Estás por encima del IMC recomendado!";
        
    // Mostrar el contenedor de la imagen y reproducir música
    imageContainer.style.display = 'flex';
    audio.play();
    rotarImagen();
} else {
    resultadoDiv.textContent += " ¡Estás en un rango saludable!";
}
});

// Cerrar la ventana de imagen
closeButton.addEventListener("click", () => {
    imageContainer.style.display = 'none';
audio.pause(); // Detener la música si se cierra
});
