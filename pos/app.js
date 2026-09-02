const GAS_WEBHOOK_URL = ""; // URL pendiente de configurar en la compu

﻿
let carrito = [];
let historial_ventas = [];
let historial_pedidos_b2b = [];
let app_mode = 'feria'; // 'feria' o 'mayorista'
let contactos_b2b = [];
let comboSeleccionados = [];
let currentEditId = null;
let html5QrCode = null;
let wakeLock = null;

// INICIALIZACION
document.addEventListener("DOMContentLoaded", async () => {
    try {
        if ('wakeLock' in navigator) {
            wakeLock = await navigator.wakeLock.request('screen');
        }
    } catch (err) { console.log("WakeLock error", err); }

    const savedCart = localStorage.getItem("rm_pos_cart");
    if(savedCart) { try { carrito = JSON.parse(savedCart); } catch(e){} }
    
    const savedHist = localStorage.getItem("rm_pos_historial");
    if(savedHist) { try { historial_ventas = JSON.parse(savedHist); } catch(e){} }
    
    const savedB2b = localStorage.getItem("rm_pos_b2b");
    if(savedB2b) { try { contactos_b2b = JSON.parse(savedB2b); } catch(e){} }

    const savedB2bOrders = localStorage.getItem("rm_pos_b2b_pedidos");
    if(savedB2bOrders) { try { historial_pedidos_b2b = JSON.parse(savedB2bOrders); } catch(e){} }

    renderCatalogo();
    renderCarrito();
    configNavigation();
    actualizarEstadisticasRapidas();
});

function saveState() {
    localStorage.setItem("rm_pos_cart", JSON.stringify(carrito));
    localStorage.setItem("rm_pos_historial", JSON.stringify(historial_ventas));
    localStorage.setItem("rm_pos_b2b", JSON.stringify(contactos_b2b));
    localStorage.setItem("rm_pos_b2b_pedidos", JSON.stringify(historial_pedidos_b2b));
}


// MODO MAYORISTA SWITCH
document.getElementById("chk-modo-mayorista").addEventListener("change", (e) => {
    if(carrito.length > 0) {
        if(!confirm("Cambiar de modo vaciará tu carrito actual para no mezclar precios. ¿Estás seguro?")) {
            e.preventDefault();
            e.target.checked = !e.target.checked;
            return;
        }
        carrito = [];
    }
    
    app_mode = e.target.checked ? 'mayorista' : 'feria';
    
    if(app_mode === 'mayorista') {
        document.body.classList.add("modo-mayorista");
        document.getElementById("btn-cobrar").innerText = "GENERAR PEDIDO";
    } else {
        document.body.classList.remove("modo-mayorista");
        document.getElementById("btn-cobrar").innerText = "COBRAR TICKET";
    }
    
    renderCatalogo();
    renderCarrito();
    actualizarEstadisticasRapidas();
});

// NAVEGACION
function configNavigation() {
    document.querySelectorAll(".nav-item").forEach(btn => {
        btn.addEventListener("click", (e) => {
            document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
            
            const target = btn.getAttribute("data-target");
            btn.classList.add("active");
            document.getElementById(target).classList.add("active");
            
            if(target === "view-cierre") actualizarEstadisticasRapidas();
        });
    });
}

function actualizarEstadisticasRapidas() {
    if(app_mode === 'mayorista') {
        let tB2b = historial_pedidos_b2b.reduce((sum, p) => sum + p.total, 0);
        document.getElementById("cierre-feria-section").style.display = "none";
        document.getElementById("cierre-b2b-section").style.display = "block";
        document.getElementById("stat-total-b2b").innerText = "$ " + tB2b.toLocaleString();
        
        let list = document.getElementById("lista-pedidos-b2b");
        list.innerHTML = "";
        historial_pedidos_b2b.forEach(p => {
            let desc = p.items.map(i => `${i.cantidad}x ${i.nombre}`).join(", ");
            list.innerHTML += `<div class="cart-card" style="border-left-color:#4fa3d1; display:block;">
                <strong style="color:#4fa3d1;">${p.cliente}</strong> <span style="float:right; font-weight:bold;">$${p.total}</span>
                <div style="font-size:0.8rem; color:#aaa; margin-top:5px;">${desc}</div>
            </div>`;
        });
        
    } else {
        document.getElementById("cierre-feria-section").style.display = "block";
        document.getElementById("cierre-b2b-section").style.display = "none";
        
        let tTotal = 0, tEfe = 0, tMP = 0;
        historial_ventas.forEach(v => {
            tTotal += v.total;
            if(v.medio === 'Efectivo') tEfe += v.total;
            else tMP += v.total;
        });
        document.getElementById("stat-total").innerText = "$ " + tTotal.toLocaleString();
        document.getElementById("stat-efectivo").innerText = "$ " + tEfe.toLocaleString();
        document.getElementById("stat-mp").innerText = "$ " + tMP.toLocaleString();
    }
}

