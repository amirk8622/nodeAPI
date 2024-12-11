const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const route = require('./routes/erc20routes');

// const ABI = require('./contract/ABI.json');

app.use(bodyParser.json()); // Middleware to parse incoming JSON requests

// app.use('/api/contacts', route);

app.use('/api/token', route);

// app.post('/api/token/transfer', async (req, res) => {
//   const { recipient, amount } = req.body;
//   try {
//     // const decimals = await contract.methods.decimals().call();
//     // const tokenAmount = new web3.utils.BN(amount).mul(
//     //   new web3.utils.BN(10).pow(new web3.utils.BN(decimals))
//     // );

//     console.log(`Recipient Address: ${recipient}`);
//     console.log(`Transfer Amount: ${amount}`);
//     // const gasEstimate = await contract.methods
//     //   .transfer(recipient, amount)
//     //   .estimateGas({ from: senderAddress });

//     const block = await web3.eth.getBlock();

//     console.log(`Estimated Gas: ${block}`);

//     // Fetch current gas price
//     // const gasPrice = await web3.eth.getGasPrice(); //create a transaction
//     const tx = {
//       from: senderAddress,
//       to: contractAddress,
//       // maxFeePerGas: block.baseFeePerGas * 2n,
//       // maxPriorityFeePerGas: 100000,
//       data: contract.methods.transfer(recipient, amount).encodeABI(),
//     };

//     const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

//     // Send the signed transaction
//     const receipt = await web3.eth.sendSignedTransaction(
//       signedTx.rawTransaction
//     );

//     res.status(200).json({
//       message: 'Transfer successful',
//       transactionHash: receipt.transactionHash,
//     });
//   } catch (error) {
//     console.error('Error during token transfer:', error);
//     res
//       .status(500)
//       .json({ error: 'Token transfer failed', details: error.message });
//   }
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  console.log(`server is running on ${PORT}`);
});
