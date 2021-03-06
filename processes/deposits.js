/************************************************/
/*                    ATTENTION                 */ 
/*************************************************

  This process is designed to be customized.

  The `DepositProcessor` class exposes a simple
  framework for converting deposits into outgoing
  ripple payments according to business rules.

  To override the default business rules for the 
  processing of a deposit, pass a custom middleware
  function to the constructor of DepositProcessor.

  Your middlware function will be called by the
  framework when a pending deposit is in the queue,
  and it is also provided a callback function hook.

  The callback function of your middleware accepts
  an error and a payment object with three
  fields in order to enqueue an outgoing payment.

  - ripple_address_id (integer)
  - amount (decimal)
  - currency (string)

/************************************************/

var DepositProcessor = require(__dirname+'/../lib/deposit_processor.js');

var depositMiddleware;

var middlewarePath = process.env.DEPOSIT_MIDDLEWARE;

if (middlewarePath) {

  depositMiddleware = require(middlewarePath);

} else {

  depositMiddleware = function(deposit, fn) {

    var amount = deposit.amount * 0.98; // 2% deposit fee

    fn(null, {
      to_address_id: deposit.to_address_id,
      amount: amount,
      currency: deposit.currency
    });

  };

}

depositProcessor = new DepositProcessor(depositMiddleware);

depositProcessor.start();

