// Clases del modelo de negocio
class Producto {
    constructor(nombre, categoria, transacciones = 0, valor = 0) {
        this.id = Date.now().toString();
        this.nombre = nombre;
        this.categoria = categoria;
        this.transaccionesAnuales = transacciones;
        this.valorPromedio = valor;
        this.crecimiento = 0;
        this.penetracion = 0;
    }
}

class PYL {
    constructor() {
        this.ingresosOperativos = 50000000;
        this.costosDirectos = 5000000;
        this.gastosOperativos = 3000000;
        this.impuestos = 1000000;
        this.ebitda = this.ingresosOperativos - this.costosDirectos - this.gastosOperativos;
        this.utilidadNeta = this.ebitda - this.impuestos;
    }

    calcular(transacciones, valor, porcentajeCostos, porcentajeGastos, porcentajeImpuestos) {
        this.ingresosOperativos = transacciones * valor;
        this.costosDirectos = this.ingresosOperativos * (porcentajeCostos / 100);
        this.gastosOperativos = this.ingresosOperativos * (porcentajeGastos / 100);
        this.ebitda = this.ingresosOperativos - this.costosDirectos - this.gastosOperativos;
        this.impuestos = this.ebitda * (porcentajeImpuestos / 100);
        this.utilidadNeta = this.ebitda - this.impuestos;
    }
}

class AnalisisPestel {
    constructor() {
        this.factores = {
            'Político': { impacto: 0, variables: [] },
            'Económico': { impacto: 0, variables: [] },
            'Social': { impacto: 0, variables: [] },
            'Tecnológico': { impacto: 0, variables: [] },
            'Ecológico': { impacto: 0, variables: [] },
            'Legal': { impacto: 0, variables: [] }
        };
    }

    agregarVariable(factor, variable, impacto) {
        const impactoNum = parseInt(impacto);
        this.factores[factor].variables.push({
            nombre: variable,
            impacto: impactoNum
        });
        this.factores[factor].impacto = Math.max(
            this.factores[factor].impacto,
            ...this.factores[factor].variables.map(v => v.impacto)
        );
    }

    obtenerEstrategias() {
        const estrategias = [];
        for (const [factor, datos] of Object.entries(this.factores)) {
            if (datos.impacto >= 4) {
                estrategias.push({
                    nombre: `Mitigar riesgo ${factor}`,
                    descripcion: `Implementar controles para reducir el impacto de factores ${factor}`,
                    impacto: {
                        ebitda: 0.05,
                        costoTransaccion: -0.03
                    }
                });
            }
        }
        return estrategias;
    }
}

class AnalisisPorter {
    constructor() {
        this.fuerzas = {
            'Amenaza de nuevos entrantes': { impacto: 0, variables: [] },
            'Poder de negociación de clientes': { impacto: 0, variables: [] },
            'Poder de negociación de proveedores': { impacto: 0, variables: [] },
            'Amenaza de productos sustitutos': { impacto: 0, variables: [] },
            'Rivalidad entre competidores': { impacto: 0, variables: [] }
        };
    }

    agregarVariable(fuerza, variable, impacto) {
        const impactoNum = parseInt(impacto);
        this.fuerzas[fuerza].variables.push({
            nombre: variable,
            impacto: impactoNum
        });
        this.fuerzas[fuerza].impacto = Math.max(
            this.fuerzas[fuerza].impacto,
            ...this.fuerzas[fuerza].variables.map(v => v.impacto)
        );
    }

    obtenerEstrategias() {
        const estrategias = [];
        for (const [fuerza, datos] of Object.entries(this.fuerzas)) {
            if (datos.impacto >= 4) {
                let estrategia;
                switch(fuerza) {
                    case 'Amenaza de nuevos entrantes':
                        estrategia = {
                            nombre: `Barreras de entrada`,
                            descripcion: `Crear barreras para nuevos competidores mediante diferenciación y lealtad de clientes`,
                            impacto: {
                                margenBruto: 0.02,
                                nps: 0.1
                            }
                        };
                        break;
                    case 'Poder de negociación de clientes':
                        estrategia = {
                            nombre: `Fidelización de clientes`,
                            descripcion: `Implementar programas de lealtad para reducir el poder de negociación de clientes`,
                            impacto: {
                                churnRate: -0.15,
                                nps: 0.1
                            }
                        };
                        break;
                    case 'Amenaza de productos sustitutos':
                        estrategia = {
                            nombre: `Diferenciación de producto`,
                            descripcion: `Mejorar características únicas de los productos para reducir sustitución`,
                            impacto: {
                                crecimiento: 0.1,
                                margenBruto: 0.03
                            }
                        };
                        break;
                    default:
                        estrategia = {
                            nombre: `Mitigar ${fuerza}`,
                            descripcion: `Estrategia genérica para contrarrestar ${fuerza.toLowerCase()}`,
                            impacto: {
                                ebitda: 0.03
                            }
                        };
                }
                estrategias.push(estrategia);
            }
        }
        return estrategias;
    }
}

class Estrategia {
    constructor(nombre, descripcion, impacto, inversion = 0, duracion = 0, crecimiento = 0) {
        this.id = Date.now().toString();
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.impacto = impacto;
        this.inversion = inversion;
        this.duracion = duracion;
        this.crecimiento = crecimiento;
        this.fechaAplicacion = new Date();
    }
}

