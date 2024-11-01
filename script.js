const token = "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";
const imageContainer = document.getElementById('imageContainer');
const loadingGifUrl = "https://cdn.dribbble.com/users/214929/screenshots/4967879/media/2882629854d56075fd86d61ddee25975.gif"; // URL to your loading GIF

async function query(text) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
        {
            headers: { Authorization: `Bearer ${token}` },
            method: "POST",
            body: JSON.stringify({ "inputs": text }),
        }
    );
    const result = await response.blob();
    return result;
}

function generateImage() {
    const text = document.getElementById('textInput').value;
    
    // Show loading GIF
    const loadingImg = document.createElement('img');
    loadingImg.src = loadingGifUrl;
    imageContainer.innerHTML = '';
    imageContainer.appendChild(loadingImg);

    query(text).then((response) => {
        const objectURL = URL.createObjectURL(response);
        const img = document.createElement('img');
        img.src = objectURL;
        imageContainer.innerHTML = ''; // Clear loading GIF
        imageContainer.appendChild(img);
    });
}


document.getElementById('textInput').addEventListener('keypress',function(e){
    if(e.key === 'Enter'){
        generateImage();
    }
});