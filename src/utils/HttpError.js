import axios from "axios";
import respnonseConstant from "@/constants/respnonseConstant.js";
import serverConfig from "@/configs/serverConfig.js";

const HttpError = (error, req, status = 500) => {
  const response = {
    success: false,
    httpStatus: status,
    urlPath: req.path,
    message:
      status >= 500
        ? serverConfig.DEBUG
          ? error.message || respnonseConstant.SOMETHING_WENT_WRONG
          : respnonseConstant.SOMETHING_WENT_WRONG
        : error.message || respnonseConstant.SOMETHING_WENT_WRONG,
    data: null,
  };

  const isAxiosError = axios.isAxiosError(error);

  if (isAxiosError) {
    const axiosErrorMessage = error.response.data.message;
    if (axiosErrorMessage) {
      response.message = axiosErrorMessage;
    }

    response.httpStatus = error.response.status || status || 500;
  }

  const errorTrace = JSON.stringify(
    isAxiosError ? error.response.data : error.stack || {}
  );

  if (serverConfig.DEBUG) {
    response.trace = errorTrace;
  }

  // LoggerService.error(`Error Trace : ${errorTrace}`)
  return response;
};

// Exporting HTTP Error
export default HttpError;
