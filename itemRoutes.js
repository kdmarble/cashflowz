const controllers = require("./itemControllers");
const addItem = controllers.addItem;
const getItems = controllers.getItems;
const path = require("path");

const routes = (app) => {
    app.route('/items')
        .post(addItem)
        .get(getItems);
};

module.exports = routes;