const path = require("path");
module.exports = {
  friendlyName: "Vane",
  description:
    "Create realistic test data for a given model using the model factory found in config/factories",
  inputs: {
    model: {
      type: "string",
      required: true,
    },
    data: {
      type: "ref",
      defaultsTo: {},
    },
    options: {
      type: "ref",
      defaultsTo: {},
    }
  },
  exits: {
    success: {
      description: "All done.",
    },
  },
  fn: async function ({ model, data: overwriteValues, options }) {
    const factoryPath = path.resolve(
      process.cwd(),
      `config/factories/${model}`
    );

    const factoryOptions = {
      count: 1, 
      ...options
    }

    const factoryValues = require(factoryPath).default;

    const initialValues = { ...factoryValues(), ...overwriteValues };
    const factoryModel = sails.models[model]

    if(factoryOptions.count === 1) {
      return await factoryModel.create(initialValues).fetch();
    }

    const initialValuesArray = Array.from({length: factoryOptions.count}, () => ({...factoryValues(), ...overwriteValues }) );

    return await factoryModel.createEach(initialValuesArray).fetch();
  },
};
