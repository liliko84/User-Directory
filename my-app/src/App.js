import React, { Component } from 'react';

class App extends Component {
  state = {
    employees: []
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=20&nat=us')
      const users = await response.json()
      console.log(users.results)
      this.setState({ employees: users.results })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <>
        <table>
          <tbody>
            {
              this.state.employees.map((employee, i, arr) => <tr key={i}>
                <td>{arr[i].name.first}</td>
                <td>{employee.name.last}</td>
              </tr>)
            }
          </tbody>
        </table>
      </>
    );
  }

}

export default App;
