const unauthorized = () => { throw new Error('Unauthorized'); };

const authWithUser = (func) => ({ session }, ...args) => ((session
    && session.teacher) ? func(session.teacher, ...args) : unauthorized());

const auth = (func) => authWithUser((_, ...args) => func(...args));

export { auth, authWithUser };