// Estado global de la aplicación
const estado = {
    productos: [],
    pyl: new PYL(),
    pestel: new AnalisisPestel(),
    porter: new AnalisisPorter(),
    estrategias: [],
    estrategiasAplicadas: [],
    presupuestos: {
        ebitda: 42000000,
        margenBruto: 0.5,
        costoTransaccion: 3,
        eficienciaOperativa: 0.35,
        nps: 50,
        churnRate: 0.05
    },
    historico: {
        ingresos: Array(12).fill().map((_, i) => ({
            mes: new Date(2023, i, 1).toLocaleString('default', { month: 'short' }),
            valor: 50000000 / 12
        })),
        ebitda: Array(12).fill(42000000 / 12),
        margen: Array(12).fill(0.5)
    }
};

// Función para resetear al escenario base
function resetearABase() {
    estado.pyl = new PYL();
    estado.productos = [
        new Producto('Transferencias Pull', 'Pagos', 5000000, 2.5),
        new Producto('QR Crédito + Transferencias 3.0', 'Pagos', 3000000, 1.8),
        new Producto('Debin', 'Pagos', 2000000, 3.2),
        new Producto('Servicios a PSP - Cashout/Cashin', 'Servicios', 1500000, 5),
        new Producto('Prevención del Fraude', 'Seguridad', 1000000, 8),
        new Producto('PCT (Pagos con Transferencias)', 'Pagos', 2500000, 2),
        new Producto('Transferencias Push', 'Pagos', 6000000, 1.5),
        new Producto('Extracción con Transferencias', 'Pagos', 1800000, 2.8),
        new Producto('Transferencias Recurrentes', 'Pagos', 1200000, 3.5),
        new Producto('Master Send y Visa Direct', 'Pagos', 800000, 4),
        new Producto('Payouts', 'Pagos', 500000, 6),
        new Producto('Cripto y Remesas', 'Blockchain', 300000, 15)
    ];
    estado.pestel = new AnalisisPestel();
    estado.porter = new AnalisisPorter();
    estado.estrategias = [];
    estado.estrategiasAplicadas = [];
    
    estado.historico = {
        ingresos: Array(12).fill().map((_, i) => ({
            mes: new Date(2023, i, 1).toLocaleString('default', { month: 'short' }),
            valor: 50000000 / 12
        })),
        ebitda: Array(12).fill(42000000 / 12),
        margen: Array(12).fill(0.5)
    };
    
    calcularPylDesdeProductos();
    actualizarVistas();
    guardarDatos();
}

// Funciones de gestión de productos
function agregarProducto(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombreProducto').value;
    const categoria = document.getElementById('categoriaProducto').value;
    const transacciones = parseFloat(document.getElementById('transaccionesProducto').value) || 0;
    const valor = parseFloat(document.getElementById('valorProducto').value) || 0;
    
    estado.productos.push(new Producto(nombre, categoria, transacciones, valor));
    actualizarListaProductos();
    actualizarOpcionesProductosBcg();
    e.target.reset();
    calcularPylDesdeProductos();
    guardarDatos();
}

function editarProducto(id) {
    const producto = estado.productos.find(p => p.id === id);
    if (!producto) return;

    const nuevoNombre = prompt("Nuevo nombre:", producto.nombre);
    if (nuevoNombre === null) return;
    
    const nuevaCategoria = prompt("Nueva categoría:", producto.categoria);
    if (nuevaCategoria === null) return;
    
    const nuevasTransacciones = parseFloat(prompt("Nuevas transacciones anuales:", producto.transaccionesAnuales));
    if (isNaN(nuevasTransacciones)) return;
    
    const nuevoValor = parseFloat(prompt("Nuevo valor promedio:", producto.valorPromedio));
    if (isNaN(nuevoValor)) return;

    producto.nombre = nuevoNombre;
    producto.categoria = nuevaCategoria;
    producto.transaccionesAnuales = nuevasTransacciones;
    producto.valorPromedio = nuevoValor;
    
    actualizarListaProductos();
    calcularPylDesdeProductos();
    guardarDatos();
}

function eliminarProducto(id) {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;
    estado.productos = estado.productos.filter(p => p.id !== id);
    actualizarListaProductos();
    actualizarOpcionesProductosBcg();
    calcularPylDesdeProductos();
    guardarDatos();
}

