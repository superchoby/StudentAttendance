import React from "react";
import "./styles/DefaultTime.css";
import { storeDefaultTime } from "../../../actions/index";
import { connect } from "react-redux";
import axios from "axios";

function mapDispatchToProps(dispatch) {
  return {
    changeTime: time => dispatch(storeDefaultTime(time))
  };
}

const mapStateToProps = state => {
  return {
    goalTime: state.time,
    instructorId: state.id
  };
};

/**
 * Shows the attendance time set by the teacher
 */
class DefaultTimeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wantToChangeTime: false,
      goalTime: 0
    };
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.changeTime = this.changeTime.bind(this);
  }

  changeTime = e => {
    e.preventDefault();
    let timeValues = document.getElementsByClassName("time-change-inputs");
    let minutes = parseInt(
      timeValues[0].value !== "" ? timeValues[0].value : "0"
    );
    let seconds = parseInt(
      timeValues[2].value !== "" ? timeValues[2].value : "0"
    );
    let timeConverted = minutes * 60 + seconds;
    this.setState(
      {
        goalTime: timeConverted,
        wantToChangeTime: false
      },
      function() {
        let url =
          "http://127.0.0.1:8080/users/v1/updateinstructortime/" +
          this.props.instructorId;
        axios.put(url, { time: this.state.goalTime });
      }
    );
    this.props.changeTime(timeConverted);
  };

  handleTimeChange = e => {
    this.setState({
      wantToChangeTime: true
    });
  };

  componentDidUpdate() {
    if (this.props.goalTime !== this.state.goalTime) {
      this.setState({
        goalTime: this.props.goalTime
      });
    }
  }

  render() {
    let minutes = Math.floor(this.state.goalTime / 60).toString();
    let seconds = (this.state.goalTime % 60).toString();
    let secondsAdjusted = seconds.length === 2 ? seconds : "0" + seconds;
    let timeDisplay = this.state.wantToChangeTime ? (
      <form onSubmit={this.changeTime}>
        <input defaultValue={minutes} className="time-change-inputs" />
        <p className="time-change-inputs" style={{ textDecoration: "none" }}>
          {":"}
        </p>
        <input defaultValue={secondsAdjusted} className="time-change-inputs" />
        <input style={{ display: "none" }} type="submit" value="set" />
      </form>
    ) : (
      minutes + ":" + secondsAdjusted
    );
    let changeButton = this.state.wantToChangeTime ? (
      <p style={{ display: "none" }}></p>
    ) : (
      <p onClick={this.handleTimeChange}>change</p>
    );
    return (
      <div className="default-time-div">
        <span>Default Attendance Time:</span>
        <div>{timeDisplay}</div>
        {changeButton}
      </div>
    );
  }
}

const DefaultTime = connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultTimeComponent);

export default DefaultTime;
