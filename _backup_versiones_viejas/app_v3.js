window.onerror = function(m, s, l, c, e) { alert('ERROR: ' + m + ' at line ' + l); };
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

function navigateTo(screenName) {
    if (!screens[screenName]) return;
    Object.values(screens).forEach(s => { if(s) s.classList.remove('active'); });
    screens[screenName].classList.add('active');

    document.querySelectorAll('.nav-link, .mobile-link').forEach(item => {
        item.classList.toggle('active', item.dataset.target === screenName);
    });

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

document.querySelectorAll('.nav-link, .mobile-link').forEach(item => {
    item.addEventListener('click', () => navigateTo(item.dataset.target));
});

document.getElementById('btnMobileMenu')?.addEventListener('click', () => {
    document.getElementById('mobileMenu')?.classList.toggle('open');
});

document.getElementById('btnStartBlend')?.addEventListener('click', () => navigateTo('explore'));
document.getElementById('btnGoToProducts')?.addEventListener('click', () => navigateTo('products'));
document.getElementById('btnHeroGoToProducts')?.addEventListener('click', () => navigateTo('products'));
document.getElementById('btnGoToBlendReview')?.addEventListener('click', () => navigateTo('blend'));
document.getElementById('btnBackFromExplore')?.addEventListener('click', () => navigateTo('home'));
document.getElementById('btnBackFromBlend')?.addEventListener('click', () => navigateTo('explore'));
document.getElementById('btnGoExplore')?.addEventListener('click', () => navigateTo('explore'));

function loadCart() {
    const saved = localStorage.getItem('rojoMalbecCart');
    if (saved) {
        try { state.cart = JSON.parse(saved); } catch(e) { state.cart = []; }
    }
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('rojoMalbecCart', JSON.stringify(state.cart));
    updateCartUI();
}

function addToCart(product) {
    const existing = state.cart.find(item => item.id === product.id && item.type === 'product');
    if (existing) {
        existing.qty += 1;
    } else {
        state.cart.push({ ...product, type: 'product', qty: 1 });
    }
    saveCart();
    openCartSidebar();
}

function removeFromCart(index) {
    state.cart.splice(index, 1);
    saveCart();
}

function updateCartUI() {
    const totalItems = state.cart.reduce((acc, item) => acc + (item.qty || 1), 0);
    if(elements.cartBadgeGlobal) {
        elements.cartBadgeGlobal.textContent = totalItems;
        elements.cartBadgeGlobal.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    if (!elements.globalCartItems) return;

    if (state.cart.length === 0) {
        elements.globalCartItems.innerHTML = '<div class="cart-empty-msg">Tu carrito estÃ¡ vacÃ­o.</div>';
    } else {
        elements.globalCartItems.innerHTML = state.cart.map((item, index) => {
            const imgSrc = item.imagen ? encodeURI(item.imagen) : '';
            const imgHtml = imgSrc 
                ? `<img src="${imgSrc}" class="cart-item-img">`
                : `<div class="cart-item-img" style="background:#eee;display:flex;align-items:center;justify-content:center;font-size:1.5rem;">ðŸ›’</div>`;
            return `
                <div class="cart-item">
                    ${imgHtml}
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.nombre}</div>
                        <div style="font-size:0.8rem; color:#666;">Cant: ${item.qty}</div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${index})">Ã—</button>
                </div>
            `;
        }).join('');
    }
}

function openCartSidebar() {
    elements.cartSidebar?.classList.add('open');
    elements.cartOverlay?.classList.add('open');
}
function closeCartSidebar() {
    elements.cartSidebar?.classList.remove('open');
    elements.cartOverlay?.classList.remove('open');
}
document.getElementById('btnOpenCart')?.addEventListener('click', openCartSidebar);
document.getElementById('btnCloseCart')?.addEventListener('click', closeCartSidebar);
elements.cartOverlay?.addEventListener('click', closeCartSidebar);

document.getElementById('btnCheckoutGlobal')?.addEventListener('click', () => {
    if (state.cart.length === 0) return;
    let itemsText = state.cart.map(i => `â€¢ ${i.qty}x ${i.nombre}`).join('\n');
    const mensaje = `Hola Rojo Malbec! ðŸ‘‹\n\nQuiero realizar el siguiente pedido del catÃ¡logo:\n\n${itemsText}\n\nPor favor indÃ­quenme disponibilidad y medios de pago. Â¡Gracias!`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
});

// ============================================
// PRODUCTOS CATALOG
// ============================================
let currentProductFilter = 'todos';
let currentProduct = null;

document.getElementById('productFiltersRow')?.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-chip')) {
        document.querySelectorAll('#productFiltersRow .filter-chip').forEach(c => c.classList.remove('active'));
        e.target.classList.add('active');
        currentProductFilter = e.target.dataset.productFilter;
        renderProducts();
    }
});

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid || typeof productos === 'undefined') return;

    let filtered = productos;
    if (currentProductFilter !== 'todos') {
        filtered = productos.filter(p => p.categoria === currentProductFilter);
    }

    grid.innerHTML = filtered.map(prod => {
        const vitalBadge = prod.sinSodio ? '<span class="vital-indicator">ðŸ’š 0% Sodio</span>' : '';
        const encodedPath = prod.imagen ? encodeURI(prod.imagen) : '';
        const imageHtml = prod.imagen
            ? `<img src="${encodedPath}" alt="${prod.nombre}" class="product-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">`
            : '';
        const emojiStyle = prod.imagen ? 'style="display:none;"' : '';

        return `
            <div class="product-card" data-product-id="${prod.id}">
                <div class="product-image-container">
                    ${imageHtml}
                    <div class="product-emoji" ${emojiStyle}>${prod.emoji}</div>
                </div>
                <div class="product-info">
                    <div class="product-name">${prod.nombre}</div>
                    <div class="product-tagline">${prod.tagline}</div>
                    ${vitalBadge}
                </div>
            </div>
        `;
    }).join('');

    grid.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => openProductModal(parseInt(card.dataset.productId)));
    });
}

