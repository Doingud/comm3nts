import { Heading } from "@chakra-ui/react";
import FormikStepper from '../Stepper';
import WidgetName from "./steps/WidgetName";
import WidgetLayout from "./steps/WidgetLayout";
import WidgetReferenceKind from "./steps/WidgetReferenceKind";
import ReferenceKind from "./steps/ReferenceKind";
import Submit from "./steps/Submit";
import { createWidget, IChannelType } from "../../utils/comm3nt";
import { useCeramicContext } from "../../../context";

function WidgetCreateStepper () {
  const { state: { composeClient } } = useCeramicContext()
  function save (values) {
    return createWidget(composeClient, {
      name: values.name,
      ref: values.context,
      reverse: values.reverse,
      channels: [],
    });
  }
  return (
    <FormikStepper 
      initialValues={{
        name: '',
        reverse: false,
        kind: 'nft',
        ref: {},
      }}
      onSubmit={(values, actions) => {
        save(values).then(() => actions.setSubmitting(false));
      }}
    >
      <WidgetName />
      <WidgetLayout />
      <WidgetReferenceKind />
      <ReferenceKind 
      />
      <Submit />
    </FormikStepper>
    // <Heading size="md">
    //   Name your widget
    // </Heading>
  )
}

export default WidgetCreateStepper;