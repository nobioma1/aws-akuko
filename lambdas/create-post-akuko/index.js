const randomBytes = require('crypto').randomBytes;

const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  const postId = toUrlString(randomBytes(16));

  const post = event.post;

  createPost(postId, post)
    .then(() => {
      callback(null, {
        statusCode: 201,
        body: JSON.stringify({ postId, post }),
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
    })
    .catch((err) => {
      console.error(err);
      errorResponse(err.message, context.awsRequestId, callback);
    });
};

function createPost(postId, post) {
  const date = new Date();
  return ddb
    .put({
      TableName: 'Posts',
      Item: {
        PostId: postId,
        Post: post,
        Moderated: false,
        CreatedAt: date.toISOString(),
        ExpiresIn: new Date(date.getTime() + 60 * 60 * 24 * 1000).toISOString(),
      },
    })
    .promise();
}

function toUrlString(buffer) {
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

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