function openProductModal(id) {
    const prod = productos.find(p => p.id === id);
    if (!prod) return;
    currentProduct = prod;

    const modalIcon = document.getElementById('productModalIcon');
    if (prod.imagen) {
        modalIcon.innerHTML = `<img src="${encodeURI(prod.imagen)}" alt="${prod.nombre}" style="width:100px; height:100px; border-radius:12px; object-fit:cover; margin-bottom:10px;">`;
    } else {
        modalIcon.textContent = prod.emoji;
    }

    document.getElementById('productModalTitle').textContent = prod.nombre;
    document.getElementById('productModalTagline').textContent = prod.tagline;
    document.getElementById('productModalDescripcion').textContent = prod.descripcion;
    document.getElementById('productModalIngredientes').textContent = prod.ingredientes;
    document.getElementById('productModalMaridaje').textContent = prod.maridaje;
    
    const vitalBadge = document.getElementById('productModalVitalBadge');
    if (vitalBadge) vitalBadge.style.display = prod.sinSodio ? 'block' : 'none';

    elements.productModal?.classList.add('active');
}

function closeProductModal() {
    elements.productModal?.classList.remove('active');
    currentProduct = null;
}
document.getElementById('productModalClose')?.addEventListener('click', closeProductModal);
elements.productModal?.addEventListener('click', (e) => {
    if (e.target === elements.productModal) closeProductModal();
});

elements.btnAddToCart?.addEventListener('click', () => {
    if (currentProduct) {
        addToCart(currentProduct);
        closeProductModal();
    }
});

