const Response = require("../model/Response");
const httpStatus = require("http-status");
const History = require("../model/History");


const getHistory = async (req, res) => {
    let response = null;
    try {
        const userId = req.currentUser._id;
        const history = await History.find({ userId: userId });
        if(!history){
            response = new Response.Error(true, errorMessages);
            res.status(httpStatus.BAD_REQUEST).json(response);
            return;
        };
        response = new Response.Success(false, null, history);
        res.status(httpStatus.OK).json(response);
    } catch (error) {
        response = new Response.Error(true, error.message);
        res.status(httpStatus.BAD_REQUEST).json(response);
    }
};

module.exports = { getHistory };