// app_v4.js - Core Application Logic

// Constantes globales
const PERFIL_ICONS = {
    "ahumado": "💨",
    "citrico": "🍋",
    "dulce": "🍯",
    "floral": "🌸",
    "picante": "🔥",
    "terroso": "🌍",
    "neutro": "🧂"
};

const INGREDIENT_IMAGES = {
    'Sal Marina Liberato Entrefina': 'images/ingredientes/cuenco_sal_marina_1780444990248.png',
    'Sal Marina Fina': 'images/ingredientes/cuenco_sal_marina_1780444990248.png',
    'Sal Marina Gruesa': 'images/ingredientes/cuenco_sal_marina_1780444990248.png',
    'Pimentón Nacional Dulce': 'images/ingredientes/cuenco_pimenton_1780445005613.png',
    'Pimentón Nacional Picante': 'images/ingredientes/cuenco_pimenton_1780445005613.png',
    'Pimentón Nacional Ahumado': 'images/ingredientes/cuenco_pimenton_1780445005613.png',
    'Pimentón Español Dulce': 'images/ingredientes/cuenco_pimenton_1780445005613.png',
    'Pimentón Español Picante': 'images/ingredientes/cuenco_pimenton_1780445005613.png',
    'Pimentón Español Ahumado': 'images/ingredientes/cuenco_pimenton_1780445005613.png',
    'Pimentón Español (Dulce)': 'images/ingredientes/cuenco_pimenton_1780445005613.png',
    'Cardamomo': 'images/ingredientes/cuenco_cardamomo_1780447650513.png',
    'Pimienta Larga': 'images/ingredientes/cuenco_pimienta_larga_1780447659747.png',
    'Romero': 'images/ingredientes/cuenco_romero_1780447670584.png',
    'Orégano': 'images/ingredientes/cuenco_oregano_1780447684897.png',
    'Sumac': 'images/ingredientes/cuenco_sumac_1780447893911.png',
    'Cúrcuma en Polvo': 'images/ingredientes/cuenco_curcuma_1780447905955.png',
    'Cúrcuma en Raíz': 'images/ingredientes/cuenco_curcuma_1780447905955.png',
    'Coriandro': 'images/ingredientes/cuenco_coriandro_1780447918163.png'
};

const state = {
    currentFilter: 'todos',
    cart: [],
    customBlend: []
};

let currentProductFilter = 'todos';

const elements = {
    ingredientsGrid: document.getElementById('ingredientsGrid'),
    blendList: document.getElementById('blendList'),
    emptyState: document.getElementById('emptyState'),
    cartCount: document.getElementById('cartCount'),
    cartCountMobile: document.getElementById('cartCountMobile'),
    cartModal: document.getElementById('cartModal'),
    cartItems: document.getElementById('cartItems'),
    cartTotal: document.getElementById('cartTotal'),
    productModal: document.getElementById('productModal'),
    productModalBody: document.getElementById('productModalBody'),
    checkoutModal: document.getElementById('checkoutModal')
};

const screens = {
    home: document.getElementById('screenHome'),
    explore: document.getElementById('screenExplore'),
    blend: document.getElementById('screenBlend'),
    order: document.getElementById('screenOrder'),
    blog: document.getElementById('screenBlog'),
    products: document.getElementById('screenProducts')
};

// Navegación
function navigateTo(screenName) {
    for (const key in screens) {
        if (screens[key]) {
            screens[key].classList.remove('active');
        }
    }
    if (screens[screenName]) {
        screens[screenName].classList.add('active');
    }
    
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    
    // Activar botón navbar desktop
    const desktopBtn = document.querySelector(`.nav-item[onclick="navigateTo('${screenName}')"]`);
    if (desktopBtn) desktopBtn.classList.add('active');
    
    // Activar botón mobile
    const mobileBtn = document.querySelector(`.mobile-nav-item[onclick="navigateTo('${screenName}')"]`);
    if (mobileBtn) {
        document.querySelectorAll('.mobile-nav-item').forEach(b => b.classList.remove('active'));
        mobileBtn.classList.add('active');
    }

    if (screenName === 'explore') renderIngredients();
    if (screenName === 'blend') renderBlend();
    if (screenName === 'order') renderOrderSummary();
    if (screenName === 'blog') renderBlog();
    if (screenName === 'products') renderProducts();
    
    window.scrollTo(0,0);
}

