# Question 2: What is a beacon proxy used for?

A Beacon Proxy is a special kind of proxy contract. It uses a beacon to get the address for each call. The address of this beacon is kept in a certain storage spot. This is to prevent any mix-ups with the arrangement of the storage related to the proxy.

Usually, a Beacon Proxy works together with an Upgradeable Beacon. The Upgradeable Beacon is a contract that sets the rules for one or more Beacon Proxies. An owner can update the beacon's direction, so they can update the proxies that use this beacon.

The Beacon Proxy has several key functions:

- `constructor(beacon, data)`: This initializes the proxy with a beacon. If data is nonempty, it's used as data in a delegate call to the implementation returned by the beacon.
- `_beacon()`: This gives you the current address of the beacon.
- `_implementation()`: This gives you the current address of the implementation related to the beacon.
- `_setBeacon(beacon, data)`: This changes the proxy to use a new beacon.

The use of a Beacon Proxy allows for the centralized upgrade of multiple contracts, making it a powerful tool for managing large systems of contracts.

Resource:

- [OpenZeppelin Proxies Documentation](https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies)