// RENDERIZADO CATALOGO
function renderCatalogo() {
    const cont = document.getElementById("catalogo-list");
    cont.innerHTML = "";
    catalogo_data.forEach(p => {
        let div = document.createElement("div");
        div.className = "cart-card";
        let displayPrice = app_mode === 'mayorista' ? p.Precio_Mayorista : p.Precio_Venta;
        div.innerHTML = `
            <div class="cart-card-info">
                <div class="cart-card-title">${p.Nombre}</div>
                <div style="color:#aaa; font-size:0.9rem;">$ ${displayPrice}</div>
            </div>
            <button class="action-btn outline" style="padding:8px; flex:none; width:80px;" onclick="agregarAlCarritoPorCodigo('${p.Codigo}')">Vender</button>
        `;
        cont.appendChild(div);
    });
}
window.agregarAlCarritoPorCodigo = function(cod) {
    const p = catalogo_data.find(x => x.Codigo === cod);
    if(p) {
        agregarAlCarrito(p);
        document.querySelector('[data-target="view-vender"]').click();
    }
};

// LOGICA CARRITO
function agregarAlCarrito(producto, isCombo=false, comboNombres=[]) {
    let exist = carrito.find(x => x.codigo === producto.Codigo && x.esCombo === isCombo);
    if(exist) {
        exist.cantidad += 1;
    } else {
        let pFinal = app_mode === 'mayorista' ? producto.Precio_Mayorista : producto.Precio_Venta;
        carrito.push({
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            codigo: producto.Codigo || "GENERICO",
            nombre: producto.Nombre,
            precioOriginal: pFinal,
            precioFinal: pFinal,
            costoUnitario: producto.Precio_Mayorista,
            cantidad: 1,
            esCombo: isCombo,
            comboItems: comboNombres
        });
    }
    renderCarrito();
}

function renderCarrito() {
    saveState();
    const list = document.getElementById("cart-list");
    const empty = document.getElementById("empty-cart");
    const totLabel = document.getElementById("tot-vendido");
    const btnCobrar = document.getElementById("btn-cobrar");
    
    list.innerHTML = "";
    let total = 0;
    
    if(carrito.length === 0) {
        empty.style.display = "block";
        btnCobrar.style.display = "none";
        totLabel.innerText = "$ 0";
        return;
    }
    
    empty.style.display = "none";
    btnCobrar.style.display = "block";
    
    carrito.forEach(item => {
        total += (item.precioFinal * item.cantidad);
        let li = document.createElement("li");
        li.className = "cart-card";
        let extra = item.esCombo ? `<div style="font-size:0.75rem; color:#aaa;">${item.comboItems.join(", ")}</div>` : '';
        li.innerHTML = `
            <div class="cart-card-info">
                <div class="cart-card-title">${item.nombre}</div>
                ${extra}
                <div style="margin-top:5px;">
                    <span class="cart-card-price" onclick="abrirModalPrecio('${item.id}', '${item.nombre}')">$ ${item.precioFinal}</span>
                </div>
            </div>
            <div class="cart-card-qty">
                <button class="qty-btn" onclick="cambiarCantidad('${item.id}', -1)">-</button>
                <span style="font-size:1.2rem; font-weight:bold; width:25px; text-align:center;">${item.cantidad}</span>
                <button class="qty-btn" onclick="cambiarCantidad('${item.id}', 1)">+</button>
            </div>
        `;
        list.appendChild(li);
    });
    
    totLabel.innerText = "$ " + total.toLocaleString();
}

