const HttpRespone = (req, status = 200, data = null, message = "Success") => {
  const response = {
    success: true,
    httpStatus: status,
    urlPath: req.path,
    message,
    data,
  };

  return response;
};

export default HttpRespone;
