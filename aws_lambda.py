import json
import boto3
from botocore.exceptions import ClientError
from decimal import Decimal
from boto3.dynamodb.conditions import Key
import random

dynamodb = boto3.resource('dynamodb', region_name='us-east-2')
dynamodb_table = dynamodb.Table('test7')

answerList = [
    "Did you try minimizing your test cases?",
    "Have you tried narryowing down the responsible code?",
    "Hmmmm this sounds interesting. Have you tried regression testing?",
    "Ok. Have you tried using the bad state stratergy?",
    "Did you try identifying Relative Code and State?",
    "Have you tried to ask an expert?",
    "Have you tried using print statements?",
]

def lambda_handler(event, context):
    print('Request event: ', event)
    response = None
   
    try:
        http_method = event.get('httpMethod')
        path = event.get('path')

        if http_method == 'GET':
            response = build_response(200, random.choice(answerList))
            
        elif http_method == 'POST':
            response = save_conversation(json.loads(event['body']))
        
        else:
            response = build_response(404, '404 Not Found')

    except Exception as e:
        print('Error:', e)
        response = build_response(400, 'Error processing request')
   
    return response

def save_conversation(request_body):
    try:
        dynamodb_table.put_item(Item=request_body)
        body = {
            'Operation': 'SAVE',
            'Message': 'SUCCESS',
            'Item': request_body
        }
        return build_response(200, body)
    except ClientError as e:
        print('Error:', e)
        return build_response(400, e.response['Error']['Message'])

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            # Check if it's an int or a float
            if obj % 1 == 0:
                return int(obj)
            else:
                return float(obj)
        # Let the base class default method raise the TypeError
        return super(DecimalEncoder, self).default(obj)

def build_response(status_code, body):
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(body, cls=DecimalEncoder)
    }