window.cambiarCantidad = function(id, delta) {
    let item = carrito.find(x => x.id === id);
    if(item) {
        item.cantidad += delta;
        if(item.cantidad <= 0) {
            carrito = carrito.filter(x => x.id !== id);
        }
        renderCarrito();
    }
};

window.abrirModalPrecio = function(id, nombre) {
    currentEditId = id;
    document.getElementById("modal-prod-name").innerText = nombre;
    document.getElementById("input-nuevo-precio").value = carrito.find(x => x.id === id).precioFinal;
    document.getElementById("modal-precio").style.display = "flex";
};
document.getElementById("btn-cancel-precio").addEventListener("click", () => document.getElementById("modal-precio").style.display = "none");
document.getElementById("btn-save-precio").addEventListener("click", () => {
    let item = carrito.find(x => x.id === currentEditId);
    let nPrecio = parseFloat(document.getElementById("input-nuevo-precio").value);
    if(item && !isNaN(nPrecio)) {
        item.precioFinal = nPrecio;
        renderCarrito();
    }
    document.getElementById("modal-precio").style.display = "none";
});

// AGREGAR MANUAL
document.getElementById("btn-manual").addEventListener("click", () => {
    document.querySelector('[data-target="view-catalogo"]').click();
});

// COMBO ARMADOR
document.getElementById("btn-crear-combo").addEventListener("click", () => {
    comboSeleccionados = [];
    renderComboList();
    actualizarCifrasCombo();
    document.getElementById("combo-precio-final").value = "";
    document.getElementById("modal-combo").style.display = "flex";
});
document.getElementById("btn-cancel-combo").addEventListener("click", () => document.getElementById("modal-combo").style.display = "none");

function renderComboList() {
    const clist = document.getElementById("combo-catalog-list");
    clist.innerHTML = "";
    catalogo_data.forEach(p => {
        let cnt = comboSeleccionados.filter(x => x.Codigo === p.Codigo).length;
        let cdiv = document.createElement("div");
        cdiv.className = "combo-sel-item";
        cdiv.innerHTML = `
            <span>${p.Nombre} ${cnt > 0 ? '<strong style="color:#d4af37;">(x'+cnt+')</strong>' : ''}</span>
            <button class="combo-sel-btn" onclick="addToCombo('${p.Codigo}')">Sumar</button>
        `;
        clist.appendChild(cdiv);
    });
}
window.addToCombo = function(codigo) {
    const p = catalogo_data.find(x => x.Codigo === codigo);
    if(p) {
        comboSeleccionados.push(p);
        renderComboList();
        actualizarCifrasCombo();
    }
};
function actualizarCifrasCombo() {
    let tCosto = comboSeleccionados.reduce((s, p) => s + parseFloat(p.Precio_Mayorista), 0);
    let tNormal = comboSeleccionados.reduce((s, p) => s + parseFloat(p.Precio_Venta), 0);
    document.getElementById("combo-costo").innerText = tCosto.toLocaleString();
    document.getElementById("combo-normal").innerText = tNormal.toLocaleString();
    if(document.getElementById("combo-precio-final").value === "" || document.getElementById("combo-precio-final").value === "0") {
        document.getElementById("combo-precio-final").value = tNormal;
    }
}
document.getElementById("btn-save-combo").addEventListener("click", () => {
    if(comboSeleccionados.length === 0) return alert("ElegÃ­ al menos un producto");
    let pFinal = parseFloat(document.getElementById("combo-precio-final").value);
    if(isNaN(pFinal)) return alert("PonÃ© un precio vÃ¡lido");
    let tCosto = comboSeleccionados.reduce((s, p) => s + parseFloat(p.Precio_Mayorista), 0);
    let nombres = comboSeleccionados.map(p => p.Nombre);
    agregarAlCarrito({ Nombre: "Combo Armado", Precio_Mayorista: tCosto, Precio_Venta: pFinal, Codigo: "COMBO" }, true, nombres);
    document.getElementById("modal-combo").style.display = "none";
});

