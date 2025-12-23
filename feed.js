let posts = [];
let savedPosts = [];
let currentImageData = null;
let following = [];

const users = {
    jhye: {
        name: "Jhye O'meley",
        handle: "@TheJhyeFactor",
        avatar: "profile.jpg"
    },
    sarah: {
        name: "Sarah Chen",
        handle: "@sarahcodes",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
    },
    mike: {
        name: "Mike Rodriguez",
        handle: "@mikedev",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike"
    },
    emma: {
        name: "Emma Johnson",
        handle: "@emmajay",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma"
    },
    alex: {
        name: "Alex Turner",
        handle: "@alexcodes",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
    },
    lisa: {
        name: "Lisa Park",
        handle: "@lisadesigns",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa"
    }
};

function getDefaultPosts() {
    const now = Date.now();
    return [
        {
            id: now - 3600000,
            userId: "alex",
            text: "Spent 3 hours debugging only to realize I had a typo in my variable name. Classic developer moment 🤦‍♂️",
            image: null,
            likes: 423,
            liked: false,
            timestamp: new Date(now - 3600000).toISOString(),
            comments: [
                {
                    id: now - 3500000,
                    userId: "mike",
                    text: "We've all been there! That's why I always use a linter now.",
                    timestamp: new Date(now - 3500000).toISOString()
                }
            ]
        },
        {
            id: now - 7200000,
            userId: "sarah",
            text: "Just finished a deep dive into React Server Components. The future of web development is looking exciting! 🚀",
            image: null,
            likes: 156,
            liked: false,
            timestamp: new Date(now - 7200000).toISOString(),
            comments: [
                {
                    id: now - 7100000,
                    userId: "mike",
                    text: "Great write-up! Have you tried using them with Next.js 14?",
                    timestamp: new Date(now - 7100000).toISOString()
                },
                {
                    id: now - 6900000,
                    userId: "sarah",
                    text: "Yes! The new app router makes it so much easier.",
                    timestamp: new Date(now - 6900000).toISOString()
                }
            ]
        },
        {
            id: now - 10800000,
            userId: "lisa",
            text: "Design tip: White space is not wasted space. It's one of the most powerful tools in your design toolkit ✨",
            image: null,
            likes: 289,
            liked: false,
            timestamp: new Date(now - 10800000).toISOString(),
            comments: []
        },
        {
            id: now - 14400000,
            userId: "mike",
            text: "Hot take: Writing tests is just as important as writing the actual code. Don't @ me 😤",
            image: null,
            likes: 89,
            liked: false,
            timestamp: new Date(now - 14400000).toISOString(),
            comments: [
                {
                    id: now - 14000000,
                    userId: "emma",
                    text: "100% agree. Tests have saved me so many times.",
                    timestamp: new Date(now - 14000000).toISOString()
                }
            ]
        },
        {
            id: now - 18000000,
            userId: "emma",
            text: "CSS Grid + Flexbox = Perfect layout combo. Stop using floats, it's 2025! 😅",
            image: null,
            likes: 534,
            liked: false,
            timestamp: new Date(now - 18000000).toISOString(),
            comments: [
                {
                    id: now - 17500000,
                    userId: "lisa",
                    text: "Preach! Grid for layout, Flexbox for components.",
                    timestamp: new Date(now - 17500000).toISOString()
                }
            ]
        },
        {
            id: now - 21600000,
            userId: "emma",
            text: "Finally deployed my portfolio redesign! Check out the new dark mode 🌙✨\n\nBuilt with vanilla JS and lots of CSS Grid magic.",
            image: null,
            likes: 203,
            liked: false,
            timestamp: new Date(now - 21600000).toISOString(),
            comments: [
                {
                    id: now - 21000000,
                    userId: "lisa",
                    text: "Love the color scheme! Mind sharing your palette?",
                    timestamp: new Date(now - 21000000).toISOString()
                }
            ]
        },
        {
            id: now - 32400000,
            userId: "mike",
            text: "Working with APIs: Always handle errors. Always validate data. Always use try/catch. Your future self will thank you 🙏",
            image: null,
            likes: 612,
            liked: false,
            timestamp: new Date(now - 32400000).toISOString(),
            comments: []
        },
        {
            id: now - 43200000,
            userId: "alex",
            text: "TIL: You can use CSS :has() selector to style parent elements based on their children. Browser support is finally here! 🎉",
            image: null,
            likes: 312,
            liked: false,
            timestamp: new Date(now - 43200000).toISOString(),
            comments: [
                {
                    id: now - 42000000,
                    userId: "emma",
                    text: "Game changer! No more JS for this use case.",
                    timestamp: new Date(now - 42000000).toISOString()
                },
                {
                    id: now - 41000000,
                    userId: "sarah",
                    text: "Still blows my mind that this is finally native CSS",
                    timestamp: new Date(now - 41000000).toISOString()
                }
            ]
        },
        {
            id: now - 64800000,
            userId: "sarah",
            text: "Pro tip: Learn to read documentation. It's a superpower that will make you 10x more productive as a developer 📚",
            image: null,
            likes: 891,
            liked: false,
            timestamp: new Date(now - 64800000).toISOString(),
            comments: [
                {
                    id: now - 64000000,
                    userId: "alex",
                    text: "MDN is my best friend tbh",
                    timestamp: new Date(now - 64000000).toISOString()
                }
            ]
        },
        {
            id: now - 86400000,
            userId: "lisa",
            text: "Spent the weekend building a data visualization dashboard for tracking social media analytics. Learned so much about Chart.js!\n\nNext up: adding export to PDF functionality 📊",
            image: null,
            likes: 178,
            liked: false,
            timestamp: new Date(now - 86400000).toISOString(),
            comments: []
        },
        {
            id: now - 108000000,
            userId: "alex",
            text: "Reminder: git commit often. Small, focused commits are way easier to debug and revert than massive ones 🔄",
            image: null,
            likes: 445,
            liked: false,
            timestamp: new Date(now - 108000000).toISOString(),
            comments: []
        },
        {
            id: now - 129600000,
            userId: "mike",
            text: "JavaScript fatigue is real, but remember: you don't need to learn every new framework. Master the fundamentals first 💪",
            image: null,
            likes: 445,
            liked: false,
            timestamp: new Date(now - 129600000).toISOString(),
            comments: [
                {
                    id: now - 125000000,
                    userId: "alex",
                    text: "This! Solid JS fundamentals will take you so much further.",
                    timestamp: new Date(now - 125000000).toISOString()
                }
            ]
        },
        {
            id: now - 151200000,
            userId: "lisa",
            text: "Typography matters! Your design can be perfect but if the text is hard to read, users will leave. Font size, line height, contrast - all crucial 📝",
            image: null,
            likes: 234,
            liked: false,
            timestamp: new Date(now - 151200000).toISOString(),
            comments: []
        },
        {
            id: now - 172800000,
            userId: "sarah",
            text: "Debugging tip: console.log() is your friend, but console.table() is your best friend when working with arrays of objects 🔍",
            image: null,
            likes: 267,
            liked: false,
            timestamp: new Date(now - 172800000).toISOString(),
            comments: []
        },
        {
            id: now - 216000000,
            userId: "emma",
            text: "Working on a new project that combines my love for design and development. Stay tuned! 👀",
            image: null,
            likes: 92,
            liked: false,
            timestamp: new Date(now - 216000000).toISOString(),
            comments: []
        }
    ];
}

