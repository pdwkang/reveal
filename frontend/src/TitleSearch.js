import React, { Component } from 'react';
import axios from 'axios';
import { FormControl } from "react-bootstrap";

class TitleSearch extends Component {
    constructor(props) {
    	super(props);
    	this.state = {
            titles:[]
        };
        this.titleSearch = this.titleSearch.bind(this);    
    } 

	titleSearch(e){
		e.preventDefault();
        var titleName = e.target[0].value;
        let encodedTitleName = encodeURIComponent(titleName);
        let titlesUrl = "http://127.0.0.1:3000/titles/" + encodedTitleName;
        axios.get(titlesUrl)
        .then((response) => {
            this.props.onTitleSearch(response.data.rows);
        });
    };

    render() {
        return (
            <form onSubmit={this.titleSearch}>
                <FormControl type="text" placeholder="Search.."/>
            </form>
        );
    }
}

export default TitleSearch;