// Catálogo de Productos
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid || typeof productos === 'undefined') return;

    let filtered = productos;
    if (currentProductFilter !== 'todos') {
        filtered = [];
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].categoria === currentProductFilter) {
                filtered.push(productos[i]);
            }
        }
    }

    const htmlArray = [];
    for (let i = 0; i < filtered.length; i++) {
        const prod = filtered[i];
        const vitalBadge = prod.sinSodio ? '<span class="vital-indicator">💚 0% Sodio</span>' : '';
        const imgPath = prod.imagen ? encodeURI(prod.imagen) : '';
        
        let imageHtml = '';
        let emojiStyle = '';
        if (imgPath) {
            imageHtml = `<img src="${imgPath}" alt="${prod.nombre}" style="width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none'">`;
            emojiStyle = 'style="display:none;"';
        }

        htmlArray.push(`
        <div class="product-card" onclick="openProductModal(${prod.id})">
            <div class="product-image-container">
                ${imageHtml}
                <div class="product-emoji-fallback" ${emojiStyle}>${prod.emoji || '🧂'}</div>
                ${vitalBadge}
            </div>
            <div class="product-info">
                <h3 class="product-title">${prod.nombre}</h3>
                <p class="product-tagline">${prod.tagline || ''}</p>
                <button class="btn btn-primary" style="width:100%; margin-top:15px;" onclick="event.stopPropagation(); addToCartFromCatalog(${prod.id}, '${prod.nombre.replace(/'/g, "\\'")}')">Añadir al Carrito</button>
            </div>
        </div>
        `);
    }
    grid.innerHTML = htmlArray.join('');
}

function filterProducts(cat) {
    currentProductFilter = cat;
    document.querySelectorAll('.product-filters .filter-chip').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === cat) btn.classList.add('active');
    });
    renderProducts();
}

// Blend Builder - Ingredientes
function renderIngredients() {
    const grid = elements.ingredientsGrid;
    if (!grid || typeof INGREDIENTES === 'undefined') return;

    let filtered = INGREDIENTES;
    if (state.currentFilter !== 'todos') {
        filtered = [];
        for (let i = 0; i < INGREDIENTES.length; i++) {
            if (INGREDIENTES[i].perfiles && INGREDIENTES[i].perfiles.indexOf(state.currentFilter) !== -1) {
                filtered.push(INGREDIENTES[i]);
            }
        }
    }

    const htmlArray = [];
    for (let i = 0; i < filtered.length; i++) {
        const ing = filtered[i];
        let tagsHtml = '';
        if (ing.perfiles) {
            for (let t = 0; t < ing.perfiles.length; t++) {
                const p = ing.perfiles[t];
                const icon = (typeof PERFIL_ICONS !== 'undefined' && PERFIL_ICONS[p]) ? PERFIL_ICONS[p] : '';
                tagsHtml += `<span class="tag" style="font-size:0.7rem; padding:2px 6px; background:#f0f0f0; border-radius:4px; margin-right:4px; display:inline-block; margin-bottom:4px;">${icon} ${p}</span>`;
            }
        }

        // Obtener imagen inyectada o usar la de la base de datos si existiera
        const imgPath = INGREDIENT_IMAGES[ing.nombre] || ing.imagen || '';
        
        let imageHtml = '';
        let emojiStyle = '';
        if (imgPath) {
            imageHtml = `<img src="${encodeURI(imgPath)}" alt="${ing.nombre}" style="width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none'">`;
            emojiStyle = 'style="display:none;"';
        }

        htmlArray.push(`
        <div class="ingredient-card" onclick="addToBlend(${ing.id})">
            <div class="ingredient-emoji-container">
                ${imageHtml}
                <div class="ingredient-emoji-fallback" ${emojiStyle}>${ing.icono || '🧂'}</div>
            </div>
            <div class="ingredient-info">
                <h4>${ing.nombre}</h4>
                <div style="margin-top:5px; line-height:1.2;">${tagsHtml}</div>
            </div>
        </div>
        `);
    }
    grid.innerHTML = htmlArray.join('');
}