function actualizarListaProductos() {
    const tbody = document.getElementById('listaProductos');
    tbody.innerHTML = '';
    
    estado.productos.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td><input type="number" class="form-control form-control-sm" value="${producto.transaccionesAnuales}" 
                 onchange="actualizarTransaccionesProducto('${producto.id}', this.value)"></td>
            <td><input type="number" step="0.01" class="form-control form-control-sm" value="${producto.valorPromedio}" 
                 onchange="actualizarValorProducto('${producto.id}', this.value)"></td>
            <td>
                <button class="btn btn-sm btn-warning me-1" onclick="editarProducto('${producto.id}')">
                    Editar
                </button>
                <button class="btn btn-sm btn-danger" onclick="eliminarProducto('${producto.id}')">
                    Eliminar
                </button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

function actualizarTransaccionesProducto(id, valor) {
    const producto = estado.productos.find(p => p.id === id);
    if (producto) {
        producto.transaccionesAnuales = parseFloat(valor) || 0;
        calcularPylDesdeProductos();
        guardarDatos();
    }
}

function actualizarValorProducto(id, valor) {
    const producto = estado.productos.find(p => p.id === id);
    if (producto) {
        producto.valorPromedio = parseFloat(valor) || 0;
        calcularPylDesdeProductos();
        guardarDatos();
    }
}

function calcularPylDesdeProductos() {
    const transaccionesTotales = estado.productos.reduce((sum, p) => sum + p.transaccionesAnuales, 0);
    const valorPromedio = transaccionesTotales > 0 ? 
        estado.productos.reduce((sum, p) => sum + (p.transaccionesAnuales * p.valorPromedio), 0) / transaccionesTotales : 0;
    
    const porcentajeGastos = parseFloat(document.getElementById('porcentajeGastos').value) || 20;
    const porcentajeImpuestos = parseFloat(document.getElementById('porcentajeImpuestos').value) || 30;
    
    estado.pyl.calcular(transaccionesTotales, valorPromedio, 30, porcentajeGastos, porcentajeImpuestos);
    mostrarResultadosPyl();
    actualizarDashboard();
}

// Funciones de P&L
function calcularPyl(e) {
    if (e) e.preventDefault();
    const porcentajeGastos = parseFloat(document.getElementById('porcentajeGastos').value) || 20;
    const porcentajeImpuestos = parseFloat(document.getElementById('porcentajeImpuestos').value) || 30;
    const transaccionesTotales = estado.productos.reduce((sum, p) => sum + p.transaccionesAnuales, 0);
    const valorPromedio = transaccionesTotales > 0 ? 
        estado.productos.reduce((sum, p) => sum + (p.transaccionesAnuales * p.valorPromedio), 0) / transaccionesTotales : 0;
    
    estado.pyl.calcular(transaccionesTotales, valorPromedio, 30, porcentajeGastos, porcentajeImpuestos);
    mostrarResultadosPyl();
    actualizarDashboard();
    guardarDatos();
}

function mostrarResultadosPyl() {
    const resultados = document.getElementById('resultadosPyl');
    resultados.innerHTML = '';
    
    agregarFilaResultado(resultados, 'Ingresos Operativos', estado.pyl.ingresosOperativos);
    agregarFilaResultado(resultados, 'Costos Directos', estado.pyl.costosDirectos);
    agregarFilaResultado(resultados, 'Gastos Operativos', estado.pyl.gastosOperativos);
    agregarFilaResultado(resultados, 'EBITDA', estado.pyl.ebitda);
    agregarFilaResultado(resultados, 'Impuestos', estado.pyl.impuestos);
    agregarFilaResultado(resultados, 'Utilidad Neta', estado.pyl.utilidadNeta);
    
    const margenBruto = estado.pyl.ingresosOperativos > 0 ? 
        (estado.pyl.ingresosOperativos - estado.pyl.costosDirectos) / estado.pyl.ingresosOperativos : 0;
    agregarFilaResultado(resultados, 'Margen Bruto', margenBruto, true);
    
    const eficienciaOperativa = estado.pyl.ingresosOperativos > 0 ? 
        estado.pyl.ebitda / estado.pyl.ingresosOperativos : 0;
    agregarFilaResultado(resultados, 'Eficiencia Operativa', eficienciaOperativa, true);
    
    const transaccionesTotales = estado.productos.reduce((sum, p) => sum + p.transaccionesAnuales, 0);
    const costoTransaccion = transaccionesTotales > 0 ? 
        (estado.pyl.costosDirectos + estado.pyl.gastosOperativos) / transaccionesTotales : 0;
    agregarFilaResultado(resultados, 'Costo por Transacción', costoTransaccion);
}

function agregarFilaResultado(tabla, concepto, valor, esPorcentaje = false) {
    const fila = document.createElement('tr');
    const celdaConcepto = document.createElement('td');
    celdaConcepto.textContent = concepto;
    const celdaValor = document.createElement('td');
    celdaValor.textContent = esPorcentaje ? 
        (valor * 100).toFixed(2) + '%' : 
        '$' + valor.toLocaleString('es-AR', { maximumFractionDigits: 2 });
    fila.appendChild(celdaConcepto);
    fila.appendChild(celdaValor);
    tabla.appendChild(fila);
}

// Funciones de Análisis PESTEL
function agregarVariablePestel(e) {
    e.preventDefault();
    const factor = document.getElementById('factorPestel').value;
    const variable = document.getElementById('variablePestel').value;
    const impacto = document.getElementById('impactoPestel').value;
    
    if (!variable.trim()) {
        alert('Por favor ingresa una variable');
        return;
    }
    
    estado.pestel.agregarVariable(factor, variable, impacto);
    actualizarVariablesPestel();
    actualizarGraficoPestel();
    mostrarEstrategiasPestel();
    actualizarEstrategiasRecomendadas();
    document.getElementById('variablePestel').value = '';
    guardarDatos();
}

function actualizarVariablesPestel() {
    const accordion = document.getElementById('variablesPestel');
    accordion.innerHTML = '';
    
    for (const [factor, datos] of Object.entries(estado.pestel.factores)) {
        if (datos.variables.length === 0) continue;
        
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';
        
        const header = document.createElement('h2');
        header.className = 'accordion-header';
        header.id = `heading${factor}`;
        
        const button = document.createElement('button');
        button.className = 'accordion-button collapsed';
        button.type = 'button';
        button.setAttribute('data-bs-toggle', 'collapse');
        button.setAttribute('data-bs-target', `#collapse${factor}`);
        button.textContent = `${factor} (Impacto: ${datos.impacto})`;
        header.appendChild(button);
        
        const collapse = document.createElement('div');
        collapse.id = `collapse${factor}`;
        collapse.className = 'accordion-collapse collapse';
        collapse.setAttribute('aria-labelledby', `heading${factor}`);
        collapse.setAttribute('data-bs-parent', '#variablesPestel');
        
        const body = document.createElement('div');
        body.className = 'accordion-body';
        const lista = document.createElement('ul');
        lista.className = 'list-group';
        
        datos.variables.forEach(v => {
            const item = document.createElement('li');
            item.className = 'list-group-item d-flex justify-content-between align-items-center';
            item.innerHTML = `
                ${v.nombre}
                <span class="badge bg-${getImpactoColor(v.impacto)} rounded-pill">
                    ${['Muy bajo', 'Bajo', 'Medio', 'Alto', 'Muy alto'][v.impacto - 1]}
                </span>
            `;
            lista.appendChild(item);
        });
        
        body.appendChild(lista);
        collapse.appendChild(body);
        accordionItem.appendChild(header);
        accordionItem.appendChild(collapse);
        accordion.appendChild(accordionItem);
    }
}

function getImpactoColor(impacto) {
    switch(impacto) {
        case 1: return 'secondary';
        case 2: return 'info';
        case 3: return 'primary';
        case 4: return 'warning';
        case 5: return 'danger';
        default: return 'secondary';
    }
}

function mostrarEstrategiasPestel() {
    const lista = document.getElementById('estrategiasPestel');
    lista.innerHTML = '';
    const estrategias = estado.pestel.obtenerEstrategias();
    
    if (estrategias.length === 0) {
        const item = document.createElement('li');
        item.className = 'list-group-item';
        item.textContent = 'No hay factores con impacto alto/muy alto';
        lista.appendChild(item);
        return;
    }
    
    estrategias.forEach(estrategia => {
        const item = document.createElement('li');
        item.className = 'list-group-item';
        item.innerHTML = `
            <strong>${estrategia.nombre}</strong>
            <p class="mb-0">${estrategia.descripcion}</p>
        `;
        lista.appendChild(item);
        
        if (!estado.estrategias.some(e => e.nombre === estrategia.nombre)) {
            estado.estrategias.push(estrategia);
        }
    });
}

// Funciones de Análisis Porter
function agregarVariablePorter(e) {
    e.preventDefault();
    const fuerza = document.getElementById('fuerzaPorter').value;
    const variable = document.getElementById('variablePorter').value;
    const impacto = document.getElementById('impactoPorter').value;
    
    if (!variable.trim()) {
        alert('Por favor ingresa una variable');
        return;
    }
    
    estado.porter.agregarVariable(fuerza, variable, impacto);
    actualizarVariablesPorter();
    actualizarGraficoPorter();
    mostrarEstrategiasPorter();
    actualizarEstrategiasRecomendadas();
    document.getElementById('variablePorter').value = '';
    guardarDatos();
}

function actualizarVariablesPorter() {
    const accordion = document.getElementById('variablesPorter');
    accordion.innerHTML = '';
    
    for (const [fuerza, datos] of Object.entries(estado.porter.fuerzas)) {
        if (datos.variables.length === 0) continue;
        
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';
        
        const header = document.createElement('h2');
        header.className = 'accordion-header';
        header.id = `headingPorter${fuerza}`;
        
        const button = document.createElement('button');
        button.className = 'accordion-button collapsed';
        button.type = 'button';
        button.setAttribute('data-bs-toggle', 'collapse');
        button.setAttribute('data-bs-target', `#collapsePorter${fuerza}`);
        button.textContent = `${fuerza} (Impacto: ${datos.impacto})`;
        header.appendChild(button);
        
        const collapse = document.createElement('div');
        collapse.id = `collapsePorter${fuerza}`;
        collapse.className = 'accordion-collapse collapse';
        collapse.setAttribute('aria-labelledby', `headingPorter${fuerza}`);
        collapse.setAttribute('data-bs-parent', '#variablesPorter');
        
        const body = document.createElement('div');
        body.className = 'accordion-body';
        const lista = document.createElement('ul');
        lista.className = 'list-group';
        
        datos.variables.forEach(v => {
            const item = document.createElement('li');
            item.className = 'list-group-item d-flex justify-content-between align-items-center';
            item.innerHTML = `
                ${v.nombre}
                <span class="badge bg-${getImpactoColor(v.impacto)} rounded-pill">
                    ${['Muy bajo', 'Bajo', 'Medio', 'Alto', 'Muy alto'][v.impacto - 1]}
                </span>
            `;
            lista.appendChild(item);
        });
        
        body.appendChild(lista);
        collapse.appendChild(body);
        accordionItem.appendChild(header);
        accordionItem.appendChild(collapse);
        accordion.appendChild(accordionItem);
    }
}

function mostrarEstrategiasPorter() {
    const lista = document.getElementById('estrategiasPorter');
    lista.innerHTML = '';
    const estrategias = estado.porter.obtenerEstrategias();
    
    if (estrategias.length === 0) {
        const item = document.createElement('li');
        item.className = 'list-group-item';
        item.textContent = 'No hay fuerzas con impacto alto/muy alto';
        lista.appendChild(item);
        return;
    }
    
    estrategias.forEach(estrategia => {
        const item = document.createElement('li');
        item.className = 'list-group-item';
        item.innerHTML = `
            <strong>${estrategia.nombre}</strong>
            <p class="mb-0">${estrategia.descripcion}</p>
        `;
        lista.appendChild(item);
        
        if (!estado.estrategias.some(e => e.nombre === estrategia.nombre)) {
            estado.estrategias.push(estrategia);
        }
    });
}

// Funciones de Análisis de Mercado (BCG + Ansoff)
function actualizarOpcionesProductosBcg() {
    const select = document.getElementById('productoBcg');
    select.innerHTML = '';
    
    estado.productos.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto.id;
        option.textContent = producto.nombre;
        select.appendChild(option);
    });
    
    if (estado.productos.length > 0) {
        const primerProducto = estado.productos[0];
        document.getElementById('crecimientoBcg').value = primerProducto.crecimiento;
        document.getElementById('penetracionBcg').value = primerProducto.penetracion;
    }
}

