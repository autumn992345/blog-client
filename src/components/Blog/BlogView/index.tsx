// node_modules
import React from "react";
import { useHistory, Link } from "react-router-dom";
import {
    Text,
    Image,
    Stack,
    Divider,
    Button,
    Box,
    Flex,
    useToast,
} from "@chakra-ui/react";
import { ThumbUpRounded, EditRounded } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";

// store
import { fetchDeleteBlog, fetchThumbUp } from "../../../store/blogs-slice";
import { RootState } from "../../../store";

// models
import Blog from "../../../models/Blog";

// config
import { BASE_SERVER_API_URL } from "../../../config";

// consts
import { PATH } from "../../../consts";

// props type
type Props = {
    blog: Blog;
};

const BlogViewComponent: React.FC<Props> = ({ blog, ...props }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const me = useSelector((state: RootState) => state.me.me);
    const toast = useToast();

    const onThumbUp = () => {
        dispatch(
            fetchThumbUp(blog.blog_id, (error: string) => {
                toast({
                    title: `${error}`,
                    status: "error",
                    isClosable: true,
                    duration: 3000,
                });
            })
        );
    };

    const onDeleteBlog = () => {
        dispatch(fetchDeleteBlog(blog.blog_id));
        history.push(PATH.BLOGS);
    };

    return (
        <>
            <Stack
                border={"1px solid lightgray"}
                mt={"8px"}
                paddingLeft={"5px"}
                paddingRight={"5px"}
                boxShadow="sm"
                _hover={{ boxShadow: "md" }}
                cursor={"pointer"}
            >
                <Flex justifyContent={"space-between"}>
                    <Text fontSize={"24px"} lineHeight="1em" padding="15px 10px 0px 15px">{blog.title}</Text>
                    <Text lineHeight="1em" padding="20px 10px 0px 15px">{blog.username}</Text>
                </Flex>
                <Divider></Divider>
                <Text padding={"5px 10px 0px 25px"} minHeight={"150px"} overflowY={"hidden"}>
                    {blog.content}
                </Text>
                <Divider></Divider>
                {blog.imagePath && (
                    <Image
                        width={"100%"}
                        // height={"300px"}
                        src={`${BASE_SERVER_API_URL}${blog.imagePath}`}
                    />
                )}
                {blog.imagePath && <Divider></Divider>}
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"flex-end"}
                    pb="5px"
                    pr="10px"
                >
                    <Button size="sm" onClick={onThumbUp}>
                        <ThumbUpRounded />
                    </Button>
                    &nbsp;&nbsp;
                    {blog.like}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {me.id === blog.userId && (
                        <Box>
                            <Link to={`${PATH.UPDATE}/${blog.blog_id}`}>
                                <Button size={"sm"}>
                                    <EditRounded />
                                    Update
                                </Button>
                            </Link>
                        </Box>
                    )}
                </Box>
            </Stack>
        </>
    );
};

export default BlogViewComponent;
