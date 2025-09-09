import axios from "axios";

const URI = "http://api.quotable.io/random";

const getData = async () => {
  try {
    const { data } = await axios.get(URI);
    return data.content.split(" ");
  } catch (error) {
    console.log(error);
  }
};

export default getData;
