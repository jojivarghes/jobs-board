import React from 'react';
import styled from 'styled-components';
import Draggable from './Draggable';
import Droppable from './Droppable';

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
`;

const droppableStyle = {
    backgroundColor: '#555',
    width: '250px',
    minHeight: '400px',
    height: 'auto',
    margin: '0px 20px',
    paddingTop:'10px',
};

const droppableStyle1 = {
    backgroundColor: '#555',
    width: '250px',
    height: '50px',
    //height: 'auto',
    margin: '0px 20px',
    paddingTop:'3px',
   // paddingBottom:'5px',
    marginBottom: '20px'
};

const Table = styled.div`
    background-color: '#555',
    width: '250px',
    min-height: '400px',
    height: 'auto',
    margin: '0px 20px',
    paddingTop:'10px'
`;

const NotDraggable = styled.div`
    background-color: '#555',
    width: '250px',
    min-height: '400px',
    height: 'auto',
    margin: '0px 20px',
    paddingTop:'10px'
`;

export default class DragNDrop extends React.Component{
    constructor () {
        super()
        this.button1Handler = this.button1Handler.bind(this);
        this.button2Handler = this.button2Handler.bind(this);
    }

    button1Handler (event) {
        alert("Table1");
    }
    
    button2Handler (event) {
        alert("Table2");
    }
    
    render(){
        return (
            <Wrapper>
                <div>
                    <span style={{fontSize: '20px',fontWeight:'bold',marginLeft:'115px'}}>Tables</span>
                    <Table style={droppableStyle}>
                        <Anchor onClick={this.button1Handler}>Table 1</Anchor>
                        <Anchor onClick={this.button2Handler}>Table 2</Anchor>
                    </Table>
                </div>
                <div>
                <span style={{fontSize: '20px',fontWeight:'bold',marginLeft:'100px'}}>Columns</span>
                    <Droppable id="dr1" style={droppableStyle}>
                        <Draggable id="item1" style={{margin:'8px'}}><Item>Column1</Item></Draggable>
                        <Draggable id="item2" style={{margin:'8px'}}><Item>Column2</Item></Draggable>
                        <Draggable id="item4" style={{margin:'8px'}}><Item>Column3</Item></Draggable>
                        <Draggable id="item6" style={{margin:'8px'}}><Item>Column4</Item></Draggable>
                        <Draggable id="item8" style={{margin:'8px'}}><Item>Column5</Item></Draggable>
                        <Draggable id="item10" style={{margin:'8px'}}><Item>Column6</Item></Draggable>
                        <Draggable id="item12" style={{margin:'8px'}}><Item>Column7</Item></Draggable>
                    </Droppable>
                </div>
                <div>
                <span style={{fontSize: '20px',fontWeight:'bold',marginLeft:'100px'}}>job_id</span>
                    <Droppable id="dr2" style={droppableStyle1}>
                       {/* <NotDraggable id="item3" style={{margin:'8px'}}><Item>job_id</Item></NotDraggable>*/}
                       {/* <Draggable id="item4" style={{margin:'8px'}}><Item>Some Other Text1</Item></Draggable>*/}
                    </Droppable>
                    <span style={{fontSize: '20px',fontWeight:'bold',marginLeft:'100px'}}>start</span>
                    <Droppable id="dr3" style={droppableStyle1}>
                        {/*<NotDraggable id="item5" style={{margin:'8px'}}><Item>start</Item></NotDraggable>*/}
                        {/*<Draggable id="item6" style={{margin:'8px'}}><Item>Some Other Text2</Item></Draggable>*/}
                    </Droppable>
                    <span style={{fontSize: '20px',fontWeight:'bold',marginLeft:'100px'}}>end</span>
                    <Droppable id="dr4" style={droppableStyle1}>
                       {/* <NotDraggable id="item7" style={{margin:'8px'}}><Item>end</Item></NotDraggable>*/}
                       {/* <Draggable id="item8" style={{margin:'8px'}}><Item>Some Other Text3</Item></Draggable>*/}
                    </Droppable>
                    <span style={{fontSize: '20px',fontWeight:'bold',marginLeft:'100px'}}>status</span>
                    <Droppable id="dr5" style={droppableStyle1}>
                       {/* <NotDraggable id="item9" style={{margin:'8px'}}><Item>status</Item></NotDraggable>*/}
                        {/*<Draggable id="item10" style={{margin:'8px'}}><Item>Some Other Text4</Item></Draggable>*/}
                    </Droppable>
                    <span style={{fontSize: '20px',fontWeight:'bold',marginLeft:'100px'}}>comments</span>
                    <Droppable id="dr6" style={droppableStyle1}>
                       {/* <NotDraggable id="item11" style={{margin:'8px'}}><Item>comments</Item></NotDraggable>*/}
                        {/*<Draggable id="item12" style={{margin:'8px'}}><Item>Some Other Text5</Item></Draggable>*/}
                    </Droppable>
                </div>
            </Wrapper>
        );
    }
}