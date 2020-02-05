# Onboard-React

JavaScript library providing a wrapper around Blocknative's [Onboard](https://github.com/blocknative/onboard) as a React context to easily store and update user's wallet state.

## Install

`npm install onboard-react`

## Quick Start

```javascript
import OnboardProvider from 'onboard-react'

// head to blocknative.com to create a key
const BLOCKNATIVE_KEY = 'blocknative-api-key'

// the network id that your dapp runs on
const NETWORK_ID = 1

// construct the initialisation object to be given to Onboard
// see: https://docs.blocknative.com/onboard#options
const initialisation = {
  dappId: BLOCKNATIVE_KEY,
  networkId: NETWORK_ID,
}

class App extends Component {
  render() {
    return (
      <OnboardProvider initialisation={initialisation}>
        {....}
      </OnboardProvider>
    )
  }
}
```

The `OnboardProvider` then gives its children access to (among others) the `useOnboard` hook which returns the `Onboard` object.

## Documentation

For detailed documentation on Onboard head to [docs.blocknative.com](https://docs.blocknative.com/onboard)