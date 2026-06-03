/* ============================================
   ROJO MALBEC E-COMMERCE - APP LOGIC
   ============================================ */

const state = {
    currentScreen: 'home',
    selectedIngredients: [],
    currentFilter: 'todos',
    currentIngredient: null,
    cart: []
};

const WHATSAPP_NUMBER = '5493544308380';

const screens = {
    home: document.getElementById('screen-home'),
    explore: document.getElementById('screen-explore'),
    blend: document.getElementById('screen-blend'),
    order: document.getElementById('screen-order'),
    products: document.getElementById('screen-products'),
    about: document.getElementById('screen-about'),
    blog: document.getElementById('screen-blog'),
    post: document.getElementById('screen-post')
};

const elements = {
    ingredientsGrid: document.getElementById('ingredientsGrid'),
    blendList: document.getElementById('blendList'),
    blendEmpty: document.getElementById('blendEmpty'),
    blendSummary: document.getElementById('blendSummary'),
    btnOrder: document.getElementById('btnOrder'),
    ingredientCount: document.getElementById('ingredientCount'),
    profileTags: document.getElementById('profileTags'),
    selectedList: document.getElementById('selectedList'),
    ingredientModal: document.getElementById('ingredientModal'),
    productModal: document.getElementById('productModal'),
    cartSidebar: document.getElementById('cartSidebar'),
    cartOverlay: document.getElementById('cartOverlay'),
    globalCartItems: document.getElementById('globalCartItems'),
    cartBadgeGlobal: document.getElementById('cartBadgeGlobal'),
    btnAddToCart: document.getElementById('btnAddToCart')
};

function safeBind(id, ev, cb) {
    const el = document.getElementById(id);
    if (el) el.addEventListener(ev, cb);
}

function navigateTo(screenName) {
    if (!screens[screenName]) return;

    Object.keys(screens).forEach(key => {
        if(screens[key]) screens[key].classList.remove('active');
    });
    screens[screenName].classList.add('active');

    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
    for (let i = 0; i < navLinks.length; i++) {
        const item = navLinks[i];
        if (item.dataset.target === screenName) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    }

    state.currentScreen = screenName;
    window.scrollTo(0, 0);

    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) mobileMenu.classList.remove('open');

    if (screenName === 'explore') renderIngredients();
    if (screenName === 'blend') renderBlend();
    if (screenName === 'order') renderOrderSummary();
    if (screenName === 'blog') renderBlog();
    if (screenName === 'products') renderProducts();
}

const navLinksInit = document.querySelectorAll('.nav-link, .mobile-link');
for (let i = 0; i < navLinksInit.length; i++) {
    const item = navLinksInit[i];
    item.addEventListener('click', () => navigateTo(item.dataset.target));
}

safeBind('btnMobileMenu', 'click', () => {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) mobileMenu.classList.toggle('open');
});

safeBind('btnStartBlend', 'click', () => navigateTo('explore'));
safeBind('btnGoToProducts', 'click', () => navigateTo('products'));
safeBind('btnHeroGoToProducts', 'click', () => navigateTo('products'));

/* ============================================
   CART SYSTEM
   ============================================ */
function loadCart() {
    try {
        const saved = localStorage.getItem('rojoMalbecCart');
        if (saved) {
            state.cart = JSON.parse(saved);
        }
    } catch(e) { 
        state.cart = []; 
    }
    updateCartUI();
}

function saveCart() {
    try {
        localStorage.setItem('rojoMalbecCart', JSON.stringify(state.cart));
    } catch (e) {}
    updateCartUI();
}

function addToCart(product) {
    let existing = null;
    for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id === product.id && state.cart[i].type === 'product') {
            existing = state.cart[i];
            break;
        }
    }
    
    if (existing) {
        existing.qty = (existing.qty || 1) + 1;
    } else {
        const newItem = Object.assign({}, product, { type: 'product', qty: 1 });
        state.cart.push(newItem);
    }
    saveCart();
    openCartSidebar();
}

