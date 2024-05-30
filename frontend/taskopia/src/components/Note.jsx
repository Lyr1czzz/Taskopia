import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Heading,
    Text,
} from "@chakra-ui/react"
import moment from "moment";

export default function Note({id, title, description, createdAt, onDeleteSuccess}){

  const handleDelete = async () => {
    try {
      await onDeleteSuccess(id);
    } catch (error) {
      console.error('Ошибка при удалении заметки:', error);
    }
  }
  
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
          <Button colorScheme='red' onClick={handleDelete}>
            Удалить
          </Button>
        </Card>
    );
}