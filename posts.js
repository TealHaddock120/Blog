

// post.js

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const postId = params.get('postId');
  if (!postId) return;

  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  const p = posts.find(x => String(x.id) === postId);
  if (!p) {
    document.querySelector('.post-container')
            .innerHTML = '<p>Post no encontrado.</p>';
    return;
  }

  // Render completo
  document.querySelector('.post-container').innerHTML = `
    <article class="post-detail">
      <img class="post-image" src="${p.image}" alt="${p.title}">
      <h1 class="post-title">${p.title}</h1>
      <time class="post-date" datetime="${p.date}">
        ${formatDate(p.date)}
      </time>
      <div class="post-content">
        <p>${p.content.replace(/\n/g,'</p><p>')}</p>
      </div>
    </article>
  `;
});

function formatDate(iso) {
  const dt = new Date(iso);
  return dt.toLocaleDateString('es-ES', {
    day:   'numeric',
    month: 'long',
    year:  'numeric'
  });
}