function removeFromCart(index) {
    state.cart.splice(index, 1);
    saveCart();
}

function updateCartUI() {
    let totalItems = 0;
    for (let i = 0; i < state.cart.length; i++) {
        totalItems += (state.cart[i].qty || 1);
    }
    
    if (elements.cartBadgeGlobal) {
        elements.cartBadgeGlobal.textContent = totalItems;
        elements.cartBadgeGlobal.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    if (elements.globalCartItems) {
        if (state.cart.length === 0) {
            elements.globalCartItems.innerHTML = '<div class="cart-empty-msg">Tu carrito estÃ¡ vacÃ­o.</div>';
        } else {
            const htmlArray = [];
            for (let i = 0; i < state.cart.length; i++) {
                const item = state.cart[i];
                const imgSrc = item.imagen ? encodeURI(item.imagen) : '';
                const imgHtml = imgSrc ? `<img src="${imgSrc}" class="cart-item-img">` : `<div class="cart-item-img" style="display:flex;align-items:center;justify-content:center;background:white;font-size:1.5rem;">${item.emoji||'ðŸ›’'}</div>`;
                htmlArray.push(`
                <div class="cart-item">
                    ${imgHtml}
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.nombre}</div>
                        <div style="font-size:0.8rem; color:#666;">Cant: ${item.qty || 1}</div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${i})">âœ–</button>
                </div>
                `);
            }
            elements.globalCartItems.innerHTML = htmlArray.join('');
        }
    }
}

function openCartSidebar() {
    if (elements.cartSidebar) elements.cartSidebar.classList.add('open');
    if (elements.cartOverlay) elements.cartOverlay.classList.add('open');
}

function closeCartSidebar() {
    if (elements.cartSidebar) elements.cartSidebar.classList.remove('open');
    if (elements.cartOverlay) elements.cartOverlay.classList.remove('open');
}

safeBind('btnOpenCart', 'click', openCartSidebar);
safeBind('btnCloseCart', 'click', closeCartSidebar);
safeBind('cartOverlay', 'click', closeCartSidebar);

safeBind('btnCheckoutGlobal', 'click', () => {
    if (state.cart.length === 0) {
        alert('El carrito estÃ¡ vacÃ­o.');
        return;
    }
    const itemsText = state.cart.map(i => `â€¢ ${i.qty || 1}x ${i.nombre}`).join('\n');
    const mensaje = `Hola Rojo Malbec! ðŸ‘‹\n\nQuiero realizar el siguiente pedido del catÃ¡logo:\n\n${itemsText}\n\nPor favor indÃ­quenme disponibilidad y medios de pago. Â¡Gracias!`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
});

/* ============================================
   PRODUCT CATALOG
   ============================================ */
let currentProductFilter = 'todos';

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid || typeof productos === 'undefined') return;

    let filtered = productos;
    if (currentProductFilter !== 'todos') {
        filtered = productos.filter(p => p.categoria === currentProductFilter);
    }

    const htmlArray = [];
    for (let i = 0; i < filtered.length; i++) {
        const prod = filtered[i];
        const vitalBadge = prod.sinSodio ? '<span class="vital-indicator">ðŸ’š 0% Sodio</span>' : '';
        const encodedPath = prod.imagen ? encodeURI(prod.imagen) : '';
        const imageHtml = prod.imagen 
            ? `<img src="${encodedPath}" alt="${prod.nombre}" style="width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none'">` 
            : '';
        const emojiStyle = prod.imagen ? 'style="display:none;"' : '';

        htmlArray.push(`
        <div class="product-card" onclick="openProductModal(${prod.id})">
            <div class="product-image-container">
                ${imageHtml}
                <div class="product-emoji-fallback" ${emojiStyle}>${prod.emoji || 'ðŸ§‚'}</div>
                ${vitalBadge}
            </div>
            <div class="product-info">
                <h3 class="product-name">${prod.nombre}</h3>
                <p class="product-tagline">${prod.tagline || ''}</p>
                <button class="btn-primary" style="width:100%; margin-top:10px;" onclick="event.stopPropagation(); openProductModal(${prod.id})">Ver detalle</button>
            </div>
        </div>
        `);
    }
    grid.innerHTML = htmlArray.join('');
}

