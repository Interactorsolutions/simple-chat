// API call to authenticate the user for a Connector

import axios from 'axios';

const { interactorUrl, interactorApiKey } = require("../../config");

const installConnector = async (service, userId) => {
  const API_URL = interactorUrl + 'service/' + service + '/version/1.0.0/oauth?userId=' + userId;
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': interactorApiKey,
      },
    });
    console.log("EDF" + response.data)
    // Authentication하고 나면 Action label을 받아 놓으면 좋을 것 같습니다.
    // Chat에서 Action list 따로 부를 필요 없이 사용할 수 있게요
    return response.data;
  } catch (error) {
    console.error('Error fetching service data:', error);
    throw error;
  }
};

export default installConnector;