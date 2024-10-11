import React, { Component } from 'react';
import './App.css';

class Person {
  constructor(name, subtotal, total) {
    this.name = name;
    this.subtotal = subtotal;
    this.total = total;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    // Initialize state with currPerson, currSub, and people
    this.state = {
      currPerson: '',   // State for storing current person's name
      currSub: '',      // State for storing current subtotal
      people: [],        // State for storing the people array
      everyoneTotal: 0,
      tips: 0,
      tax: 0,
    };
  }

  // Handler to update state when inputs change
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value // Updates the respective state (currPerson or currSub)
    });
  };

  // Method to add a new person to the array
  addPerson = () => {
    const { currPerson, currSub, people, everyoneTotal, tips, tax } = this.state;

    if (currPerson && currSub) {
      // Create a new Person object
      const newPerson = new Person(currPerson, currSub, parseFloat(((parseFloat(currSub)/everyoneTotal))*(parseFloat(everyoneTotal)+parseFloat(tax)+parseFloat(tips))));

      // Update the people array in state
      this.setState({
        people: [...people, newPerson], // Append new person to people array
        currPerson: '',                 // Clear currPerson input
        currSub: ''                     // Clear currSub input
      });
    } else {
      alert('Please enter both name and subtotal');
    }
  };

  render() {
    const { currPerson, currSub, people, everyoneTotal, tips, tax } = this.state;

    return (
      <div className="main">
        {/* Input for person's name */}
        
        <input
          type="text"
          name="everyoneTotal"
          value={everyoneTotal}
          onChange={this.handleInputChange} // Call handleInputChange on input change
          placeholder="Everyone Sub Total"
        />

        <input
          type="text"
          name="tax"
          value={tax}
          onChange={this.handleInputChange} // Call handleInputChange on input change
          placeholder="Total Taxes"
        />

<input
          type="text"
          name="tips"
          value={tips}
          onChange={this.handleInputChange} // Call handleInputChange on input change
          placeholder="Total Tips"
        />

        <input
          type="text"
          name="currPerson"
          value={currPerson}
          onChange={this.handleInputChange} // Call handleInputChange on input change
          placeholder="Enter person's name"
        />
        <div></div>

        {/* Input for subtotal */}
        <input
          type="text"
          name="currSub"
          value={currSub}
          onChange={this.handleInputChange} // Call handleInputChange on input change
          placeholder="Enter subtotal"
        />
        <div></div>

        {/* Button to add a person */}
        <button className="main" onClick={this.addPerson}>
          Add another person
        </button>

        {/* Render the list of people */}
        <div>
          <h3>People List:</h3>
          <ul>
            {people.map((person, index) => (
              <li key={index}>
                {person.name} - Subtotal: {person.subtotal} - Total: {person.total}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;