document.getElementById('scrape-button').addEventListener('click', () => {
  const url = document.getElementById('url-input').value;
  if (!url) {
    alert('Please enter a URL.');
    return;
  }

  const apiUrl = `https://archive.org/wayback/available?url=${encodeURIComponent(url)}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const resultsDiv = document.getElementById('results');
      if (data.archived_snapshots && data.archived_snapshots.closest) {
        const snapshot = data.archived_snapshots.closest;
        resultsDiv.innerHTML = `
          <p><strong>Closest Snapshot Found:</strong></p>
          <p><strong>URL:</strong> <a href="${snapshot.url}" target="_blank">${snapshot.url}</a></p>
          <p><strong>Timestamp:</strong> ${snapshot.timestamp}</p>
        `;
      } else {
        resultsDiv.innerHTML = '<p>No snapshots found for this URL.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching from Wayback Machine API:', error);
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = '<p>An error occurred while fetching data.</p>';
    });
});