function setFilter(filterType) {
    state.currentFilter = filterType;
    document.querySelectorAll('#filtersRow .filter-chip').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-target') === filterType) btn.classList.add('active');
    });
    renderIngredients();
}

function addToBlend(id) {
    if (typeof INGREDIENTES === 'undefined') return;
    let ing = null;
    for (let i = 0; i < INGREDIENTES.length; i++) {
        if (INGREDIENTES[i].id === id) {
            ing = INGREDIENTES[i];
            break;
        }
    }
    if (!ing) return;
    
    let exists = false;
    for (let i = 0; i < state.customBlend.length; i++) {
        if (state.customBlend[i].id === id) {
            state.customBlend[i].parts++;
            exists = true;
            break;
        }
    }
    
    if (!exists) {
        state.customBlend.push({ ...ing, parts: 1 });
    }
    updateBlendBadge();
    showToast(`Se añadió ${ing.nombre} a tu Blend`);
}

function renderBlend() {
    if (!elements.blendList || !elements.emptyState) return;
    
    if (state.customBlend.length === 0) {
        elements.blendList.innerHTML = '';
        elements.emptyState.style.display = 'block';
        return;
    }

    elements.emptyState.style.display = 'none';
    let totalParts = 0;
    for (let i = 0; i < state.customBlend.length; i++) {
        totalParts += state.customBlend[i].parts;
    }

    const htmlArray = [];
    for (let i = 0; i < state.customBlend.length; i++) {
        const item = state.customBlend[i];
        const percentage = Math.round((item.parts / totalParts) * 100);
        htmlArray.push(`
        <div class="blend-item">
            <div class="blend-item-info">
                <h4>${item.nombre}</h4>
                <p>${percentage}% de la mezcla</p>
            </div>
            <div class="blend-item-controls">
                <button class="btn btn-icon" onclick="updateParts(${item.id}, -1)">-</button>
                <span style="min-width:20px; text-align:center;">${item.parts}</span>
                <button class="btn btn-icon" onclick="updateParts(${item.id}, 1)">+</button>
            </div>
        </div>
        `);
    }
    elements.blendList.innerHTML = htmlArray.join('');
}

function updateParts(id, delta) {
    for (let i = 0; i < state.customBlend.length; i++) {
        if (state.customBlend[i].id === id) {
            state.customBlend[i].parts += delta;
            if (state.customBlend[i].parts <= 0) {
                state.customBlend.splice(i, 1);
            }
            break;
        }
    }
    renderBlend();
    updateBlendBadge();
}

function updateBlendBadge() {
    let total = 0;
    for (let i = 0; i < state.customBlend.length; i++) {
        total += state.customBlend[i].parts;
    }
    const badge = document.getElementById('blendBadge');
    if (badge) {
        badge.innerText = total;
        badge.style.display = total > 0 ? 'inline-block' : 'none';
    }
}

