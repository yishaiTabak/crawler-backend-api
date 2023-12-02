const {SQSClient, SendMessageCommand} = require('@aws-sdk/client-sqs')

const sqs = new SQSClient({
    region:process.env.AWS_REGION
})

const addToSqs = async (searchData) =>{
    const QueueUrl = "https://sqs.eu-west-1.amazonaws.com/695289710241/SqrawlerQueue"
        
        try{
            const command = new SendMessageCommand({
                MessageBody:searchData,
                QueueUrl
            })
            const {MessageId} = await sqs.send(command)
            console.log(MessageId);
        }catch(err){
            console.log(err);
        }
    
}


module.exports = addToSqs