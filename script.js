// function submitInput() {
//     const text = document.getElementById('userInput').value;
//     fetch('https://api.openai.com/v1/completions', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer YOUR_API_KEY'
//         },
//         body: JSON.stringify({
//             model: 'text-davinci-003',
//             prompt: text,
//             max_tokens: 100
//         })
//     })
//     .then(response => response.json())
//     .then(data => {
//         // Process the response from the API
//         // Generate modules with questions and answers
//         generateModules(data.choices);
//     })
//     .catch(error => console.error('Error:', error));
// }


function submitInput() {
    // const text = document.getElementById('user-data').value;
    // Send data to ChatGPT API
    alert("Sending data to ChatGPT API:");
    // Add your API call code here
}

