const getHomePage = (req , res ) => {
    //Process data -> Call Model
    res.render('sample.ejs')
}

const getABC = (req , res ) => {
    res.send("Check ABC")
}

module.exports = {
    getHomePage ,
    getABC
};
