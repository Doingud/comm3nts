import { Button, Center } from "@chakra-ui/react";
import ReferenceCard from "../../reference/ReferenceCard";
import { useFormikContext } from "formik";
import useResolveReference from "../../../hooks/useResolveReference";
import { useEffect } from "react";

function Submit (props) {
  const { values, submitForm } = useFormikContext();

  return (
    <>
      <ReferenceCard reference={values} />
      <Center gap='4'>
        <Button
          onClick={props?.previousStep}
        >
          Previous
        </Button>
        <Button
          colorScheme='blue'
          onClick={submitForm}
        >
          Submit
        </Button>
      </Center>
    </>
  )
}

export default Submit;