import React, { Component } from 'react';
import GetAllTitles from './GetAllTitles';
import TitleSearch from './TitleSearch';
import DetailTable from './DetailTable';
import SelectGenre from './SelectGenre';
import Title from './Title';
import { Grid, Row, Col, ListGroup} from "react-bootstrap";

class Home extends Component {
    constructor(props) {
    	super(props);
    	this.state = {
            titles:[],
            modalIsOpen: false,
            selectedTitleData:{},
            displayDetails:false
        };
        this.listTitles = this.listTitles.bind(this);
        this.fetchDetails = this.fetchDetails.bind(this);
    }

    fetchDetails(data) {
        this.setState({
            selectedTitleData:data,
            displayDetails:true
        });
    }

    listTitles(titles){
        this.setState({
            titles:titles,
            displayDetails:false
        });
    }

    render() {
        return (
            <Grid>
            <div style={{marginTop:20}}>
                <h3 style={{marginLeft:15, marginBottom:20}}> Developer Challenge </h3>
                <div className="col-xs-2"><TitleSearch onTitleSearch={this.listTitles}/></div>
                <div style={{float:"left"}}><GetAllTitles onGetAllTitles={this.listTitles} /></div>
                <div style={{float:"left", marginLeft:15}}><SelectGenre onSelectGenre={this.listTitles} /></div>
                <div style={{clear:"both", paddingTop:20}}>
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={2}>
                                <ListGroup>
                                    {this.state.titles.map((title)=>{
                                        return <Title data={title} key={title.id} onTitleClick={this.fetchDetails}/>
                                    })}
                                </ListGroup>
                            </Col>
                            <Col xs={10} hidden={!this.state.displayDetails}>
                                <DetailTable data={this.state.selectedTitleData}/>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
            </Grid>
        );
    }
}

export default Home;
