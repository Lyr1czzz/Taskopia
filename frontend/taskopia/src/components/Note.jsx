import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Heading,
    Text,
} from "@chakra-ui/react"
import moment from "moment";

export default function Note({title, description, createdAt}){
    return(
        <Card variant={"filled"}>
          <CardHeader>
            <Heading size={"md"}>{title}</Heading>
          </CardHeader>
          <Divider borderColor={"gray"}/>
          <CardBody>
            <Text>{description}</Text>
          </CardBody>
          <Divider borderColor={"gray"}/>
          <CardFooter>{moment(createdAt).format("DD/MM/YYYY hh:mm:ss")}</CardFooter>
        </Card>
    );
}