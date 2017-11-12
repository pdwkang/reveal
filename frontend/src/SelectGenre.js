import React, { Component } from 'react';
import axios from 'axios';
import { ButtonToolbar, Dropdown, MenuItem } from 'react-bootstrap';

class SelectGenre extends Component {
    
    constructor(props) {
    	super(props);
    	this.state = {
            genres:[],
            genre_id:"genre id",
            selectGenre:"Select Genre"
        };
        this.componentDidMount = this.componentDidMount.bind(this);    
        this.listByGenre = this.listByGenre.bind(this);    
    }

	componentDidMount() {
        let genresUrl = "http://127.0.0.1:3000/genres";
        axios.get(genresUrl)
        .then((response) => {
            this.setState({
                genres: response.data.rows
            });
        });
    }

    listByGenre(genre){
        let genre_id = genre.id
        let genreUrl = "http://127.0.0.1:3000/genres/titles/" + genre_id;
        axios.get(genreUrl)
        .then((response) => {
            let titles = response.data.rows.map((row)=>{
                row.id = row.title_id;
                return row;
            })
            this.setState({
                selectGenre:genre.name
            });
            this.props.onSelectGenre(titles);
        });
    }

    render() {
        return (
            <ButtonToolbar >
                <Dropdown id="dropdown-custom-1">
                <Dropdown.Toggle>{this.state.selectGenre}</Dropdown.Toggle>
                <Dropdown.Menu onSelect={this.listByGenre}>
                    {this.state.genres.map((genre, index)=>{
                        return <MenuItem eventKey={genre} key={index} value={genre.id}>{genre.name}</MenuItem>
                    })}
                </Dropdown.Menu>
                </Dropdown>
             </ButtonToolbar>
        );
    }
}

export default SelectGenre;
