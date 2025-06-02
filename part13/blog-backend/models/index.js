const Blog = require('./blog')
const User = require('./user')
const Session = require('./session')
const ReadingList = require('./reading_list')

Blog.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'posted_by'
})

User.hasMany(Blog, {
    foreignKey: 'user_id',
    as: 'authored_blogs'
})

User.belongsToMany(Blog, {
    through: ReadingList,
    foreignKey: 'user_id',
    otherKey: 'blog_id',
    as: 'readings'
})
  
Blog.belongsToMany(User, {
    through: ReadingList,
    foreignKey: 'blog_id',
    otherKey: 'user_id',
    as: 'readers'
})

Session.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'active_session'
})

// Blog.sync({ alter: true })
// User.sync({ alter: true })
// ReadingList.sync({ alter: true })
// Session.sync({ alter: true })

module.exports = {
    Blog,
    User,
    ReadingList,
    Session
}