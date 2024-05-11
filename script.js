// Get the image element
var bodyImage = document.getElementById('body-image');

// Attach click event listener to the image
bodyImage?.addEventListener('click', function(event) {
    
    // Get the coordinates of the click relative to the image
    var x = event.offsetX;
    var y = event.offsetY;
    
    // Define the coordinates for the regions where clicks should trigger alerts
    var upperBody = { x1: 115, y1: 145, x2: 310, y2: 320 };
    var quads = { x1: 115, y1: 321, x2: 310, y2: 500 };
    var calves = { x1: 115, y1: 500, x2: 310, y2: 800 };
    var arms1 = { x1: 0, y1: 145, x2: 115, y2: 321 };
    var arms2 = { x1: 310, y1: 145, x2: 800, y2: 321 };

    // Define more regions as needed
    
    // Check if the click coordinates fall within any of the regions
    if (isWithinRegion(x, y, upperBody)) {
        alert('You clicked in Region 1');
    } else if (isWithinRegion(x, y, quads)) {
        alert('You clicked in Region 2');
    } else if (isWithinRegion(x, y, calves)) {
        alert('You clicked in Region 3');
    } else if (isWithinRegion(x, y, arms1)) {
        alert('You clicked in Region 4L');
    } else if (isWithinRegion(x, y, arms2)) {
        alert('You clicked in Region 4R');
    }
    
    // Add more conditions for other regions
    
});

// Function to check if coordinates are within a region
function isWithinRegion(x, y, region) {
    return x >= region.x1 && x <= region.x2 && y >= region.y1 && y <= region.y2;
}