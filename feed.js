let posts = [];
let savedPosts = [];
let currentImageData = null;

function loadData() {
    const savedPostsData = localStorage.getItem('posts');
    const savedPostsList = localStorage.getItem('savedPosts');

    if (savedPostsData) {
        posts = JSON.parse(savedPostsData);
    }

    if (savedPostsList) {
        savedPosts = JSON.parse(savedPostsList);
    }

    renderPosts();
    updateSavedCount();
}

function saveData() {
    localStorage.setItem('posts', JSON.stringify(posts));
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
}

function createPost() {
    const text = document.getElementById('post-text').value.trim();

    if (!text && !currentImageData) return;

    const post = {
        id: Date.now(),
        text: text,
        image: currentImageData,
        likes: 0,
        liked: false,
        timestamp: new Date().toISOString(),
        comments: []
    };

    posts.unshift(post);
    saveData();

    document.getElementById('post-text').value = '';
    currentImageData = null;
    document.getElementById('image-preview').innerHTML = '';

    renderPosts();
}

function deletePost(postId) {
    if (!confirm('Delete this post?')) return;

    posts = posts.filter(p => p.id !== postId);
    savedPosts = savedPosts.filter(id => id !== postId);
    saveData();
    renderPosts();
    updateSavedCount();
}

function toggleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        saveData();
        renderPosts();
    }
}

function toggleSave(postId) {
    if (savedPosts.includes(postId)) {
        savedPosts = savedPosts.filter(id => id !== postId);
    } else {
        savedPosts.push(postId);
    }
    saveData();
    renderPosts();
    updateSavedCount();
}

function addComment(postId) {
    const commentText = document.getElementById(`comment-${postId}`).value.trim();
    if (!commentText) return;

    const post = posts.find(p => p.id === postId);
    if (post) {
        post.comments.push({
            id: Date.now(),
            text: commentText,
            timestamp: new Date().toISOString()
        });
        saveData();
        document.getElementById(`comment-${postId}`).value = '';
        renderPosts();
    }
}

function deleteComment(postId, commentId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.comments = post.comments.filter(c => c.id !== commentId);
        saveData();
        renderPosts();
    }
}

function toggleComments(postId) {
    const commentsSection = document.getElementById(`comments-${postId}`);
    const isHidden = commentsSection.style.display === 'none';
    commentsSection.style.display = isHidden ? 'block' : 'none';
}

function formatTime(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
}

function renderPosts() {
    const container = document.getElementById('posts-container');

    if (posts.length === 0) {
        container.innerHTML = '<div class="empty-feed">No posts yet. Create your first post!</div>';
        return;
    }

    container.innerHTML = posts.map(post => `
        <div class="post">
            <div class="post-header">
                <img src="profile.jpg" alt="Profile">
                <div class="post-header-info">
                    <h4>Jhye O'meley</h4>
                    <p>${formatTime(post.timestamp)}</p>
                </div>
                <button class="delete-post-btn" onclick="deletePost(${post.id})">🗑️</button>
            </div>

            ${post.text ? `<div class="post-text">${post.text}</div>` : ''}
            ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}

            <div class="post-actions">
                <button onclick="toggleComments(${post.id})" class="action-btn">
                    💬 ${post.comments.length}
                </button>
                <button onclick="toggleLike(${post.id})" class="action-btn ${post.liked ? 'liked' : ''}">
                    ${post.liked ? '❤️' : '🤍'} ${post.likes}
                </button>
                <button onclick="toggleSave(${post.id})" class="action-btn ${savedPosts.includes(post.id) ? 'saved' : ''}">
                    ${savedPosts.includes(post.id) ? '🔖' : '📑'} Save
                </button>
            </div>

            <div id="comments-${post.id}" class="comments-section" style="display: none;">
                <div class="add-comment">
                    <img src="profile.jpg" alt="Profile" class="comment-avatar">
                    <input type="text" id="comment-${post.id}" placeholder="Add a comment...">
                    <button onclick="addComment(${post.id})" class="comment-btn">Post</button>
                </div>

                <div class="comments-list">
                    ${post.comments.map(comment => `
                        <div class="comment">
                            <img src="profile.jpg" alt="Profile" class="comment-avatar">
                            <div class="comment-content">
                                <div class="comment-header">
                                    <h5>Jhye O'meley</h5>
                                    <span>${formatTime(comment.timestamp)}</span>
                                </div>
                                <p>${comment.text}</p>
                            </div>
                            <button onclick="deleteComment(${post.id}, ${comment.id})" class="delete-comment-btn">×</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function updateSavedCount() {
    document.getElementById('saved-count').textContent = `${savedPosts.length} saved posts`;
}

function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        currentImageData = event.target.result;
        document.getElementById('image-preview').innerHTML = `
            <img src="${currentImageData}" alt="Preview">
            <button onclick="removeImage()" class="remove-image-btn">×</button>
        `;
    };
    reader.readAsDataURL(file);
}

function removeImage() {
    currentImageData = null;
    document.getElementById('image-preview').innerHTML = '';
    document.getElementById('post-image').value = '';
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
}

function updateThemeButton(theme) {
    const btn = document.getElementById('theme-toggle');
    btn.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
}

document.getElementById('submit-post').addEventListener('click', createPost);
document.getElementById('post-text').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        createPost();
    }
});

document.getElementById('add-image-btn').addEventListener('click', () => {
    document.getElementById('post-image').click();
});

document.getElementById('post-image').addEventListener('change', handleImageUpload);
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

initTheme();
loadData();
