import React from 'react';
import styled from 'styled-components';
import Draggable from './Draggable';
import Droppable from './Droppable';
import axios from 'axios';
import Alert from 'react-s-alert';

const Wrapper = styled.div`
    //width: 100%;
    padding: 0px 0px 10px 15px;
    display: flex;
    justify-content: center;
`;

const Item = styled.div`
    padding: 8px;
    color: #555;
    background-color: white;
    border-radius: 3px;
`;

const Anchor = styled.a`
    background-color: white;
    color: #555;
    padding: 10px 20px;
    text-align: center;
    display: block;
    text-decoration: none;
    font-size: 16px;
    margin: 10px 20px;
    border-radius: 3px;
    cursor: pointer;
    background: cornflowerblue;
    color: white!important;
`;

const droppableStyle = {
    backgroundColor: '#f8f9fc',
    width: '250px',
    minHeight: '500px',
    height: 'auto',
    margin: '0px 20px',
    paddingTop:'10px',
    border: 'black 1px solid'
};

const droppableStyle1 = {
    backgroundColor: '#f8f9fc',
    width: '250px',
    height: '50px',
    //height: 'auto',
    margin: '0px 20px',
    paddingTop:'3px',
   // paddingBottom:'5px',
    marginBottom: '20px',
    border: 'black 1px dashed'
};

const Table = styled.div`
    background-color: '#f8f9fc',
    width: '250px',
    min-height: '400px',
    height: 'auto',
    margin: '0px 20px',
    paddingTop:'10px',
    border: 'black 1px dashed'
`;

export default class DragNDrop extends React.Component{
    state= {columns: {tableName: "", columns: []}};
    constructor () {
        super()
        this.button1Handler = this.button1Handler.bind(this);
        this.button2Handler = this.button2Handler.bind(this);
    }

    button1Handler (tableName) {
        axios.get("https://44e93c36-0921-47b0-8e07-20e0350ce62d.mock.pstmn.io/api/sources/{id}/tables/" +tableName+"/columns")
        .then((response) => {
          let colObj = {tableName: tableName, columns: response.data};
          this.setState({columns:colObj});
        })
        .catch((error) => {
          
          Alert.error('No Columns in this table', {
            position: 'top-right',
            effect: 'scale',
            onShow: function () {
                console.log('aye!')
            },
            beep: false,
            timeout: 'none',
            offset: 100
        });
        })
    }
    
    button2Handler (event) {
        alert("Table2");
    }

    render(){
        let setMapJob = (key, value) => {
            this.props.handlePageTwoData(key, value);
            // this.setState({[key]:value});
        }
        return (
            <Wrapper>
                <div>
                    <span style={{fontSize: '20px',fontWeight:'bold',marginLeft:'115px', color: 'darkblue'}}>Tables</span>
                    <Table style={droppableStyle}>
                        {this.props.table.map((item) => 
                            <Anchor key={item} onClick={()=>this.button1Handler(item)}>{item}</Anchor>
                        )}
                    </Table>
                </div>
                <div>
                <span style={{fontSize: '20px',fontWeight:'bold',marginLeft:'100px', color: 'darkblue'}}>Columns</span>
                    <Droppable className="droppableBlueDiv" id="dr1" style={droppableStyle}>
                        {this.state.columns.columns.map((item, indx) => 
                            <Draggable key={'item'+indx} id={'item'+indx} style={{margin:'8px', cursor: 'grab'}} currentitem={this.state.columns.tableName + '.' + item}><Item>{item}</Item></Draggable>  
                        )}
                    </Droppable>
                </div>
                <div style={{display: 'grid'}}>
                <span style={{fontSize: '20px',fontWeight:'bold', justifySelf: 'center', color: 'darkblue'}}>Job ID</span>
                    <Droppable id="dr2" name="job_id" setMapJob={setMapJob} className="droppableDiv" style={droppableStyle1}>
                    </Droppable>
                    <span style={{fontSize: '20px',fontWeight:'bold', justifySelf: 'center', color: 'darkblue'}}>Start Date & Time</span>
                    <Droppable id="dr3" name="start_time" className="droppableDiv" setMapJob={setMapJob} style={droppableStyle1}>
                    </Droppable>
                    <span style={{fontSize: '20px',fontWeight:'bold', justifySelf: 'center', color: 'darkblue'}}>End Date & Time</span>
                    <Droppable id="dr4" name="end_time" setMapJob={setMapJob} className="droppableDiv" style={droppableStyle1}>
                    </Droppable>
                    <span style={{fontSize: '20px',fontWeight:'bold', justifySelf: 'center', color: 'darkblue'}}>Status</span>
                    <Droppable id="dr5" name="status" setMapJob={setMapJob} className="droppableDiv" style={droppableStyle1}>
                    </Droppable>
                    <span style={{fontSize: '20px',fontWeight:'bold', justifySelf: 'center', color: 'darkblue'}}>Comments</span>
                    <Droppable id="dr6" name="comments" setMapJob={setMapJob} className="droppableDiv" style={droppableStyle1}>
                    </Droppable>
                </div>
            </Wrapper>
        );
    }
}