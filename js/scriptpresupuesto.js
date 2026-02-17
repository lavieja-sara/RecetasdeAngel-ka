// CONFIGURACIÓN DE PRECIOS
const PRODUCTOS = {
    ceviche: 8,
    hinojos: 10,
    paella: 30
};

// VALIDACIONES
const validaciones = {
    nombre: (valor) => {
        const regex = /^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]*$/;
        if (!valor.trim()) return { valido: false, mensaje: 'El nombre es requerido' };
        if (!regex.test(valor)) return { valido: false, mensaje: 'El nombre solo puede contener letras' };
        if (valor.length > 15) return { valido: false, mensaje: 'El nombre no puede exceder 15 caracteres' };
        return { valido: true, mensaje: '' };
    },
    
    apellidos: (valor) => {
        const regex = /^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]*$/;
        if (!valor.trim()) return { valido: false, mensaje: 'Los apellidos son requeridos' };
        if (!regex.test(valor)) return { valido: false, mensaje: 'Los apellidos solo pueden contener letras' };
        if (valor.length > 40) return { valido: false, mensaje: 'Los apellidos no pueden exceder 40 caracteres' };
        return { valido: true, mensaje: '' };
    },
    
    telefono: (valor) => {
        const regex = /^[0-9]*$/;
        if (!valor.trim()) return { valido: false, mensaje: 'El teléfono es requerido' };
        if (!regex.test(valor)) return { valido: false, mensaje: 'El teléfono solo puede contener números' };
        if (valor.length > 9) return { valido: false, mensaje: 'El teléfono no puede exceder 9 dígitos' };
        if (valor.length === 0) return { valido: false, mensaje: 'El teléfono es requerido' };
        return { valido: true, mensaje: '' };
    },
    
    email: (valor) => {
        const regex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!valor.trim()) return { valido: false, mensaje: 'El email es requerido' };
        if (!regex.test(valor)) return { valido: false, mensaje: 'El email no cumple con el formato correcto (nnnnn_nnn@zzzzz.xxx)' };
        return { valido: true, mensaje: '' };
    }
};

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', function() {
    const forma = document.getElementById('formPresupuesto');
    
    // Validaciones en tiempo real
    document.getElementById('nombre').addEventListener('blur', validarCampo_nombre);
    document.getElementById('apellidos').addEventListener('blur', validarCampo_apellidos);
    document.getElementById('telefono').addEventListener('blur', validarCampo_telefono);
    document.getElementById('email').addEventListener('blur', validarCampo_email);
    
    // Validaciones de presupuesto en tiempo real
    document.getElementById('producto').addEventListener('change', actualizarPresupuesto);
    document.getElementById('plazo').addEventListener('change', actualizarPresupuesto);
    document.getElementById('plazo').addEventListener('input', actualizarPresupuesto);
    
    // Extras
    const checkboxesExtras = document.querySelectorAll('input[name="extras"]');
    checkboxesExtras.forEach(checkbox => {
        checkbox.addEventListener('change', actualizarPresupuesto);
    });
    
    // Envío del formulario
    forma.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validarFormularioCompleto()) {
            alert('¡Presupuesto enviado correctamente!');
            // Aquí se enviaría el formulario al servidor
            // forma.submit();
        }
    });
    
    // Reset del formulario
    const btnReset = document.querySelector('.btn-reset');
    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        forma.reset();
        limpiarErrores();
        actualizarPresupuesto();
    });
});

// FUNCIONES DE VALIDACIÓN DE CAMPOS INDIVIDUALES
function validarCampo_nombre() {
    const input = document.getElementById('nombre');
    const errorSpan = document.getElementById('error-nombre');
    const resultado = validaciones.nombre(input.value);
    
    if (!resultado.valido) {
        input.classList.add('input-error');
        errorSpan.textContent = resultado.mensaje;
    } else {
        input.classList.remove('input-error');
        errorSpan.textContent = '';
    }
    
    return resultado.valido;
}

