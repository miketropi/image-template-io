import TextElement, { explain as TextExplain } from "./TextElement";
import ImageElement, { explain as ImageExplain } from "./ImageElement";
import BrowserContainer, { explain as BrowserContainerExplain } from "./BrowserContainer";
import Code, { explain as CodeExplain } from "./Code";

const componentsMap = {
  TextElement: {
    component: TextElement,
    ...TextExplain
  },
  ImageElement: {
    component: ImageElement,
    ...ImageExplain
  },
  BrowserContainer: {
    component: BrowserContainer,
    ...BrowserContainerExplain
  },
  Code: {
    component: Code,
    ...CodeExplain
  }
}

export default componentsMap;