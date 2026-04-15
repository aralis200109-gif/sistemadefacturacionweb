// 1. Generar número de factura automático (Requerimiento 5)
document.addEventListener("DOMContentLoaded", () => {
    const nro = Math.floor(Math.random() * 900000) + 100000;
    document.getElementById("nro-display").innerText = nro;
    
    // Establecer fecha de hoy por defecto
    document.getElementById("fecha").valueAsDate = new Date();
});

// 2. Agregar filas dinámicamente (Requerimiento 3)
function agregarFila() {
    const tabla = document.querySelector("#tabla tbody");
    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td><input type="text" class="desc" placeholder="Producto..."></td>
        <td><input type="number" class="cantidad" value="1" min="1"></td>
        <td><input type="number" class="precio" value="0" min="0"></td>
        <td class="subtotal-celda">0</td>
        <td class="no-print"><button onclick="eliminarFila(this)">X</button></td>
    `;

    tabla.appendChild(fila);

    // 3. Escuchar eventos input (Requerimiento 3)
    fila.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            const cant = parseFloat(fila.querySelector('.cantidad').value) || 0;
            const prec = parseFloat(fila.querySelector('.precio').value) || 0;
            fila.querySelector('.subtotal-celda').innerText = (cant * prec).toFixed(2);
            calcularTotales();
        });
    });
}

function eliminarFila(btn) {
    btn.closest("tr").remove();
    calcularTotales();
}

// 4. Calcular totales con forEach y parseFloat (Requerimiento 3)
function calcularTotales() {
    let subtotalGeneral = 0;
    const subtotales = document.querySelectorAll(".subtotal-celda");

    subtotales.forEach(td => {
        subtotalGeneral += parseFloat(td.innerText) || 0;
    });

    const iva = subtotalGeneral * 0.10;
    const total = subtotalGeneral + iva;

    document.getElementById("subtotal").innerText = subtotalGeneral.toFixed(2);
    document.getElementById("iva").innerText = iva.toFixed(2);
    document.getElementById("total").innerText = total.toFixed(2);
}

// 5. Validación antes de imprimir (Requerimiento 5)
function imprimirPro() {
    const nombre = document.getElementById("nombre").value;
    const filas = document.querySelectorAll("#tabla tbody tr").length;

    if (nombre.trim() === "") {
        alert("Error: El nombre del cliente es obligatorio.");
        return;
    }
    if (filas === 0) {
        alert("Error: Debe agregar al menos un producto a la factura.");
        return;
    }
    window.print(); // Función nativa [cite: 79]
}