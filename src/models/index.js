
import Blog from './blog.model.js'
import User from './user.model.js'
import ReadingList from './reading.list.model.js'
import Session from './session.model.js'

Blog.belongsTo(User);
User.hasMany(Blog);

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' });
Blog.belongsToMany(User, { through: ReadingList, as: 'users_reading' });

Session.belongsTo(User);
User.hasMany(Session);

// Blog.sync({
//     alter:true,
// })

// User.sync({
//     alter:true,
// })

export {
    Blog,
    User,
    Session
}