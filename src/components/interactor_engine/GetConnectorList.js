// API call to get list of Connectors

import axios from 'axios';
const { interactorUrl, interactorApiKey } = require("../../config");

const getConnectorList = async () => {
  const API_URL = interactorUrl + 'service';
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': interactorApiKey,
      },
    });
    console.log("EDF" + response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching service data:', error);
    throw error;
  }
};

export default getConnectorList;

// Temporary data

export const connectors = [
  {
      "active": "Y",
      "enabled": true,
      "id": "051466ff-fb74-4128-96cf-cf1bad07fe6e",
      "name": "gmail",
      "status": null,
      "type": "0",
      "icon": "https://interactor-service.s3.us-west-2.amazonaws.com/logo/gmail.svg",
      "sharing": "public",
      "insertedAt": "2024-10-30T08:35:40",
      "updatedAt": "2024-10-30T08:35:40",
      "createdBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
      "statusTimestamp": null,
      "accountId": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
      "updatedBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
      "displayOrder": 100,
      "platformId": "interactor",
      "categories": ['Collaboration', 'Email', 'Project management']
  },
  {
      "active": "Y",
      "enabled": true,
      "id": "0a5bad3f-2e5c-4a4f-81fb-1eb7f3daed7a",
      "name": "slack",
      "status": null,
      "type": "0",
      "icon": "https://interactor-service.s3.us-west-2.amazonaws.com/logo/slack.svg",
      "sharing": "public",
      "insertedAt": "2024-10-30T08:35:41",
      "updatedAt": "2024-10-30T08:35:41",
      "createdBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
      "statusTimestamp": null,
      "accountId": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
      "updatedBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
      "displayOrder": 100,
      "platformId": "interactor",
      "categories": ['Collaboration', 'Productivity', 'Project management']
  },
  {
      "active": "Y",
      "enabled": true,
      "id": "15182b72-b998-44d1-ba46-d9e9f13194de",
      "name": "jandi",
      "status": null,
      "type": "1",
      "icon": "https://interactor-service.s3.us-west-2.amazonaws.com/logo/jandi.png",
      "sharing": "public",
      "insertedAt": "2024-10-30T08:35:42",
      "updatedAt": "2024-10-30T08:35:42",
      "createdBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
      "statusTimestamp": null,
      "accountId": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
      "updatedBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
      "displayOrder": 100,
      "platformId": "interactor",
      "categories": ['Collaboration', 'Productivity', 'Project management']
  }
];