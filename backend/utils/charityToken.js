// create token and saving that in cookies
const sendCharityToken = (donor, statusCode, res) => {
  const token = donor.getJwtToken();

  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.status(statusCode).cookie("driver_token", token, options).json({
    success: true,
    donor,
    token,
  });
};

module.exports = sendCharityToken;
