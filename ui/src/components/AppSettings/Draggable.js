import React from 'react';

export default class Draggable extends React.Component{
    drag = (e) => {
        e.dataTransfer.setData('transfer', e.target.id);
    }

    noAllowDrop = (e) => {
        e.stopPropagation();
    }

    render(){
        return (
            <div id={this.props.id} 
                draggable="true"
                onDragStart={this.drag}
                onDragOver={this.noAllowDrop}
                style={this.props.style}
                currentitem={this.props.currentitem}>
                {this.props.children}
            </div>
        );
    }
}