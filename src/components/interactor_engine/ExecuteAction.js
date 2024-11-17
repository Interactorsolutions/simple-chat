// API call to execute an Action

import axios from 'axios';
const { interactorUrl, interactorApiKey } = require("../../config");

const executeAction = async (serviceName, actionName, userId, actionData) => {
  const API_URL = interactorUrl + 'service/' + {serviceName} + '/action/' + {actionName} + '/execute?userId=' + userId;
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': interactorApiKey,
      },
      data : actionData
    });
    console.log("EDF" + response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching service data:', error);
    throw error;
  }
};

export default executeAction;