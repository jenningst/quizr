const Question = require('./questionModel');

module.exports = {
  QuestionPayload: {
    __resolveType(payload, context, info) {
      if (payload.question) {
        return "Question"
      }
      return null;
    }
  },
  Query: {
    questions: async function() {
      try {
        const questions = await Question.find({});
        if (questions.length > 0) {
          return questions.map(q => {
            // return doc w/o metadata; replace mongo _id with the question id
            return { ...q._doc, _id: q.id};
          })
        }
        return [];
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  Mutation: {
    createQuestion: async function(_, { input }) {
      const { title, choices } = input;
      let response = { question: null, details: {} };
      const newQuestion =  new Question({
        title,
        choices,
      });

      try {
        let createdQuestion = await newQuestion.save();
        response.question = { ...createdQuestion._doc, _id: createdQuestion.id };
        response.details = {
          code: 201,
          success: true,
          message: `New question created with id [${response.question._id}]`,
        };
      } catch (error) {
        response.details = {
          code: 500,
          success: false,
          message: `Failed to save question with error: [${error}]`
        };
      }
      return response;
    }
  }
};