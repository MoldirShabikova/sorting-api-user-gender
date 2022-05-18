import { Component } from "react";
import "./styles.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      gender: "all"
    };
  }
  handleClick = () => {};
  getData = async () => {
    let gender = this.state.gender;
    const response = await fetch(
      `https://randomuser.me/api/?results=50&gender=${gender}`
    );
    const data = await response.json();
    this.setState({ users: data.results });
  };
  handleSelect = (event) => {
    this.setState({ gender: event.target.value });
  };

  render() {
    const data = this.state.users
      .filter((el) =>
        this.state.gender === "all"
          ? this.state.users
          : el.gender === this.state.gender
      )
      .map((user) => {
        const { login, name, picture, gender, dob } = user;
        return (
          <div key={login.uuid}>
            <h1>{name.first}</h1>
            <img src={picture.large} />
            <h3>
              {gender === "male" ? "he" : "she"} is {dob.age}
            </h3>
          </div>
        );
      });
    return (
      <div>
        <select onChange={this.handleSelect} value={this.state.gender}>
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button onClick={this.getData}>Get Data</button>
        {data}
      </div>
    );
  }
}
export default App;
