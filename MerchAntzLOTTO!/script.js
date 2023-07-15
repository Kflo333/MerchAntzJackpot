// Contract address and ABI
const contractAddress = "<YOUR_CONTRACT_ADDRESS>";
const contractABI = <YOUR_CONTRACT_ABI>;

// Connect to the contract
const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Store the selected wallet provider
let selectedProvider = null;

// Wallet connection options
const walletOptions = [
    {
        name: "MetaMask",
        connector: window.ethereum
    },
    {
        name: "Binance Chain Wallet",
        connector: window.BinanceChain
    },
    {
        name: "WalletConnect",
        connector: WalletConnectProvider
    }
];

// Connect wallet function
async function connectWallet(provider) {
    try {
        await provider.enable();
        selectedProvider = provider;
        console.log("Wallet connected:", provider);
        // Update the UI or display a success message
    } catch (error) {
        console.error("Failed to connect wallet:", error);
        // Handle the error and display an error message
    }
}

// Listen for form submission
document.getElementById("lotteryForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!selectedProvider) {
        console.error("No wallet connected");
        // Display an error message or prompt the user to connect a wallet
        return;
    }

    // Get the bet amount from the input field
    const betAmount = document.getElementById("betAmount").value;

    // Place the bet by calling the contract function
    try {
        await contract.methods.placeBet().send({ from: selectedProvider.selectedAddress, value: web3.utils.toWei(betAmount.toString(), "ether") });
        console.log("Bet placed successfully!");

        // Update the UI or display a success message
    } catch (error) {
        console.error("Failed to place bet:", error);
        // Handle the error and display an error message
    }
});

// Connect wallet buttons
const connectButtons = document.querySelectorAll(".connect-wallet-button");
connectButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const walletName = button.dataset.wallet;
        const selectedOption = walletOptions.find((option) => option.name === walletName);

        if (selectedOption) {
            connectWallet(selectedOption.connector);
        }
    });
});
