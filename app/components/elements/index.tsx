import TextElement, { explain as TextExplain } from "./TextElement";
import ImageElement, { explain as ImageExplain } from "./ImageElement";

const componentsMap = {
  TextElement: {
    component: TextElement,
    ...TextExplain
  },
  ImageElement: {
    component: ImageElement,
    ...ImageExplain
  },
}

export default componentsMap;