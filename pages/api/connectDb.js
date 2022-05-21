import dbConnect from "../../utils/dbConnect";

dbConnect();

export default async function handler(req, res) {
  res.status(200).json({
    connection: "successfull",
  });
}
