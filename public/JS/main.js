const outputDiv = document.getElementById("output");
const getPostsBtn = document.getElementById("get-posts-btn");

// Get & show all posts
async function showPosts() {
    outputDiv.innerHTML = "";
    try {
        const res = await fetch("http://localhost:8080/api/posts");
        if (!res.ok) {
            throw new Error("Error tetching the posts.!");
        }
        const posts = await res.json();
        posts.forEach((post) => {
            let postDiv = document.createElement("div");
            postDiv.textContent = `${post.id} : ${post.title}`;
            outputDiv.append(postDiv);
        });
    } catch (error) {
        console.log(`Encountered an error: ${error}`);
    }
}

// Submit new post
async function addPost(e) {
    e.preventDefault();

    // Use `new FormData(e.target)` to ensure `this` refers to the form
    const formData = new FormData(e.target);
    const title = formData.get("title");

    try {
        const res = await fetch("http://localhost:8080/api/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title }), // Ensure the body is a proper JSON object
        });

        if (!res.ok) {
            throw new Error(`Error creating post ${title}`);
        }

        showPosts();
    } catch (error) {
        console.error(`Error encountered: ${error}`);
    }
}

// Delete a post
async function removePost(e) {
    e.preventDefault();

    // Use `new FormData(e.target)` to ensure `this` refers to the form
    const formData = new FormData(e.target);
    const title = formData.get("title");

    try {
        const postId = await getPostId(title);

        if (postId === 0) {
            throw new Error(`Post not found with title ${title}`);
        }

        const res = await fetch(`http://localhost:8080/api/posts/${postId}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            throw new Error(`Error deleting post ${title}`);
        }

        showPosts();
    } catch (error) {
        console.error(`Error encountered: ${error}`);
    }
}

// Upate a post (Need to work on this one)

// Function to get post id from title
async function getPostId(title) {
    const res = await fetch("http://localhost:8080/api/posts");
    if (!res.ok) {
        throw new Error("Error tetching the posts.!");
    }
    const posts = await res.json();
    const resPost = posts.filter((post) => post.title === title);
    if (resPost.length === 0) {
        return 0;
    } else {
        return resPost[0].id;
    }
}

document.getElementById("add-post-form").addEventListener("submit", addPost);
document.getElementById("del-post-form").addEventListener("submit", removePost);
getPostsBtn.addEventListener("click", showPosts);
