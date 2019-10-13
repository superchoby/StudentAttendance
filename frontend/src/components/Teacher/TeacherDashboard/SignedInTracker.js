import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    currentCount: state.studentCount
  };
};

/**
 * Counts down the time that the attendance has left to go
 */
class StudentTrackerComponent extends React.Component {
  render() {
    return (
      <td className="attendance-td">
        {this.props.currentCount}:{this.props.totalCount}
      </td>
    );
  }
}

const SignedInTracker = connect(mapStateToProps)(StudentTrackerComponent);

export default SignedInTracker;
