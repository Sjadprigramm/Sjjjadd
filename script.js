window.onload = function() {
    loadPosts();
};

function loadPosts() {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
        const posts = JSON.parse(savedPosts);
        posts.forEach(post => {
            displayPost(post.title, post.content);
        });
    }
}

function addPost() {
    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();

    if (title === "" || content === "") {
        showNotification("الرجاء ملء كل الحقول!");
        return;
    }

    displayPost(title, content);
    savePostToStorage(title, content);
    showNotification("تم نشر المنشور بنجاح!");

    document.getElementById('title').value = "";
    document.getElementById('content').value = "";
    toggleForm(); // إغلاق النموذج بعد النشر
}

function displayPost(title, content) {
    const postContainer = document.createElement('div');
    postContainer.className = 'post';

    const postTitle = document.createElement('h3');
    postTitle.innerText = title;

    const postContent = document.createElement('p');
    postContent.innerText = content;

    postContainer.appendChild(postTitle);
    postContainer.appendChild(postContent);

    document.getElementById('posts').prepend(postContainer);
}

function savePostToStorage(title, content) {
    let posts = localStorage.getItem('posts');
    if (posts) {
        posts = JSON.parse(posts);
    } else {
        posts = [];
    }

    posts.push({ title, content });
    localStorage.setItem('posts', JSON.stringify(posts));
}

function showNotification(message) {
    const notificationDiv = document.getElementById('notifications');
    notificationDiv.innerText = message;
    notificationDiv.style.display = "block";

    setTimeout(() => {
        notificationDiv.style.display = "none";
    }, 3000);
}

function toggleForm() {
    const formContainer = document.getElementById('formContainer');
    formContainer.style.display = formContainer.style.display === 'none' || formContainer.style.display === '' ? 'block' : 'none';
}