function actualizarBcg(e) {
    if (e) e.preventDefault();
    
    const productoId = document.getElementById('productoBcg').value;
    const crecimiento = parseInt(document.getElementById('crecimientoBcg').value) || 0;
    const penetracion = parseInt(document.getElementById('penetracionBcg').value) || 0;
    
    const producto = estado.productos.find(p => p.id === productoId);
    if (producto) {
        producto.crecimiento = crecimiento;
        producto.penetracion = penetracion;
        mostrarMatrizBcg();
        generarEstrategiasAnsoff();
        guardarDatos();
    }
}

function mostrarMatrizBcg() {
    document.getElementById('productosEstrella').innerHTML = '';
    document.getElementById('productosInterrogante').innerHTML = '';
    document.getElementById('productosVaca').innerHTML = '';
    document.getElementById('productosPerro').innerHTML = '';
    
    estado.productos.forEach(producto => {
        const item = document.createElement('li');
        item.className = 'list-group-item';
        item.innerHTML = `
            <strong>${producto.nombre}</strong>
            <div class="small">Crec: ${producto.crecimiento}% - Pen: ${producto.penetracion}%</div>
        `;
        
        if (producto.crecimiento >= 70 && producto.penetracion >= 70) {
            document.getElementById('productosEstrella').appendChild(item);
        } else if (producto.crecimiento >= 70 && producto.penetracion < 70) {
            document.getElementById('productosInterrogante').appendChild(item);
        } else if (producto.crecimiento < 70 && producto.penetracion >= 70) {
            document.getElementById('productosVaca').appendChild(item);
        } else {
            document.getElementById('productosPerro').appendChild(item);
        }
    });
}