function loadData() {
    const savedPostsData = localStorage.getItem('posts');
    const savedPostsList = localStorage.getItem('savedPosts');
    const savedFollowing = localStorage.getItem('following');

    if (savedPostsData) {
        posts = JSON.parse(savedPostsData);
    } else {
        posts = getDefaultPosts();
        saveData();
    }

    if (savedPostsList) {
        savedPosts = JSON.parse(savedPostsList);
    }

    if (savedFollowing) {
        following = JSON.parse(savedFollowing);
    }

    renderPosts();
    updateSavedCount();
    updateFollowButtons();
}

function saveData() {
    localStorage.setItem('posts', JSON.stringify(posts));
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
    localStorage.setItem('following', JSON.stringify(following));
}

function toggleFollow(userId) {
    if (following.includes(userId)) {
        following = following.filter(id => id !== userId);
    } else {
        following.push(userId);
    }
    saveData();
    updateFollowButtons();
}

function updateFollowButtons() {
    const followBtns = document.querySelectorAll('.follow-btn');
    followBtns.forEach(btn => {
        const userId = btn.getAttribute('data-user');
        if (following.includes(userId)) {
            btn.textContent = 'Following';
            btn.style.background = 'transparent';
            btn.style.color = 'var(--text-primary)';
            btn.style.border = '1px solid var(--border-color)';
        } else {
            btn.textContent = 'Follow';
            btn.style.background = 'var(--accent-blue)';
            btn.style.color = '#fff';
            btn.style.border = 'none';
        }
    });
}

