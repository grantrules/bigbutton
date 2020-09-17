import nanoid from 'nanoid';

const genId = nanoid.customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 4);

export default genId;