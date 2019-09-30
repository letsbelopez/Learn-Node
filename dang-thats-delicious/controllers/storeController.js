const mongoose = require("mongoose");
const Store = mongoose.model("Store");

exports.homePage = (req, res) => {
  res.render("index");
};

exports.addStore = (req, res) => {
  res.render("editStore", { title: "Add Store" });
};

exports.createStore = async (req, res) => {
  const store = await new Store(req.body).save();
  req.flash(
    "success",
    `Successfully created store ${store.name}. Care to leave a review?`
  );
  res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
  const stores = await Store.find();
  res.render("stores", { title: "Stores", stores });
};

exports.editStore = async (req, res) => {
  // find the store given the id
  const store = await Store.findById(req.params.id);
  // confirm they're the owner of the store

  // render the edit form so the user can update their store
  res.render(`editStore`, { title: `Edit ${store.name}`, store });
};

exports.updateStore = async (req, res) => {
  // find and update the store
  // redirect to store and say it worked
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // returns new store instead of old store
    runValidators: true
  }).exec();
  req.flash(
    "success",
    `Successfully updated ${store.name}. <a href="/stores/${store.slug}">View Store</a>`
  );
  res.redirect(`/stores/${store._id}/edit`);
};
