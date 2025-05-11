const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('connected to the database')
    // const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
    // blogs.forEach(n => console.log(n.author,':',"\'", n.title,"\'",",",n.likes,'likes'))
  } catch (err) {
    console.log('failed to connect to the database')
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }