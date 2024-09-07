// Function to save changes (add or edit a blog post)
function saveChanges() {
    const imageUrl = document.getElementById('imageurl').value;
    const title = document.getElementById('title').value;
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;

    if (title && description) {
        const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        const blogPost = {
            id: Date.now().toString(),
            imageUrl,
            title,
            type,
            description
        };
        blogPosts.push(blogPost);
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
        loadData();
        clearForm();
    } else {
        alert('Title and Description are required!');
    }
}

// Function to load blog posts
function loadData() {
    const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const blogContainer = document.querySelector('.blog__container');
    blogContainer.innerHTML = '';

    blogPosts.forEach(post => {
        const blogCard = `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <img src="${post.imageUrl}" class="card-img-top" alt="${post.title}">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.description}</p>
                        <button class="btn btn-primary" onclick="viewBlog('${post.id}')">View</button>
                        <button class="btn btn-secondary" onclick="editBlog('${post.id}')">Edit</button>
                        <button class="btn btn-danger" onclick="deleteBlog('${post.id}')">Delete</button>
                    </div>
                </div>
            </div>
        `;
        blogContainer.innerHTML += blogCard;
    });
}

// Function to view a blog post
function viewBlog(id) {
    const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const post = blogPosts.find(post => post.id === id);
    const blogModalBody = document.querySelector('.blog__modal__body');
    blogModalBody.innerHTML = `
        <img src="${post.imageUrl}" class="img-fluid mb-3" alt="${post.title}">
        <h5>${post.title}</h5>
        <p>${post.description}</p>
    `;
    const showBlogModal = new bootstrap.Modal(document.getElementById('showblog'));
    showBlogModal.show();
}

// Function to edit a blog post
function editBlog(id) {
    const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const post = blogPosts.find(post => post.id === id);
    document.getElementById('imageurl').value = post.imageUrl;
    document.getElementById('title').value = post.title;
    document.getElementById('type').value = post.type;
    document.getElementById('description').value = post.description;

    // Remove the old saveChanges function
    document.querySelector('.modal-footer .btn-primary').onclick = null;
    document.querySelector('.modal-footer .btn-primary').setAttribute('onclick', `saveEditedChanges('${post.id}')`);

    const addBlogModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    addBlogModal.show();
}

// Function to save edited blog post
function saveEditedChanges(id) {
    const imageUrl = document.getElementById('imageurl').value;
    const title = document.getElementById('title').value;
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;

    if (title && description) {
        let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        blogPosts = blogPosts.map(post => {
            if (post.id === id) {
                return { id, imageUrl, title, type, description };
            }
            return post;
        });
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
        loadData();
        clearForm();
    } else {
        alert('Title and Description are required!');
    }
}

// Function to delete a blog post
function deleteBlog(id) {
    let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    blogPosts = blogPosts.filter(post => post.id !== id);
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    loadData();
}

// Function to clear the form
function clearForm() {
    document.getElementById('imageurl').value = '';
    document.getElementById('title').value = '';
    document.getElementById('type').value = '';
    document.getElementById('description').value = '';

    // Reset the saveChanges function
    document.querySelector('.modal-footer .btn-primary').onclick = saveChanges;
}