import backend from "../../global/backend";
import fetchWithCache from "../../global/fetchWithCache";

export default function test(req, res) {
  const url = `${backend}/projects/getallprojects`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  getAllProjects();
  async function getAllProjects() {
    const data = await fetchWithCache(url, options);
    res.status(200).json(data);
  }
}
