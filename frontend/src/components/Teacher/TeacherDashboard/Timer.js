import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    time: state.time
  };
};

/**
 * Counts down the time that the attendance has left to go
 */
class TimerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      minutes: 0,
      seconds: 0,
      minutesSTR: "",
      secondsSTR: ""
    };
    this.countTime = this.countTime.bind(this);
    this.timerInterval = null;
  }

  /**
   * Stopwatch that goes on until the goal time
   * is reached
   */
  countTime = () => {
    if (this.state.seconds === 59) {
      this.setState({ minutes: this.state.minutes + 1, seconds: -1 });
    }
    let currentSeconds = this.state.seconds + 1;
    this.setState({
      minutesSTR: this.state.minutes.toString(),
      secondsSTR: ("0" + currentSeconds.toString()).slice(-2),
      seconds: currentSeconds
    });
    if (this.state.minutes * 60 + this.state.seconds === this.props.time) {
      clearInterval(this.timerInterval);
      this.props.timesUp(this.props.name);
    }
    this.props.storeTime();
  };

  /**
   * Sets an interval for the count time function to
   * occur every second
   */
  componentDidMount() {
    if (this.props.currentTime > this.props.time) {
      this.props.timesUp(this.props.name);
    } else if (this.props.currentTime != null) {
      let minutesPassed = Math.floor(this.props.currentTime / 60);
      let secondsPassed = this.props.currentTime % 60;
      this.setState(
        {
          minutes: minutesPassed,
          seconds: secondsPassed
        },
        function() {
          this.timerInterval = setInterval(() => {
            this.countTime();
          }, 1000);
        }
      );
    } else {
      this.timerInterval = setInterval(() => {
        this.countTime();
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  render() {
    return (
      <td className="attendance-td">
        {this.state.minutesSTR}:{this.state.secondsSTR}
      </td>
    );
  }
}

TimerComponent.propTypes = {
  /** Deals with when the attendance time is up */
  timesUp: PropTypes.func.isRequired,
  /** the name of the classroom */
  name: PropTypes.string.isRequired
};

const Timer = connect(mapStateToProps)(TimerComponent);

export default Timer;