const filterChips = document.querySelectorAll('.filter-chip');
for (let i = 0; i < filterChips.length; i++) {
    filterChips[i].addEventListener('click', (e) => {
        const allChips = document.querySelectorAll('.filter-chip');
        for (let j = 0; j < allChips.length; j++) {
            allChips[j].classList.remove('active');
        }
        e.target.classList.add('active');
        currentProductFilter = e.target.dataset.productFilter;
        renderProducts();
    });
}

let selectedProductForCart = null;

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

    selectedProductForCart = prod;
    document.getElementById('productModalTitle').textContent = prod.nombre;
    document.getElementById('productModalTagline').textContent = prod.tagline || '';
    document.getElementById('productModalDescripcion').textContent = prod.descripcion || '';
    document.getElementById('productModalIngredientes').textContent = prod.ingredientes || '';
    document.getElementById('productModalMaridaje').textContent = prod.maridaje || '';
    
    const modalIcon = document.getElementById('productModalIcon');
    if (modalIcon) modalIcon.textContent = prod.emoji || 'ðŸ§‚';

    const vitalBadge = document.getElementById('productModalVitalBadge');
    if (vitalBadge) vitalBadge.style.display = prod.sinSodio ? 'block' : 'none';

    if (elements.productModal) elements.productModal.classList.add('active');
}

function closeProductModal() {
    if (elements.productModal) elements.productModal.classList.remove('active');
    selectedProductForCart = null;
}

safeBind('productModalClose', 'click', closeProductModal);
if (elements.btnAddToCart) {
    elements.btnAddToCart.addEventListener('click', () => {
        if (selectedProductForCart) {
            addToCart(selectedProductForCart);
            closeProductModal();
        }
    });
}

/* ============================================
   BLEND BUILDER
   ============================================ */
safeBind('filtersRow', 'click', (e) => {
    const card = e.target.closest('.profile-card');
    if (!card) return;
    const cards = document.querySelectorAll('.profile-card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove('active');
    }
    card.classList.add('active');
    state.currentFilter = card.dataset.filter;
    renderIngredients();
});



function renderIngredients() {
    const grid = elements.ingredientsGrid;
    if (!grid || typeof ingredientes === 'undefined') return;

    let filtered = ingredientes;
    if (state.currentFilter !== 'todos') {
        filtered = [];
        for (let i = 0; i < ingredientes.length; i++) {
            if (ingredientes[i].perfiles.indexOf(state.currentFilter) !== -1) {
                filtered.push(ingredientes[i]);
            }
        }
    }

    const htmlArray = [];
    for (let i = 0; i < filtered.length; i++) {
        const ing = filtered[i];
        let isSelected = false;
        for (let j = 0; j < state.selectedIngredients.length; j++) {
            if (state.selectedIngredients[j].id === ing.id) {
                isSelected = true;
                break;
            }
        }
        
        const tags = ing.perfiles.map(p => 
            `<span class="tag" style="font-size:0.7rem; padding:2px 6px; background:#f0f0f0; border-radius:4px; margin-right:4px;">${PERFIL_ICONS[p] || ''} ${p}</span>`
        ).join('');

        const imageUrl = ing.imagen ? encodeURI(ing.imagen) : '';
        const imageHtml = imageUrl ? `<img src="${imageUrl}" alt="${ing.nombre}">` : '';

        htmlArray.push(`
        <div class="ingredient-card ${isSelected ? 'selected' : ''}">
            <button class="info-btn" onclick="openIngredientInfo(${ing.id})">â„¹ï¸</button>
            <div class="ingredient-image" onclick="toggleIngredient(${ing.id})">
                ${imageHtml}
                <div class="ingredient-emoji" style="${imageUrl ? 'display:none;' : ''}">${ing.icono}</div>
            </div>
            <div class="ingredient-info" onclick="toggleIngredient(${ing.id})">
                <div class="ingredient-name">${ing.nombre}</div>
                <div style="margin-top:5px;">${tags}</div>
            </div>
            ${isSelected ? '<div class="selected-badge">âœ“</div>' : ''}
        </div>
        `);
    }
    grid.innerHTML = htmlArray.join('');
}

