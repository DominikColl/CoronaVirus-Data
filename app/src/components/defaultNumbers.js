import React, { Component } from 'react';
import axios from 'axios'
class defaultNumbers extends Component {
    state = {}
    async getNumbers() {
        var config = {
            headers: { 'accept': 'application/json' }
        };
        let res = await axios.get(
            'https://api.covid19api.com/summary'
        );
        await console.log(res)
    }
    componentDidMount() {
        this.getNumbers();
    }
    render() {
        return (< p > Numbers</p >);
    }
}

export default defaultNumbers;