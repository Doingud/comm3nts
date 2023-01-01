import Channels from "../comments/channels";
import { IWidget } from "../../utils/comm3nt";
import { useEffect } from "react";
import parseReference, { resolveReference } from "../../utils/reference";

function WidgetBox (widget: IWidget) {

  useEffect(() => {
    resolveReference(parseReference(widget.ref as string))
  }, []);
  return (
    <>
    {widget &&
      <Channels widget={widget}></Channels>
    }
    </>
  )
}
export default WidgetBox;