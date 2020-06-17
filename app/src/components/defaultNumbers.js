import React, { Component } from 'react';
import axios from 'axios'
import { Button } from 'reactstrap';
import { FaArrowCircleDown } from 'react-icons/fa';

class defaultNumbers extends Component {

    state = { countries: [], selectedCountry: '', total: '', active: '', deaths: '', recovered: '', states: [], citys: [] }

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
        let countryData = await axios.get(`https://api.covid19api.com/summary`)
        console.log(countryData.data.Countries)
        let total
        let deaths
        let recovered
        countryData.data.Countries.map(i => {
            if (i.Country === selectedCountry) {
                console.log('LOOKING HERE')
                total = i.TotalConfirmed
                deaths = i.TotalDeaths
                recovered = i.TotalRecovered
                return i
            }
        })
        this.setState({ total, deaths, recovered, selectedCountry })
    }

    async getCountryData() {
        let country = this.state.selectedCountry
        let countryData = await axios.get(`https://api.covid19api.com/summary`)
        let total
        let deaths
        let recovered
        countryData.data.Countries.map(i => {
            console.log(i.Country)
            if (i.Country === country) {
                console.log('LOOKING HERE')
                total = i.TotalConfirmed
                deaths = i.TotalDeaths
                recovered = i.TotalRecovered
                return i
            }
        })
        this.setState({ total, deaths, recovered })
    }
    async getDetails() {
        let cityArray = []
        let stateArray = []
        let countryData = await axios.get(`https://api.covid19api.com/dayone/country/united-states/status/confirmed`)
        let data = countryData.data
        // countryData.data.CountryCode=='US'
        data.map(i => {
            // only gets cases
            // console.log(i)
            stateArray.push(i.Province)
            // cityArray.push(i.City)
        })
        // let uniqueCity = [...new Set(cityArray)];
        let states = [...new Set(stateArray)];
        this.setState({ states })
        // console.log(uniqueCity)
        console.log(states)
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
        const states = this.state.states
        const f = countries.map(i => {
            return <option value={i}>{i}</option>
        })

        const s = states.map(i => {
            return <p>{i}</p>
        })
        return (
            <div>
                <div id='selectId'>
                    <label>
                        <select name="countries" id="countryCombo" onChange={() => this.selectCountry()}>
                            {f}
                        </select>
                    </label>
                </div>
                <Button color="success" onClick={() => this.getCountryData()}>Search</Button>
                <Button color='danger' onClick={() => this.getDetails()}>Testing Details</Button>
                <div id='displayCont'>
                    <p>Country: {c}</p>
                    <p>Total Cases: {total} </p>
                    {/* <p>Active: {active}</p> */}
                    <p>Deaths: {deaths}</p>
                    <p>Recovered: {recovered}</p>
                </div>
                <div id='stateSections'>
                    {s}
                </div>
            </div >
        );
    }
}

export default defaultNumbers;