// Blog
function renderBlog() {
    const grid = document.getElementById('blogGrid');
    if (!grid) return;
    
    const articulos = [
        {
            titulo: "El secreto del humo en el asado",
            fecha: "20 Mayo 2026",
            imagen: "images/blog/blog_humo_1780447000000.png",
            resumen: "Descubre por qué la leña correcta puede transformar tu carne en una experiencia sensorial inigualable."
        },
        {
            titulo: "Maridaje perfecto: Vinos y Especias",
            fecha: "18 Mayo 2026",
            imagen: "images/blog/blog_vino_1780447100000.png",
            resumen: "Aprende a combinar nuestros blends de especias con los mejores vinos tintos de la región de Mendoza."
        },
        {
            titulo: "Sales sin sodio: Cuidando tu corazón",
            fecha: "15 Mayo 2026",
            imagen: "images/blog/blog_vital_1780447200000.png",
            resumen: "La línea Vital fue creada para que no tengas que sacrificar sabor por salud. Conoce los secretos."
        }
    ];

    const htmlArray = [];
    for (let i = 0; i < articulos.length; i++) {
        const art = articulos[i];
        let imgTag = '';
        if (art.imagen) {
            imgTag = `<img src="${encodeURI(art.imagen)}" style="width:100%; height:200px; object-fit:cover; border-radius: var(--radius) var(--radius) 0 0;" alt="${art.titulo}">`;
        }
        
        htmlArray.push(`
        <div class="product-card" style="padding:0; overflow:hidden;">
            ${imgTag}
            <div style="padding: 20px;">
                <p style="font-size: 0.8rem; color: #666; margin-bottom: 5px;">${art.fecha}</p>
                <h3 style="margin-bottom: 10px;">${art.titulo}</h3>
                <p style="color: #444; font-size: 0.95rem;">${art.resumen}</p>
                <button class="btn" style="margin-top: 15px; width: 100%; background: #eee;">Leer artículo</button>
            </div>
        </div>
        `);
    }
    
    grid.innerHTML = htmlArray.join('');
}

// Carrito (Funcionalidad Simulada)
function loadCart() {
    try {
        const saved = localStorage.getItem('rojoMalbecCart');
        if (saved) {
            state.cart = JSON.parse(saved);
        }
    } catch(e) { state.cart = []; }
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('rojoMalbecCart', JSON.stringify(state.cart));
    updateCartUI();
}

function addToCartFromCatalog(id, nombre) {
    let exists = false;
    for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id === 'prod_'+id) {
            state.cart[i].qty++;
            exists = true;
            break;
        }
    }
    if (!exists) {
        state.cart.push({ id: 'prod_'+id, name: nombre, price: 8500, qty: 1 });
    }
    saveCart();
    showToast(`Se añadió ${nombre} al carrito`);
}

function addBlendToCart() {
    if (state.customBlend.length === 0) return;
    state.cart.push({
        id: 'blend_' + Date.now(),
        name: 'Mi Blend Personalizado',
        price: 12000,
        qty: 1,
        isBlend: true
    });
    saveCart();
    state.customBlend = [];
    renderBlend();
    updateBlendBadge();
    showToast('Blend añadido al carrito');
    navigateTo('home');
}

function updateCartUI() {
    let totalItems = 0;
    for (let i = 0; i < state.cart.length; i++) {
        totalItems += state.cart[i].qty;
    }
    
    if (elements.cartCount) elements.cartCount.innerText = totalItems;
    if (elements.cartCountMobile) elements.cartCountMobile.innerText = totalItems;
}

function toggleCart() {
    if (elements.cartModal.classList.contains('active')) {
        elements.cartModal.classList.remove('active');
    } else {
        renderCartItems();
        elements.cartModal.classList.add('active');
    }
}

function renderCartItems() {
    if (!elements.cartItems) return;
    
    if (state.cart.length === 0) {
        elements.cartItems.innerHTML = '<p style="text-align:center; padding: 20px; color:#666;">Tu carrito está vacío</p>';
        elements.cartTotal.innerText = '$0';
        return;
    }

    let total = 0;
    const htmlArray = [];
    for (let i = 0; i < state.cart.length; i++) {
        const item = state.cart[i];
        total += item.price * item.qty;
        htmlArray.push(`
        <div style="display:flex; justify-content:space-between; align-items:center; padding: 10px 0; border-bottom:1px solid #eee;">
            <div>
                <strong>${item.name}</strong>
                <div style="color:#666; font-size:0.9rem;">$${item.price} x ${item.qty}</div>
            </div>
            <button class="btn btn-icon" onclick="removeFromCart('${item.id}')">❌</button>
        </div>
        `);
    }
    elements.cartItems.innerHTML = htmlArray.join('');
    elements.cartTotal.innerText = '$' + total.toLocaleString();
}

