import React, { Component } from 'react';

class App extends Component {
  state = {
    search: "",
    employees: [],
    filtered: []
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=20&nat=us')
      const users = await response.json()
      console.log(users.results)
      this.setState({ employees: users.results, filtered: users.results })
    } catch (error) {
      console.log(error)
    }
  }

  filter = () => {
    this.setState({
      filtered: this.state.employees.filter(employee => {
        // Convert first name to uppercase
        const first = employee.name.first.toUpperCase();
        // Convert last name to uppercase
        const last = employee.name.last.toUpperCase();
        // Convert what user is searching for to uppercase
        const search = this.state.search.toUpperCase()

        // Now compare the uppercase search to the uppercase values
        // if the search value is anywhere inside of the first name string return true
        if (first.includes(search) === true) {
          return true
        }
        // if the search value is anywhere inside of the last name string return true
        else if (last.includes(search) === true) {
          return true
        }
        // if the search value is NOT found in any value, then return false
        else {
          return false
        }

        // reaturn first.includes(search) || last.includes(search)
      })
    })
  }

  sort = key => {
    if (key === 'first') {
      this.setState({
        filtered: this.state.filtered.sort((a, b) => (a.name.first > b.name.first) ? 1 : -1)
      })
    }
    else if (key === 'last') {
      this.setState({
        filtered: this.state.filtered.sort((a, b) => (a.name.last > b.name.last) ? 1 : -1)
      })
    }
  }

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    }, this.filter)
  }

  render() {
    return (
      <>
        <input type="text" name="search" onChange={this.handleInputChange} />
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th onClick={() => this.sort('first')}>First Name</th>
              <th onClick={() => this.sort('last')}>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.filtered.map((employee, i) => <tr key={i}>
                <td><img src={employee.picture.thumbnail} alt="" /></td>
                <td>{employee.name.first}</td>
                <td>{employee.name.last}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.location.street.number} {employee.location.street.name}</td>
              </tr>)
            }
          </tbody>
        </table>
      </>
    );
  }

}

export default App;
