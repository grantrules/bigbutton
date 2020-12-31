import { RedisPubSub } from 'graphql-redis-subscriptions';
import redis from 'redis';

const publisher = redis.createClient('redis://redis');
const subscriber = redis.createClient('redis://redis');

export default new RedisPubSub({ publisher, subscriber });
