const { Lambda } = require('aws-sdk');
const { findFunction } = require('./finder');

module.exports.findFnWith = (capabilities, context = 'some app') => {
  if (!capabilities) {
    throw new Error('no capabilities have been provided');
  }

  const finderPromise = findFunction(capabilities);

  const fn = async (data, logFn) => {
    const lambda = new Lambda();
    const result = await finderPromise;

    if (!result) {
      throw new Error('no function found with requested capabilities');
    }

    const { name, qualifier } = result;

    if (logFn) {
      logFn('building params...');
    }

    const params = {
      ClientContext: context,
      FunctionName: name,
      InvocationType: 'RequestResponse',
      LogType: 'Tail',
      Payload: data ? JSON.stringify(data) : '',
    };

    if (qualifier) {
      params.Qualifier = qualifier;
    }

    if (logFn) {
      logFn('invoking lambda function');
    }

    const { FunctionError, Payload } = await lambda.invoke(params).promise();

    if (FunctionError) {
      throw new Error(FunctionError);
    }

    return JSON.parse(Payload);
  };

  return fn;
};