function removeFromCart(id) {
    const newCart = [];
    for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id !== id) {
            newCart.push(state.cart[i]);
        }
    }
    state.cart = newCart;
    saveCart();
    renderCartItems();
}

function checkout() {
    if (state.cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    elements.cartModal.classList.remove('active');
    elements.checkoutModal.classList.add('active');
}

function closeCheckout() {
    elements.checkoutModal.classList.remove('active');
}

function confirmOrder() {
    elements.checkoutModal.classList.remove('active');
    state.cart = [];
    saveCart();
    alert("¡Pedido confirmado! Gracias por elegir Rojo Malbec.");
    navigateTo('home');
}

// UI Helpers
function showToast(msg) {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = 'var(--primary)';
    toast.style.color = 'white';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '30px';
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    toast.style.zIndex = '9999';
    toast.innerText = msg;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease';
        setTimeout(() => toast.remove(), 500);
    }, 2500);
}

function openProductModal(id) {
    if (typeof productos === 'undefined') return;
    let prod = null;
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === id) {
            prod = productos[i];
            break;
        }
    }
    if (!prod) return;

    const imgPath = prod.imagen ? encodeURI(prod.imagen) : '';
    let imageHtml = '';
    if (imgPath) {
        imageHtml = `<img src="${imgPath}" alt="${prod.nombre}" style="width:100%; height:250px; object-fit:cover; border-radius: var(--radius); margin-bottom: 20px;" onerror="this.style.display='none'">`;
    }

    let html = `
        ${imageHtml}
        <h2>${prod.nombre}</h2>
        <h4 style="color: var(--primary); margin: 10px 0;">${prod.tagline || ''}</h4>
        <p style="white-space: pre-line; line-height: 1.6; margin-bottom: 20px;">${prod.descripcion || 'Sin descripción'}</p>
    `;

    if (prod.ingredientes) {
        html += `
            <div style="background: #f9f9f9; padding: 15px; border-radius: var(--radius); margin-bottom: 20px;">
                <strong>Ingredientes:</strong> ${prod.ingredientes}
            </div>
        `;
    }

    if (prod.maridaje) {
        html += `
            <div style="background: #fff3e0; padding: 15px; border-radius: var(--radius); margin-bottom: 20px;">
                <strong>Sugerencia de Maridaje:</strong> ${prod.maridaje}
            </div>
        `;
    }

    html += `
        <button class="btn btn-primary" style="width: 100%; padding: 15px; font-size: 1.1rem;" onclick="addToCartFromCatalog(${prod.id}, '${prod.nombre.replace(/'/g, "\\'")}'); closeProductModal();">
            Añadir al Carrito - $8.500
        </button>
    `;

    elements.productModalBody.innerHTML = html;
    elements.productModal.classList.add('active');
}

function closeProductModal() {
    elements.productModal.classList.remove('active');
}

function safeBind(id, event, handler) {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener(event, handler);
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    updateBlendBadge();
    
    // Bind filters
    safeBind('filtersRow', 'click', (e) => {
        if (e.target.classList.contains('filter-chip')) {
            setFilter(e.target.getAttribute('data-target'));
        }
    });

    safeBind('productFilters', 'click', (e) => {
        if (e.target.classList.contains('filter-chip')) {
            filterProducts(e.target.getAttribute('data-category'));
        }
    });
    
    // Iniciar app
    navigateTo('home');
});
