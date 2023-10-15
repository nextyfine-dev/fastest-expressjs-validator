import crypto from "node:crypto";

const mockData = {
  query: {
    name: "Mr. Deep",
    randomStr: crypto.randomBytes(4).toString("hex"),
  },
  body: {
    userName: "deep",
    email: "example@deep.com",
    password: crypto.randomBytes(4).toString("hex"),
  },
  param: "01",
  headers: {
    hasauth: "true",
  },
};

export default mockData;
