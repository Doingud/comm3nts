import { Heading } from "@chakra-ui/react";
import FormikStepper from '../Stepper';
import WidgetName from "./steps/WidgetName";
import WidgetLayout from "./steps/WidgetLayout";
import WidgetReferenceKind from "./steps/WidgetReferenceKind";
import ReferenceKind from "./steps/ReferenceKind";
import Submit from "./steps/Submit";
import { createWidget, IChannelType } from "../../utils/comm3nt";
import { useCeramicContext } from "../../../context";
import { useRouter } from "next/router";

function WidgetCreateStepper () {
  const { state: { composeClient } } = useCeramicContext()
  const { push } = useRouter()

  async function save (values: any) {
    // console.log('saving widget', values)
    const res = await createWidget(composeClient, {
      name: values.name,
      ref: values.contextId,
      reverse: values.reverse,
      channels: [],
    });
    // console.log('widget created', res);
    push(`/widgets/${res?.id}`)
  }

  return (
    <FormikStepper 
      initialValues={{
        name: '',
        reverse: false,
        kind: 'nft',
        ref: {},
        channels: [],
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