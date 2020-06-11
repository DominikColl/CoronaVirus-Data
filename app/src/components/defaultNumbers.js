import React, { Component } from 'react';
import axios from 'axios'
class defaultNumbers extends Component {
    state = { countries: [], selectedCountry: '', total: '', active: '', deaths: '', recovered: '' }

    async getNumbers() {
        let res = await axios.get(
            'https://api.covid19api.com/summary'
        );
        await console.log(res.data)

    }
    async getCountries() {
        let res = await axios.get('https://api.covid19api.com/countries')
        let countries = [];
        res.data.map(i => {
            countries.push(i.Country)
            return null
        })
        this.setState({ countries })
    }

    async selectCountry() {
        let selectedCountry = document.getElementById('countryCombo').value
        console.log(selectedCountry)
        this.setState({ selectedCountry })
        document.getElementById('searchBut').click()
    }
    async getCountryData() {
        let country = this.state.selectedCountry
        let countryData = await axios.get(`https://api.covid19api.com/live/country/${country}`)
        console.log('LOOKING HERE')
        console.log(countryData.data)
        let lastDay = countryData.data.pop()
        console.log(lastDay.Confirmed)
        let total = lastDay.Confirmed
        let active = lastDay.Active
        let deaths = lastDay.Deaths
        let recovered = lastDay.Recovered
        this.setState({ total, active, deaths, recovered })
    }
    componentDidMount() {
        this.getNumbers();
        this.getCountries();
    }

    render() {
        let countries = this.state.countries
        let total = this.state.total
        let c = this.state.selectedCountry
        let active = this.state.active
        let deaths = this.state.deaths
        let recovered = this.state.recovered
        countries = countries.sort()
        const f = countries.map(i => {
            return <option value={i}>{i}</option>
        })
        return (
            <div>
                < p > Numbers </p >
                <select name="countries" id="countryCombo" onChange={() => this.selectCountry()}>
                    {f}
                </select>
                <button id='searchBut' onClick={() => this.getCountryData()}>Click</button>
                <div id='displayCont'>
                    <p>Country: {c}</p>
                    <p>Total Cases: {total} </p>
                    <p>Active: {active}</p>
                    <p>Deaths: {deaths}</p>
                    <p>Recovered: {recovered}</p>


                </div>
            </div>
        );
    }
}

export default defaultNumbers;