function openIngredientInfo(id) {
    if (typeof ingredientes === 'undefined') return;
    let ing = null;
    for (let i = 0; i < ingredientes.length; i++) {
        if (ingredientes[i].id === id) {
            ing = ingredientes[i];
            break;
        }
    }
    if (!ing) return;
    
    document.getElementById('modalTitle').textContent = ing.nombre;
    document.getElementById('modalIcon').textContent = ing.icono;
    document.getElementById('modalDesc').textContent = ing.descripcion;
    document.getElementById('modalMaridaje').innerHTML = `<strong>Ideal para:</strong> ${ing.maridaje}`;
    document.getElementById('modalTags').innerHTML = ing.perfiles.map(p => `<span class="profile-tag">${PERFIL_ICONS[p] || ''} ${p}</span>`).join('');
    if (elements.ingredientModal) elements.ingredientModal.classList.add('active');
}

function closeIngredientInfo() {
    if (elements.ingredientModal) elements.ingredientModal.classList.remove('active');
}

safeBind('modalClose', 'click', closeIngredientInfo);

function toggleIngredient(id) {
    if (typeof ingredientes === 'undefined') return;
    let ing = null;
    for (let i = 0; i < ingredientes.length; i++) {
        if (ingredientes[i].id === id) {
            ing = ingredientes[i];
            break;
        }
    }
    if (!ing) return;

    let index = -1;
    for (let i = 0; i < state.selectedIngredients.length; i++) {
        if (state.selectedIngredients[i].id === id) {
            index = i;
            break;
        }
    }
    
    if (index === -1) {
        if (state.selectedIngredients.length >= 8) {
            alert('Â¡MÃ¡ximo 8 ingredientes por blend para mantener el equilibrio!');
            return;
        }
        state.selectedIngredients.push(ing);
    } else {
        state.selectedIngredients.splice(index, 1);
    }
    updateBlendBadge();
    renderIngredients();
}

function removeFromBlend(id) {
    let index = -1;
    for (let i = 0; i < state.selectedIngredients.length; i++) {
        if (state.selectedIngredients[i].id === id) {
            index = i;
            break;
        }
    }
    if (index !== -1) {
        state.selectedIngredients.splice(index, 1);
        updateBlendBadge();
        renderBlend();
    }
}

function updateBlendBadge() {
    const count = state.selectedIngredients.length;
    const badge = document.getElementById('blendBadge');
    const btn = document.getElementById('btnGoToBlendReview');
    if (count > 0) {
        if(btn) btn.style.display = 'block';
        if(badge) {
            badge.style.display = 'inline-flex';
            badge.textContent = count;
        }
    } else {
        if(btn) btn.style.display = 'none';
        if(badge) badge.style.display = 'none';
    }
}

safeBind('btnGoToBlendReview', 'click', () => navigateTo('blend'));
safeBind('btnGoExplore', 'click', () => navigateTo('explore'));

