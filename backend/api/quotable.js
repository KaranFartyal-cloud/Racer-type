import axios from "axios";

const URI = "http://api.quotable.io/random";

const getData = async () => {
  try {
    const { data } = await axios.get(
      // `http://api.quotable.io/quotes/random?minLength=200&maxLength=300`
      URI
    );
    return data.content.split(" ");
  } catch (error) {
    console.log(error);
  }
};

export default getData;

const getmoreData = async () => {
  try {
    const { data } = await axios.get(
      `http://api.quotable.io/quotes/random?minLength=200&maxLength=300`
    );

    // Since this endpoint returns an array, take the first quote
    return data[0].content.split(" ");
  } catch (error) {
    console.log(error);
  }
};

const daata = await getmoreData();
console.log(daata);
