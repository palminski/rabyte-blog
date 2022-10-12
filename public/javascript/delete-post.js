async function deletePostHandler() {

    console.log('button clicked');
    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'delete',
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    }
    else
    {
        alert(response.statusText)
    }
}

document.querySelector('#delete-post-button').addEventListener('click', deletePostHandler);