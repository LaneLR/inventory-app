let apiURL;

if (process.env.NODE_ENV === "development") {
  apiURL = process.env.APP_API_URL || "http://localhost:3000/api";
} else {
  apiURL = "/api";
}

export default apiURL;
