import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import teacherQueries from './models/teacher/queries';
import teacherMutations from './models/teacher/mutations';

import classQueries from './models/class/queries';
import classMutations from './models/class/mutations';

import studentQueries from './models/student/queries';
import studentMutations from './models/student/mutations';

import buttonMutations from './models/button/mutations';
import subscriptions from './subscriptions';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ...teacherQueries,
      ...classQueries,
      ...studentQueries,
      hi: {
        type: GraphQLString,
        args: {
          name: { type: GraphQLString },
        },
        resolve(v, { name }) {
          return `hi ${name}`;
        },
      },
      goodbye: {
        type: GraphQLString,
        resolve() {
          return 'goodbye';
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      ...teacherMutations,
      ...classMutations,
      ...studentMutations,
      ...buttonMutations,
    },
  }),
  subscription: new GraphQLObjectType({
    name: 'Subscription',
    fields: {
      ...subscriptions,
    },
  }),
});
