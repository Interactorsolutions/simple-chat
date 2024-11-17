// API call to get list of Connectors

import axios from 'axios';
const {
    interactorUrl,
    interactorApiKey
} = require("../../config");

const getActionList = async (actionName) => {
    const API_URL = interactorUrl + 'service/' + actionName;
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

export default getActionList;

// Temporary data

export const gmailActions = [{
    "active": "Y",
    "id": "bc7f2b6a-3a21-4c3c-8f0d-77a7766358e8",
    "label": {
        "en": "list emails",
        "ko": "이메일 목록 가져오기"
    },
    "name": "email.list",
    "status": null,
    "tag": null,
    "schema": {
        "output": {
            "items": {
                "properties": {
                    "id": {
                        "x-dataType": "GmailMessageId",
                        "x-dataTypeId": "a7a2b4cb-f2f6-44c5-9eb8-540a33eaf71d",
                        "x-dataTypeVersion": "1.0.0",
                        "x-label": {
                            "en": "Gmail message ID",
                            "ko": "Gmail message ID"
                        }
                    },
                    "threadId": {
                        "type": "string",
                        "x-label": {
                            "en": "Gmail message thread ID",
                            "ko": "Gmail message thread ID"
                        }
                    }
                },
                "type": "object",
                "x-label": {
                    "en": "Gmail message",
                    "ko": "Gmail message"
                }
            },
            "title": "gmailMessageList",
            "type": "array",
            "x-label": {
                "en": "Gmail message list",
                "ko": "Gmail message list"
            }
        },
        "variables": [{
            "title": "maxResults",
            "type": "number",
            "x-label": {
                "en": "Limit number",
                "ko": "Limit number"
            }
        }, {
            "title": "includeSpamTrash",
            "type": "boolean",
            "x-label": {
                "en": "Include Spam/Trash",
                "ko": "Include Spam/Trash"
            }
        }, {
            "title": "q",
            "type": "string",
            "x-label": {
                "en": "Search query",
                "ko": "Search query"
            }
        }, {
            "items": {
                "x-dataType": "GmailLabel",
                "x-dataTypeId": "05c75ebb-affe-49d8-acd6-b9c05a864dfc",
                "x-dataTypeVersion": "1.0.0",
                "x-label": {
                    "en": "Label",
                    "ko": "Label"
                }
            },
            "title": "labelIds",
            "type": "array",
            "x-default-input-type": "custom",
            "x-label": {
                "en": "Filter Labels",
                "ko": "Filter Labels"
            }
        }]
    },
    "published": true,
    "logic": {
        "execute": {
            "@type": "script",
            "id": "d80d7439-92cb-4619-9b20-a1510b47913e",
            "input": {
                "@type": "reference",
                "operation": "source",
                "path": []
            },
            "language": "javascript",
            "script": "try {\n  const params = {}\n  if (!!input.data.maxResults) {\n    params.maxResults = input.data.maxResults\n  }\n  if (!!input.data.q) {\n    params.q = input.data.q\n  }\n  if (!!input.data.labelIds) {\n    params.labelIds = input.data.labelIds\n  }\n  if (!!input.data.includeSpamTrash) {\n    params.includeSpamTrash = input.data.includeSpamTrash\n  }\n  \n  const response = await $.axios({\n    method: \"get\",\n    url: `https://gmail.googleapis.com/gmail/v1/users/me/messages`,\n    headers: {\n      \"Authorization\": `Bearer ${service.token}`,\n      \"Content-Type\": \"application/json\"\n    },\n    params: params\n  })\n  \n  return response.data.messages\n} catch (error) {\n  throw error\n}"
        }
    },
    "insertedAt": "2024-10-30T08:35:40",
    "updatedAt": "2024-10-30T08:35:40",
    "createdBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "statusTimestamp": null,
    "updatedBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "componentId": "bc7f2b6a-3a21-4c3c-8f0d-77a7766358e8",
    "connectorId": "051466ff-fb74-4128-96cf-cf1bad07fe6e"
}, {
    "active": "Y",
    "id": "56241ee8-d981-4f04-92a2-a974edc16147",
    "label": {
        "en": "star an email",
        "ko": "이메일 별표 설정하기"
    },
    "name": "email.star",
    "status": null,
    "tag": null,
    "schema": {
        "output": {
            "title": "gmailMessage",
            "x-dataType": "GmailMessage",
            "x-dataTypeId": "0de204f7-5473-4fbf-a63f-94b3cd43a4aa",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Gmail message",
                "ko": "Gmail message"
            }
        },
        "variables": [{
            "title": "message_id",
            "x-dataType": "GmailMessageId",
            "x-dataTypeId": "a7a2b4cb-f2f6-44c5-9eb8-540a33eaf71d",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Gmail message ID to star",
                "ko": "Gmail message ID to star"
            },
            "x-required": true
        }]
    },
    "published": true,
    "logic": {
        "execute": {
            "@type": "script",
            "id": "df8de027-b1f2-4a85-9442-692bd06f64ec",
            "input": {
                "@type": "reference",
                "operation": "source",
                "path": []
            },
            "language": "javascript",
            "script": "try {\n  const response = await $.axios({\n    method: \"post\",\n    url: `https://www.googleapis.com/gmail/v1/users/me/messages/${input.data.message_id}/modify`,\n    headers: {\n      \"Authorization\": `Bearer ${service.token}`,\n      \"Content-Type\": \"application/json\"\n    },\n    data: {\n      \"addLabelIds\": [\"STARRED\"]\n    }\n  })\n  \n  const email_info = await service.fn.get_email_info({ \"id\": response.data.id, \"service_token\": service.token }, $)\n  email_info[\"message_info\"] = await service.fn.get_payload_info(email_info.payload)\n\n  return email_info\n} catch (error) {\n  throw error\n}"
        }
    },
    "insertedAt": "2024-10-30T08:35:40",
    "updatedAt": "2024-10-30T08:35:40",
    "createdBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "statusTimestamp": null,
    "updatedBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "componentId": "56241ee8-d981-4f04-92a2-a974edc16147",
    "connectorId": "051466ff-fb74-4128-96cf-cf1bad07fe6e"
}, {
    "active": "Y",
    "id": "3ecaf333-d638-445f-90c2-3ab33016d5b3",
    "label": {
        "en": "update an email draft",
        "ko": "이메일 초안 변경하기"
    },
    "name": "email.draft.update",
    "status": null,
    "tag": null,
    "schema": {
        "output": {
            "title": "gmailDraft",
            "x-dataType": "GmailDraft",
            "x-dataTypeId": "97dc77b0-8e0c-49eb-a476-7eacc4ef3b35",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Gmail draft",
                "ko": "Gmail draft"
            }
        },
        "variables": [{
            "title": "draft_id",
            "x-dataType": "GmailDraftId",
            "x-dataTypeId": "b412bfcd-21a4-4b6c-a0d9-c13bc626fa86",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Gmail draft ID to update",
                "ko": "Gmail draft ID to update"
            },
            "x-required": true
        }, {
            "items": {
                "type": "string"
            },
            "title": "to",
            "type": "array",
            "x-label": {
                "en": "To",
                "ko": "To"
            }
        }, {
            "items": {
                "type": "string"
            },
            "title": "cc",
            "type": "array",
            "x-label": {
                "en": "Cc",
                "ko": "Cc"
            }
        }, {
            "items": {
                "type": "string"
            },
            "title": "bcc",
            "type": "array",
            "x-label": {
                "en": "Bcc",
                "ko": "Bcc"
            }
        }, {
            "title": "from",
            "x-dataType": "GmailSendAs",
            "x-dataTypeId": "6d6a9f35-e0b1-477a-a27e-6cbfb0fdf211",
            "x-dataTypeVersion": "1.0.0",
            "x-default-input-type": "chooser",
            "x-label": {
                "en": "From",
                "ko": "From"
            }
        }, {
            "title": "fromName",
            "type": "string",
            "x-label": {
                "en": "From Name",
                "ko": "From Name"
            }
        }, {
            "title": "subject",
            "type": "string",
            "x-label": {
                "en": "Email Subject",
                "ko": "Email Subject"
            }
        }, {
            "title": "body",
            "type": "string",
            "x-label": {
                "en": "Email Content",
                "ko": "Email Content"
            }
        }, {
            "enum": ["plain", "html"],
            "title": "bodyType",
            "type": "string",
            "x-label": {
                "en": "Email Content Type",
                "ko": "Email Content Type"
            }
        }]
    },
    "published": true,
    "logic": {
        "execute": {
            "@type": "script",
            "id": "6d517921-be4b-45ce-91e0-a508babdba39",
            "input": {
                "@type": "reference",
                "operation": "source",
                "path": []
            },
            "language": "javascript",
            "script": "try {\n  const origin_draft_email_info = await service.fn.get_draft_email_info({ \"id\": input.data.draft_id, \"service_token\": service.token }, $)\n  const origin_message_data = await service.fn.get_payload_info(origin_draft_email_info.message.payload)\n\n  const message_data = {\n    \"to\": input.data.to != null ? input.data.to : origin_message_data.to,\n    \"cc\": input.data.cc != null ? input.data.cc : origin_message_data.cc,\n    \"bcc\": input.data.bcc != null ? input.data.bcc : origin_message_data.bcc,\n    \"from\": input.data.from != null ? await service.fn.string_to_qp({ \"string\": `${input.data.from_name} <${input.data.from}>` }) : origin_message_data.from,\n    \"subject\": input.data.subject != null ? await service.fn.string_to_qp({ \"string\": input.data.subject }) : origin_message_data.subject,\n    \"body\": input.data.body != null ? input.data.body : origin_message_data.body,\n    \"bodyType\": input.data.bodyType ? `text/${input.data.bodyType}` : origin_message_data.bodyType,\n    \"signature\": input.data.body != null && input.data.signature ? input.data.signature : \"\"\n  }\n  \n  const response = await $.axios({\n    method: \"put\",\n    url: `https://www.googleapis.com/gmail/v1/users/me/drafts/${input.data.draft_id}`,\n    headers: {\n      \"Authorization\": `Bearer ${service.token}`,\n      \"Content-Type\": \"application/json\"\n    },\n    data: {\n      \"message\": {\n        \"raw\": create_update_raw_message(message_data)\n      }\n    }\n  })\n  \n  const draft_email_info = await service.fn.get_draft_email_info({ \"id\": response.data.id, \"service_token\": service.token }, $)\n  draft_email_info.message[\"message_info\"] = await service.fn.get_payload_info(draft_email_info.message.payload)\n\n  return draft_email_info\n} catch (error) {\n  throw error\n}\n\nfunction create_update_raw_message(data) {\n  let raw_message = \"\"\n  raw_message += `To: ${data.to.join(\", \")}\\n`\n  raw_message += `From: ${data.from}\\n`\n  raw_message += `Cc: ${data.cc.join(\", \")}\\n`\n  raw_message += `Bcc: ${data.bcc.join(\", \")}\\n`\n  raw_message += `Subject: ${data.subject}\\n`\n  raw_message += `Content-Type: ${data.signature ? \"text/html\" : data.bodyType}; charset=\"UTF-8\"\\n\\n`\n  \n  if (data.signature) {\n    data.body += `<br><br><span class=\"gmail_signature_prefix\">-- </span><br>`\n    data.body += `<div dir=\"ltr\" class=\"gmail_signature\" data-smartmail=\"gmail_signature\">${data.signature}</div>`\n  }\n  if (data.bodyType === \"html\") {\n    raw_message += `<html><body><div>${data.body.replaceAll(\"\\n\", \"<br>\")}</div></body></html>`\n  } else {\n    raw_message += data.body\n  }\n\n  return btoa(unescape(encodeURIComponent(raw_message)))\n}"
        }
    },
    "insertedAt": "2024-10-30T08:35:40",
    "updatedAt": "2024-10-30T08:35:40",
    "createdBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "statusTimestamp": null,
    "updatedBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "componentId": "3ecaf333-d638-445f-90c2-3ab33016d5b3",
    "connectorId": "051466ff-fb74-4128-96cf-cf1bad07fe6e"
}, {
    "active": "Y",
    "id": "be3f054c-fd68-4979-9076-48fedc3c6148",
    "label": {
        "en": "create a draft forwarded email",
        "ko": "전달 이메일 초안 작성하기"
    },
    "name": "email.draft.create.forward",
    "status": null,
    "tag": null,
    "schema": {
        "output": {
            "title": "gmailDraft",
            "x-dataType": "GmailDraft",
            "x-dataTypeId": "97dc77b0-8e0c-49eb-a476-7eacc4ef3b35",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Gmail draft",
                "ko": "Gmail draft"
            }
        },
        "variables": [{
            "title": "message_id",
            "x-dataType": "GmailMessageId",
            "x-dataTypeId": "a7a2b4cb-f2f6-44c5-9eb8-540a33eaf71d",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Source email ID to forward",
                "ko": "Source email ID to forward"
            },
            "x-required": true
        }, {
            "items": {
                "type": "string"
            },
            "title": "to",
            "type": "array",
            "x-label": {
                "en": "To",
                "ko": "To"
            },
            "x-required": true
        }, {
            "items": {
                "type": "string"
            },
            "title": "cc",
            "type": "array",
            "x-label": {
                "en": "Cc",
                "ko": "Cc"
            }
        }, {
            "items": {
                "type": "string"
            },
            "title": "bcc",
            "type": "array",
            "x-label": {
                "en": "Bcc",
                "ko": "Bcc"
            }
        }, {
            "title": "from",
            "x-dataType": "GmailSendAs",
            "x-dataTypeId": "6d6a9f35-e0b1-477a-a27e-6cbfb0fdf211",
            "x-dataTypeVersion": "1.0.0",
            "x-default-input-type": "chooser",
            "x-label": {
                "en": "From",
                "ko": "From"
            }
        }, {
            "title": "fromName",
            "type": "string",
            "x-label": {
                "en": "From Name",
                "ko": "From Name"
            }
        }, {
            "title": "body",
            "type": "string",
            "x-label": {
                "en": "Additional Email Content",
                "ko": "Additional Email Content"
            }
        }, {
            "enum": ["plain", "html"],
            "title": "bodyType",
            "type": "string",
            "x-label": {
                "en": "Email Content Type",
                "ko": "Email Content Type"
            }
        }, {
            "title": "signature",
            "x-dataType": "GmailSignature",
            "x-dataTypeId": "cb8c9f42-21fa-4107-b719-8c08bc9e2c75",
            "x-dataTypeVersion": "1.0.0",
            "x-default-input-type": "chooser",
            "x-label": {
                "en": "Email Signature",
                "ko": "Email Signature"
            }
        }]
    },
    "published": true,
    "logic": {
        "execute": {
            "@type": "script",
            "id": "b08293e4-cfae-43ec-8548-2c79703ecb9f",
            "input": {
                "@type": "reference",
                "operation": "source",
                "path": []
            },
            "language": "javascript",
            "script": "try {\n  const origin_email_info = await service.fn.get_email_info({ \"id\": input.data.message_id, \"service_token\": service.token }, $)\n  const forward_thread_id = origin_email_info.threadId\n  const forward_message_data = await service.fn.get_payload_info(origin_email_info.payload)\n\n  const message_data = {\n    \"to\": input.data.to,\n    \"cc\": input.data.cc || [],\n    \"bcc\": input.data.bcc || [],\n    \"from\": input.data.from_name ? await service.fn.string_to_qp({ \"string\": `${input.data.from_name} <${input.data.from}>` }) : input.data.from || \"\",\n    \"subject\": \"Fwd: \" + await service.fn.string_to_qp({ \"string\": forward_message_data.subject }),\n    \"body\": input.data.body || \"\" + \"\\n\\n\" + get_forward_message(forward_message_data),\n    \"bodyType\": (input.data.signature || input.data.bodyType === \"html\") ? \"html\" : \"plain\",\n    \"signature\": input.data.signature || \"\"\n  }\n\n  const response = await $.axios({\n    method: \"post\",\n    url: `https://www.googleapis.com/gmail/v1/users/me/drafts`,\n    headers: {\n      \"Authorization\": `Bearer ${service.token}`,\n      \"Content-Type\": \"application/json\"\n    },\n    data: {\n      \"message\": {\n        \"raw\": await service.fn.create_raw_message(message_data),\n        \"threadId\": forward_thread_id\n      }\n    }\n  })\n  \n  const draft_email_info = await service.fn.get_draft_email_info({ \"id\": response.data.id, \"service_token\": service.token }, $)\n  draft_email_info.message[\"message_info\"] = await service.fn.get_payload_info(draft_email_info.message.payload)\n\n  return draft_email_info\n} catch (error) {\n  throw error\n}\n\nfunction get_forward_message(forward_message_data) {\n  let forward_message = \"\"\n  forward_message += `---------- Forwarded message ---------\\n`\n  forward_message += `From: ${forward_message_data.from}\\n`\n  forward_message += `Date: ${forward_message_data.date}\\n`\n  forward_message += `Subject: ${forward_message_data.subject}\\n`\n  forward_message += `To: ${forward_message_data.to.join(\", \")}\\n`\n  if (forward_message_data.cc && forward_message_data.cc.length > 0) {\n    forward_message += `Cc: ${forward_message_data.cc.join(\", \")}\\n`\n  }\n\n  return forward_message + \"\\n\\n\" + forward_message_data.body || \"\"\n}"
        }
    },
    "insertedAt": "2024-10-30T08:35:40",
    "updatedAt": "2024-10-30T08:35:40",
    "createdBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "statusTimestamp": null,
    "updatedBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "componentId": "be3f054c-fd68-4979-9076-48fedc3c6148",
    "connectorId": "051466ff-fb74-4128-96cf-cf1bad07fe6e"
}, {
    "active": "Y",
    "id": "10a106eb-c3ce-4f67-8dfb-223e26a8dddd",
    "label": {
        "en": "delete an email draft",
        "ko": "이메일 초안 삭제하기"
    },
    "name": "email.draft.delete",
    "status": null,
    "tag": null,
    "schema": {
        "output": {
            "title": "result",
            "type": "string",
            "x-label": {
                "en": "Delete result",
                "ko": "Delete result"
            }
        },
        "variables": [{
            "title": "draft_id",
            "x-dataType": "GmailDraftId",
            "x-dataTypeId": "b412bfcd-21a4-4b6c-a0d9-c13bc626fa86",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Gmail draft ID to delete",
                "ko": "Gmail draft ID to delete"
            },
            "x-required": true
        }]
    },
    "published": true,
    "logic": {
        "execute": {
            "@type": "script",
            "id": "636facc5-e5a8-49d7-84cd-2ae39b1ebae2",
            "input": {
                "@type": "reference",
                "operation": "source",
                "path": []
            },
            "language": "javascript",
            "script": "try {\n  const response = await $.axios({\n    method: \"delete\",\n    url: `https://gmail.googleapis.com/gmail/v1/users/me/drafts/${input.data.draft_id}`,\n    headers: {\n      \"Authorization\": `Bearer ${service.token}`,\n      \"Content-Type\": \"application/json\"\n    }\n  })\n\n  return {\n    \"result\": result(response)\n  }\n} catch (error) {\n  throw error\n}\n\nfunction result (response) {\n  if (response.body == '') {\n    return \"success\"\n  } else {\n    return response.body\n  }\n}"
        }
    },
    "insertedAt": "2024-10-30T08:35:40",
    "updatedAt": "2024-10-30T08:35:40",
    "createdBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "statusTimestamp": null,
    "updatedBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "componentId": "10a106eb-c3ce-4f67-8dfb-223e26a8dddd",
    "connectorId": "051466ff-fb74-4128-96cf-cf1bad07fe6e"
}, {
    "active": "Y",
    "id": "e7607e7a-5763-419d-befe-596c2f2b57b1",
    "label": {
        "en": "create a draft email reply",
        "ko": "회신 이메일 초안 작성하기"
    },
    "name": "email.draft.create.reply",
    "status": null,
    "tag": null,
    "schema": {
        "output": {
            "title": "gmailDraft",
            "x-dataType": "GmailDraft",
            "x-dataTypeId": "97dc77b0-8e0c-49eb-a476-7eacc4ef3b35",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Gmail draft",
                "ko": "Gmail draft"
            }
        },
        "variables": [{
            "title": "message_id",
            "x-dataType": "GmailMessageId",
            "x-dataTypeId": "a7a2b4cb-f2f6-44c5-9eb8-540a33eaf71d",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Source email ID to reply",
                "ko": "Source email ID to reply"
            },
            "x-required": true
        }, {
            "items": {
                "type": "string"
            },
            "title": "cc",
            "type": "array",
            "x-label": {
                "en": "Cc",
                "ko": "Cc"
            }
        }, {
            "items": {
                "type": "string"
            },
            "title": "bcc",
            "type": "array",
            "x-label": {
                "en": "Bcc",
                "ko": "Bcc"
            }
        }, {
            "title": "from",
            "x-dataType": "GmailSendAs",
            "x-dataTypeId": "6d6a9f35-e0b1-477a-a27e-6cbfb0fdf211",
            "x-dataTypeVersion": "1.0.0",
            "x-default-input-type": "chooser",
            "x-label": {
                "en": "From",
                "ko": "From"
            }
        }, {
            "title": "fromName",
            "type": "string",
            "x-label": {
                "en": "From Name",
                "ko": "From Name"
            }
        }, {
            "title": "body",
            "type": "string",
            "x-label": {
                "en": "Email Content",
                "ko": "Email Content"
            },
            "x-required": true
        }, {
            "enum": ["plain", "html"],
            "title": "bodyType",
            "type": "string",
            "x-label": {
                "en": "Email Content Type",
                "ko": "Email Content Type"
            }
        }, {
            "title": "signature",
            "x-dataType": "GmailSignature",
            "x-dataTypeId": "cb8c9f42-21fa-4107-b719-8c08bc9e2c75",
            "x-dataTypeVersion": "1.0.0",
            "x-default-input-type": "chooser",
            "x-label": {
                "en": "Email Signature",
                "ko": "Email Signature"
            }
        }]
    },
    "published": true,
    "logic": {
        "execute": {
            "@type": "script",
            "id": "308b9677-8236-426c-b2c9-3ed1bc5ca59d",
            "input": {
                "@type": "reference",
                "operation": "source",
                "path": []
            },
            "language": "javascript",
            "script": "try {\n  const origin_email_info = await service.fn.get_email_info({ \"id\": input.data.message_id, \"service_token\": service.token }, $)\n  const reply_thread_id = origin_email_info.threadId\n  const reply_message_data = await service.fn.get_payload_info(origin_email_info.payload)\n\n  const message_data = {\n    \"to\": [reply_message_data.from],\n    \"cc\": input.data.cc || [],\n    \"bcc\": input.data.bcc || [],\n    \"from\": input.data.from_name ? await service.fn.string_to_qp({ \"string\": `${input.data.from_name} <${input.data.from}>` }) : input.data.from || \"\",\n    \"subject\": \"Re: \" + await service.fn.string_to_qp({ \"string\": reply_message_data.subject }),\n    \"body\": input.data.body || \"\",\n    \"bodyType\": (input.data.signature || input.data.bodyType === \"html\") ? \"html\" : \"plain\",\n    \"signature\": input.data.signature || \"\"\n  }\n\n  const response = await $.axios({\n    method: \"post\",\n    url: `https://www.googleapis.com/gmail/v1/users/me/drafts`,\n    headers: {\n      \"Authorization\": `Bearer ${service.token}`,\n      \"Content-Type\": \"application/json\"\n    },\n    data: {\n      \"message\": {\n        \"raw\": await service.fn.create_raw_message(message_data),\n        \"threadId\": reply_thread_id\n      }\n    }\n  })\n  \n  const draft_email_info = await service.fn.get_draft_email_info({ \"id\": response.data.id, \"service_token\": service.token }, $)\n  draft_email_info.message[\"message_info\"] = await service.fn.get_payload_info(draft_email_info.message.payload)\n\n  return draft_email_info\n} catch (error) {\n  throw error\n}"
        }
    },
    "insertedAt": "2024-10-30T08:35:40",
    "updatedAt": "2024-10-30T08:35:40",
    "createdBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "statusTimestamp": null,
    "updatedBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "componentId": "e7607e7a-5763-419d-befe-596c2f2b57b1",
    "connectorId": "051466ff-fb74-4128-96cf-cf1bad07fe6e"
}, {
    "active": "Y",
    "id": "b7edb352-0e19-49e2-9fb9-294e29e23b7a",
    "label": {
        "en": "send an email",
        "ko": "이메일 보내기"
    },
    "name": "email.send",
    "status": null,
    "tag": null,
    "schema": {
        "output": {
            "title": "gmailMessage",
            "x-dataType": "GmailMessage",
            "x-dataTypeId": "0de204f7-5473-4fbf-a63f-94b3cd43a4aa",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Gmail message",
                "ko": "Gmail message"
            }
        },
        "variables": [{
            "items": {
                "type": "string"
            },
            "title": "to",
            "type": "array",
            "x-label": {
                "en": "To",
                "ko": "To"
            },
            "x-required": true
        }, {
            "items": {
                "type": "string"
            },
            "title": "cc",
            "type": "array",
            "x-label": {
                "en": "Cc",
                "ko": "Cc"
            }
        }, {
            "items": {
                "type": "string"
            },
            "title": "bcc",
            "type": "array",
            "x-label": {
                "en": "Bcc",
                "ko": "Bcc"
            }
        }, {
            "title": "from",
            "x-dataType": "GmailSendAs",
            "x-dataTypeId": "6d6a9f35-e0b1-477a-a27e-6cbfb0fdf211",
            "x-dataTypeVersion": "1.0.0",
            "x-default-input-type": "chooser",
            "x-label": {
                "en": "From",
                "ko": "From"
            }
        }, {
            "title": "fromName",
            "type": "string",
            "x-label": {
                "en": "From Name",
                "ko": "From Name"
            }
        }, {
            "title": "subject",
            "type": "string",
            "x-label": {
                "en": "Email Subject",
                "ko": "Email Subject"
            },
            "x-required": true
        }, {
            "title": "body",
            "type": "string",
            "x-label": {
                "en": "Email Content",
                "ko": "Email Content"
            },
            "x-required": true
        }, {
            "enum": ["plain", "html"],
            "title": "bodyType",
            "type": "string",
            "x-label": {
                "en": "Email Content Type",
                "ko": "Email Content Type"
            }
        }, {
            "title": "signature",
            "x-dataType": "GmailSignature",
            "x-dataTypeId": "cb8c9f42-21fa-4107-b719-8c08bc9e2c75",
            "x-dataTypeVersion": "1.0.0",
            "x-default-input-type": "chooser",
            "x-label": {
                "en": "Email Signature",
                "ko": "Email Signature"
            }
        }, {
            "items": {
                "x-dataType": "GmailLabel",
                "x-dataTypeId": "05c75ebb-affe-49d8-acd6-b9c05a864dfc",
                "x-dataTypeVersion": "1.0.0",
                "x-label": {
                    "en": "Label",
                    "ko": "Label"
                }
            },
            "title": "labelIds",
            "type": "array",
            "x-default-input-type": "custom",
            "x-label": {
                "en": "Email Labels",
                "ko": "Email Labels"
            }
        }]
    },
    "published": true,
    "logic": {
        "execute": {
            "@type": "script",
            "id": "66a271e0-596c-43c7-95e3-15c95df482d6",
            "input": {
                "@type": "reference",
                "operation": "source",
                "path": []
            },
            "language": "javascript",
            "script": "try {\n  const message_data = {\n    \"to\": input.data.to,\n    \"cc\": input.data.cc || [],\n    \"bcc\": input.data.bcc || [],\n    \"from\": input.data.from_name ? await service.fn.string_to_qp({ \"string\": `${input.data.from_name} <${input.data.from}>` }) : input.data.from || \"\",\n    \"subject\": await service.fn.string_to_qp({ \"string\": input.data.subject }),\n    \"body\": input.data.body,\n    \"bodyType\": (input.data.signature || input.data.bodyType === \"html\") ? \"html\" : \"plain\",\n    \"signature\": input.data.signature || \"\"\n  }\n  \n  const response = await $.axios({\n    method: \"post\",\n    url: `https://www.googleapis.com/gmail/v1/users/me/messages/send`,\n    headers: {\n      \"Authorization\": `Bearer ${service.token}`,\n      \"Content-Type\": \"application/json\"\n    },\n    data: {\n      \"raw\": await service.fn.create_raw_message(message_data),\n      \"labelIds\": input.data.labelIds || []\n    }\n  })\n  \n  const email_info = await service.fn.get_email_info({ \"id\": response.data.id, \"service_token\": service.token }, $)\n  email_info[\"message_info\"] = await service.fn.get_payload_info(email_info.payload)\n\n  return email_info\n} catch (error) {\n  throw error\n}"
        }
    },
    "insertedAt": "2024-10-30T08:35:40",
    "updatedAt": "2024-10-30T08:35:40",
    "createdBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "statusTimestamp": null,
    "updatedBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "componentId": "b7edb352-0e19-49e2-9fb9-294e29e23b7a",
    "connectorId": "051466ff-fb74-4128-96cf-cf1bad07fe6e"
}, {
    "active": "Y",
    "id": "6305a2df-1e13-4d28-aed3-dddfe9f1aeca",
    "label": {
        "en": "reply an email",
        "ko": "회신 이메일 보내기"
    },
    "name": "email.reply",
    "status": null,
    "tag": null,
    "schema": {
        "output": {
            "title": "gmailMessage",
            "x-dataType": "GmailMessage",
            "x-dataTypeId": "0de204f7-5473-4fbf-a63f-94b3cd43a4aa",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Gmail message",
                "ko": "Gmail message"
            }
        },
        "variables": [{
            "title": "message_id",
            "x-dataType": "GmailMessageId",
            "x-dataTypeId": "a7a2b4cb-f2f6-44c5-9eb8-540a33eaf71d",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Source email ID to reply",
                "ko": "Source email ID to reply"
            },
            "x-required": true
        }, {
            "items": {
                "type": "string"
            },
            "title": "cc",
            "type": "array",
            "x-label": {
                "en": "Cc",
                "ko": "Cc"
            }
        }, {
            "items": {
                "type": "string"
            },
            "title": "bcc",
            "type": "array",
            "x-label": {
                "en": "Bcc",
                "ko": "Bcc"
            }
        }, {
            "title": "from",
            "x-dataType": "GmailSendAs",
            "x-dataTypeId": "6d6a9f35-e0b1-477a-a27e-6cbfb0fdf211",
            "x-dataTypeVersion": "1.0.0",
            "x-default-input-type": "chooser",
            "x-label": {
                "en": "From",
                "ko": "From"
            }
        }, {
            "title": "fromName",
            "type": "string",
            "x-label": {
                "en": "From Name",
                "ko": "From Name"
            }
        }, {
            "title": "body",
            "type": "string",
            "x-label": {
                "en": "Email Content",
                "ko": "Email Content"
            },
            "x-required": true
        }, {
            "enum": ["plain", "html"],
            "title": "bodyType",
            "type": "string",
            "x-label": {
                "en": "Email Content Type",
                "ko": "Email Content Type"
            }
        }, {
            "title": "signature",
            "x-dataType": "GmailSignature",
            "x-dataTypeId": "cb8c9f42-21fa-4107-b719-8c08bc9e2c75",
            "x-dataTypeVersion": "1.0.0",
            "x-default-input-type": "chooser",
            "x-label": {
                "en": "Email Signature",
                "ko": "Email Signature"
            }
        }, {
            "items": {
                "x-dataType": "GmailLabel",
                "x-dataTypeId": "05c75ebb-affe-49d8-acd6-b9c05a864dfc",
                "x-dataTypeVersion": "1.0.0",
                "x-label": {
                    "en": "Label",
                    "ko": "Label"
                }
            },
            "title": "labelIds",
            "type": "array",
            "x-default-input-type": "custom",
            "x-label": {
                "en": "Email Labels",
                "ko": "Email Labels"
            }
        }]
    },
    "published": true,
    "logic": {
        "execute": {
            "@type": "script",
            "id": "e114eee1-2b0d-4d80-8f32-40bb59946cdf",
            "input": {
                "@type": "reference",
                "operation": "source",
                "path": []
            },
            "language": "javascript",
            "script": "try {\n  const origin_email_info = await service.fn.get_email_info({ \"id\": input.data.message_id, \"service_token\": service.token }, $)\n  const reply_thread_id = origin_email_info.threadId\n  const reply_message_data = await service.fn.get_payload_info(origin_email_info.payload)\n\n  const message_data = {\n    \"to\": [reply_message_data.from],\n    \"cc\": input.data.cc || [],\n    \"bcc\": input.data.bcc || [],\n    \"from\": input.data.from_name ? await service.fn.string_to_qp({ \"string\": `${input.data.from_name} <${input.data.from}>` }) : input.data.from || \"\",\n    \"subject\": \"Re: \" + await service.fn.string_to_qp({ \"string\": reply_message_data.subject }),\n    \"body\": input.data.body || \"\",\n    \"bodyType\": (input.data.signature || input.data.bodyType === \"html\") ? \"html\" : \"plain\",\n    \"signature\": input.data.signature || \"\"\n  }\n\n  const response = await $.axios({\n    method: \"post\",\n    url: `https://www.googleapis.com/gmail/v1/users/me/messages/send`,\n    headers: {\n      \"Authorization\": `Bearer ${service.token}`,\n      \"Content-Type\": \"application/json\"\n    },\n    data: {\n      \"raw\": await service.fn.create_raw_message(message_data),\n      \"labelIds\": input.data.labelIds || [],\n      \"threadId\": reply_thread_id\n    }\n  })\n  \n  const email_info = await service.fn.get_email_info({ \"id\": response.data.id, \"service_token\": service.token }, $)\n  email_info[\"message_info\"] = await service.fn.get_payload_info(email_info.payload)\n\n  return email_info\n} catch (error) {\n  throw error\n}"
        }
    },
    "insertedAt": "2024-10-30T08:35:40",
    "updatedAt": "2024-10-30T08:35:40",
    "createdBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "statusTimestamp": null,
    "updatedBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "componentId": "6305a2df-1e13-4d28-aed3-dddfe9f1aeca",
    "connectorId": "051466ff-fb74-4128-96cf-cf1bad07fe6e"
}, {
    "active": "Y",
    "id": "69529dc3-46ec-4b99-830a-aa1c8e385fc5",
    "label": {
        "en": "get information on an email draft",
        "ko": "이메일 초안 정보 가져오기"
    },
    "name": "email.draft.get",
    "status": null,
    "tag": null,
    "schema": {
        "output": {
            "title": "gmailDraft",
            "x-dataType": "GmailDraft",
            "x-dataTypeId": "97dc77b0-8e0c-49eb-a476-7eacc4ef3b35",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Gmail draft",
                "ko": "Gmail draft"
            }
        },
        "variables": [{
            "title": "draft_id",
            "type": "string",
            "x-label": {
                "en": "Gmail draft ID",
                "ko": "Gmail draft ID"
            },
            "x-required": true
        }]
    },
    "published": true,
    "logic": {
        "execute": {
            "@type": "script",
            "id": "8d88d3a3-fdce-485a-a541-9c6372580e8e",
            "input": {
                "@type": "reference",
                "operation": "source",
                "path": []
            },
            "language": "javascript",
            "script": "try {\n  const draft_email_info = await service.fn.get_draft_email_info({ \"id\": input.data.draft_id, \"service_token\": service.token }, $)\n  draft_email_info.message[\"message_info\"] = await service.fn.get_payload_info(draft_email_info.message.payload)\n\n  return draft_email_info\n} catch (error) {\n  throw error\n}"
        }
    },
    "insertedAt": "2024-10-30T08:35:40",
    "updatedAt": "2024-10-30T08:35:40",
    "createdBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "statusTimestamp": null,
    "updatedBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "componentId": "69529dc3-46ec-4b99-830a-aa1c8e385fc5",
    "connectorId": "051466ff-fb74-4128-96cf-cf1bad07fe6e"
}, {
    "active": "Y",
    "id": "81786386-95db-449e-bec2-1f5d94fe5f2e",
    "label": {
        "en": "list email drafts",
        "ko": "이메일 초안 목록 가져오기"
    },
    "name": "email.draft.list",
    "status": null,
    "tag": null,
    "schema": {
        "output": {
            "items": {
                "properties": {
                    "id": {
                        "x-dataType": "GmailDraftId",
                        "x-dataTypeId": "b412bfcd-21a4-4b6c-a0d9-c13bc626fa86",
                        "x-dataTypeVersion": "1.0.0",
                        "x-label": {
                            "en": "Gmail draft ID",
                            "ko": "Gmail draft ID"
                        }
                    },
                    "message": {
                        "properties": {
                            "id": {
                                "x-dataType": "GmailMessageId",
                                "x-dataTypeId": "a7a2b4cb-f2f6-44c5-9eb8-540a33eaf71d",
                                "x-dataTypeVersion": "1.0.0",
                                "x-label": {
                                    "en": "Gmail message ID",
                                    "ko": "Gmail message ID"
                                }
                            },
                            "threadId": {
                                "type": "string",
                                "x-label": {
                                    "en": "Gmail message thread ID",
                                    "ko": "Gmail message thread ID"
                                }
                            }
                        },
                        "type": "object",
                        "x-label": {
                            "en": "Gmail Message",
                            "ko": "Gmail Message"
                        }
                    }
                },
                "type": "object",
                "x-label": {
                    "en": "Gmail draft",
                    "ko": "Gmail draft"
                }
            },
            "title": "gmailDraftList",
            "type": "array",
            "x-label": {
                "en": "Gmail draft list",
                "ko": "Gmail draft list"
            }
        },
        "variables": [{
            "title": "maxResults",
            "type": "number",
            "x-label": {
                "en": "Limit number",
                "ko": "Limit number"
            }
        }, {
            "title": "q",
            "type": "string",
            "x-label": {
                "en": "Search query",
                "ko": "Search query"
            }
        }]
    },
    "published": true,
    "logic": {
        "execute": {
            "@type": "script",
            "id": "dd9f5a8f-d8f5-4ba9-acb2-3eb45764ff1d",
            "input": {
                "@type": "reference",
                "operation": "source",
                "path": []
            },
            "language": "javascript",
            "script": "try {\n  const params = {}\n  if (!!input.data.maxResults) {\n    params.maxResults = input.data.maxResults\n  }\n  if (!!input.data.q) {\n    params.q = input.data.q\n  }\n  \n  const response = await $.axios({\n    method: \"get\",\n    url: `https://gmail.googleapis.com/gmail/v1/users/me/drafts`,\n    headers: {\n      \"Authorization\": `Bearer ${service.token}`,\n      \"Content-Type\": \"application/json\"\n    },\n    params: params\n  })\n  \n  return response.data.drafts\n} catch (error) {\n  throw error\n}"
        }
    },
    "insertedAt": "2024-10-30T08:35:40",
    "updatedAt": "2024-10-30T08:35:40",
    "createdBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "statusTimestamp": null,
    "updatedBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "componentId": "81786386-95db-449e-bec2-1f5d94fe5f2e",
    "connectorId": "051466ff-fb74-4128-96cf-cf1bad07fe6e"
}, {
    "active": "Y",
    "id": "fc9f4245-2d4e-4af7-8df3-9e66a8535dbb",
    "label": {
        "en": "label an email",
        "ko": "이메일 라벨 설정하기"
    },
    "name": "email.label",
    "status": null,
    "tag": null,
    "schema": {
        "output": {
            "title": "gmailMessage",
            "x-dataType": "GmailMessage",
            "x-dataTypeId": "0de204f7-5473-4fbf-a63f-94b3cd43a4aa",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Gmail message",
                "ko": "Gmail message"
            }
        },
        "variables": [{
            "title": "message_id",
            "x-dataType": "GmailMessageId",
            "x-dataTypeId": "a7a2b4cb-f2f6-44c5-9eb8-540a33eaf71d",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Gmail message ID to add label",
                "ko": "Gmail message ID to add label"
            },
            "x-required": true
        }, {
            "items": {
                "x-dataType": "GmailLabel",
                "x-dataTypeId": "05c75ebb-affe-49d8-acd6-b9c05a864dfc",
                "x-dataTypeVersion": "1.0.0",
                "x-label": {
                    "en": "Label",
                    "ko": "Label"
                }
            },
            "title": "labelIds",
            "type": "array",
            "x-default-input-type": "custom",
            "x-label": {
                "en": "Email Labels",
                "ko": "Email Labels"
            },
            "x-required": true
        }]
    },
    "published": true,
    "logic": {
        "execute": {
            "@type": "script",
            "id": "6ef90da8-9929-4a77-8039-cab4806ddd67",
            "input": {
                "@type": "reference",
                "operation": "source",
                "path": []
            },
            "language": "javascript",
            "script": "try {\n  const response = await $.axios({\n    method: \"post\",\n    url: `https://www.googleapis.com/gmail/v1/users/me/messages/${input.data.message_id}/modify`,\n    headers: {\n      \"Authorization\": `Bearer ${service.token}`,\n      \"Content-Type\": \"application/json\"\n    },\n    data: {\n      \"addLabelIds\": input.data.labelIds\n    }\n  })\n  \n  const email_info = await service.fn.get_email_info({ \"id\": response.data.id, \"service_token\": service.token }, $)\n  email_info[\"message_info\"] = await service.fn.get_payload_info(email_info.payload)\n\n  return email_info\n} catch (error) {\n  throw error\n}"
        }
    },
    "insertedAt": "2024-10-30T08:35:40",
    "updatedAt": "2024-10-30T08:35:40",
    "createdBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "statusTimestamp": null,
    "updatedBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "componentId": "fc9f4245-2d4e-4af7-8df3-9e66a8535dbb",
    "connectorId": "051466ff-fb74-4128-96cf-cf1bad07fe6e"
}, {
    "active": "Y",
    "id": "87380897-5012-43f5-b5f3-41f0edb0dc2d",
    "label": {
        "en": "create a draft email reply to everyone",
        "ko": "전체회신 이메일 초안 작성하기"
    },
    "name": "email.draft.create.reply.all",
    "status": null,
    "tag": null,
    "schema": {
        "output": {
            "title": "gmailDraft",
            "x-dataType": "GmailDraft",
            "x-dataTypeId": "97dc77b0-8e0c-49eb-a476-7eacc4ef3b35",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Gmail draft",
                "ko": "Gmail draft"
            }
        },
        "variables": [{
            "title": "message_id",
            "x-dataType": "GmailMessageId",
            "x-dataTypeId": "a7a2b4cb-f2f6-44c5-9eb8-540a33eaf71d",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Source email ID to reply",
                "ko": "Source email ID to reply"
            },
            "x-required": true
        }, {
            "items": {
                "type": "string"
            },
            "title": "cc",
            "type": "array",
            "x-label": {
                "en": "Cc",
                "ko": "Cc"
            }
        }, {
            "items": {
                "type": "string"
            },
            "title": "bcc",
            "type": "array",
            "x-label": {
                "en": "Bcc",
                "ko": "Bcc"
            }
        }, {
            "title": "from",
            "x-dataType": "GmailSendAs",
            "x-dataTypeId": "6d6a9f35-e0b1-477a-a27e-6cbfb0fdf211",
            "x-dataTypeVersion": "1.0.0",
            "x-default-input-type": "chooser",
            "x-label": {
                "en": "From",
                "ko": "From"
            }
        }, {
            "title": "fromName",
            "type": "string",
            "x-label": {
                "en": "From Name",
                "ko": "From Name"
            }
        }, {
            "title": "body",
            "type": "string",
            "x-label": {
                "en": "Email Content",
                "ko": "Email Content"
            },
            "x-required": true
        }, {
            "enum": ["plain", "html"],
            "title": "bodyType",
            "type": "string",
            "x-label": {
                "en": "Email Content Type",
                "ko": "Email Content Type"
            }
        }, {
            "title": "signature",
            "x-dataType": "GmailSignature",
            "x-dataTypeId": "cb8c9f42-21fa-4107-b719-8c08bc9e2c75",
            "x-dataTypeVersion": "1.0.0",
            "x-default-input-type": "chooser",
            "x-label": {
                "en": "Email Signature",
                "ko": "Email Signature"
            }
        }]
    },
    "published": true,
    "logic": {
        "execute": {
            "@type": "script",
            "id": "15f7f315-a8b5-45c8-a50c-389238f81855",
            "input": {
                "@type": "reference",
                "operation": "source",
                "path": []
            },
            "language": "javascript",
            "script": "try {\n  const origin_email_info = await service.fn.get_email_info({ \"id\": input.data.message_id, \"service_token\": service.token }, $)\n  const reply_thread_id = origin_email_info.threadId\n  const reply_message_data = await service.fn.get_payload_info(origin_email_info.payload)\n\n  const message_data = {\n    \"to\": reply_message_data.to.concat([reply_message_data.from]),\n    \"cc\": input.data.cc ? input.data.cc.concat(reply_message_data.cc) : reply_message_data.cc || [],\n    \"bcc\": input.data.bcc || [],\n    \"from\": input.data.from_name ? await service.fn.string_to_qp({ \"string\": `${input.data.from_name} <${input.data.from}>` }) : input.data.from || \"\",\n    \"subject\": \"Re: \" + await service.fn.string_to_qp({ \"string\": reply_message_data.subject }),\n    \"body\": input.data.body || \"\",\n    \"bodyType\": (input.data.signature || input.data.bodyType === \"html\") ? \"html\" : \"plain\",\n    \"signature\": input.data.signature || \"\"\n  }\n\n  const response = await $.axios({\n    method: \"post\",\n    url: `https://www.googleapis.com/gmail/v1/users/me/drafts`,\n    headers: {\n      \"Authorization\": `Bearer ${service.token}`,\n      \"Content-Type\": \"application/json\"\n    },\n    data: {\n      \"message\": {\n        \"raw\": await service.fn.create_raw_message(message_data),\n        \"threadId\": reply_thread_id\n      }\n    }\n  })\n  \n  const draft_email_info = await service.fn.get_draft_email_info({ \"id\": response.data.id, \"service_token\": service.token }, $)\n  draft_email_info.message[\"message_info\"] = await service.fn.get_payload_info(draft_email_info.message.payload)\n\n  return draft_email_info\n} catch (error) {\n  throw error\n}"
        }
    },
    "insertedAt": "2024-10-30T08:35:40",
    "updatedAt": "2024-10-30T08:35:40",
    "createdBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "statusTimestamp": null,
    "updatedBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "componentId": "87380897-5012-43f5-b5f3-41f0edb0dc2d",
    "connectorId": "051466ff-fb74-4128-96cf-cf1bad07fe6e"
}, {
    "active": "Y",
    "id": "046a10b5-cd1d-456e-90c4-d8b5021f98b6",
    "label": {
        "en": "trash an email",
        "ko": "이메일 삭제하기"
    },
    "name": "email.trash",
    "status": null,
    "tag": null,
    "schema": {
        "output": {
            "title": "result",
            "type": "string",
            "x-label": {
                "en": "Trash result",
                "ko": "Trash result"
            }
        },
        "variables": [{
            "title": "message_id",
            "x-dataType": "GmailMessageId",
            "x-dataTypeId": "a7a2b4cb-f2f6-44c5-9eb8-540a33eaf71d",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Gmail message ID to trash",
                "ko": "Gmail message ID to trash"
            },
            "x-required": true
        }]
    },
    "published": true,
    "logic": {
        "execute": {
            "@type": "script",
            "id": "73b51658-cb49-454e-8ab1-5cb11488316a",
            "input": {
                "@type": "reference",
                "operation": "source",
                "path": []
            },
            "language": "javascript",
            "script": "try {\n  const response = await $.axios({\n    method: \"post\",\n    url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${input.data.message_id}/trash`,\n    headers: {\n      \"Authorization\": `Bearer ${service.token}`,\n      \"Content-Type\": \"application/json\"\n    }\n  })\n\n  return {\n    \"result\": result(response)\n  }\n} catch (error) {\n  throw error\n}\n\nfunction result (response) {\n  if (response.body == '') {\n    return \"success\"\n  } else {\n    return response.body\n  }\n}"
        }
    },
    "insertedAt": "2024-10-30T08:35:40",
    "updatedAt": "2024-10-30T08:35:40",
    "createdBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "statusTimestamp": null,
    "updatedBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "componentId": "046a10b5-cd1d-456e-90c4-d8b5021f98b6",
    "connectorId": "051466ff-fb74-4128-96cf-cf1bad07fe6e"
}, {
    "active": "Y",
    "id": "b58f2f58-94e7-49e0-b71b-fe62d00a2b1d",
    "label": {
        "en": "delete an email",
        "ko": "이메일 영구 삭제하기"
    },
    "name": "email.delete",
    "status": null,
    "tag": null,
    "schema": {
        "output": {
            "title": "result",
            "type": "string",
            "x-label": {
                "en": "Delete result",
                "ko": "Delete result"
            }
        },
        "variables": [{
            "title": "message_id",
            "x-dataType": "GmailMessageId",
            "x-dataTypeId": "a7a2b4cb-f2f6-44c5-9eb8-540a33eaf71d",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Gmail message ID to delete",
                "ko": "Gmail message ID to delete"
            },
            "x-required": true
        }]
    },
    "published": true,
    "logic": {
        "execute": {
            "@type": "script",
            "id": "5ccd1ee9-3e8d-4354-a4ca-d7dc6fd00bb4",
            "input": {
                "@type": "reference",
                "operation": "source",
                "path": []
            },
            "language": "javascript",
            "script": "try {\n  const response = await $.axios({\n    method: \"delete\",\n    url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${input.data.message_id}`,\n    headers: {\n      \"Authorization\": `Bearer ${service.token}`,\n      \"Content-Type\": \"application/json\"\n    }\n  })\n\n  return {\n    \"result\": result(response)\n  }\n} catch (error) {\n  throw error\n}\n\nfunction result (response) {\n  if (response.body == '') {\n    return \"success\"\n  } else {\n    return response.body\n  }\n}"
        }
    },
    "insertedAt": "2024-10-30T08:35:40",
    "updatedAt": "2024-10-30T08:35:40",
    "createdBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "statusTimestamp": null,
    "updatedBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "componentId": "b58f2f58-94e7-49e0-b71b-fe62d00a2b1d",
    "connectorId": "051466ff-fb74-4128-96cf-cf1bad07fe6e"
}, {
    "active": "Y",
    "id": "0f89b73d-d2b2-4dec-ae6a-2b600450ff8b",
    "label": {
        "en": "reply an email to everyone",
        "ko": "전체회신 이메일 보내기"
    },
    "name": "email.reply.all",
    "status": null,
    "tag": null,
    "schema": {
        "output": {
            "title": "gmailMessage",
            "x-dataType": "GmailMessage",
            "x-dataTypeId": "0de204f7-5473-4fbf-a63f-94b3cd43a4aa",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Gmail message",
                "ko": "Gmail message"
            }
        },
        "variables": [{
            "title": "message_id",
            "x-dataType": "GmailMessageId",
            "x-dataTypeId": "a7a2b4cb-f2f6-44c5-9eb8-540a33eaf71d",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Source email ID to reply",
                "ko": "Source email ID to reply"
            },
            "x-required": true
        }, {
            "items": {
                "type": "string"
            },
            "title": "cc",
            "type": "array",
            "x-label": {
                "en": "Cc",
                "ko": "Cc"
            }
        }, {
            "items": {
                "type": "string"
            },
            "title": "bcc",
            "type": "array",
            "x-label": {
                "en": "Bcc",
                "ko": "Bcc"
            }
        }, {
            "title": "from",
            "x-dataType": "GmailSendAs",
            "x-dataTypeId": "6d6a9f35-e0b1-477a-a27e-6cbfb0fdf211",
            "x-dataTypeVersion": "1.0.0",
            "x-default-input-type": "chooser",
            "x-label": {
                "en": "From",
                "ko": "From"
            }
        }, {
            "title": "fromName",
            "type": "string",
            "x-label": {
                "en": "From Name",
                "ko": "From Name"
            }
        }, {
            "title": "body",
            "type": "string",
            "x-label": {
                "en": "Email Content",
                "ko": "Email Content"
            },
            "x-required": true
        }, {
            "enum": ["plain", "html"],
            "title": "bodyType",
            "type": "string",
            "x-label": {
                "en": "Email Content Type",
                "ko": "Email Content Type"
            }
        }, {
            "title": "signature",
            "x-dataType": "GmailSignature",
            "x-dataTypeId": "cb8c9f42-21fa-4107-b719-8c08bc9e2c75",
            "x-dataTypeVersion": "1.0.0",
            "x-default-input-type": "chooser",
            "x-label": {
                "en": "Email Signature",
                "ko": "Email Signature"
            }
        }, {
            "items": {
                "x-dataType": "GmailLabel",
                "x-dataTypeId": "05c75ebb-affe-49d8-acd6-b9c05a864dfc",
                "x-dataTypeVersion": "1.0.0",
                "x-label": {
                    "en": "Label",
                    "ko": "Label"
                }
            },
            "title": "labelIds",
            "type": "array",
            "x-default-input-type": "custom",
            "x-label": {
                "en": "Email Labels",
                "ko": "Email Labels"
            }
        }]
    },
    "published": true,
    "logic": {
        "execute": {
            "@type": "script",
            "id": "4a69d741-a59b-4818-ad20-c971e00cd515",
            "input": {
                "@type": "reference",
                "operation": "source",
                "path": []
            },
            "language": "javascript",
            "script": "try {\n  const origin_email_info = await service.fn.get_email_info({ \"id\": input.data.message_id, \"service_token\": service.token }, $)\n  const reply_thread_id = origin_email_info.threadId\n  const reply_message_data = await service.fn.get_payload_info(origin_email_info.payload)\n\n  const message_data = {\n    \"to\": reply_message_data.to.concat([reply_message_data.from]),\n    \"cc\": input.data.cc ? input.data.cc.concat(reply_message_data.cc) : reply_message_data.cc || [],\n    \"bcc\": input.data.bcc || [],\n    \"from\": input.data.from_name ? await service.fn.string_to_qp({ \"string\": `${input.data.from_name} <${input.data.from}>` }) : input.data.from || \"\",\n    \"subject\": \"Re: \" + await service.fn.string_to_qp({ \"string\": reply_message_data.subject }),\n    \"body\": input.data.body || \"\",\n    \"bodyType\": (input.data.signature || input.data.bodyType === \"html\") ? \"html\" : \"plain\",\n    \"signature\": input.data.signature || \"\"\n  }\n\n  const response = await $.axios({\n    method: \"post\",\n    url: `https://www.googleapis.com/gmail/v1/users/me/messages/send`,\n    headers: {\n      \"Authorization\": `Bearer ${service.token}`,\n      \"Content-Type\": \"application/json\"\n    },\n    data: {\n      \"raw\": await service.fn.create_raw_message(message_data),\n      \"labelIds\": input.data.labelIds || [],\n      \"threadId\": reply_thread_id\n    }\n  })\n  \n  const email_info = await service.fn.get_email_info({ \"id\": response.data.id, \"service_token\": service.token }, $)\n  email_info[\"message_info\"] = await service.fn.get_payload_info(email_info.payload)\n\n  return email_info\n} catch (error) {\n  throw error\n}"
        }
    },
    "insertedAt": "2024-10-30T08:35:40",
    "updatedAt": "2024-10-30T08:35:40",
    "createdBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "statusTimestamp": null,
    "updatedBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "componentId": "0f89b73d-d2b2-4dec-ae6a-2b600450ff8b",
    "connectorId": "051466ff-fb74-4128-96cf-cf1bad07fe6e"
}, {
    "active": "Y",
    "id": "824e394b-cd01-40dc-8ed6-a2f64bfc4a74",
    "label": {
        "en": "get information on an email attachment",
        "ko": "이메일 첨부파일 정보 가져오기"
    },
    "name": "email.attachment.get",
    "status": null,
    "tag": null,
    "schema": {
        "output": {
            "title": "gmailAttachment",
            "x-dataType": "GmailAttachment",
            "x-dataTypeId": "fb70addf-8ab9-45fd-b405-06fe635cc9ce",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Gmail attachment",
                "ko": "Gmail attachment"
            }
        },
        "variables": [{
            "title": "message_id",
            "type": "string",
            "x-label": {
                "en": "Gmail message ID",
                "ko": "Gmail message ID"
            },
            "x-required": true
        }, {
            "title": "attachment_id",
            "type": "string",
            "x-label": {
                "en": "Gmail attachment ID",
                "ko": "Gmail attachment ID"
            },
            "x-required": true
        }]
    },
    "published": true,
    "logic": {
        "execute": {
            "@type": "script",
            "id": "0b3ecf18-c609-4341-95f9-6bd784be870a",
            "input": {
                "@type": "reference",
                "operation": "source",
                "path": []
            },
            "language": "javascript",
            "script": "try {\n  const response = await $.axios({\n    method: \"get\",\n    url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${input.data.message_id}/attachments/${input.data.attachment_id}`,\n    headers: {\n      \"Authorization\": `Bearer ${service.token}`,\n      \"Content-Type\": \"application/json\"\n    }\n  })\n\n  return response.data\n} catch (error) {\n  throw error\n}"
        }
    },
    "insertedAt": "2024-10-30T08:35:40",
    "updatedAt": "2024-10-30T08:35:40",
    "createdBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "statusTimestamp": null,
    "updatedBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "componentId": "824e394b-cd01-40dc-8ed6-a2f64bfc4a74",
    "connectorId": "051466ff-fb74-4128-96cf-cf1bad07fe6e"
}, {
    "active": "Y",
    "id": "ca948f22-b1fe-41a4-b978-0e0d9e92870d",
    "label": {
        "en": "forward an email",
        "ko": "이메일 전달하기"
    },
    "name": "email.forward",
    "status": null,
    "tag": null,
    "schema": {
        "output": {
            "title": "gmailMessage",
            "x-dataType": "GmailMessage",
            "x-dataTypeId": "0de204f7-5473-4fbf-a63f-94b3cd43a4aa",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Gmail message",
                "ko": "Gmail message"
            }
        },
        "variables": [{
            "title": "message_id",
            "x-dataType": "GmailMessageId",
            "x-dataTypeId": "a7a2b4cb-f2f6-44c5-9eb8-540a33eaf71d",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Source email ID to forward",
                "ko": "Source email ID to forward"
            },
            "x-required": true
        }, {
            "items": {
                "type": "string"
            },
            "title": "to",
            "type": "array",
            "x-label": {
                "en": "To",
                "ko": "To"
            },
            "x-required": true
        }, {
            "items": {
                "type": "string"
            },
            "title": "cc",
            "type": "array",
            "x-label": {
                "en": "Cc",
                "ko": "Cc"
            }
        }, {
            "items": {
                "type": "string"
            },
            "title": "bcc",
            "type": "array",
            "x-label": {
                "en": "Bcc",
                "ko": "Bcc"
            }
        }, {
            "title": "from",
            "x-dataType": "GmailSendAs",
            "x-dataTypeId": "6d6a9f35-e0b1-477a-a27e-6cbfb0fdf211",
            "x-dataTypeVersion": "1.0.0",
            "x-default-input-type": "chooser",
            "x-label": {
                "en": "From",
                "ko": "From"
            }
        }, {
            "title": "fromName",
            "type": "string",
            "x-label": {
                "en": "From Name",
                "ko": "From Name"
            }
        }, {
            "title": "body",
            "type": "string",
            "x-label": {
                "en": "Additional Email Content",
                "ko": "Additional Email Content"
            }
        }, {
            "enum": ["plain", "html"],
            "title": "bodyType",
            "type": "string",
            "x-label": {
                "en": "Email Content Type",
                "ko": "Email Content Type"
            }
        }, {
            "title": "signature",
            "x-dataType": "GmailSignature",
            "x-dataTypeId": "cb8c9f42-21fa-4107-b719-8c08bc9e2c75",
            "x-dataTypeVersion": "1.0.0",
            "x-default-input-type": "chooser",
            "x-label": {
                "en": "Email Signature",
                "ko": "Email Signature"
            }
        }, {
            "items": {
                "x-dataType": "GmailLabel",
                "x-dataTypeId": "05c75ebb-affe-49d8-acd6-b9c05a864dfc",
                "x-dataTypeVersion": "1.0.0",
                "x-label": {
                    "en": "Label",
                    "ko": "Label"
                }
            },
            "title": "labelIds",
            "type": "array",
            "x-default-input-type": "custom",
            "x-label": {
                "en": "Email Labels",
                "ko": "Email Labels"
            }
        }]
    },
    "published": true,
    "logic": {
        "execute": {
            "@type": "script",
            "id": "88351aa7-47cb-4e54-8aa0-e0f7d18e585e",
            "input": {
                "@type": "reference",
                "operation": "source",
                "path": []
            },
            "language": "javascript",
            "script": "try {\n  const origin_email_info = await service.fn.get_email_info({ \"id\": input.data.message_id, \"service_token\": service.token }, $)\n  const forward_thread_id = origin_email_info.threadId\n  const forward_message_data = await service.fn.get_payload_info(origin_email_info.payload)\n\n  const message_data = {\n    \"to\": input.data.to,\n    \"cc\": input.data.cc || [],\n    \"bcc\": input.data.bcc || [],\n    \"from\": input.data.from_name ? await service.fn.string_to_qp({ \"string\": `${input.data.from_name} <${input.data.from}>` }) : input.data.from || \"\",\n    \"subject\": \"Fwd: \" + await service.fn.string_to_qp({ \"string\": forward_message_data.subject }),\n    \"body\": input.data.body || \"\" + \"\\n\\n\" + get_forward_message(forward_message_data),\n    \"bodyType\": (input.data.signature || input.data.bodyType === \"html\") ? \"html\" : \"plain\",\n    \"signature\": input.data.signature || \"\"\n  }\n\n  const response = await $.axios({\n    method: \"post\",\n    url: `https://www.googleapis.com/gmail/v1/users/me/messages/send`,\n    headers: {\n      \"Authorization\": `Bearer ${service.token}`,\n      \"Content-Type\": \"application/json\"\n    },\n    data: {\n      \"raw\": await service.fn.create_raw_message(message_data),\n      \"labelIds\": input.data.labelIds || [],\n      \"threadId\": forward_thread_id\n    }\n  })\n  \n  const email_info = await service.fn.get_email_info({ \"id\": response.data.id, \"service_token\": service.token }, $)\n  email_info[\"message_info\"] = await service.fn.get_payload_info(email_info.payload)\n\n  return email_info\n} catch (error) {\n  throw error\n}\n\nfunction get_forward_message(forward_message_data) {\n  let forward_message = \"\"\n  forward_message += `---------- Forwarded message ---------\\n`\n  forward_message += `From: ${forward_message_data.from}\\n`\n  forward_message += `Date: ${forward_message_data.date}\\n`\n  forward_message += `Subject: ${forward_message_data.subject}\\n`\n  forward_message += `To: ${forward_message_data.to.join(\", \")}\\n`\n  if (forward_message_data.cc && forward_message_data.cc.length > 0) {\n    forward_message += `Cc: ${forward_message_data.cc.join(\", \")}\\n`\n  }\n\n  return forward_message + \"\\n\\n\" + forward_message_data.body || \"\"\n}"
        }
    },
    "insertedAt": "2024-10-30T08:35:40",
    "updatedAt": "2024-10-30T08:35:40",
    "createdBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "statusTimestamp": null,
    "updatedBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "componentId": "ca948f22-b1fe-41a4-b978-0e0d9e92870d",
    "connectorId": "051466ff-fb74-4128-96cf-cf1bad07fe6e"
}, {
    "active": "Y",
    "id": "bafb0c09-52ab-4ee5-863d-fd0a026843d4",
    "label": {
        "en": "create an email draft",
        "ko": "이메일 초안 작성하기"
    },
    "name": "email.draft.create",
    "status": null,
    "tag": null,
    "schema": {
        "output": {
            "title": "gmailDraft",
            "x-dataType": "GmailDraft",
            "x-dataTypeId": "97dc77b0-8e0c-49eb-a476-7eacc4ef3b35",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Gmail draft",
                "ko": "Gmail draft"
            }
        },
        "variables": [{
            "items": {
                "type": "string"
            },
            "title": "to",
            "type": "array",
            "x-label": {
                "en": "To",
                "ko": "To"
            },
            "x-required": true
        }, {
            "items": {
                "type": "string"
            },
            "title": "cc",
            "type": "array",
            "x-label": {
                "en": "Cc",
                "ko": "Cc"
            }
        }, {
            "items": {
                "type": "string"
            },
            "title": "bcc",
            "type": "array",
            "x-label": {
                "en": "Bcc",
                "ko": "Bcc"
            }
        }, {
            "title": "from",
            "x-dataType": "GmailSendAs",
            "x-dataTypeId": "6d6a9f35-e0b1-477a-a27e-6cbfb0fdf211",
            "x-dataTypeVersion": "1.0.0",
            "x-default-input-type": "chooser",
            "x-label": {
                "en": "From",
                "ko": "From"
            }
        }, {
            "title": "fromName",
            "type": "string",
            "x-label": {
                "en": "From Name",
                "ko": "From Name"
            }
        }, {
            "title": "subject",
            "type": "string",
            "x-label": {
                "en": "Email Subject",
                "ko": "Email Subject"
            },
            "x-required": true
        }, {
            "title": "body",
            "type": "string",
            "x-label": {
                "en": "Email Content",
                "ko": "Email Content"
            },
            "x-required": true
        }, {
            "enum": ["plain", "html"],
            "title": "bodyType",
            "type": "string",
            "x-label": {
                "en": "Email Content Type",
                "ko": "Email Content Type"
            }
        }, {
            "title": "signature",
            "x-dataType": "GmailSignature",
            "x-dataTypeId": "cb8c9f42-21fa-4107-b719-8c08bc9e2c75",
            "x-dataTypeVersion": "1.0.0",
            "x-default-input-type": "chooser",
            "x-label": {
                "en": "Email Signature",
                "ko": "Email Signature"
            }
        }]
    },
    "published": true,
    "logic": {
        "execute": {
            "@type": "script",
            "id": "16b8c511-9737-45a6-83e4-66848cafb38f",
            "input": {
                "@type": "reference",
                "operation": "source",
                "path": []
            },
            "language": "javascript",
            "script": "try {\n  const message_data = {\n    \"to\": input.data.to,\n    \"cc\": input.data.cc || [],\n    \"bcc\": input.data.bcc || [],\n    \"from\": input.data.from_name ? await service.fn.string_to_qp({ \"string\": `${input.data.from_name} <${input.data.from}>` }) : input.data.from || \"\",\n    \"subject\": await service.fn.string_to_qp({ \"string\": input.data.subject }),\n    \"body\": input.data.body,\n    \"bodyType\": (input.data.signature || input.data.bodyType === \"html\") ? \"html\" : \"plain\",\n    \"signature\": input.data.signature || \"\"\n  }\n  \n  const response = await $.axios({\n    method: \"post\",\n    url: `https://www.googleapis.com/gmail/v1/users/me/drafts`,\n    headers: {\n      \"Authorization\": `Bearer ${service.token}`,\n      \"Content-Type\": \"application/json\"\n    },\n    data: {\n      \"message\": {\n        \"raw\": await service.fn.create_raw_message(message_data)\n      }\n    }\n  })\n\n  const draft_email_info = await service.fn.get_draft_email_info({ \"id\": response.data.id, \"service_token\": service.token }, $)\n  draft_email_info.message[\"message_info\"] = await service.fn.get_payload_info(draft_email_info.message.payload)\n\n  return draft_email_info\n} catch (error) {\n  throw error\n}"
        }
    },
    "insertedAt": "2024-10-30T08:35:40",
    "updatedAt": "2024-10-30T08:35:40",
    "createdBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "statusTimestamp": null,
    "updatedBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "componentId": "bafb0c09-52ab-4ee5-863d-fd0a026843d4",
    "connectorId": "051466ff-fb74-4128-96cf-cf1bad07fe6e"
}, {
    "active": "Y",
    "id": "53dc8d25-ced1-4af4-9721-034a083099e3",
    "label": {
        "en": "get information on an email",
        "ko": "이메일 정보 가져오기"
    },
    "name": "email.get",
    "status": null,
    "tag": null,
    "schema": {
        "output": {
            "title": "gmailMessage",
            "x-dataType": "GmailMessage",
            "x-dataTypeId": "0de204f7-5473-4fbf-a63f-94b3cd43a4aa",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Gmail message",
                "ko": "Gmail message"
            }
        },
        "variables": [{
            "title": "message_id",
            "type": "string",
            "x-label": {
                "en": "Gmail message ID",
                "ko": "Gmail message ID"
            },
            "x-required": true
        }]
    },
    "published": true,
    "logic": {
        "execute": {
            "@type": "script",
            "id": "3683c1fd-aa38-4882-b2ec-821726c1351b",
            "input": {
                "@type": "reference",
                "operation": "source",
                "path": []
            },
            "language": "javascript",
            "script": "try {\n  const email_info = await service.fn.get_email_info({ \"id\": input.data.message_id, \"service_token\": service.token }, $)\n  email_info[\"message_info\"] = await service.fn.get_payload_info(email_info.payload)\n\n  return email_info\n} catch (error) {\n  throw error\n}"
        }
    },
    "insertedAt": "2024-10-30T08:35:40",
    "updatedAt": "2024-10-30T08:35:40",
    "createdBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "statusTimestamp": null,
    "updatedBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "componentId": "53dc8d25-ced1-4af4-9721-034a083099e3",
    "connectorId": "051466ff-fb74-4128-96cf-cf1bad07fe6e"
}, {
    "active": "Y",
    "id": "7f0c2658-bfdb-4128-9c4d-9832faf00454",
    "label": {
        "en": "send an email draft",
        "ko": "이메일 초안 전송하기"
    },
    "name": "email.draft.send",
    "status": null,
    "tag": null,
    "schema": {
        "output": {
            "title": "gmailMessage",
            "x-dataType": "GmailMessage",
            "x-dataTypeId": "0de204f7-5473-4fbf-a63f-94b3cd43a4aa",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Gmail message",
                "ko": "Gmail message"
            }
        },
        "variables": [{
            "title": "draft_id",
            "x-dataType": "GmailDraftId",
            "x-dataTypeId": "b412bfcd-21a4-4b6c-a0d9-c13bc626fa86",
            "x-dataTypeVersion": "1.0.0",
            "x-label": {
                "en": "Gmail draft ID to send",
                "ko": "Gmail draft ID to send"
            },
            "x-required": true
        }]
    },
    "published": true,
    "logic": {
        "execute": {
            "@type": "script",
            "id": "343c1811-22ad-4b16-b6ba-d1f45954a50d",
            "input": {
                "@type": "reference",
                "operation": "source",
                "path": []
            },
            "language": "javascript",
            "script": "try {\n  const response = await $.axios({\n    method: \"post\",\n    url: `https://gmail.googleapis.com/gmail/v1/users/me/drafts/send`,\n    headers: {\n      \"Authorization\": `Bearer ${service.token}`,\n      \"Content-Type\": \"application/json\"\n    },\n    data: {\n      \"id\": input.data.draft_id\n    }\n  })\n\n  const email_info = await service.fn.get_email_info({ \"id\": response.data.id, \"service_token\": service.token }, $)\n  email_info[\"message_info\"] = await service.fn.get_payload_info(email_info.payload)\n\n  return email_info\n} catch (error) {\n  throw error\n}"
        }
    },
    "insertedAt": "2024-10-30T08:35:40",
    "updatedAt": "2024-10-30T08:35:40",
    "createdBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "statusTimestamp": null,
    "updatedBy": "6b89e116-3554-4c4b-b6e6-1aff8094e836",
    "componentId": "7f0c2658-bfdb-4128-9c4d-9832faf00454",
    "connectorId": "051466ff-fb74-4128-96cf-cf1bad07fe6e"
}]