function generarEstrategiasAnsoff() {
    document.getElementById('estrategiasPenetracion').innerHTML = '';
    document.getElementById('estrategiasDesarrollo').innerHTML = '';
    document.getElementById('estrategiasExpansion').innerHTML = '';
    document.getElementById('estrategiasDiversificacion').innerHTML = '';
    
    estado.productos.forEach(producto => {
        if (producto.crecimiento >= 70 && producto.penetracion >= 70) {
            agregarEstrategiaAnsoff('Penetración', 
                `Invertir en ${producto.nombre} para mantener liderazgo`,
                { crecimiento: 0.1, margenBruto: 0.02 });
            agregarEstrategiaAnsoff('Desarrollo', 
                `Mejorar ${producto.nombre} con nuevas características`,
                { crecimiento: 0.15, costoTransaccion: -0.05 });
        } 
        else if (producto.crecimiento >= 70 && producto.penetracion < 70) {
            agregarEstrategiaAnsoff('Desarrollo', 
                `Desarrollar ${producto.nombre} para aumentar participación`,
                { crecimiento: 0.2, penetracion: 0.15 });
            agregarEstrategiaAnsoff('Expansión', 
                `Llevar ${producto.nombre} a nuevos mercados`,
                { crecimiento: 0.25, penetracion: 0.2 });
        }
        else if (producto.crecimiento < 70 && producto.penetracion >= 70) {
            agregarEstrategiaAnsoff('Penetración', 
                `Optimizar costos de ${producto.nombre} para maximizar flujo`,
                { margenBruto: 0.03, eficienciaOperativa: 0.05 });
        }
        else {
            agregarEstrategiaAnsoff('Diversificación', 
                `Reposicionar ${producto.nombre} con nuevos usos`,
                { crecimiento: 0.3, penetracion: 0.25 });
        }
    });
    
    agregarEstrategiaAnsoff('Penetración', 
        'Aumentar participación de mercado con promociones',
        { crecimiento: 0.1, penetracion: 0.1 });
    agregarEstrategiaAnsoff('Desarrollo', 
        'Desarrollar nuevos productos para mercados existentes',
        { crecimiento: 0.15, margenBruto: 0.03 });
    agregarEstrategiaAnsoff('Expansión', 
        'Expandirse a nuevos mercados geográficos',
        { crecimiento: 0.2, penetracion: 0.15 });
    agregarEstrategiaAnsoff('Diversificación', 
        'Diversificar hacia productos/servicios relacionados',
        { crecimiento: 0.25, margenBruto: 0.02 });
}

function agregarEstrategiaAnsoff(tipo, descripcion, impacto) {
    const estrategia = {
        nombre: `${tipo}: ${descripcion.split(':')[0]}`,
        descripcion: descripcion,
        impacto: impacto,
        tipo: tipo
    };
    
    if (!estado.estrategias.some(e => e.nombre === estrategia.nombre)) {
        estado.estrategias.push(estrategia);
    }
    
    const listaId = `estrategias${tipo.replace(' ', '')}`;
    const lista = document.getElementById(listaId);
    const item = document.createElement('li');
    item.className = 'list-group-item';
    item.innerHTML = `
        <strong>${estrategia.nombre.split(':')[1]}</strong>
        <p class="mb-0 small">${estrategia.descripcion}</p>
    `;
    lista.appendChild(item);
}

// Funciones de Estrategias
function actualizarEstrategiasRecomendadas() {
    const lista = document.getElementById('listaEstrategias');
    lista.innerHTML = '';
    const select = document.getElementById('estrategiaSeleccionada');
    select.innerHTML = '<option value="">Selecciona una estrategia</option>';
    
    estado.estrategias.forEach(estrategia => {
        const item = document.createElement('li');
        item.className = 'list-group-item';
        item.innerHTML = `
            <h6 class="mb-1">${estrategia.nombre}</h6>
            <p class="mb-1 small">${estrategia.descripcion}</p>
            <div class="d-flex flex-wrap gap-1 mt-1">
                ${Object.entries(estrategia.impacto).map(([kpi, valor]) => `
                    <span class="badge bg-info">
                        ${kpi}: ${valor > 0 ? '+' : ''}${(valor * 100).toFixed(0)}%
                    </span>
                `).join('')}
            </div>
        `;
        lista.appendChild(item);
        
        const option = document.createElement('option');
        option.value = estrategia.nombre;
        option.textContent = estrategia.nombre;
        select.appendChild(option);
    });
}

