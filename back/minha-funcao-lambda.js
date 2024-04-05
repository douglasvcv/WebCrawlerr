const AWS = require('aws-sdk');

// Configuração do AWS SDK com suas credenciais
AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.ACCESSKEY,
    secretAccessKey: process.env.PRIVACYKEY
});

// Crie uma nova instância do serviço Lambda
const lambda = new AWS.Lambda();

// Função para invocar a função lambda
async function invokeLambda() {
    const params = {
        FunctionName: 'getWeatherData',
        Payload: JSON.stringify({ key: 'value' }) // Dados que você deseja passar para a função lambda
    };

    try {
        const data = await lambda.invoke(params).promise();
        console.log("Resposta da função Lambda:", data.Payload);
    } catch (err) {
        console.error(err, err.stack);
    }
}

// Chame a função para invocar a função Lambda
invokeLambda();