// ============================================
// BLEND BUILDER - INGREDIENTS
// ============================================
document.getElementById('filtersRow')?.addEventListener('click', (e) => {
    const card = e.target.closest('.profile-card');
    if (card) {
        document.querySelectorAll('#filtersRow .profile-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        state.currentFilter = card.dataset.filter;
        renderIngredients();
    }
});

const PERFIL_ICONS = {
    'Herbal': 'ðŸŒ¿',
    'Picante': 'ðŸŒ¶ï¸',
    'Terroso': 'ðŸŒ±',
    'CÃ­trico': 'ðŸ‹',
    'Dulce': 'ðŸ¯',
    'Floral': 'ðŸŒ¸',
    'Ahumado': 'ðŸ”¥'
};

function renderIngredients() {
    const grid = elements.ingredientsGrid;
    if (!grid || typeof ingredientes === 'undefined') return;

    let filtered = state.currentFilter === 'todos' 
        ? ingredientes 
        : ingredientes.filter(ing => ing.perfiles.includes(state.currentFilter));

    grid.innerHTML = filtered.map(ing => {
        const isSelected = state.selectedIngredients.find(i => i.id === ing.id);
        
        const tags = ing.perfiles.map(p => 
            `<span class="tag" style="font-size:0.7rem; padding:2px 6px; background:#f0f0f0; border-radius:4px; margin-right:4px;">${PERFIL_ICONS[p] || ''} ${p}</span>`
        ).join('');

        const imageUrl = ing.imagen ? encodeURI(ing.imagen) : '';
        const imageHtml = imageUrl ? `<img src="${imageUrl}" alt="${ing.nombre}">` : '';

        return `
            <div class="ingredient-card ${isSelected ? 'selected' : ''}" data-id="${ing.id}">
                <button class="info-btn" onclick="event.stopPropagation(); openIngredientInfo(${ing.id})">â„¹ï¸</button>
                <div class="ingredient-icon">
                    ${imageHtml}
                    <div style="${imageUrl ? 'display:none;' : ''}">${ing.icono}</div>
                </div>
                <div class="ingredient-name">${ing.nombre}</div>
                <div style="margin-top:5px; display:flex; flex-wrap:wrap; gap:4px; justify-content:center;">
                    ${tags}
                </div>
                ${isSelected ? '<div class="check-mark">âœ“</div>' : ''}
            </div>
        `;
    }).join('');

    grid.querySelectorAll('.ingredient-card').forEach(card => {
        card.addEventListener('click', () => toggleIngredient(parseInt(card.dataset.id)));
    });
}

function openIngredientInfo(id) {
    const ing = ingredientes.find(i => i.id === id);
    if (!ing) return;
    
    document.getElementById('modalIcon').innerHTML = ing.imagen ? `<img src="${encodeURI(ing.imagen)}" alt="${ing.nombre}" style="width:100px; height:100px; border-radius:50%; object-fit:cover; border:2px solid #ddd;">` : ing.icono;
    document.getElementById('modalTitle').textContent = ing.nombre;
    document.getElementById('modalTags').innerHTML = ing.perfiles.map(p => `<span class="profile-tag">${PERFIL_ICONS[p] || ''} ${p}</span>`).join('');
    document.getElementById('modalDesc').textContent = ing.descripcion;
    document.getElementById('modalMaridaje').textContent = "Ideal para: " + ing.maridaje;
    
    elements.ingredientModal?.classList.add('active');
}

function closeIngredientInfo() {
    elements.ingredientModal?.classList.remove('active');
}
document.getElementById('modalClose')?.addEventListener('click', closeIngredientInfo);

function toggleIngredient(id) {
    const ing = ingredientes.find(i => i.id === id);
    const index = state.selectedIngredients.findIndex(i => i.id === id);
    
    if (index >= 0) {
        state.selectedIngredients.splice(index, 1);
    } else {
        if (state.selectedIngredients.length >= 8) {
            alert('Puedes mezclar hasta 8 ingredientes como mÃ¡ximo.');
            return;
        }
        state.selectedIngredients.push(ing);
    }
    
    renderIngredients();
    updateBlendBadge();
}

function removeFromBlend(id) {
    const index = state.selectedIngredients.findIndex(i => i.id === id);
    if (index >= 0) {
        state.selectedIngredients.splice(index, 1);
        renderBlend();
        updateBlendBadge();
    }
}

function updateBlendBadge() {
    const count = state.selectedIngredients.length;
    const badge = document.getElementById('blendBadge');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

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
                <button class="blend-item-remove" onclick="removeFromBlend(${ing.id})">Ã—</button>
            </div>
        `).join('');
    }

    if(elements.ingredientCount) elements.ingredientCount.textContent = state.selectedIngredients.length;
    const allProfiles = [...new Set(state.selectedIngredients.flatMap(i => i.perfiles))];
    if(elements.profileTags) elements.profileTags.innerHTML = allProfiles.map(p => `<span class="profile-tag">${PERFIL_ICONS[p] || ''} ${p}</span>`).join('');
}

document.getElementById('btnBackFromBlend')?.addEventListener('click', () => navigateTo('explore'));
document.getElementById('btnAddMoreIngredients')?.addEventListener('click', () => navigateTo('explore'));
document.getElementById('btnOrder')?.addEventListener('click', () => {
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

document.getElementById('orderForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('inputName').value;
    const uso = document.getElementById('inputUso').value;
    const cantidad = document.getElementById('inputCantidad').value;
    const protagonistas = document.getElementById('inputProtagonistas').value;
    const alergias = document.getElementById('inputAlergias').value;
    const nombreBlend = document.getElementById('inputLabelName')?.value || '';
    const creadoPor = document.getElementById('inputLabelCreator')?.value || '';

    const ingredientesTexto = state.selectedIngredients.map(i => `â€¢ ${i.nombre}`).join('\n');
    let etiquetaTexto = '';
    if (nombreBlend || creadoPor) {
        etiquetaTexto = `\n\nðŸ·ï¸ *ETIQUETA PERSONALIZADA:*\nðŸ“¦ Nombre del Blend: ${nombreBlend || '(no especificado)'}\nâœï¸ Creado por: ${creadoPor || '(no especificado)'}`;
    }

    const mensaje = `ðŸ‘¨â€ðŸ³ *PEDIDO BLEND PERSONALIZADO*\nâž–\nðŸ‘¤ *Cliente:* ${nombre}\nðŸ“¦ *Uso:* ${uso}\nâš–ï¸ *Cantidad:* ${cantidad}\n\nðŸ§ª *Ingredientes seleccionados:*\n${ingredientesTexto}${etiquetaTexto}\n\nâ­ *Ingredientes protagonistas:* ${protagonistas || 'A criterio del blender'}\nâš ï¸ *Alergias/Evitar:* ${alergias || 'Ninguna'}\nâž–\n_Enviado desde Rojo Malbec_`;

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

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
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

document.getElementById('btnBackFromPost')?.addEventListener('click', () => {
    navigateTo('blog');
});