function aplicarEstrategia(e) {
    e.preventDefault();
    const nombre = document.getElementById('estrategiaSeleccionada').value;
    const inversion = parseFloat(document.getElementById('inversionEstrategia').value);
    const duracion = parseInt(document.getElementById('duracionEstrategia').value);
    const crecimiento = parseFloat(document.getElementById('crecimientoEstrategia').value) / 100;
    
    if (!nombre || isNaN(inversion) || isNaN(duracion) || isNaN(crecimiento)) {
        alert('Por favor completa todos los campos correctamente');
        return;
    }
    
    const estrategiaBase = estado.estrategias.find(e => e.nombre === nombre);
    if (!estrategiaBase) return;
    
    const estrategia = new Estrategia(
        estrategiaBase.nombre,
        estrategiaBase.descripcion,
        estrategiaBase.impacto,
        inversion,
        duracion,
        crecimiento
    );
    
    estado.estrategiasAplicadas.push(estrategia);
    mostrarEstrategiasAplicadas();
    aplicarImpactoEstrategia(estrategia);
    e.target.reset();
    guardarDatos();
}

function aplicarImpactoEstrategia(estrategia) {
    if (estrategia.impacto.ebitda) {
        estado.pyl.ebitda *= (1 + estrategia.impacto.ebitda);
    }
    if (estrategia.impacto.margenBruto) {
        estado.pyl.costosDirectos *= (1 - estrategia.impacto.margenBruto);
    }
    if (estrategia.impacto.costoTransaccion) {
        estado.pyl.gastosOperativos *= (1 + estrategia.impacto.costoTransaccion);
    }
    
    if (estrategia.crecimiento) {
        estado.productos.forEach(p => {
            p.transaccionesAnuales = Math.round(p.transaccionesAnuales * (1 + estrategia.crecimiento));
        });
        calcularPylDesdeProductos();
    }
    
    const ahora = new Date();
    estado.historico = {
        ingresos: Array(12).fill().map((_, i) => ({
            mes: new Date(ahora.getFullYear(), i, 1).toLocaleString('default', { month: 'short' }),
            valor: estado.pyl.ingresosOperativos / 12
        })),
        ebitda: Array(12).fill(estado.pyl.ebitda / 12),
        margen: Array(12).fill(
            estado.pyl.ingresosOperativos > 0 ? 
            (estado.pyl.ingresosOperativos - estado.pyl.costosDirectos) / estado.pyl.ingresosOperativos : 0
        )
    };
    
    actualizarDashboard();
}

