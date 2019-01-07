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
        for (let i = 0; i < createOption.numberDays; i++) {
            var indexOfDayInWeekList = weekList.indexOf(createOption.startDay);
            var dayToAdd = weekList[(indexOfDayInWeekList + i) % 7];
            updatedArray.push(dayToAdd);
        }
        this.setState({daysToPlanFor: updatedArray
        });
    }

    handleSelectionChange = recipePicked => {
        this.setState({[recipePicked.target.name]: recipePicked.target.value});
    }

// render GroceryList component by going through state and adding any besides createOptions
// and daysToPlanFor to recipesPicked, pass recipes picked to python function that calculates
// ingredient info

    render() {
        // pass navigation options through as props since they don't need to be
        // modified
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
