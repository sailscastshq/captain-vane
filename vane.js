const path = require('path')
module.exports = {
  friendlyName: 'Vane',
  description: 'Create realistic test data for a given model using the model factory found in config/factories',
  inputs: {
    model: {
      type: 'string',
      required: true
    },
    data: {
      type: 'ref',
      defaultsTo: {}
    }
  },
  exits: {
    success: {
      description: 'All done.',
    },
  },
  fn: async function ({ model, data: overwriteValues }) {
    const factoryPath = path.resolve(process.cwd(), `config/factories/${model}`)

    const factoryValues = require(factoryPath)
    const initialValues = { ...factoryValues, ...overwriteValues }

    const result = await sails.models[model].create(initialValues).fetch()

    return result
  }
};
