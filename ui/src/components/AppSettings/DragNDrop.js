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
    margin: '0px 20px'
};

const Table = styled.div`
    background-color: '#555',
    width: '250px',
    min-height: '400px',
    height: 'auto',
    margin: '0px 20px'
`;

export default class DragNDrop extends React.Component{
    constructor () {
        super()
        this.button1Handler = this.button1Handler.bind(this);
        this.button2Handler = this.button2Handler.bind(this);
    }

    button1Handler (event) {
        alert("button1");
    }
    
    button2Handler (event) {
        alert("button2");
    }
    
    render(){
        return (
            <Wrapper>
                <Table style={droppableStyle}>
                <Anchor onClick={this.button1Handler}>Button 1</Anchor>
                <Anchor onClick={this.button2Handler}>Button 2</Anchor>
                </Table>
                <Droppable id="dr1" style={droppableStyle}>
                    <Draggable id="item1" style={{margin:'8px'}}><Item>Some Text</Item></Draggable>
                    <Draggable id="item2" style={{margin:'8px'}}><Item>Some Other Text</Item></Draggable>
                </Droppable>
                <Droppable id="dr2" style={droppableStyle}>
                    <Draggable id="item3" style={{margin:'8px'}}><Item>Some Text1</Item></Draggable>
                    <Draggable id="item4" style={{margin:'8px'}}><Item>Some Other Text1</Item></Draggable>
                </Droppable>
            </Wrapper>
        );
    }
}