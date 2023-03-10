const Cart = require("../models/cart");

function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    //you update code here

    Cart.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((result) => resolve())
      .catch((err) => reject(err));
  });
}
exports.addItemtoCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      // if cart already exists then update cart by quantity
      let promiseArray = [];

      req.body.cartItems.forEach((cartItem) => {
        const product = cartItem.product;
        const item = cart.cartItems.find((c) => c.product == product);
        let condition, update;
        if (item) {
          condition = { user: req.user._id, "cartItems.product": product };
          update = {
            $set: {
              "cartItems.$": cartItem,
            },
          };
        } else {
          condition = { user: req.user._id };
          update = {
            $push: {
              cartItems: cartItem,
            },
          };
        }
        promiseArray.push(runUpdate(condition, update));
      });
      Promise.all(promiseArray)
        .then((response) => res.status(201).json({ response }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      // ====if cart not exist then create a new cart
      const cart = new Cart({
        user: req.user._id,
        cartItems: req.body.cartItems,
      });
      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          return res.status(201).json({ cart });
        }
      });
      //=============================================
      // if cart not exist then create a new cart
      //   const product = req.body.cartItems.product;
      //   const item = cart.cartItems.find((c) => c.product == product);
      //   let condition, update;
      //   if (item) {
      //     Cart.findOneAndUpdate(
      //       {
      //         user: req.user._id,
      //         "cartItems.product": product,
      //       },
      //       {
      //         $set: {
      //           cartItems: {
      //             ...req.body.cartItems,
      //             quantity: item.quantity + req.body.cartItems.quantity,
      //           },
      //         },
      //       }
      //     ).exec((err, cart) => {
      //       if (err) return res.status(400).json({ error });
      //       else if (cart) return res.status(201).json({ cart });
      //     });
      //   }
      // } else {
      //   Cart.findOneAndUpdate(
      //     {
      //       user: req.user._id,
      //     },
      //     {
      //       $push: {
      //         cartItems: req.body.cartItems,
      //       },
      //     }
      //   ).exec((err, _cart) => {
      //     if (err) return res.status(400).json({ err });
      //     if (_cart) return res.status(201).json({ cart: _cart });
      //   });
      //=========
    }
  });
};

//   ===================
// Cart.findOneAndUpdate(condition, update, { new: true }).exec();
// .exec((error, _cart) => {
//     if(error) return res.status(400).json({ error });
//     if(_cart){
//         //return res.status(201).json({ cart: _cart });
//         updateCount++;
//     }
// })
// });
//=============================
