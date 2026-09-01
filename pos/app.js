
let carrito = [];
let historial_ventas = [];
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

    renderCatalogo();
    renderCarrito();
    configNavigation();
    actualizarEstadisticasRapidas();
});

function saveState() {
    localStorage.setItem("rm_pos_cart", JSON.stringify(carrito));
    localStorage.setItem("rm_pos_historial", JSON.stringify(historial_ventas));
    localStorage.setItem("rm_pos_b2b", JSON.stringify(contactos_b2b));
}

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

// RENDERIZADO CATALOGO
function renderCatalogo() {
    const cont = document.getElementById("catalogo-list");
    cont.innerHTML = "";
    catalogo_data.forEach(p => {
        let div = document.createElement("div");
        div.className = "cat-item";
        div.innerHTML = `
            <div class="cat-info">
                <strong>${p.Nombre}</strong>
                <span style="color:#aaa; font-size:0.8rem;">Cod: ${p.Codigo}</span>
            </div>
            <div class="cat-price">$${p.Precio_Venta}</div>
            <button class="cat-add-btn" onclick="agregarAlCarritoPorCodigo('${p.Codigo}')">+</button>
        `;
        cont.appendChild(div);
    });
}
window.agregarAlCarritoPorCodigo = function(cod) {
    const p = catalogo_data.find(x => x.Codigo === cod);
    if(p) agregarAlCarrito(p);
};

// LOGICA CARRITO
function agregarAlCarrito(producto, isCombo=false, comboNombres=[]) {
    let exist = carrito.find(x => x.codigo === producto.Codigo && x.esCombo === isCombo);
    if(exist) {
        exist.cantidad += 1;
    } else {
        carrito.push({
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            codigo: producto.Codigo || "GENERICO",
            nombre: producto.Nombre,
            precioOriginal: producto.Precio_Venta,
            precioFinal: producto.Precio_Venta,
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
        li.className = "cart-item";
        li.innerHTML = `
            <div class="cart-item-details">
                <div class="cart-item-name">${item.nombre}</div>
                <div class="cart-item-price" onclick="abrirModalPrecio('${item.id}', '${item.nombre}')" style="cursor:pointer; color:#d4af37; text-decoration:underline;">
                    $${item.precioFinal} 
                </div>
            </div>
            <div class="cart-item-actions">
                <button class="qty-btn" onclick="cambiarCantidad('${item.id}', -1)">-</button>
                <span style="width:20px; text-align:center;">${item.cantidad}</span>
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
    document.getElementById("cobro-total-txt").innerText = "A COBRAR: $" + t.toLocaleString();
    document.getElementById("modal-cobro").style.display = "flex";
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
            instruccion = `Alberto se lleva <b>$${albLeCorresponde.toLocaleString()}</b> de la caja (billetes). Eduardo se queda con el resto del efectivo y todo el MercadoPago.`;
        } else {
            let faltante = albLeCorresponde - tEfe;
            instruccion = `Alberto se lleva <b>todo el efectivo</b> de la caja ($${tEfe.toLocaleString()}). AdemÃ¡s, Eduardo le debe transferir <b>$${faltante.toLocaleString()}</b> por MercadoPago.`;
        }
    } else {
        instruccion = `Eduardo se lleva todo.`;
    }
    
    document.getElementById("rep-caja").innerText = "$ " + tVentas.toLocaleString();
    document.getElementById("rep-costos").innerText = "$ " + tCostos.toLocaleString();
    document.getElementById("rep-gastos").innerText = "$ " + (gEdu + gAlb).toLocaleString();
    document.getElementById("rep-neta").innerText = "$ " + neta.toLocaleString();
    
    document.getElementById("instruccion-liquidacion").innerHTML = instruccion;
    
    const ulStock = document.getElementById("lista-vendidos");
    ulStock.innerHTML = "";
    for(const [nombre, cant] of Object.entries(resumenStock)) {
        ulStock.innerHTML += `<li><span>${nombre}</span> <strong>x${cant}</strong></li>`;
    }
    
    document.getElementById("reporte-final").style.display = "block";
});

// DESCARGAR JSON PARA ERP
document.getElementById("btn-download-json").addEventListener("click", () => {
    if(historial_ventas.length === 0 && contactos_b2b.length === 0) return alert("No hay datos para exportar.");
    
    const payload = {
        fecha_exportacion: new Date().toISOString(),
        ventas: historial_ventas,
        contactos_b2b: contactos_b2b,
        gastos: {
            eduardo: parseFloat(document.getElementById("gastos-edu").value) || 0,
            socio: parseFloat(document.getElementById("gastos-alb").value) || 0
        }
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `ventas_feria_${new Date().getTime()}.json`);
    dlAnchorElem.click();
});

// VACIAR TODO
document.getElementById("btn-nuevo-dia").addEventListener("click", () => {
    if(confirm("Â¿Seguro querÃ©s vaciar TODO (Ventas, B2B y Carrito)? Hacelo SÃ“LO si ya descargaste el archivo ERP.")) {
        carrito = [];
        historial_ventas = [];
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