function mostrarEstrategiasAplicadas() {
    const tbody = document.getElementById('estrategiasAplicadas');
    tbody.innerHTML = '';
    
    estado.estrategiasAplicadas.forEach(estrategia => {
        const fila = document.createElement('tr');
        let impactoEbitda = 0;
        if (estrategia.impacto.ebitda) {
            impactoEbitda = estrategia.impacto.ebitda * 100;
        }
        
        fila.innerHTML = `
            <td>
                <strong>${estrategia.nombre}</strong>
                <div class="small text-muted">${estrategia.descripcion}</div>
            </td>
            <td>$${estrategia.inversion.toLocaleString('es-AR')}</td>
            <td>${estrategia.duracion} meses</td>
            <td>${impactoEbitda > 0 ? '+' : ''}${impactoEbitda.toFixed(0)}%</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="eliminarEstrategia('${estrategia.id}')">
                    Eliminar
                </button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

function eliminarEstrategia(id) {
    estado.estrategiasAplicadas = estado.estrategiasAplicadas.filter(e => e.id !== id);
    mostrarEstrategiasAplicadas();
    resetearImpactos();
    estado.estrategiasAplicadas.forEach(e => aplicarImpactoEstrategia(e));
    guardarDatos();
}

function resetearImpactos() {
    calcularPylDesdeProductos();
    estado.historico = {
        ingresos: [],
        ebitda: [],
        margen: []
    };
}

// Funciones de Dashboard
function actualizarDashboard() {
    const margenBruto = estado.pyl.ingresosOperativos > 0 ? 
        (estado.pyl.ingresosOperativos - estado.pyl.costosDirectos) / estado.pyl.ingresosOperativos : 0;
    const eficienciaOperativa = estado.pyl.ingresosOperativos > 0 ? 
        estado.pyl.ebitda / estado.pyl.ingresosOperativos : 0;
    const transaccionesTotales = estado.productos.reduce((sum, p) => sum + p.transaccionesAnuales, 0);
    const costoTransaccion = transaccionesTotales > 0 ? 
        (estado.pyl.costosDirectos + estado.pyl.gastosOperativos) / transaccionesTotales : 0;
    
    document.getElementById('kpi-ebitda').textContent = '$' + estado.pyl.ebitda.toLocaleString('es-AR', { maximumFractionDigits: 0 });
    document.getElementById('kpi-margen').textContent = (margenBruto * 100).toFixed(2) + '%';
    document.getElementById('kpi-eficiencia').textContent = (eficienciaOperativa * 100).toFixed(2) + '%';
    document.getElementById('kpi-costo').textContent = '$' + costoTransaccion.toFixed(2);
    document.getElementById('kpi-nps').textContent = Math.round(estado.presupuestos.nps * (1 + (Math.random() * 0.1 - 0.05)));
    document.getElementById('kpi-churn').textContent = (estado.presupuestos.churnRate * 100 * (1 + (Math.random() * 0.1 - 0.05))).toFixed(2) + '%';
    
    actualizarSemaforo('ebitda', estado.pyl.ebitda, estado.presupuestos.ebitda);
    actualizarSemaforo('margen', margenBruto, estado.presupuestos.margenBruto);
    actualizarSemaforo('eficiencia', eficienciaOperativa, estado.presupuestos.eficienciaOperativa);
    actualizarSemaforo('costo', costoTransaccion, estado.presupuestos.costoTransaccion, true);
    actualizarSemaforo('nps', parseFloat(document.getElementById('kpi-nps').textContent), estado.presupuestos.nps);
    actualizarSemaforo('churn', parseFloat(document.getElementById('kpi-churn').textContent) / 100, estado.presupuestos.churnRate, true);
    
    document.getElementById('presupuesto-ebitda').textContent = '$' + estado.presupuestos.ebitda.toLocaleString('es-AR', { maximumFractionDigits: 0 });
    document.getElementById('presupuesto-margen').textContent = (estado.presupuestos.margenBruto * 100).toFixed(2) + '%';
    document.getElementById('presupuesto-eficiencia').textContent = (estado.presupuestos.eficienciaOperativa * 100).toFixed(2) + '%';
    document.getElementById('presupuesto-costo').textContent = '$' + estado.presupuestos.costoTransaccion.toFixed(2);
    document.getElementById('presupuesto-nps').textContent = estado.presupuestos.nps;
    document.getElementById('presupuesto-churn').textContent = (estado.presupuestos.churnRate * 100).toFixed(2) + '%';
    
    actualizarGraficoPyl();
    actualizarGraficoIngresos();
    actualizarGraficoProductos();
}

function actualizarSemaforo(kpi, actual, presupuesto, invertir = false) {
    const elemento = document.getElementById(`sem-${kpi}`);
    const progress = document.getElementById(`progress-${kpi}`);
    let ratio = presupuesto === 0 ? 1 : actual / presupuesto;
    if (invertir) ratio = 1 / ratio;
    
    elemento.className = 'badge rounded-pill';
    progress.className = 'progress-bar';
    
    if (ratio >= 1.1) {
        elemento.classList.add('bg-success');
        progress.classList.add('bg-success');
        elemento.textContent = '✔ Supera objetivo';
    } else if (ratio >= 0.9) {
        elemento.classList.add('bg-warning');
        progress.classList.add('bg-warning');
        elemento.textContent = '⚠ Cerca del objetivo';
    } else {
        elemento.classList.add('bg-danger');
        progress.classList.add('bg-danger');
        elemento.textContent = '✖ Debajo del objetivo';
    }
    
    progress.style.width = `${Math.min(ratio * 100, 100)}%`;
}

// Funciones de gráficos
let pestelChart, porterChart, pylChart, ingresosChart, productosChart;

function inicializarGraficos() {
    // Gráfico PESTEL
    const ctxPestel = document.getElementById('pestelChart').getContext('2d');
    pestelChart = new Chart(ctxPestel, {
        type: 'radar',
        data: {
            labels: Object.keys(estado.pestel.factores),
            datasets: [{
                label: 'Impacto',
                data: Object.values(estado.pestel.factores).map(f => f.impacto),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Impacto: ${context.raw}/5`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    angleLines: { display: true },
                    suggestedMin: 0,
                    suggestedMax: 5,
                    ticks: {
                        stepSize: 1,
                        callback: function(value) {
                            return ['', 'Muy bajo', 'Bajo', 'Medio', 'Alto', 'Muy alto'][value];
                        }
                    }
                }
            }
        }
    });
    
    // Gráfico Porter
    const ctxPorter = document.getElementById('porterChart').getContext('2d');
    porterChart = new Chart(ctxPorter, {
        type: 'radar',
        data: {
            labels: Object.keys(estado.porter.fuerzas),
            datasets: [{
                label: 'Impacto',
                data: Object.values(estado.porter.fuerzas).map(f => f.impacto),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Impacto: ${context.raw}/5`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    angleLines: { display: true },
                    suggestedMin: 0,
                    suggestedMax: 5,
                    ticks: {
                        stepSize: 1,
                        callback: function(value) {
                            return ['', 'Muy bajo', 'Bajo', 'Medio', 'Alto', 'Muy alto'][value];
                        }
                    }
                }
            }
        }
    });
    
    // Gráfico P&L (Waterfall)
    const ctxPyl = document.getElementById('pylChart').getContext('2d');
    pylChart = new Chart(ctxPyl, {
        type: 'bar',
        data: {
            labels: ['Ingresos', 'Costos', 'Gastos', 'EBITDA', 'Impuestos', 'Utilidad'],
            datasets: [{
                label: 'Valor',
                data: [
                    estado.pyl.ingresosOperativos,
                    -estado.pyl.costosDirectos,
                    -estado.pyl.gastosOperativos,
                    estado.pyl.ebitda,
                    -estado.pyl.impuestos,
                    estado.pyl.utilidadNeta
                ],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(50, 205, 50, 0.7)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = Math.abs(context.raw);
                            return `${context.label}: $${value.toLocaleString('es-AR')}`;
                        }
                    }
                },
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return '$' + (value / 1000000).toLocaleString('es-AR') + 'M';
                        }
                    }
                }
            }
        }
    });
    
    // Gráfico de ingresos
    const ctxIngresos = document.getElementById('ingresosChart').getContext('2d');
    ingresosChart = new Chart(ctxIngresos, {
        type: 'line',
        data: {
            labels: estado.historico.ingresos.map(i => i.mes),
            datasets: [{
                label: 'Ingresos Operativos',
                data: estado.historico.ingresos.map(i => i.valor),
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Ingresos: $${context.raw.toLocaleString('es-AR')}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        callback: function(value) {
                            return '$' + (value / 1000000).toLocaleString('es-AR') + 'M';
                        }
                    }
                }
            }
        }
    });
    
    // Gráfico de productos
    const ctxProductos = document.getElementById('productosChart').getContext('2d');
    productosChart = new Chart(ctxProductos, {
        type: 'bar',
        data: {
            labels: estado.productos.map(p => p.nombre),
            datasets: [{
                label: 'Ingresos por Producto',
                data: estado.productos.map(p => p.transaccionesAnuales * p.valorPromedio),
                backgroundColor: estado.productos.map((_, i) => 
                    `hsl(${i * 360 / estado.productos.length}, 70%, 50%)`
                )
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Ingresos: $${context.raw.toLocaleString('es-AR')}`;
                        }
                    }
                },
                legend: { display: false }
            },
            scales: {
                y: {
                    ticks: {
                        callback: function(value) {
                            return '$' + (value / 1000000).toLocaleString('es-AR') + 'M';
                        }
                    }
                }
            }
        }
    });
}

