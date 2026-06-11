// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyAeG2KlxPx_NVDHXC6NTSLvf_Y7EUAjYR4",
    authDomain: "rojo-malbec-blog.firebaseapp.com",
    projectId: "rojo-malbec-blog",
    storageBucket: "rojo-malbec-blog.firebasestorage.app",
    messagingSenderId: "202946932681",
    appId: "1:202946932681:web:1c1c8b5b445587f8f34218"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let currentEditId = null;
let postsData = {};


document.getElementById('btnPublish').addEventListener('click', async () => {
    const title = document.getElementById('postTitle').value.trim();
    const excerpt = document.getElementById('postExcerpt').value.trim();
    const image = document.getElementById('postImage').value.trim() || '📸';
    const content = document.getElementById('postContent').value.trim();
    const statusMsg = document.getElementById('statusMessage');

    if (!title || !excerpt || !content) {
        showStatus('Por favor, completá todos los campos.', 'error');
        return;
    }

    try {
        // Deshabilitar el botón mientras guarda
        document.getElementById('btnPublish').disabled = true;
        document.getElementById('btnPublish').textContent = 'Guardando...';

        if (currentEditId) {
            // Actualizar artículo existente
            await db.collection('blog_posts').doc(currentEditId).update({
                title: title,
                excerpt: excerpt,
                image: image,
                content: content
            });
            currentEditId = null;
            showStatus('¡Artículo actualizado con éxito!', 'success');
        } else {
            // Guardar nuevo artículo
            await db.collection('blog_posts').add({
                title: title,
                excerpt: excerpt,
                image: image,
                content: content,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            showStatus('¡Artículo publicado con éxito! Ya se puede ver en la página web.', 'success');
        }

        // Restaurar botón a estado original
        const btn = document.getElementById('btnPublish');
        btn.style.backgroundColor = 'var(--wine)';

        // Limpiar el formulario
        document.getElementById('postTitle').value = '';
        document.getElementById('postExcerpt').value = '';
        document.getElementById('postImage').value = '';
        document.getElementById('postContent').value = '';

        // Generar Ficha para WhatsApp
        const whatsappText = `*¡Nuevo Artículo del Maestro Blender!* 🔪🍷\n\n*${title}*\n_${excerpt}_\n\n👉 Leé la nota completa acá:\nhttps://www.rojomalbec.com.ar/\n\n¡Te esperamos en el laboratorio!`;
        document.getElementById('whatsappText').value = whatsappText;
        document.getElementById('whatsappCard').style.display = 'block';

    } catch (error) {
        console.error("Error al guardar: ", error);
        showStatus('Hubo un error al guardar: ' + error.message, 'error');
    } finally {
    document.getElementById('btnPublish').disabled = false;
        document.getElementById('btnPublish').textContent = 'Publicar Artículo';
    }
});

// Botón para copiar WhatsApp
document.getElementById('btnCopyWhatsapp').addEventListener('click', () => {
    const textToCopy = document.getElementById('whatsappText').value;
    navigator.clipboard.writeText(textToCopy).then(() => {
        const btn = document.getElementById('btnCopyWhatsapp');
        btn.textContent = '¡Copiado! ✓';
        setTimeout(() => { btn.textContent = '📋 Copiar Ficha'; }, 3000);
    });
});

function showStatus(message, type) {
    const el = document.getElementById('statusMessage');
    el.textContent = message;
    el.className = type;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 5000);
}

// Cargar y mostrar artículos existentes
function loadPosts() {
    db.collection('blog_posts').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
        const postsList = document.getElementById('postsList');
        postsList.innerHTML = '';
        postsData = {};
        
        if (snapshot.empty) {
            postsList.innerHTML = '<p>No hay artículos publicados.</p>';
            return;
        }

        snapshot.forEach(doc => {
            const post = doc.data();
            postsData[doc.id] = post;
            const div = document.createElement('div');
            div.style.border = '1px solid #ccc';
            div.style.padding = '15px';
            div.style.marginBottom = '10px';
            div.style.borderRadius = '8px';
            div.style.display = 'flex';
            div.style.justifyContent = 'space-between';
            div.style.alignItems = 'center';
            
            div.innerHTML = `
                <div>
                    <h3 style="margin: 0 0 5px 0;">${post.title}</h3>
                    <small style="color: #666;">${post.excerpt}</small>
                </div>
                <div>
                    <button onclick="editPost('${doc.id}')" style="background-color: #ff9800; width: auto; padding: 10px 15px; margin-left: 10px;">✏️ Editar</button>
                    <button onclick="deletePost('${doc.id}')" style="background-color: #dc3545; width: auto; padding: 10px 15px; margin-left: 10px;">🗑️ Borrar</button>
                </div>
            `;
            postsList.appendChild(div);
        });
    }, error => {
        console.error("Error al cargar posts:", error);
        document.getElementById('postsList').innerHTML = '<p style="color:red">Error al cargar artículos.</p>';
    });
}

// Borrar un artículo
window.deletePost = async function(id) {
    if(confirm('¿Estás seguro de que querés borrar este artículo de la página?')) {
        try {
            await db.collection('blog_posts').doc(id).delete();
            showStatus('Artículo borrado exitosamente.', 'success');
        } catch(error) {
            console.error("Error borrando documento: ", error);
            showStatus('Error al borrar: ' + error.message, 'error');
        }
    }
};

// Preparar formulario para editar
window.editPost = function(id) {
    const post = postsData[id];
    if (!post) return;

    document.getElementById('postTitle').value = post.title || '';
    document.getElementById('postExcerpt').value = post.excerpt || '';
    document.getElementById('postImage').value = post.image || '';
    document.getElementById('postContent').value = post.content || '';
    
    currentEditId = id;
    
    const btn = document.getElementById('btnPublish');
    btn.textContent = 'Actualizar Artículo';
    btn.style.backgroundColor = '#ff9800'; // Color naranja para edición
    
    // Scrollear hacia arriba suavemente
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Cargar los posts apenas entramos al panel
loadPosts();
