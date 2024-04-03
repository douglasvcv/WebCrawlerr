import AWS from 'aws-sdk'

const lambda = new AWS.Lambda()
const events = new AWS.CloudWatchEvents()

const ruleParams = {
    Name: 'triggerLambda',
    ScheduleExpression: 'cron(0 0 * * ? *)'
}

const ruleResult = await events.putRule(ruleParams).promise()

const ruleArn = ruleResult.RuleArn

const lambdaParams = {
    FunctionName: 'getWeatherData',
    StatementId: ''
}