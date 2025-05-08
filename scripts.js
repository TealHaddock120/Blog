document.addEventListener('DOMContentLoaded', () => {
  // 1) Identificador único del post
  const postId = document.body.dataset.postId;
  const storageKey = `comments_${postId}`;

  // 2) Elementos del DOM
  const commentListEl = document.getElementById('comment-list');
  const commentsCountEl = document.getElementById('comments-count');
  const form = document.getElementById('comment-form');
  const authorInput = document.getElementById('comment-author');
  const textInput = document.getElementById('comment-text');

  // 3) Carga inicial de comentarios
  let comments = JSON.parse(localStorage.getItem(storageKey)) || [];
  renderComments();

  // 4) Al enviar formulario
  form.addEventListener('submit', e => {
    e.preventDefault();
    const author = authorInput.value.trim();
    const text = textInput.value.trim();
    if (!author || !text) return;

    const comment = {
      author,
      text,
      date: new Date().toLocaleString()
    };
    comments.push(comment);
    localStorage.setItem(storageKey, JSON.stringify(comments));

    // refrescar la lista y limpiar formulario
    renderComments();
    form.reset();
    authorInput.focus();
  });

  // 5) Función para pintar la lista
  function renderComments() {
    commentListEl.innerHTML = '';
    comments.forEach(c => {
      const div = document.createElement('div');
      div.classList.add('comment');
      div.innerHTML = `
        <div class="avatar">${c.author.charAt(0).toUpperCase()}</div>
        <div class="comment-body">
          <p class="comment-meta"><strong>${c.author}</strong> · ${c.date}</p>
          <p>${c.text}</p>
        </div>
      `;
      commentListEl.appendChild(div);
    });
    // actualizar contador
    commentsCountEl.textContent = `${comments.length} Comentario${comments.length !== 1 ? 's' : ''}`;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const postId       = document.body.dataset.postId;
  const storageKey   = `comments_${postId}`;
  const commentList  = document.getElementById('comment-list');
  const countEl      = document.getElementById('comments-count');
  const form         = document.getElementById('comment-form');
  const inputAuthor  = document.getElementById('comment-author');
  const inputText    = document.getElementById('comment-text');

  let comments = JSON.parse(localStorage.getItem(storageKey)) || [];
  renderComments();

  // Envío de nuevo comentario
  form.addEventListener('submit', e => {
    e.preventDefault();
    const author = inputAuthor.value.trim();
    const text   = inputText.value.trim();
    if (!author || !text) return;

    comments.push({ author, text, date: new Date().toLocaleString() });
    localStorage.setItem(storageKey, JSON.stringify(comments));
    form.reset();
    inputAuthor.focus();
    renderComments();
  });

  // Delegación: escucha clicks en "Eliminar"
  commentList.addEventListener('click', e => {
    if (!e.target.matches('.btn-delete')) return;
    const idx = Number(e.target.dataset.index);
    // Opcional: confirmación
    if (!confirm('¿Seguro que quieres borrar este comentario?')) return;

    comments.splice(idx, 1);
    localStorage.setItem(storageKey, JSON.stringify(comments));
    renderComments();
  });

  // Renderiza lista con botón de borrar
  function renderComments() {
    commentList.innerHTML = '';
    comments.forEach((c, i) => {
      const div = document.createElement('div');
      div.className = 'comment';
      div.innerHTML = `
        <div class="avatar">${c.author.charAt(0).toUpperCase()}</div>
        <div class="comment-body">
          <p class="comment-meta">
            <strong>${c.author}</strong> · ${c.date}
            <button class="btn-delete" data-index="${i}" title="Borrar">×</button>
          </p>
          <p>${c.text}</p>
        </div>
      `;
      commentList.appendChild(div);
    });
    countEl.textContent = `${comments.length} Comentario${comments.length !== 1 ? 's' : ''}`;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle');
  const root   = document.documentElement;
  // 1) Lee preferencia previa o usa media query
  let theme = localStorage.getItem('theme');
  if (!theme) {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  applyTheme(theme);

  // 2) Cambia al hacer click
  toggle.addEventListener('click', () => {
    theme = (theme === 'dark') ? 'light' : 'dark';
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  });

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.classList.add('dark-mode');
      toggle.textContent = '☀️';
    } else {
      root.classList.remove('dark-mode');
      toggle.textContent = '🌙';
    }
  }
});
