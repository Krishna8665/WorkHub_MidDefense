import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign(
    { _id: user._id, isSeller: user.isSeller },
    process.env.JWT_SECRET
  );

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      message: 15 * 60 * 1000,
    })
    .json({
      success: true,
      message,
    });
};
