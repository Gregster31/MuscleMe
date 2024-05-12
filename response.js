document.addEventListener("DOMContentLoaded", function () {
    // Get the response from the query parameter
    const params = new URLSearchParams(window.location.search);
    const response = params.get('response');

    // Display the response in the response-content div
    const responseContent = document.getElementById('response-content');
    if (response) {
        // Split the response by line breaks
        const lines = response.split('\n');
        let formattedResponse = '';

        // Iterate over each line
        lines.forEach(line => {
            // Check if the line starts with a number and a period
            if (/^\d+\.\s/.test(line)) {
                // If it does, format it as a list item
                formattedResponse += `<li>${line}</li>`;
            } else if (/^\w+/.test(line)) {
                // If it starts with a word character, format it as a subtitle
                formattedResponse += `<h3>${line}</h3>`;
            } else {
                // Otherwise, format it as a paragraph
                formattedResponse += `<p>${line}</p>`;
            }
        });

        // Set the formatted response as innerHTML to display it properly
        responseContent.innerHTML = formattedResponse;
    } else {
        responseContent.innerText = 'No response available.';
    }
});
