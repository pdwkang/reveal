import React, { Component } from 'react';
import axios from 'axios';
import { ListGroupItem} from 'react-bootstrap';

class Title extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data:this.props.data
        };
        this.getDetails = this.getDetails.bind(this);
    }

    getDetails(){
        let data = this.state.data;
        let genresUrl = "http://127.0.0.1:3000/genres/" + this.state.data.id;
        let storyLineUrl = "http://127.0.0.1:3000/storyline/" + this.state.data.id;
        let participantsUrl = "http://127.0.0.1:3000/participants/" + this.state.data.id;
        let awardsUrl = "http://127.0.0.1:3000/awards/" + this.state.data.id;
        
        axios.get(genresUrl)
        .then((genreData) => {
            let genreArray = genreData.data.rows.map((genre)=>{
                return genre.name;
            });
            data.genres = genreArray.join(", ");
            return axios.get(storyLineUrl);
        })
        .then((storyData) => {
            data.storyline = storyData.data.rows[0].description + " - " + storyData.data.rows[0].type;
            data.language = storyData.data.rows[0].language;
            return axios.get(participantsUrl);
        })
        .then((participantData) => {
            data.participants = JSON.stringify(participantData.data.rows);
            return axios.get(awardsUrl);
        })
        .then((awardData) => {
            data.awards = JSON.stringify(awardData.data.rows);
            this.props.onTitleClick(data);
        });
    }
    
    render() {
        return (
            <ListGroupItem onClick={this.getDetails}>
                {this.state.data.title_name}
            </ListGroupItem>
        );
    }
}

export default Title;
