import React, { Component } from "react";
import { FaTrash } from "react-icons/fa";
import "./App.css";

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
      currPerson: "", // State for storing current person's name
      currSub: "", // State for storing current subtotal
      people: [], // State for storing the people array
      everyoneTotal: "",
      tips: "",
      tax: "",
      cumulativeTotal: 0,
    };
  }

  // Handler to update state when inputs change
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value, // Updates the respective state (currPerson or currSub)
    });
  };

  // Method to add a new person to the array
  addPerson = () => {
    const { currPerson, currSub, people, everyoneTotal, tips, tax } =
      this.state;

    if (currPerson && currSub) {
      // Create a new Person object
      const newPerson = new Person(
        currPerson,
        currSub,
        parseFloat(
          (parseFloat(currSub) / everyoneTotal) *
            (parseFloat(everyoneTotal) + parseFloat(tax) + parseFloat(tips))
        )
      );
      // Update the people array in state
      this.setState({
        people: [...people, newPerson], // Append new person to people array
        currPerson: "", // Clear currPerson input
        currSub: "", // Clear currSub input
        cumulativeTotal: this.state.cumulativeTotal + newPerson.total, // Calculate cumulative total
      });
      console.log(this.state.cumulativeTotal);
    } else {
      alert("Please enter both name and subtotal");
    }
  };

  removePerson = (index) => {
    const { people, cumulativeTotal } = this.state;
    // Remove the person at the specified index from the people array
    this.setState({
      people: people.filter((_, i) => i !== index), // Filter out the person at index
      cumulativeTotal: cumulativeTotal - people[index].total, // Update cumulative total
    });
  };

  render() {
    const { currPerson, currSub, people, everyoneTotal, tips, tax } =
      this.state;

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
        <button
          onClick={this.addPerson}
          style={{
            borderRadius: "5px",
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add another person
        </button>

        {/* Render the list of people */}
        <div className="peopleList">
          <h3>People List:</h3>
          <ul style={{ padding: 0 }}>
            {people.map((person, index) => (
              <li key={index} style={{ listStyleType: "none" }}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", border: "1px solid black", padding: "10px", marginBottom: "5px", borderRadius: "5px" }}>
                  {person.name} - Subtotal: ${person.subtotal} - Total: ${person.total.toFixed(2)}
                  <button
                    className="remove"
                    onClick={() => this.removePerson(index)}
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <h3>Total: ${this.state.cumulativeTotal.toFixed(2)}</h3>
      </div>
    );
  }
}

export default App;
