import React, { Component } from 'react';
import axios from 'axios';
// import { Button } from 'semantic-ui-react';
import { Button } from 'react-bootstrap';

class GetAllTitles extends Component {
    
    constructor(props) {
    	super(props);
    	this.state = {};
        this.listAllTitles = this.listAllTitles.bind(this);    
    }

    listAllTitles(){
        let titlesUrl = "http://127.0.0.1:3000/titles";
        axios.get(titlesUrl)
        .then((response) => {
            this.props.onGetAllTitles(response.data.rows);
        });
    }

    render() {
        return (
            <Button onClick={this.listAllTitles}>
                List All
            </Button>
        );
    }
}

export default GetAllTitles;