function actualizarGraficoPestel() {
    pestelChart.data.datasets[0].data = Object.values(estado.pestel.factores).map(f => f.impacto);
    pestelChart.update();
}

function actualizarGraficoPorter() {
    porterChart.data.datasets[0].data = Object.values(estado.porter.fuerzas).map(f => f.impacto);
    porterChart.update();
}

function actualizarGraficoPyl() {
    pylChart.data.datasets[0].data = [
        estado.pyl.ingresosOperativos,
        -estado.pyl.costosDirectos,
        -estado.pyl.gastosOperativos,
        estado.pyl.ebitda,
        -estado.pyl.impuestos,
        estado.pyl.utilidadNeta
    ];
    pylChart.update();
}

function actualizarGraficoIngresos() {
    ingresosChart.data.datasets[0].data = estado.historico.ingresos.map(i => i.valor);
    ingresosChart.update();
}

function actualizarGraficoProductos() {
    productosChart.data.labels = estado.productos.map(p => p.nombre);
    productosChart.data.datasets[0].data = estado.productos.map(p => p.transaccionesAnuales * p.valorPromedio);
    productosChart.data.datasets[0].backgroundColor = estado.productos.map((_, i) => 
        `hsl(${i * 360 / estado.productos.length}, 70%, 50%)`
    );
    productosChart.update();
}

// Función para actualizar todas las vistas
function actualizarVistas() {
    actualizarListaProductos();
    mostrarResultadosPyl();
    actualizarVariablesPestel();
    actualizarGraficoPestel();
    mostrarEstrategiasPestel();
    actualizarVariablesPorter();
    actualizarGraficoPorter();
    mostrarEstrategiasPorter();
    actualizarOpcionesProductosBcg();
    mostrarMatrizBcg();
    generarEstrategiasAnsoff();
    actualizarEstrategiasRecomendadas();
    mostrarEstrategiasAplicadas();
    actualizarDashboard();
}

// Funciones de persistencia
function cargarDatosGuardados() {
    const datos = localStorage.getItem('simuladorNegocio');
    if (datos) {
        try {
            const parsed = JSON.parse(datos);
            
            estado.productos = parsed.productos.map(p => {
                const prod = new Producto(p.nombre, p.categoria, p.transaccionesAnuales, p.valorPromedio);
                prod.id = p.id;
                prod.crecimiento = p.crecimiento;
                prod.penetracion = p.penetracion;
                return prod;
            });
            
            estado.pyl = Object.assign(new PYL(), parsed.pyl);
            
            estado.pestel = new AnalisisPestel();
            for (const [factor, datos] of Object.entries(parsed.pestel.factores)) {
                datos.variables.forEach(v => {
                    estado.pestel.agregarVariable(factor, v.nombre, v.impacto);
                });
            }
            
            estado.porter = new AnalisisPorter();
            for (const [fuerza, datos] of Object.entries(parsed.porter.fuerzas)) {
                datos.variables.forEach(v => {
                    estado.porter.agregarVariable(fuerza, v.nombre, v.impacto);
                });
            }
            
            estado.estrategiasAplicadas = parsed.estrategiasAplicadas.map(e => 
                Object.assign(new Estrategia(e.nombre, e.descripcion, e.impacto), e)
            );
            
            estado.presupuestos = parsed.presupuestos || estado.presupuestos;
            estado.historico = parsed.historico || estado.historico;
            
            console.log('Datos cargados desde localStorage');
            return true;
        } catch (e) {
            console.error('Error al cargar datos guardados:', e);
            return false;
        }
    }
    return false;
}

function guardarDatos() {
    const datos = {
        productos: estado.productos,
        pyl: estado.pyl,
        pestel: estado.pestel,
        porter: estado.porter,
        estrategiasAplicadas: estado.estrategiasAplicadas,
        presupuestos: estado.presupuestos,
        historico: estado.historico
    };
    
    localStorage.setItem('simuladorNegocio', JSON.stringify(datos));
    console.log('Datos guardados en localStorage');
}

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    resetearABase();
    document.getElementById('productoForm').addEventListener('submit', agregarProducto);
    document.getElementById('pylForm').addEventListener('submit', calcularPyl);
    document.getElementById('pestelForm').addEventListener('submit', agregarVariablePestel);
    document.getElementById('porterForm').addEventListener('submit', agregarVariablePorter);
    document.getElementById('bcgForm').addEventListener('submit', actualizarBcg);
    document.getElementById('estrategiaForm').addEventListener('submit', aplicarEstrategia);
    inicializarGraficos();
    setInterval(guardarDatos, 30000);
});