// MAYORISTA B2B
document.getElementById("btn-b2b").addEventListener("click", () => {
    document.getElementById("b2b-nombre").value = "";
    document.getElementById("b2b-contacto").value = "";
    document.getElementById("modal-b2b").style.display = "flex";
});
document.getElementById("btn-cancel-b2b").addEventListener("click", () => document.getElementById("modal-b2b").style.display = "none");
document.getElementById("btn-save-b2b").addEventListener("click", () => {
    let nom = document.getElementById("b2b-nombre").value.trim();
    let con = document.getElementById("b2b-contacto").value.trim();
    if(!nom) return alert("Ingresa el nombre");
    contactos_b2b.push({ nombre: nom, contacto: con, fecha: new Date().toISOString() });
    saveState();
    alert("Lead Mayorista Guardado!");
    document.getElementById("modal-b2b").style.display = "none";
});

// ESCANER
document.getElementById("fab-scan").addEventListener("click", () => {
    const readerDiv = document.getElementById("reader");
    if(html5QrCode != null) {
        html5QrCode.stop().then(() => { html5QrCode.clear(); html5QrCode = null; readerDiv.style.display = "none"; }).catch(e=>{});
        return;
    }
    readerDiv.style.display = "block";
    html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
        { facingMode: "environment" }, { fps: 10, qrbox: {width: 250, height: 250} },
        (decodedText) => {
            const cleanCode = decodedText.trim().toUpperCase();
            const p = catalogo_data.find(x => x.Codigo && x.Codigo.trim().toUpperCase() === cleanCode);
            if(p) {
                agregarAlCarrito(p);
                html5QrCode.stop().then(() => { html5QrCode.clear(); html5QrCode = null; readerDiv.style.display = "none"; });
            } else {
                alert("CÃ³digo no reconocido: " + decodedText);
            }
        }, (err) => {}
    ).catch(err => { alert("Error al abrir cÃ¡mara."); readerDiv.style.display = "none"; html5QrCode = null; });
});

// LOGICA COBRO Y MEDIOS DE PAGO
document.getElementById("btn-cobrar").addEventListener("click", () => {
    if(carrito.length === 0) return;
    let t = carrito.reduce((s,i) => s + (i.precioFinal * i.cantidad), 0);
    
    if(app_mode === 'mayorista') {
        document.getElementById("b2b-total-txt").innerText = "TOTAL B2B: $" + t.toLocaleString();
        document.getElementById("input-b2b-cliente").value = "";
        document.getElementById("modal-pedido-b2b").style.display = "flex";
    } else {
        document.getElementById("cobro-total-txt").innerText = "A COBRAR: $" + t.toLocaleString();
        document.getElementById("modal-cobro").style.display = "flex";
    }
});
document.getElementById("btn-b2b-cancel").addEventListener("click", () => document.getElementById("modal-pedido-b2b").style.display = "none");
document.getElementById("btn-b2b-guardar").addEventListener("click", () => {
    let cli = document.getElementById("input-b2b-cliente").value.trim();
    if(!cli) return alert("Ingresa el nombre del cliente/vinoteca");
    
    let t = carrito.reduce((s,i) => s + (i.precioFinal * i.cantidad), 0);
    historial_pedidos_b2b.push({
        id: "B2B-" + Date.now(),
        fecha: new Date().toISOString(),
        cliente: cli,
        items: JSON.parse(JSON.stringify(carrito)),
        total: t
    });
    
    saveState();
    carrito = [];
    renderCarrito();
    actualizarEstadisticasRapidas();
    document.getElementById("modal-pedido-b2b").style.display = "none";
    alert(`Pedido B2B guardado exitosamente para ${cli}`);
});

document.getElementById("btn-pago-cancel").addEventListener("click", () => document.getElementById("modal-cobro").style.display = "none");

