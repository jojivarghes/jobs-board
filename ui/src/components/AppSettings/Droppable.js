import React from 'react';

export default class Droppable extends React.Component {
    drop = (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('transfer');
        e.target.appendChild(document.getElementById(data));
        this.props.setMapJob(e.target.getAttribute("name"), document.getElementById(data).getAttribute("currentitem"));
    }

    allowDrop = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <div id={this.props.id} 
                name={this.props.name}
                onDrop={this.drop}
                className={this.props.className}
                onDragOver={this.allowDrop}
                style={this.props.style}>
                {this.props.children}
            </div>
        );
    }
}