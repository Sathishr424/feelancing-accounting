const config = process.env;

const verifyCookie = (req, res, next) => {
    const { cookies } = req;
    if ("seassion_authentication" in cookies) {
        if (cookies.seasion_id == config.seassion_authentication){
            next();
        }else{
            res.status(403).send({'error': "Invalid Cookie"});
        }
    }else {
        res.status(403).send({'error': "Cookie reqiured for authentication"});
    }
};

module.exports = verifyCookie;