const awsServerlessExpress=require('aws-serverless-express')
const app=require('./src/index')

const server=awsServerlessExpress.createServer(app)

exports.handler=(event,context)=>{
  return awsServerlessExpress.proxy(server,event,context)
}

// exports.handler = async (event) => {
//   const response = {
//       statusCode: 200,
//       headers: {
//           "Access-Control-Allow-Headers" : "Content-Type",
//           "Access-Control-Allow-Origin": "https://www.example.com",
//           "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
//       },
//       body: JSON.stringify('Hello from Lambda!'),
//   };
//   return response;
// };