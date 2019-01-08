import React, { Component } from 'react';
import Options from './Options';
import Create from './Create';
import Selection from './Selection';

class App extends Component {
    state = {
        createOptions: [],
        daysToPlanFor: [],
        recipesPicked: []
    };

    handleSubmit = createOption => {
        this.setState({createOptions: [...this.state.createOptions, createOption]});
        const updatedArray = [...this.state.daysToPlanFor];
        const weekList = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];

        // creates array containing name of weekday for each day to plan for
        for (let i = 0; i < createOption.numberDays; i++) {
            var indexOfDayInWeekList = weekList.indexOf(createOption.startDay);
            var dayToAdd = weekList[(indexOfDayInWeekList + i) % 7];
            updatedArray.push(dayToAdd);
        }
        this.setState({daysToPlanFor: updatedArray});
        this.updateSelectionCellIndexes(updatedArray);
    }

    // create array with all selectionCell indexes and declare it in state
    // the call function to create state variable for each selectionCell 
    // index here so that state object can be updated in handleSelectionChange
    updateSelectionCellIndexes(daysToPlanFor) {
        var selectionCellIndexes = [];
        for (let i = 0; i < daysToPlanFor.length; i++) {
            selectionCellIndexes.push(i + 'Breakfast');
            selectionCellIndexes.push(i + 'Lunch');
            selectionCellIndexes.push(i + 'Dinner');    
        }
        this.setState({selectionCellIndexes: selectionCellIndexes});
        this.addSelectionCellIndexToState(selectionCellIndexes);
    }

    addSelectionCellIndexToState(selectionCellIndexes) {
        for (let i = 0; i < selectionCellIndexes.length; i++) {
            this.setState({[selectionCellIndexes[i]]: "none"});
        }
    }

    handleSelectionChange = recipePicked => {
        this.setState({[recipePicked.target.name]: recipePicked.target.value});
        // var recipesPicked = this.state.selectionCellIndexes.map(selectionCell => this.state[selectionCell]);
        // console.log(recipesPicked);
        // this.setState({[recipesPicked]: recipesPicked});
    }

// render GroceryList component by going through state and adding any besides createOptions
// and daysToPlanFor to recipesPicked, pass recipes picked to python function that calculates
// ingredient info

    render() {
        // pass navigation options through as props since they don't need to be
        // modified. NOT IMPLEMENTED CURRENTLY
        const navigationOptions = ['Add', 'Edit', 'Create'];
        const { createOptions } = this.state;
        const { daysToPlanFor } = this.state;
        const { recipesPicked } = this.state;

        return (
            <div className="container">
                <Options navigationOptions={navigationOptions} />
                <Create handleSubmit={this.handleSubmit} />
                <Selection daysToPlanFor={daysToPlanFor} handleSelectionChange={this.handleSelectionChange} />
            </div>
        );
    }
}

export default App;
