async function newPostHandler(event){
    event.preventDefault();

    const title = document.querySelector('#title-field').value.trim();
    const text_content = document.querySelector('#text-field').value;
    text_content.replace(/\n\r?/g, '<br />');

    const response = await fetch('api/posts', {
        method: 'post',
        body: JSON.stringify({
            title,
            text_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok){
        document.location.replace('/dashboard');
    }
    else
    {
        alert(response.statusText);
    }
}

document.querySelector('.post-form').addEventListener('submit', newPostHandler);