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

        // Guardar en la colección 'blog_posts' de Firestore
        await db.collection('blog_posts').add({
            title: title,
            excerpt: excerpt,
            image: image,
            content: content,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Limpiar el formulario
        document.getElementById('postTitle').value = '';
        document.getElementById('postExcerpt').value = '';
        document.getElementById('postImage').value = '';
        document.getElementById('postContent').value = '';

        showStatus('¡Artículo publicado con éxito! Ya se puede ver en la página web.', 'success');
    } catch (error) {
        console.error("Error al guardar: ", error);
        showStatus('Hubo un error al guardar: ' + error.message, 'error');
    } finally {
        document.getElementById('btnPublish').disabled = false;
        document.getElementById('btnPublish').textContent = 'Publicar Artículo';
    }
});

function showStatus(message, type) {
    const el = document.getElementById('statusMessage');
    el.textContent = message;
    el.className = type;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 5000);
}