function createPost() {
    const text = document.getElementById('post-text').value.trim();

    if (!text && !currentImageData) return;

    const post = {
        id: Date.now(),
        userId: "jhye",
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
            userId: "jhye",
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
    if (days < 7) return `${days}d ago`;
    return time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function renderPosts() {
    const container = document.getElementById('posts-container');

    if (posts.length === 0) {
        container.innerHTML = '<div class="empty-feed">No posts yet. Create your first post!</div>';
        return;
    }

    container.innerHTML = posts.map(post => {
        const user = users[post.userId] || users.jhye;
        const isOwnPost = post.userId === "jhye";

        const profileUrl = post.userId === "jhye" ? "profile.html" : `${post.userId}.html`;

        return `
        <div class="post">
            <div class="post-header">
                <a href="${profileUrl}" style="text-decoration: none;">
                    <img src="${user.avatar}" alt="${user.name}" style="cursor: pointer;">
                </a>
                <div class="post-header-info">
                    <div>
                        <a href="${profileUrl}" style="text-decoration: none; color: inherit;">
                            <span style="font-weight: 700; cursor: pointer;" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">${user.name}</span>
                        </a>
                        <span style="color: var(--text-secondary); font-size: 0.9em; margin-left: 4px;">${user.handle}</span>
                        <span style="color: var(--text-secondary); font-size: 0.9em; margin-left: 4px;">· ${formatTime(post.timestamp)}</span>
                    </div>
                </div>
                ${isOwnPost ? `<button class="delete-post-btn" onclick="deletePost(${post.id})">🗑️</button>` : ''}
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
                    <img src="${users.jhye.avatar}" alt="Profile" class="comment-avatar">
                    <input type="text" id="comment-${post.id}" placeholder="Add a comment...">
                    <button onclick="addComment(${post.id})" class="comment-btn">Post</button>
                </div>

                <div class="comments-list">
                    ${post.comments.map(comment => {
                        const commentUser = users[comment.userId] || users.jhye;
                        const isOwnComment = comment.userId === "jhye";
                        const commentProfileUrl = comment.userId === "jhye" ? "profile.html" : `${comment.userId}.html`;
                        return `
                        <div class="comment">
                            <a href="${commentProfileUrl}" style="text-decoration: none;">
                                <img src="${commentUser.avatar}" alt="${commentUser.name}" class="comment-avatar" style="cursor: pointer;">
                            </a>
                            <div class="comment-content">
                                <div class="comment-header">
                                    <a href="${commentProfileUrl}" style="text-decoration: none; color: inherit;">
                                        <h5 style="cursor: pointer;" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">${commentUser.name}</h5>
                                    </a>
                                    <span>${formatTime(comment.timestamp)}</span>
                                </div>
                                <p>${comment.text}</p>
                            </div>
                            ${isOwnComment ? `<button onclick="deleteComment(${post.id}, ${comment.id})" class="delete-comment-btn">×</button>` : ''}
                        </div>
                    `}).join('')}
                </div>
            </div>
        </div>
    `}).join('');
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
