import { connect } from 'react-redux';
import QuestionComposer from '../components/QuestionComposer/index';
import {
  setStep,
  setMaxStepAllowed,
  setProblemType
} from '../actions';

// defines which state is available as props to the QuestionComposer component
function mapStateToProps(state) {
  return {
    modes: state.compose.modes,
    currentStep: state.compose.currentStep,
    maxStepAllowed: state.compose.maxStepAllowed,
    problemTypeIndex: state.compose.problemTypeIndex,
  };
};

// defines which dispatchers are available as props to the QuestionComposer component
const mapDispatchToProps = dispatch => ({
  setCurrentStep: step => dispatch(setStep(step)),
  setMaxStep: step => dispatch(setMaxStepAllowed(step)),
  setProblemType: index => dispatch(setProblemType(index))
});

// connects state and dispatchers (as props) to a function
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionComposer);