function renderBlend() {
    const list = elements.blendList;
    const empty = elements.blendEmpty;
    const summary = elements.blendSummary;
    const btnOrder = elements.btnOrder;
    const btnAddMore = document.getElementById('btnAddMoreIngredients');

    if (state.selectedIngredients.length === 0) {
        if(empty) empty.style.display = 'block';
        if(list) list.innerHTML = '';
        if(summary) summary.style.display = 'none';
        if(btnOrder) btnOrder.style.display = 'none';
        if (btnAddMore) btnAddMore.style.display = 'none';
        return;
    }

    if(empty) empty.style.display = 'none';
    if(summary) summary.style.display = 'block';
    if(btnOrder) btnOrder.style.display = 'flex';
    if (btnAddMore) btnAddMore.style.display = 'block';

    if(list) {
        list.innerHTML = state.selectedIngredients.map(ing => `
            <div class="blend-item">
                <div class="blend-item-icon">${ing.icono}</div>
                <div class="blend-item-name">${ing.nombre}</div>
                <button class="blend-item-remove" onclick="removeFromBlend(${ing.id})">âœ–</button>
            </div>
        `).join('');
    }

    if(elements.ingredientCount) elements.ingredientCount.textContent = state.selectedIngredients.length;
    
    const profilesDict = {};
    for (let i = 0; i < state.selectedIngredients.length; i++) {
        const perfiles = state.selectedIngredients[i].perfiles;
        for (let j = 0; j < perfiles.length; j++) {
            profilesDict[perfiles[j]] = true;
        }
    }
    const allProfiles = Object.keys(profilesDict);
    
    if(elements.profileTags) elements.profileTags.innerHTML = allProfiles.map(p => `<span class="profile-tag">${PERFIL_ICONS[p] || ''} ${p}</span>`).join('');
}

safeBind('btnBackFromBlend', 'click', () => navigateTo('explore'));
safeBind('btnAddMoreIngredients', 'click', () => navigateTo('explore'));
safeBind('btnOrder', 'click', () => {
    renderOrderSummary();
    navigateTo('order');
});

function renderOrderSummary() {
    if(elements.selectedList) {
        elements.selectedList.innerHTML = state.selectedIngredients.map(ing =>
            `<span style="display:inline-block;margin:3px;padding:3px 8px;background:white;border-radius:8px;">${ing.icono} ${ing.nombre}</span>`
        ).join('');
    }
}

