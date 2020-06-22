import React, { Component } from 'react';
import axios from 'axios'
import { Button } from 'reactstrap';


class defaultNumbers extends Component {

    state = { countries: [], location: '', total: '', deaths: '', recovered: '', states: [], citys: [], stateData: [], selectedState: '', cityDataArray: [] }

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
        let location = document.getElementById('countryCombo').value
        // console.log(selectedCountry)
        let countryData = await axios.get(`https://api.covid19api.com/summary`)
        console.log(countryData.data.Countries)
        let total
        let deaths
        let recovered
        countryData.data.Countries.map(i => {
            if (i.Country === location) {
                console.log('LOOKING HERE')
                total = i.TotalConfirmed
                deaths = i.TotalDeaths
                recovered = i.TotalRecovered
                return i
            }
            return null
        })
        this.setState({ total, deaths, recovered, location })
    }

    async getCountryData() {
        let country = this.state.location
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
            return null
        })
        this.setState({ total, deaths, recovered })
    }

    async getDetails() {

        let stateArray = []
        let countryData = await axios.get(`https://api.covid19api.com/dayone/country/united-states/status/confirmed`)
        let data = countryData.data
        // countryData.data.CountryCode=='US'
        data.map(i => {
            // only gets cases
            // console.log(i)
            stateArray.push(i.Province)
            // cityArray.push(i.City)
            return null
        })
        // let uniqueCity = [...new Set(cityArray)];
        let states = [...new Set(stateArray)];
        this.setState({ states })
        // console.log(uniqueCity)
        console.log(states)
        return null
    }
    async getCity(e) {
        let cityArray = []
        let selProvince = e.target.value
        let countryData = await axios.get(`https://api.covid19api.com/dayone/country/united-states/status/confirmed`)
        let data = countryData.data
        data.map(i => {
            if (i.Province === selProvince) {
                cityArray.push(i.City)
                // console.log(i)
            }
            return null
        })
        let stateData = data
        let selectedState = selProvince
        this.setState({ stateData })
        this.setState({ selectedState })
        // set city state
        // let citys = cityArray
        let citys = [...new Set(cityArray)];
        this.setState({ citys })
    }
    cityClickDetails(e) {
        // console.log(e.target.value)
        let cityDataArray = []
        let chosenCity = e.target.value
        let chosenState = this.state.selectedState
        // console.log(this.state.stateData)
        let data = this.state.stateData
        data.map(i => {
            if (i.City === chosenCity && i.Province === chosenState) {
                // console.log(i)
                cityDataArray.push(i)
            }
        })
        let l = cityDataArray.length
        let lastReport = cityDataArray[l - 1]
        let total = lastReport.Cases
        let location = lastReport.City
        this.setState({ cityDataArray, total, location })
    }
    componentDidMount() {
        this.getNumbers();
        this.getCountries();
        this.getDetails();
    }
    render() {
        let countries = this.state.countries
        let total = this.state.total
        let c = this.state.location
        let deaths = this.state.deaths
        let recovered = this.state.recovered
        countries = countries.sort()
        const states = this.state.states
        const citysState = this.state.citys
        // console.log(states)
        const f = countries.map(i => {
            return <option value={i}>{i}</option>
        })
        const s = states.map(i => {
            return <Button color='info' value={i} id='statesBut' onClick={e => this.getCity(e, 'value')}>{i}</Button>
        })
        const citys = citysState.map(i => {
            return <Button color='info' value={i} id='statesBut' onClick={e => this.cityClickDetails(e, 'value')} >{i}</Button>
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
                <Button color="success" id='searchBut' onClick={() => this.getCountryData()}>Search</Button>
                {/* <Button color='danger' onClick={() => this.getDetails()}>Testing Details</Button> */}
                <div id='displayCont'>
                    <p>Location: {c}</p>
                    <p>Total Cases: {total} </p>
                    {/* <p>Active: {active}</p> */}
                    <p>Deaths: {deaths}</p>
                    <p>Recovered: {recovered}</p>
                </div>
                <div id='stateSections'>
                    {s}
                </div>
                <div id='citySection'>
                    {citys}
                </div>
            </div >
        );
    }
}

export default defaultNumbers;