## Challenge Objective:

The challenge involves a secure vault contract that guards 10 million DVT tokens. The vault is upgradeable, following the UUPS pattern. The owner of the vault, currently a timelock contract, can withdraw a limited amount of tokens every 15 days. There's an additional role in the vault with powers to sweep all tokens in case of an emergency. On the timelock, only an account with a "Proposer" role can schedule actions that can be executed 1 hour later. The objective is to empty the vault.

```solidity
contract ClimberVault is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    ...
    function withdraw(address token, address recipient, uint256 amount) external onlyOwner {
        ...
        SafeTransferLib.safeTransfer(token, recipient, amount);
    }
    ...
    function sweepFunds(address token) external onlySweeper {
        SafeTransferLib.safeTransfer(token, _sweeper, IERC20(token).balanceOf(address(this)));
    }
    ...
}
```

## Vulnerability:

The vulnerability lies in the execute function of the timelock contract. This function accepts and executes actions passed by any user. It then calculates the operationId and validates that the operation was previously scheduled and with state ReadyForExecution. However, if a malicious user executes the scheduling of an action, this could be used to bypass the timelock contract completely.

```solidity
contract ClimberTimelock is ClimberTimelockBase {
    ...
    function execute(address[] calldata targets, uint256[] calldata values, bytes[] calldata dataElements, bytes32 salt)
        external
        payable
    {
        ...
        for (uint8 i = 0; i < targets.length;) {
            targets[i].functionCallWithValue(dataElements[i], values[i]);
            unchecked {
                ++i;
            }
        }
        ...
    }
    ...
}

```

## Exploit:

The exploit involves several steps:

1. Change the required delay from 1 hour to 0. This allows actions to be scheduled and executed instantly.
2. Grant the PROPOSER_ROLE to an attacker-controlled address.
3. Execute an upgrade to change the ClimberVault for a bugged version.
4. Call a function in an attacker-controlled contract that will call the schedule function in the timelock contract. This function is designed to detect if it was being called for the first time (during the execution in execute) or a second time during the scheduling phase.
5. Perform an upgrade to a contract that has a different sweeper address set, in this case, an attacker-controlled address.
6. Sweep the funds!

```solidity
contract AttackTimelock {
    ...
    function exploit() external {
        ...
        ClimberTimelock(timelock).schedule(to, emptyData, scheduleData, 0);
        AttackVault(vault).setSweeper(address(this));
        AttackVault(vault).sweepFunds(token);
    }
    ...
}

```

## Take Away:

This challenge highlights the importance of understanding how proxy contracts and timelock contracts work, especially in the context of upgradeable contracts. It also emphasizes the need for careful access control and the potential risks of allowing any user to execute certain actions.

Please write in English language.
