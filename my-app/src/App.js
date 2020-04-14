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
        return employee.name.first.includes(this.state.search)
      })
    })
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
          <tbody>
            {
              this.state.filtered.map((employee, i, arr) => <tr key={i}>
                <td>{arr[i].name.first}</td>
                <td>{employee.name.last}</td>
                <td>{employee.email}</td>
                <td>{employee.location.street.number} {employee.location.street.name}</td>
                <td>{employee.phone}</td>
                <td><img src={employee.picture.thumbnail} alt="" /></td>
              </tr>)
            }
          </tbody>
        </table>
      </>
    );
  }

}

export default App;
