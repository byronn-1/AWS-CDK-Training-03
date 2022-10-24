import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigw from 'aws-cdk-lib/aws-apigateway';

import { HitCounter } from './hitcounter';

export class CdkWorkshopStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // defines Lambda resource
    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'hello.handler',
    });

    //defines an API Gateway REST API resouce backed by our "hello" function
    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: hello
    });
  }
}
