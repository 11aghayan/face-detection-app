function returnClarifaiJSONRequsetOptions(IMG_URL) {

  const PAT = '700df331635b440e94a464477a857fd6';
  const USER_ID = '11aghayan';
  const APP_ID = 'smart-brain';

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMG_URL
          }
        }
      }
    ]
});



  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return requestOptions
}

// const img_url = 'https://samples.clarifai.com/metro-north.jpg';

async function detect(imgURL) {
  const response = await fetch(`https://api.clarifai.com/v2/models/face-detection/outputs`, returnClarifaiJSONRequsetOptions(imgURL));
  const data = await response.json();
  return data;
}

export default detect;