safeBind('orderForm', 'submit', (e) => {
    e.preventDefault();
    const elNombre = document.getElementById('inputName');
    const elUso = document.getElementById('inputUso');
    const elCant = document.getElementById('inputCantidad');
    const elProt = document.getElementById('inputProtagonistas');
    const elAlerg = document.getElementById('inputAlergias');
    const elLabelName = document.getElementById('inputLabelName');
    const elLabelCreator = document.getElementById('inputLabelCreator');
    
    const nombre = elNombre ? elNombre.value : '';
    const uso = elUso ? elUso.value : '';
    const cantidad = elCant ? elCant.value : '';
    const protagonistas = elProt ? elProt.value : '';
    const alergias = elAlerg ? elAlerg.value : '';
    const nombreBlend = elLabelName ? elLabelName.value : '';
    const creadoPor = elLabelCreator ? elLabelCreator.value : '';

    const ingredientesTexto = state.selectedIngredients.map(i => `â€¢ ${i.nombre}`).join('\n');
    let etiquetaTexto = '';
    if (nombreBlend || creadoPor) {
        etiquetaTexto = `\n\nðŸ·ï¸ *ETIQUETA PERSONALIZADA:*\nðŸ·ï¸ Nombre del Blend: ${nombreBlend || '(no especificado)'}\nðŸ‘¨â€ðŸ³ Creado por: ${creadoPor || '(no especificado)'}`;
    }

    const mensaje = `ðŸ›ï¸ *PEDIDO BLEND PERSONALIZADO*\nðŸ“\nðŸ‘¤ *Cliente:* ${nombre}\nðŸ³ *Uso:* ${uso}\nðŸ“¦ *Cantidad:* ${cantidad}\n\nðŸ¥— *Ingredientes seleccionados:*\n${ingredientesTexto}${etiquetaTexto}\n\nâ­ *Ingredientes protagonistas:* ${protagonistas || 'A criterio del blender'}\nðŸš« *Alergias/Evitar:* ${alergias || 'Ninguna'}\nðŸ“\n_Enviado desde Rojo Malbec_`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`, '_blank');
});

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    updateBlendBadge();
    navigateTo('home');
});

/* ============================================
   FIREBASE BLOG INTEGRATION
   ============================================ */
const firebaseConfig = {
    apiKey: "AIzaSyAeG2KlxPx_NVDHXC6NTSLvf_Y7EUAjYR4",
    authDomain: "rojo-malbec-blog.firebaseapp.com",
    projectId: "rojo-malbec-blog",
    storageBucket: "rojo-malbec-blog.firebasestorage.app",
    messagingSenderId: "202946932681",
    appId: "1:202946932681:web:1c1c8b5b445587f8f34218"
};

if (typeof firebase !== 'undefined') {
    if (firebase.apps && !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}

async function renderBlog() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;
    
    if (typeof firebase === 'undefined') {
        blogGrid.innerHTML = '<div style="text-align:center; grid-column:1/-1; padding:40px; color:#666;">Error: Firebase no estÃ¡ cargado. Revisa tu conexiÃ³n.</div>';
        return;
    }

    const db = firebase.firestore();
    blogGrid.innerHTML = '<div style="text-align:center; grid-column:1/-1; padding:40px; color:#666;">Cargando artÃ­culos del blog...</div>';

    try {
        const snapshot = await db.collection('blog_posts').orderBy('createdAt', 'desc').get();
        if (snapshot.empty) {
            blogGrid.innerHTML = '<div style="text-align:center; grid-column:1/-1; padding:40px; color:#666;">AÃºn no hay artÃ­culos publicados. Â¡Pronto habrÃ¡ novedades!</div>';
            return;
        }

        blogGrid.innerHTML = '';
        snapshot.forEach(doc => {
            const post = doc.data();
            const dateStr = post.createdAt ? new Date(post.createdAt.toDate()).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Reciente';
            
            const imageHtml = (post.image && post.image.startsWith('http'))
                ? `<img src="${post.image}" alt="${post.title}" style="width:100%; height:100%; object-fit:cover;">`
                : `<div class="blog-image placeholder-image">ðŸ“¸</div>`;

            const article = document.createElement('article');
            article.className = 'blog-card';
            article.innerHTML = `
                <div class="blog-image">
                    ${imageHtml}
                </div>
                <div class="blog-info">
                    <span class="blog-date">${dateStr}</span>
                    <h4 class="blog-title">${post.title}</h4>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <button class="btn-secondary btn-small" onclick="openPost('${doc.id}')">Leer mÃ¡s</button>
                </div>
            `;
            blogGrid.appendChild(article);
        });
    } catch (error) {
        console.error("Error cargando blog:", error);
        blogGrid.innerHTML = '<div style="text-align:center; grid-column:1/-1; padding:40px; color:#666;">Hubo un error cargando el blog.</div>';
    }
}

async function openPost(postId) {
    if (typeof firebase === 'undefined') return;
    const db = firebase.firestore();

    try {
        const doc = await db.collection('blog_posts').doc(postId).get();
        if (!doc.exists) {
            alert('El artÃ­culo no existe.');
            return;
        }
        
        const post = doc.data();
        const dateStr = post.createdAt ? new Date(post.createdAt.toDate()).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Reciente';
        
        const imageHtml = (post.image && post.image.startsWith('http'))
            ? `<img src="${post.image}" alt="${post.title}" style="width:100%; max-height:400px; object-fit:cover; border-radius:12px; margin-bottom:20px;">`
            : ``;

        document.getElementById('postFullContainer').innerHTML = `
            ${imageHtml}
            <span class="blog-date" style="display:block; margin-bottom:10px;">${dateStr}</span>
            <h2 style="color:var(--wine); margin-top:0;">${post.title}</h2>
            <div style="font-size:1.1rem; line-height:1.6; color:#444; margin-top:20px;">
                ${post.content.replace(/\n/g, '<br>')}
            </div>
        `;
        
        navigateTo('post');
    } catch (e) {
        console.error("Error abriendo post:", e);
        alert('Hubo un error al abrir el artÃ­culo.');
    }
}

safeBind('btnBackFromPost', 'click', () => navigateTo('blog'));

