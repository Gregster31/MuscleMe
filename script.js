const API_KEY = 'YOUR API KEY'; //ADD API KEY 
const bodyImage = document.getElementById('body-image');
const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const genderInputs = document.querySelectorAll('input[name="gender"]');


bodyImage?.addEventListener('click', function(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    
    const regions = {
        upperBody: { x1: 115, y1: 145, x2: 310, y2: 320 },
        quads: { x1: 115, y1: 321, x2: 310, y2: 500 },
        calves: { x1: 115, y1: 500, x2: 310, y2: 800 },
        arms1: { x1: 0, y1: 145, x2: 115, y2: 321 },
        arms2: { x1: 310, y1: 145, x2: 800, y2: 321 }
    };

    const existingOverlays = document.querySelectorAll('.overlay');
    existingOverlays.forEach(overlay => overlay.remove());

    for (const regionName in regions) {
        if (isWithinRegion(x, y, regions[regionName])) {
            const specifications = getUserSpecifications();
            callChatGPT(regionName, specifications);
            break; 
        }
    }    
});

function isWithinRegion(x, y, region) {
    return x >= region.x1 && x <= region.x2 && y >= region.y1 && y <= region.y2;
}

async function callChatGPT(regionName, specifications) {
    try {
        showLoadingSpinner();

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [{ role: 'user', content: `Do only has my demand states, do not add anything else.
                Create a 1-day ADAPTED training plan for ${regionName} specific workout for a ${specifications.gender} of ${specifications.weight} kg and ${specifications.height} cm.
                The exercise need to be only doable with the following equipement: ${specifications.equipment.join(', ')}. 
                First I want a warm-up with 2 exercises with short descriptions for each exercise. 
                Next I want a work-out with 5 exercises and a small descriptions for each.
                Finally, I want a cool-down with 2 exercises and a small descriptions for each.
                Do not include 1-day training plan title and DO NOT HAVE A MEDICAL remark at the end OR ANY OTHER KIND OF REMARK.`}],
                temperature: 1.0,
                top_p: 0.7,
                n: 1,
                stream: false,
                presence_penalty: 0,
                frequency_penalty: 0,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data); 

        if (data && data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
            const encodedResponse = encodeURIComponent(data.choices[0].message.content);
            window.location.href = `response.html?response=${encodedResponse}`;
        } else {
            alert('Error: Unexpected response format');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error: Unable to process your request.');
    } finally {
        hideLoadingSpinner();
    }
}

function showLoadingSpinner() {
    const loadingSpinner = document.createElement('div');
    loadingSpinner.classList.add('loading-spinner');
    loadingSpinner.textContent = 'Loading...';
    loadingSpinner.style.fontSize = '34px'; 
    document.body.appendChild(loadingSpinner);
}


function hideLoadingSpinner() {
    const loadingSpinner = document.querySelector('.loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.remove();
    }
}

function getGender() {
    let gender = '';
    genderInputs.forEach(input => {
        if (input.checked) {
            gender = input.value;
        }
    });
    return gender;
}
function getEquipment() {
    const equipmentInputs = document.querySelectorAll('input[name="equipment"]');
    let equipment = [];
    equipmentInputs.forEach(input => {
        if (input.checked) {
            equipment.push(input.value);
        }
    });
    return equipment;
}

function getUserSpecifications() {
    const weight = weightInput?.value;
    const height = heightInput?.value;
    const gender = getGender();
    const equipment = getEquipment();
    return { weight, height, gender, equipment };
}

