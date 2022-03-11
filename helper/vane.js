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
    totalRecord: {
      type: 'number',
      defaultsTo: 1
    },
    data: {
      type: "ref",
      defaultsTo: {},
    }
  },
  exits: {
    success: {
      description: "All done.",
    },
  },
  fn: async function ({ model, totalRecord, data: overwriteValues }) {
    const factoryPath = path.resolve(
      process.cwd(),
      `config/factories/${model}`
    );

    const factoryValues = require(factoryPath);
    const initialValues = { ...factoryValues, ...overwriteValues };

    let result = null;
    const model = sails.models[model]
    if(totalRecord <= 1){
     result =  await model.create(initialValues).fetch();
    }else {
      const initialValuesArray = [];
      for (let i = 0; i < totalRecord; i++) {
        initialValuesArray.push(initialValues)
      }
      result = await model.createEach(initialValuesArray).fetch();
    }

    return result;
  },
};
