import React from 'react'
import SuperheroResults from './SuperheroResults.js'

class SuperheroSearch extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedSuper: "",
            superAttributes: {},
            isSuper: undefined
        }
    }

    componentDidMount() {
        console.log("Component has mounted")
    }

    handleBlur = (e) => {
        this.setState({selectedSuper: e.target.value})
    }
 
    handleOnSubmit = (e) =>{
        e.preventDefault()
        fetch(`https://superheroapi.com/api/10161612492070527/search/${this.state.selectedSuper}`)
        .then(res => res.json())
        .then(jsonResponse => {
            this.setState({
                selectedSuper: jsonResponse.results[0].name,
                superAttributes: jsonResponse.results[0].powerstats,
                isSuper: jsonResponse.results[0].biography.alignment
            }, () => console.log(this.state.isSuper))
        }).catch(error => {
            console.log("there has been an error :(")
        })
    }

    render() {


        return (
            <div>
                <form onSubmit={this.handleOnSubmit}>
                    <label>
                        Search a Superhero
                        <br />
                        <input type="text" name="name" onBlur={this.handleBlur}/>
                    </label>
                    <input type="submit" value="Search" />
                </form>

                <SuperheroResults 
                superAttributes={this.state.superAttributes}
                selectedSuper={this.state.selectedSuper}
                isSuper={this.props.isSuper}/>

            </div>
        )
    }
}

export default SuperheroSearch