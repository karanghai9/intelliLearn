require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = 3000;
const otpService = require('./otpService')
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); 
const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');   
const axios = require('axios');
const querystring = require('querystring');
const { count } = require('console');


app.get('', (req, res) => {
  res.status(200).send('AiChatbot....');

});

// const qs = require('qs');

// const url = 'http://127.0.0.1:81';
// const data = qs.stringify({
//   input_text: 'What is Linear Regression?'
// });

// const config = {
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   timeout: 5000  // optional timeout
// };

// axios.post(url, data, config)
//   .then(response => {
//     console.log('Response:', response.data);
//   })
//   .catch(error => {
//     if (error.response) {
//       // Server responded with a status other than 200 range
//       console.error('Error Response:', error.response.status);
//       console.error('Error Data:', error.response.data);
//     } else if (error.request) {
//       // Request was made but no response received
//       console.error('Error Request:', error.request);
//     } else {
//       // Something else happened in making the request
//       console.error('Error:', error.message);
//     }
//   });




//translate function 
async function translate(text, langTo, langFrom) {
  const url = process.env.GS_KEY_URL;
  const params = querystring.stringify({
      q: text,
      target: langTo,
      source: langFrom
  });

  try {
      const response = await axios.get(`${url}?${params}`, {
          headers: {
              'User-Agent': 'Mozilla/5.0'
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error translating text:', error);
      throw error;
  }
}




app.post('/translate', async (req, res) => {
  let {conversation, targetLang ,sourceLang} = req.body;
  try { let count = 1;
    for (let item of conversation) {
      if (item.type === 'bot_response') {
        if (item.result) {
          item.result = await translate(item.result, targetLang,sourceLang);
        }
        if (item.source) {
          item.source = await translate(item.source, targetLang,sourceLang);
        }
        if (item.Summary) {
          item.Summary = await translate(item.Summary, targetLang,sourceLang);
        }
        // console.log('Translated ',count++,' : ',item.result,'\n',item.Summary,'\n',item.result,'\n');
      }
    }
    res.status(201).send({ translatedConversation: conversation });

  } catch (error) {
    res.status(500).send({ error: 'Translation failed', details: error.message });
  }

});








app.post('/sendOtp', (req, res) => {
    const { email } = req.body;
    otpService.sendOTP(email)
        .then(response => res.status(201).send(response))
        .catch(error => res.status(500).send(error));
});











// app.post('/bot-response', async (req, res) => {
//     const { text ,lang} = req.body;

//     // this is suppose to be data from api
//     try {
//         const  response =       {
//           "type": "bot_response",
//           "sender": "bot",
//           "timestamp": "2024-05-07 10:01:00 AM",
//           "name": "bot",
//           "videoUrl": "LinearRegression.mp4", 
//           "vflag":false,
//           "vtlag":false,
//           "Summary": "Summary by Gpt",
//           "startTime": "hh:mm:ss",
//           "endTime": "hh:mm:ss",
//           "result": "The logistic regression is a technique used for binary classification or binary response analysis. It is a linear regression algorithm that estimates the probability of an observation's outcome based on input variables. In logistic regression, we assume that each observation belongs to one or more categories, and we predict the probability of the observation belonging to each category given its input variables. The output for each observation is the predicted outcome (0 or 1), which determines whether the observation belongs to the true class, and the actual outcome (0 or 1) determines the probability of being in the true class.\n\nThe logistic regression algorithm works as follows:\n\n1. Calculate the log-odds ratios based on each input variable's estimated value and the predicted outcome for the observation. These log-odds ratios are used to calculate the probability of the observation's belonging to each category.\n\n2. Calculate the probability of the observation belonging to class 1 (or 0) given its input variables and predicted output using the formula: P(Y=1|X, O) = log(L/H), where L is the logistic likelihood function for class 1, H is the logistic likelihood function for class 0, and L is the logistic log-likelihood for class 1 and H is the logistic log-likelihood for class 0.\n\n3. Calculate the output (P(O=1|X)) using the formula: P(Y=1|X) = exp(logits).\n\nThe logistic regression algorithm works by finding the coefficients of each input variable that best fit the data, which are usually chosen by maximizing the likelihood function. The logistic regression output is then used to predict the probability of a specific observation belonging to each category.",
//           "seekTime": {
//             "end": 1044.4599999999998,
//             "id": 268,
//             "seek": 103086,
//             "start": 1042.4599999999998,
//             "text": " So for logistic regression,",
//             "video_name": "2023-10-04_KInt_default"
//           },
//           "source": "So that's what we want to have. So for logistic regression, there is a very concrete loss function that we always use. And this loss function is defined like this, and this is called the logistic loss. And so let's look at what this does. So our target class, Y, is either zero or it is one. If it's either zero or one, if it's zero, this means this part vanishes over here. If it's one, it means this part vanishes over here because this part, thing becomes zero. So it means either we have this part, or we have this part of the loss function. Depending on the value of Y. So if we say Y is equal to one, and this part over here vanishes, and it means we take, our loss function will be the logarithm of our prediction. So logarithm of our prediction. So what is if we get a large prediction? So how does the log of any function look like? So I haven't made a plot of this. Would have been nice if I had some internet connection right now. Hmm., So let's see if I can get. So, ah yeah, some plot of logarithm. So the"
//         } 

//         // const response = axios.post('pota ddress',{text}).then().catch();  change this line accordingly.


//             if(lang!=='en'){
//                     if(response.result){
//                         response.result = await translate(response.result,lang,'');
//                     }
//                     if(response.Summary){
//                         response.Summary = await translate(response.Summary,lang,'');

//                     }
//                     if(response.source){
//                         response.source = await translate(response.source,lang,'');

//                     }
//              }
//         res.status(201).send({'response' : response});
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Server Error");
//     }


// });


app.post('/bot-response', async (req, res) => {
    const { text, lang } = req.body;

    try {
        // Make a POST request to the backend service
        console.log("HELLO")
        const backendResponse = await axios.post('http://0.0.0.0:81/', new URLSearchParams({ input_text: text }));
        // console.log("RESP", backendResponse.data)

        // Extract response from backend
        const response = backendResponse.data;
        console.log("RESP-2:  ", response)

        const modifiedResp = 
          {
            "type": "bot_response",
            "sender": "bot",
            "timestamp": "2024-05-07 10:01:00 AM",
            "name": "bot",
            "videoUrl": response.seekTime.video_name + '.mp4', 
            "vflag":false,
            "vtlag":false,
            "Summary": "Summary by Gpt",
            "startTime": response.seekTime,
            "endTime": "00:02:00",
            "result": response.result,
            "seekTime": response.seekTime,
            "source": response.source
          }

        // Check if translation is needed
        if (lang !== 'en') {
            if (modifiedResp.result) {
              modifiedResp.result = await translate(modifiedResp.result, lang, '');
            }
            if (modifiedResp.source) {
              modifiedResp.source = await translate(modifiedResp.source, lang, '');
            }
        }

        // Send the final response
        res.status(201).send({ response: modifiedResp });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});







app.use('/Video', express.static(path.join(__dirname, 'Video')));



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});