function procesarPago(medio) {
    let t = carrito.reduce((s,i) => s + (i.precioFinal * i.cantidad), 0);
    let c = carrito.reduce((s,i) => s + (i.costoUnitario * i.cantidad), 0);
    let id_ticket = "TKT-" + Date.now();
    historial_ventas.push({
        id: id_ticket,
        fecha: new Date().toISOString(),
        items: JSON.parse(JSON.stringify(carrito)),
        total: t,
        costo: c,
        medio: medio
    });
    carrito = [];
    renderCarrito();
    document.getElementById("modal-cobro").style.display = "none";
    
    // Quick toast
    const m = document.createElement("div");
    m.innerText = `Â¡Pagado con ${medio}!`;
    m.style.cssText = "position:fixed; top:20px; left:50%; transform:translateX(-50%); background:#4CAF50; color:white; padding:10px 20px; border-radius:5px; z-index:9999;";
    document.body.appendChild(m);
    setTimeout(() => m.remove(), 1500);
}
document.getElementById("btn-pago-efectivo").addEventListener("click", () => procesarPago("Efectivo"));
document.getElementById("btn-pago-mp").addEventListener("click", () => procesarPago("MercadoPago"));

// CIERRE DE CAJA TICKET - REPARTO MATEMATICO
document.getElementById("btn-calcular-cierre").addEventListener("click", () => {
    if(historial_ventas.length === 0) return alert("No hay ventas registradas hoy.");
    
    const isSocio = document.getElementById("chk-socio").checked;
    const gEdu = parseFloat(document.getElementById("gastos-edu").value) || 0;
    const gAlb = parseFloat(document.getElementById("gastos-alb").value) || 0;
    
    let tVentas = 0; let tCostos = 0; let tEfe = 0; let tMP = 0;
    let resumenStock = {};
    
    historial_ventas.forEach(v => {
        tVentas += v.total;
        tCostos += v.costo;
        if(v.medio === 'Efectivo') tEfe += v.total;
        else tMP += v.total;
        
        v.items.forEach(i => {
            let q = i.cantidad;
            if(i.esCombo) {
                i.comboItems.forEach(ci => { resumenStock[ci] = (resumenStock[ci] || 0) + q; });
            } else {
                resumenStock[i.nombre] = (resumenStock[i.nombre] || 0) + q;
            }
        });
    });
    
    let neta = tVentas - tCostos - gEdu - gAlb;
    if(neta < 0) neta = 0;
    
    let eduLeCorresponde = isSocio ? (tCostos + gEdu + (neta/2)) : (tVentas - gAlb);
    let albLeCorresponde = isSocio ? (gAlb + (neta/2)) : gAlb;
    
    // Algoritmo de Compensacion (Asumiendo que Eduardo recibe todo el MP en su cuenta virtual)
    let instruccion = "";
    if(isSocio) {
        if(tEfe >= albLeCorresponde) {
            instruccion = `El Socio se lleva <b>$${albLeCorresponde.toLocaleString()}</b> de la caja (billetes). Eduardo se queda con el resto del efectivo y todo el MercadoPago.`;
        } else {
            let faltante = albLeCorresponde - tEfe;
            instruccion = `El Socio se lleva todo el efectivo fisico ($${tEfe.toLocaleString()}). Ademas, Eduardo le debe transferir <b>$${faltante.toLocaleString()}</b> por MercadoPago para completar su parte.`;
        }
    } else {
        instruccion = ``;
    }
    
    document.getElementById("rep-caja").innerText = "$ " + tVentas.toLocaleString();
    document.getElementById("rep-costos").innerText = "$ " + tCostos.toLocaleString();
    document.getElementById("rep-gastos").innerText = "$ " + (gEdu + gAlb).toLocaleString();
    document.getElementById("rep-neta").innerText = "$ " + neta.toLocaleString();
    
    // RESTORED UI BOXES LOGIC
    document.getElementById("rep-edu").innerText = "$ " + eduLeCorresponde.toLocaleString();
    if(isSocio) {
        document.getElementById("rep-socio-box").style.display = "flex";
        document.getElementById("rep-alb").innerText = "$ " + albLeCorresponde.toLocaleString();
        document.getElementById("instruccion-liquidacion").style.display = "block";
    } else {
        document.getElementById("rep-socio-box").style.display = "none";
        document.getElementById("instruccion-liquidacion").style.display = "none";
    }
    
    document.getElementById("instruccion-liquidacion").innerHTML = instruccion;
    
    const ulStock = document.getElementById("lista-vendidos");
    ulStock.innerHTML = "";
    for(const [nombre, cant] of Object.entries(resumenStock)) {
        ulStock.innerHTML += `<li><span>${nombre}</span> <strong>x${cant}</strong></li>`;
    }
    
    document.getElementById("reporte-final").style.display = "block";
});

