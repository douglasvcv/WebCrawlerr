import AWS from 'aws-sdk'

// Configurar as credenciais AWS
AWS.config.update({ region: 'us-east-1' }); // Defina a região conforme necessário

// Criar uma instância do serviço Lambda
const lambda = new AWS.Lambda();

// Nome da sua função Lambda
const functionName = 'getWeatherData';

// Parâmetros para obter a política da função Lambda
const params = {
  FunctionName: functionName
};

// Função para obter a política de permissão associada à função Lambda
lambda.getPolicy(params, (err, data) => {
  if (err) {
    console.error('Erro ao obter a política:', err);
  } else {
    // Parseando a política JSON para objeto
    const policy = JSON.parse(data.Policy);

    // Acessar diretamente o campo Sid de cada statement
    for (const statement of policy.Statement) {
      console.log('Sid:', statement.Sid);
      console.log('Action:', statement.Action);
      console.log('Resource:', statement.Resource);
    }
  }
});
