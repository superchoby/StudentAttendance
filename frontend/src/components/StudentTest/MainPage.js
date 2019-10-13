import React from "react";
import axios from "axios";

class StudentTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: "",
      classHasAttendance: false
    };
    this.submit = this.submit.bind(this);
  }

  submit = () => {
    console.log("osu");
  };
  componentDidMount() {
    axios
      .post("http://127.0.0.1:8080/users/v1/getstudent", {
        email: "student@student.com",
        password: "123"
      })
      .then(res => {
        console.log(res.data);
        console.log(res.data.class_info);
        this.setState({
          info: res.data
        });
        for (let index in res.data.class_info) {
          let code = res.data.class_info[index].ClassCode;
          if (typeof code !== "undefined" && code !== "") {
            this.setState({
              classHasAttendance: true
            });
            break;
          }
        }
      })
      .catch(err => {
        console.log("There was an error");
      });
  }

  render() {
    let thing = this.state.classHasAttendance ? (
      <form onSubmit={this.submit}>
        <input type="text"></input>
      </form>
    ) : (
      <p>wutup</p>
    );
    return <div>{thing}</div>;
  }
}

export default StudentTest;
