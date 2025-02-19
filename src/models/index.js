
import Blog from './blog.model.js'
import User from './user.model.js'

Blog.belongsTo(User);
User.hasMany(Blog);


Blog.sync({
    alter:true,
})

User.sync({
    alter:true,
})

export {
    Blog,
    User
}