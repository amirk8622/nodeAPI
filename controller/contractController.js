const express = require('express');

const { Web3 } = require('web3');

const ABI = require('../contract/ABI.json');

const contractAddress = process.env.contractAddress;

const infuraUrl = process.env.INFURA_URL;

const web3 = new Web3(infuraUrl);

const senderAddress = process.env.senderAddress;

const privateKey = process.env.PRIVATE_KEY;

// const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl)); // Initialize Web3 with Infura provider

const contract = new web3.eth.Contract(ABI, contractAddress);

const getTotalSupply = async (req, res) => {
  const supply = await contract.methods.totalSupply().call();
  console.log(supply);
  if (supply) {
    res.status(200);
    res.json({ totalSupply: web3.utils.fromWei(supply, 'ether') });
  } else {
    throw new Error('Invalid');
  }
};

const getBalance = async (req, res) => {
  const { address } = req.params;
  const balance = await contract.methods.balanceOf(address).call();
  res.json({ balance: balance.toString() });
};

const getName = async (req, res) => {
  let name = await contract.methods.name().call();
  if (name) {
    res.status(200);
    res.json({ name: name.toString() });
  } else {
    throw new Error('Not found');
  }
};

const getSymbol = async (req, res) => {
  let symbol = await contract.methods.symbol().call();
  if (symbol) {
    res.status(200);
    res.json({ symbol: symbol.toString() });
  } else {
    throw new Error('Not found');
  }
};

const transfer = async (req, res) => {
  try {
    const { recipient, amount } = req.body;

    if (!recipient || !amount) {
      return res
        .status(400)
        .json({ error: 'Recipient and amount are required.' });
    }

    // Convert the amount to Wei (assuming ERC-20 tokens use 18 decimals)
    // const tokenAmount = web3.utils.toWei(amount.toString(), 'ether');

    const senderBalance = await contract.methods
      .balanceOf(senderAddress)
      .call();
    console.log('senderBalance', senderBalance);

    const gasEstimate = 1000000; // You can adjust this value based on your contract

    // Set static gas price (in Wei)
    const gasPrice = web3.utils.toWei('20', 'gwei'); // Example: 20 Gwei

    // Prepare the transaction data
    const txData = contract.methods.transfer(recipient, amount).encodeABI();

    // Create the transaction object
    const tx = {
      from: senderAddress,
      to: contractAddress,
      gas: gasEstimate, // Use static gas estimate
      gasPrice: gasPrice, // Static gas price (e.g., 20 Gwei)
      data: txData,
    };

    // Sign the transaction using the private key
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

    // Send the signed transaction
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    const senderBalance1 = await contract.methods
      .balanceOf(senderAddress)
      .call();
    console.log('senderBalance1', senderBalance1);

    console.log('Transaction successful:', receipt);
    res.status(200).json({
      message: 'Transaction successful!',
      transactionHash: receipt.transactionHash,
    });
  } catch (error) {
    console.error('Error during token transfer:', error);
    res.status(500).json({ error: error.message });
  }
};

const mint = async (req, res) => {
  try {
    const { recipient, amount } = req.body;

    if (!recipient || !amount) {
      return res
        .status(400)
        .json({ error: 'Recipient and amount are required.' });
    }

    // Convert the amount to Wei (assuming ERC-20 tokens use 18 decimals)
    // const tokenAmount = web3.utils.toWei(amount.toString(), 'ether');

    const gasEstimate = 1000000; // You can adjust this value based on your contract

    // Set static gas price (in Wei)
    const gasPrice = web3.utils.toWei('20', 'gwei'); // Example: 20 Gwei

    // Prepare the transaction data
    const txData = contract.methods.mint(recipient, amount).encodeABI();

    // Create the transaction object
    const tx = {
      from: senderAddress,
      to: contractAddress,
      gas: gasEstimate, // Use static gas estimate
      gasPrice: gasPrice, // Static gas price (e.g., 20 Gwei)
      data: txData,
    };

    // Sign the transaction using the private key
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

    // Send the signed transaction
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    console.log('Minting successful:', receipt);
    res.status(200).json({
      message: 'Minting successful!',
      transactionHash: receipt.transactionHash,
    });
  } catch (error) {
    console.error('Error during token minting:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTotalSupply,
  getBalance,
  getName,
  getSymbol,
  transfer,
  mint,
};
