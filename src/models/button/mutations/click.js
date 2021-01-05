import {
  GraphQLBoolean,
  GraphQLString,
} from 'graphql';
import pubsub from '../../../middleware/graphql/pubsub';

export default {
  type: GraphQLBoolean,
  args: {
    classId: { type: GraphQLString },
    buttonId: { type: GraphQLString },
    clickOn: { type: GraphQLBoolean },
  },
  resolve:
    async (v, { classId, buttonId, clickOn }) => {
      try {
        await pubsub.publish('clicked', { classId, buttonId, clickOn });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
};
