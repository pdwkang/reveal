import React, { Component } from 'react';
import axios from 'axios';
import { OverlayTrigger, Tooltip, Button} from 'react-bootstrap';

class Participant extends Component {
    constructor(props) {
    	super(props);
    	this.state = {
            data:this.props.data,
            participantData:null,
            show:false
        };
        this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
        this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
    }
    
    onMouseEnterHandler() {
        if(!this.state.participantData){
            let prtUrl = "http://127.0.0.1:3000/participants/titles/" + this.props.data.id;
            axios.get(prtUrl)
            .then((response) => {
                let movieNames = [];
                for (let i=0 ; i<response.data.rows.length; i++){
                    if(movieNames.indexOf(response.data.rows[i].title_name)){
                        movieNames.push(response.data.rows[i].title_name);
                    }
                }
                this.setState({
                    participantData:movieNames.join(" "),
                    show: true
                });
            });

        }else{
            this.setState({
                show: true
            });
        } 
    }
    onMouseLeaveHandler() {
        this.setState({
            show: false
        });
    }
    render() {
        var tooltip = <Tooltip id="tooltip">Starred in "{this.state.participantData}"</Tooltip>;
        return (
            <span style={{padding:7}}>
                <OverlayTrigger
                    placement="left" overlay={tooltip}>
                    <Button style={{border:"none",background:"opacity:.3", padding:4}} 
                            onMouseEnter={this.onMouseEnterHandler}
                            onMouseLeave={this.onMouseLeaveHandler}  
                            bsStyle="default">
                            {this.props.data.name}
                    </Button>
                </OverlayTrigger>
                <span hidden={!this.props.comma}>, &nbsp;</span>
            </span>
        );
    }
}


export default Participant;
