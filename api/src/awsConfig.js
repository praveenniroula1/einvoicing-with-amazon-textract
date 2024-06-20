import AWS from "aws-sdk";

console.log("Access Key ID:", process.env.ACCESSKEYID);
console.log("Secret Access Key:", process.env.SECRETACCESSKEYID);

AWS.config.update({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEYID,
  region: "ap-southeast-2",
});



const textract = new AWS.Textract();

export default textract;
