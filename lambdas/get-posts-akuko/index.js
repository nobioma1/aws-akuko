const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  const params = {
    TableName: 'Posts',
    FilterExpression: '#m = :bool',
    ExpressionAttributeNames: {
      '#m': 'Moderated',
    },
    ExpressionAttributeValues: {
      ':bool': true,
    },
  };

  ddb.scan(params, (err, data) => {
    if (err) {
      errorResponse(err.message, context.awsRequestId, callback);
      return;
    }
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  });
};

function errorResponse(errorMessage, awsRequestId, callback) {
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}