// BOTON WHATSAPP RESTAURADO
document.getElementById("btn-whatsapp").addEventListener("click", () => {
    let tVentas = document.getElementById("rep-caja").innerText;
    let tEdu = document.getElementById("rep-edu").innerText;
    let tAlb = document.getElementById("rep-alb").innerText;
    let isSocio = document.getElementById("chk-socio").checked;
    
    let msj = `*CIERRE FERIA ROJO MALBEC* %0A`;
    msj += `Venta Total: ${tVentas}%0A`;
    msj += `Eduardo: ${tEdu}%0A`;
    if(isSocio) msj += `Socio: ${tAlb}%0A%0A`;
    
    msj += `*Unidades Vendidas:*%0A`;
    const lis = document.querySelectorAll("#lista-vendidos li");
    lis.forEach(li => {
        msj += `- ${li.innerText.replace('\n', ' ')}%0A`;
    });
    
    window.open(`https://wa.me/?text=${msj}`, '_blank');
});

// SINCRONIZAR DATOS A GOOGLE SHEETS (NUBE)
document.getElementById("btn-sync-cloud").addEventListener("click", async () => {
    if(historial_ventas.length === 0 && contactos_b2b.length === 0 && historial_pedidos_b2b.length === 0) return alert("No hay datos para sincronizar.");
    
    if(!GAS_WEBHOOK_URL) {
        return alert("Primero debemos configurar la conexión con el ERP en la computadora. (Falta Webhook URL)");
    }
    
    const payload = {
        fecha_exportacion: new Date().toISOString(),
        ventas: historial_ventas,
        pedidos_mayoristas: historial_pedidos_b2b,
        contactos_b2b: contactos_b2b,
        gastos: {
            eduardo: parseFloat(document.getElementById("gastos-edu").value) || 0,
            socio: parseFloat(document.getElementById("gastos-alb").value) || 0
        }
    };
    
    const btn = document.getElementById("btn-sync-cloud");
    btn.innerText = "⏳ Sincronizando...";
    btn.disabled = true;
    
    try {
        const response = await fetch(GAS_WEBHOOK_URL, {
            method: "POST",
            // Se usa text/plain para evitar que el navegador bloquee la solicitud por CORS preflight
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(payload)
        });
        
        if(response.ok) {
            alert("☁️ ¡Sincronización Exitosa! Los datos ya están en el Buzón de tu Google Sheet.");
        } else {
            alert("Hubo un problema de conexión con Google Sheets. Intentá de nuevo.");
        }
    } catch(err) {
        console.error("Error sync:", err);
        alert("Error de conexión. Chequeá tu internet de datos/WiFi e intentá de nuevo.");
    } finally {
        btn.innerText = "☁️ Sincronizar a la Nube";
        btn.disabled = false;
    }
});

// VACIAR TODO
document.getElementById("btn-nuevo-dia").addEventListener("click", () => {
    if(confirm("¿Seguro queres vaciar TODO (Ventas, B2B y Carrito)? Hacelo SOLO si ya descargaste el archivo ERP.")) {
        carrito = [];
        historial_ventas = [];
        historial_pedidos_b2b = [];
        contactos_b2b = [];
        saveState();
        renderCarrito();
        actualizarEstadisticasRapidas();
        document.getElementById("reporte-final").style.display = "none";
        document.getElementById("gastos-edu").value = "0";
        document.getElementById("gastos-alb").value = "0";
        document.querySelector('[data-target="view-vender"]').click();
        alert("Caja en Cero. Listo para un nuevo dÃ­a.");
    }
});
