module.exports = {
  ChoicePayload: {
    __resolveType(payload, context, info) {
      if (payload.choice) {
        return "Choice"
      }
      return null;
    }
  },
}