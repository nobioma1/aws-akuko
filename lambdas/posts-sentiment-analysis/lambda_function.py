import boto3

comprehend = boto3.client('comprehend')
dynamodb = boto3.resource('dynamodb')


def set_moderate(post_id):
    table = dynamodb.Table("Posts")
    table.update_item(
        Key={
            'PostId': post_id,
        },
        UpdateExpression="set Moderated=:bool",
        ExpressionAttributeValues={
            ':bool': True,
        },
        ReturnValues="UPDATED_NEW"
    )


def sentiment_level(text):
    return comprehend.detect_sentiment(
        Text=text, LanguageCode='en')['Sentiment']


def lambda_handler(event, context):
    for record in event['Records']:
        if record['eventName'] == 'INSERT':
            new_image = record['dynamodb']['NewImage']

            post = new_image['Post']['S']
            sentiment = sentiment_level(post)

            if sentiment != 'NEGATIVE':
                post_id = new_image['PostId']['S']
                set_moderate(post_id)

    return 'Successfully Processed'