function validarCampo_apellidos() {
    const input = document.getElementById('apellidos');
    const errorSpan = document.getElementById('error-apellidos');
    const resultado = validaciones.apellidos(input.value);
    
    if (!resultado.valido) {
        input.classList.add('input-error');
        errorSpan.textContent = resultado.mensaje;
    } else {
        input.classList.remove('input-error');
        errorSpan.textContent = '';
    }
    
    return resultado.valido;
}

function validarCampo_telefono() {
    const input = document.getElementById('telefono');
    const errorSpan = document.getElementById('error-telefono');
    const resultado = validaciones.telefono(input.value);
    
    if (!resultado.valido) {
        input.classList.add('input-error');
        errorSpan.textContent = resultado.mensaje;
    } else {
        input.classList.remove('input-error');
        errorSpan.textContent = '';
    }
    
    return resultado.valido;
}

function validarCampo_email() {
    const input = document.getElementById('email');
    const errorSpan = document.getElementById('error-email');
    const resultado = validaciones.email(input.value);
    
    if (!resultado.valido) {
        input.classList.add('input-error');
        errorSpan.textContent = resultado.mensaje;
    } else {
        input.classList.remove('input-error');
        errorSpan.textContent = '';
    }
    
    return resultado.valido;
}

// FUNCIÓN PARA LIMPIAR ERRORES
function limpiarErrores() {
    document.querySelectorAll('.error-message').forEach(span => {
        span.textContent = '';
    });
    document.querySelectorAll('input').forEach(input => {
        input.classList.remove('input-error');
    });
}

// CÁLCULO DE PRESUPUESTO
function actualizarPresupuesto() {
    const productoSelect = document.getElementById('producto');
    const plazoInput = document.getElementById('plazo');
    const presupuestoElement = document.getElementById('presupuesto');
    
    const productoValor = productoSelect.value;
    const plazo = parseInt(plazoInput.value) || 0;
    
    let presupuesto = 0;
    
    // Precio del producto base
    if (productoValor && PRODUCTOS[productoValor]) {
        presupuesto = PRODUCTOS[productoValor];
    }
    
    // Aplicar descuento según plazo
    let descuento = 0;
    if (plazo > 20) {
        descuento = presupuesto * 0.10; // -10%
    } else if (plazo > 10) {
        descuento = presupuesto * 0.05; // -5%
    }
    presupuesto -= descuento;
    
    // Agregar extras
    const checkboxesExtras = document.querySelectorAll('input[name="extras"]:checked');
    let extrasTotal = 0;
    checkboxesExtras.forEach(checkbox => {
        extrasTotal += parseInt(checkbox.getAttribute('data-price'));
    });
    presupuesto += extrasTotal;
    
    // Mostrar presupuesto
    presupuestoElement.textContent = presupuesto.toFixed(2) + '€';
}

// VALIDACIÓN COMPLETA DEL FORMULARIO
function validarFormularioCompleto() {
    let todoCorrecto = true;
    
    // Validar datos de contacto
    const validarNombre = validarCampo_nombre();
    const validarApellidos = validarCampo_apellidos();
    const validarTelefono = validarCampo_telefono();
    const validarEmail = validarCampo_email();
    
    if (!validarNombre || !validarApellidos || !validarTelefono || !validarEmail) {
        todoCorrecto = false;
    }
    
    // Validar producto
    const producto = document.getElementById('producto').value;
    if (!producto) {
        alert('Por favor, selecciona un producto');
        todoCorrecto = false;
    }
    
    // Validar plazo
    const plazo = document.getElementById('plazo').value;
    if (!plazo || parseInt(plazo) < 1) {
        alert('Por favor, ingresa un plazo válido (mínimo 1 día)');
        todoCorrecto = false;
    }
    
    // Validar condiciones
    const condiciones = document.getElementById('condiciones');
    if (!condiciones.checked) {
        const errorSpan = document.getElementById('error-condiciones');
        errorSpan.textContent = 'Debes aceptar las condiciones de privacidad';
        condiciones.classList.add('input-error');
        todoCorrecto = false;
    } else {
        const errorSpan = document.getElementById('error-condiciones');
        errorSpan.textContent = '';
        condiciones.classList.remove('input-error');
    }
    
    return todoCorrecto;
}
