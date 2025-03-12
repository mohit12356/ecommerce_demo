import { v4 as uuidv4 } from "uuid";
import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";
import img4 from "./assets/img4.jpg";
import img5 from "./assets/img5.jpg";
import img6 from "./assets/img6.jpg";

const images = [
  {
    id: uuidv4(),
    imgUrl: img1,
  },
  {
    id: uuidv4(),
    imgUrl: img2,
  },
  {
    id: uuidv4(),
    imgUrl: img3,
  },
  {
    id: uuidv4(),
    imgUrl: img4,
  },
  {
    id: uuidv4(),
    imgUrl: img5,
  },
  {
    id: uuidv4(),
    imgUrl: img6,
  },
];

export default images;
