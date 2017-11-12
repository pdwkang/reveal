import React, { Component } from 'react';
import { Table } from "react-bootstrap";
import Participant from './Participant';

class DetailTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded:false
        };
        this.expandParticipants = this.expandParticipants.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    expandParticipants() {
        this.setState({
            expanded:true
        });
    }
    
    componentWillReceiveProps() {
        this.setState({
            expanded:false
        });
      }

    render() {
        let awardsObj = '{"awards":' + this.props.data.awards + "}";
        let participantsObj = '{"participants":' + this.props.data.participants + "}";
        try{
            var awardsNum = JSON.parse(awardsObj).awards.length;
            var awards = JSON.parse(awardsObj).awards;
            var p1 = JSON.parse(participantsObj).participants.map((p)=>{
                return p;
            }).splice(0,20);
            var p2 = JSON.parse(participantsObj).participants.map((p)=>{
                return p;
            }).splice(20);
        }catch(e){
            p1 = [];
            p2 = [];
            awards = [{"id":"","award":"","award_year":""}];
        }
        return (
            <div>
                <Table striped bordered condensed>
                    <thead>
                        <tr>
                            <th className="text-center col-xs-3">Name</th>
                            <th className="text-center col-xs-7">Genre</th>
                            <th className="text-center col-xs-2">Release Year</th>
                        </tr> 
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-center col-xs-3">{this.props.data.title_name}</td>
                            <td className="text-center col-xs-7">{this.props.data.genres}</td>
                            <td className="text-center col-xs-2">{this.props.data.release_year}</td>
                        </tr>
                        
                    </tbody>   
                </Table>
                <div>&nbsp;</div>
                <Table striped bordered condensed>
                    <thead>
                        <tr>
                            <th className="text-center col-xs-3">Language</th>
                            <th className="text-center col-xs-7">Participants</th>    
                            <th className="text-center col-xs-2">Awards ({awardsNum})</th>
                        </tr> 
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-center col-xs-3">{this.props.data.language}</td>
                            <td className="text-left col-xs-7" style={{lineHeight:2.5}}>
                                {
                                    p1.map((p,i)=>{
                                        let comma = true
                                        if (i===p1.length-1){
                                            comma = false;
                                        }
                                    return <Participant key={i} data={p} comma ={comma}/>
                                    })
                                }
                                <button 
                                    style={{border:"lightgrey",backgroundColor:"transparent",opacity:0.7}}
                                    hidden={this.state.expanded} 
                                    onClick={this.expandParticipants}>....
                                </button>
                                <span hidden={!this.state.expanded}>
                                {
                                    p2.map((p,i)=>{
                                        let comma = true
                                        if (i===p2.length-1){
                                            comma = false;
                                        }
                                        return <Participant key={i} data={p} comma={comma}/>
                                    })
                                }
                                </span>
                            </td>
                            <td className="text-center col-xs-2">
                            {
                                awards.map((a)=>{
                                    return <div style={{marginTop:10}}className="text-left" key={a.id}>
                                            <div>{a.award}</div>
                                            <div style={{fontSize:12, color:"grey"}}>{"(" + a.award_year + ")"}</div>
                                            
                                        </div>
                                })
                            }
                            </td>
                        </tr>
                    </tbody>  
                </Table>
                <div>&nbsp;</div>
                <Table striped bordered condensed>
                    <thead>
                        <tr>
                            <th className="text-center" colSpan="3">Story Line</th>
                        </tr> 
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="3" style={{lineHeight:2, padding:15}}>{this.props.data.storyline}</td>
                        </tr>
                    </tbody>    
                </Table> 
            </div>
        );
    }
}

export default DetailTable;


