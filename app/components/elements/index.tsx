import TextElement, { explain as TextExplain } from "./TextElement";
import ImageElement, { explain as ImageExplain } from "./ImageElement";
import BrowserContainer, { explain as BrowserContainerExplain } from "./BrowserContainer";
import Code, { explain as CodeExplain } from "./Code";
import VSCodeContainer, { explain as VSCodeContainerExplain } from "./VsCodeContainer";
import MessageSimulate, { explain as MessageSimulateExplain } from "./MesageSimulate";
import CustomerTestimonialSimulate, { explain as CustomerTestimonialSimulateExplain } from "./CustomerTestimonialSimulate";
import Container, { explain as ContainerExplain } from "./Container";
import Avatar, { explain as AvatarExplain } from "./Avatar";
import Space, { explain as SpaceExplain } from "./Space";

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
  }, 
  VSCodeContainer: {
    component: VSCodeContainer,
    ...VSCodeContainerExplain
  },
  MessageSimulate: {
    component: MessageSimulate,
    ...MessageSimulateExplain
  },
  CustomerTestimonialSimulate: {
    component: CustomerTestimonialSimulate,
    ...CustomerTestimonialSimulateExplain
  },
  Container: {
    component: Container,
    ...ContainerExplain
  },
  Avatar: {
    component: Avatar,
    ...AvatarExplain
  },
  Space: {
    component: Space,
    ...SpaceExplain
  }
}

export default componentsMap;