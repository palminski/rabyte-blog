async function commentFormHandler(event) {
    event.preventDefault();
    const text_content = document.querySelector('#comment-text').value.trim();
    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    if (text_content) {

        const response = await fetch('/api/comments', {
            method: 'post',
            body: JSON.stringify({
                post_id,
                text_content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        }
        else
        {
            alert(response.statusText);
        }
    }
}

document.querySelector('#comment-form').addEventListener('submit',commentFormHandler);