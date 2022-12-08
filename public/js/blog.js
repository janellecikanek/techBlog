const newFormHandler = async (event) => {
    event.preventDefault();
  
    // const title = document.querySelector('#blog-title').value.trim();
    // const content = document.querySelector('#blog-content').value.trim();
    const comment = document.querySelector('#comment-content').value.trim();
    //const id = document.querySelector('#blog-id').value.trim();
  
    if (comment_content) {
      const response = await fetch(`/api/blogs`, {
        method: 'POST',
        body: JSON.stringify({ comment_content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/blog');
      } else {
        alert('Failed to create comment');
      }
    }
  };
  
  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.comment-list')
    .addEventListener('click', delButtonHandler);