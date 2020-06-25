import React, { Component } from 'react';
import axios from 'axios'
import { Button } from 'reactstrap';
import Graph from './graph'

class defaultNumbers extends Component {

    state = { countries: [], location: '', total: '', deaths: '', recovered: '', states: [], citys: [], stateData: [], selectedState: '', cityDataArray: [], lastSevenDays: [{ Date: 2001, Cases: 1000 }, { Date: 2002, Cases: 2000 }, { Date: 2003, Cases: 3000 }, { Date: 2004, Cases: 4000 },{ Date: 2005, Cases: 5000 },{ Date: 2006, Cases: 6000 },{ Date: 2007, Cases: 8000 }] }

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
                console.log('CITY DATA')
                console.log(i)
            }
        })
        let l = cityDataArray.length
        let lastReport = cityDataArray[l - 1]
        let lastSevenDays = cityDataArray.slice(Math.max(cityDataArray.length - 7, 1))
        console.log(lastSevenDays)
        let total = lastReport.Cases
        let location = lastReport.City
        this.setState({ cityDataArray, total, location, lastSevenDays })
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
        const lastSevenDays = this.state.lastSevenDays
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
        const yOne = this.state.lastSevenDays[0].Cases;
        const yTwo = this.state.lastSevenDays[1].Cases;
        const yThree = this.state.lastSevenDays[2].Cases;
        const yFour = this.state.lastSevenDays[3].Cases
        const yFive = this.state.lastSevenDays[4].Cases;
        const ySix = this.state.lastSevenDays[5].Cases;
        const ySeven = this.state.lastSevenDays[6].Cases
        // 
        const xOne = this.state.lastSevenDays[0].Dates;
        const xTwo = this.state.lastSevenDays[1].Dates;
        const xThree = this.state.lastSevenDays[2].Dates;
        const xFour = this.state.lastSevenDays[3].Dates
        const xFive = this.state.lastSevenDays[4].Dates
        const xSix = this.state.lastSevenDays[5].Dates
        const xSeven = this.state.lastSevenDays[6].Dates

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
                    <p>Deaths: {deaths}</p>
                    <p>Recovered: {recovered}</p>
                </div>
                <div id='stateSections'>
                    {s}
                </div>
                <div id='citySection'>
                    {citys}
                </div>
                <div id='graphSection'>
                    <Graph yOne={yOne} yTwo={yTwo} yThree={yThree} yFour={yFour} yFive={yFive} ySix={ySix} ySeven={ySeven} xOne={xOne} xTwo={xTwo} xThree={xThree} xFour={xFour} xFive={xFive} xSix={xSix} xSeven={xSeven} id='gr' />
                </div>
            </div >
        );
    }
}

export default defaultNumbers;