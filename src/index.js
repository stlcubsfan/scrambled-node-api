const fastify = require('fastify')({
  logger: true
})

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:32768/scrambled-dev', {useNewUrlParser: true})
  .then(() => fastify.log.info('MongoDB connected...'))
  .catch(err => fastify.log.error(err))

fastify.get('/', async (req, rep) => {
  const heartbeat = await mongoose.connection.db.stats()
  return {ok: heartbeat.ok}
})

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000)
    fastify.log.info(`Server running on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log(err)
    process.exit(1)
  }
}

start()