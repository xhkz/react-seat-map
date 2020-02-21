# react-seat-map

> react interactive seat map component

[![NPM](https://img.shields.io/npm/v/react-seat-map.svg)](https://www.npmjs.com/package/@xhkz/react-seat-map) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-seat-map

yarn add react-seat-map
```

## Usage

```jsx
import React from 'react'
import axios from 'axios'
import SeatMap from 'react-seat-map'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sections: [],
      seats: []
    }
  }

  handleClick(data) {
    console.log(data)
  }

  async getData() {
    const resp = await axios.get('/seatmap.json')
    this.setState({
      sections: resp.data.sections,
      seats: resp.data.seats
    })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    return (
      <div>
        <SeatMap sections={this.state.sections} seats={this.state.seats} seatClick={this.handleClick} />
      </div>
    )
  }
}
```

## License

MIT © [xhkz](https://github.com/xhkz)
