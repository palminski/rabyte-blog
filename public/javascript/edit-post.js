async function editPostHandler(event) {
    event.preventDefault();

    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    title = document.querySelector('#title-field').value.trim();
    text_content = document.querySelector('#text-field').value.trim();

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            text_content
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    }
    else
    {
        alert(response.statusText)
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editPostHandler);