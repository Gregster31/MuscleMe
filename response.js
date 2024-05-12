document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const response = params.get('response');

    const responseContent = document.getElementById('response-content');
    if (response) {
        const lines = response.split('\n');
        let formattedResponse = '';

        lines.forEach(line => {
            if (/^\d+\.\s/.test(line)) {
                formattedResponse += `<li>${line}</li>`;
            } else if (/^\w+/.test(line)) {
                formattedResponse += `<h3>${line}</h3>`;
            } else {
                formattedResponse += `<p>${line}</p>`;
            }
        });

        responseContent.innerHTML = formattedResponse;
    } else {
        responseContent.innerText = 'No response available.';
    }
});
