const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')

const sequelize = new Sequelize(DATABASE_URL)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('Connected to the database')
    // const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
    // blogs.forEach(n => console.log(n.author,':',"\'", n.title,"\'",",",n.likes,'likes'))
  } catch (err) {
    // console.log(err)
    console.log('Failed to connect to the database')
    return process.exit(1)
  }

  return null
}

const migrationConf = {  
  migrations: {    
    glob: 'migrations/*.js',  
  },  
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),  
  context: sequelize.getQueryInterface(),  
  logger: console,
}

const runMigrations = async () => {  
  const migrator = new Umzug(migrationConf)    
  
  const migrations = await migrator.up()  
  console.log('Migrations up to date', {    
    files: migrations.map((mig) => mig.name),  
  })
}

const rollbackMigration = async () => {  
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)  
  await migrator.down()
}

module.exports = { connectToDatabase, sequelize, rollbackMigration }