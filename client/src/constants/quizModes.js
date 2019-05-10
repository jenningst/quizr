const LEARNING_MODE = {
  ATTEMPTS: 3,
  FEEDBACK: true,
  REPORT: "NONE",
  TIMER: "NONE",
  PRELOAD_QUESTIONS: true,
};

const PREP_MODE = {
  ATTEMPTS: 1,
  FEEDBACK: true,
  REPORT: "QUESTION",
  TIMER: "QUESTION",
  PRELOAD_QUESTIONS: true,
};

const ADAPTIVE_MODE = {
  ATTEMPTS: 1,
  FEEDBACK: false,
  REPORT: "SET",
  TIMER: "SET",
  PRELOAD_QUESTIONS: false,
};

// RETRIES (BOOL): 
//  if TRUE: clear state and stay on current question
//  if FALSE: save answer set and move to next question

// FEEDBACK (BOOL):
//  if TRUE: show which answers were correct and incorrect
//  if FALSE: show no message to user

// REPORT (ENUM): --> advanced
//  if NONE: no post quiz analysis provided (completion)
//  if QUESTION: show post quiz analysis, question by question (visual break down)
//  if SET: show post quiz analysis, only for # correct vs. incorrect (basic results)

// TIMER (ENUM): --> advanced
//  if NONE: no timer
//  if QUESTION: new timer setup per question
//  if SET: timer setup for entire set

// QUESTION SET "PRELOAD" (BOOL):
//  if TRUE: get all question data ahead of time and run through it (preset)
//  if FALSE: get new question after every submission

export const MODES = {
  LEARNING_MODE,
  PREP_MODE,
  ADAPTIVE_MODE,
};