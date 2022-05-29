import jwt from "jsonwebtoken";

const secret = "test";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    // console.log(req.headers)

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      console.log(1);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      // console.log(2)

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
