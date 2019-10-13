import React from "react";
import Timer from "./Timer";
import "./styles/AttendanceStartTD.css";
import PropTypes from "prop-types";
import ConfirmCancel from "./ConfirmCancel";
import { connect } from "react-redux";
import SignedInTracker from "./SignedInTracker";

/**
 * These are 3 tds that provide information on the
 * attendance session, they tell the code, the amount
 * of time left for the attendance session, and the
 * amount of students that have recorded themselves as
 * present
 */
class AttendanceStartTD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wantsToCancel: false
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.storeTime = this.storeTime.bind(this);
    this.time = 0;
  }

  storeTime = () => {
    this.time++;
  };

  handleCancel = () => {
    if (this.state.wantsToCancel) {
      this.setState({
        wantsToCancel: false
      });
    } else {
      this.setState({
        wantsToCancel: true
      });
      setTimeout(function() {
        for (let element of document.getElementsByClassName("visibility")) {
          element.style.visibility = "visible";
        }
      }, 900);
    }
  };

  render() {
    let attendanceStartTD;
    if (!this.state.wantsToCancel && this.time === 0) {
      attendanceStartTD = (
        <React.Fragment>
          <td className="attendance-td">{this.props.code}</td>
          <Timer
            storeTime={this.storeTime}
            name={this.props.data.name}
            timesUp={this.props.timesUp}
            goalTime={this.props.goalTime}
          />
          <td id="signed-attendanceTD" className="attendance-td">
            <SignedInTracker totalCount={this.props.data.students.length} />
          </td>
          <td
            id="cancel-attendanceTD"
            className="attendance-td"
            onClick={this.handleCancel}
          >
            Cancel
          </td>
        </React.Fragment>
      );
    } else if (!this.state.wantsToCancel && this.time !== 0) {
      clearInterval(this.startTimer);
      attendanceStartTD = (
        <React.Fragment>
          <td className="attendance-td">{this.props.code}</td>
          <Timer
            storeTime={this.storeTime}
            currentTime={this.time}
            name={this.props.name}
            timesUp={this.props.timesUp}
            goalTime={this.props.goalTime}
          />
          <td id="signed-attendanceTD" className="attendance-td">
            <SignedInTracker totalCount={this.props.data.students.length} />
          </td>
          <td
            id="cancel-attendanceTD"
            className="attendance-td"
            onClick={this.handleCancel}
          >
            Cancel
          </td>
        </React.Fragment>
      );
    } else {
      this.startTimer = setInterval(this.storeTime, 1000);
      attendanceStartTD = (
        <ConfirmCancel
          cancelAttendance={this.props.cancelAttendance}
          closeCancelBox={this.handleCancel}
          id={this.props.data.id}
        />
      );
    }
    return <React.Fragment>{attendanceStartTD}</React.Fragment>;
  }
}

AttendanceStartTD.propTypes = {
  /** The attendance code */
  code: PropTypes.string.isRequired,
  /** The name of the classroom */
  name: PropTypes.string.isRequired,
  /**
   * Function that occurs when time is up,
   * meant to be passed down as props to the
   * **Timer** component
   */
  timesUp: PropTypes.func.isRequired
};

export default AttendanceStartTD;
