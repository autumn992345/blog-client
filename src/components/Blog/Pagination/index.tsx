// node_modules
import React, { useEffect, useState } from "react";
import { Box, Text, Button, Input } from "@chakra-ui/react";

// props type
type Props = {
    allPagesNumber: number;
    itemsPerPage: number;
    itemsNumber: number;
    pageChange: (page: number) => void;
};

const PaginationComponent: React.FC<Props> = ({
    allPagesNumber,
    pageChange,
}) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        pageChange(currentPage);
    }, [currentPage, pageChange]);

    useEffect(() => {
        if (currentPage > allPagesNumber) {
            setCurrentPage(allPagesNumber ? allPagesNumber : 1);
        }
    }, [allPagesNumber, setCurrentPage, currentPage]);

    const onFirstPage = (): void => {
        setCurrentPage(1);
    };

    const onLastPage = (): void => {
        setCurrentPage(allPagesNumber);
    };

    const onNextPage = (): void => {
        setCurrentPage(currentPage + 1);
    };

    const onPreviousPage = (): void => {
        setCurrentPage(currentPage - 1);
    };

    const validateInput = (value: string) => {
        const regex = /^[0-9\b]+$/;
        const regexTest = regex.test(value);
        if (regexTest) {
            let newPage = parseInt(value, 10);
            if (newPage < 1) {
                newPage = 1;
            } else if (newPage > allPagesNumber) {
                newPage = allPagesNumber;
            }
            setCurrentPage(newPage);
        }
    };

    return (
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Button
                mr="5px"
                bgColor="#c0d5eb"
                borderRadius="0"
                size="sm"
                disabled={currentPage <= 1}
                onClick={() => onFirstPage()}
            >
                First
            </Button>
            <Button
                mr="5px"
                bgColor="#c0d5eb"
                size="sm"
                borderRadius="0"
                disabled={currentPage <= 1}
                onClick={() => onPreviousPage()}
            >
                Previous
            </Button>
            <Box>
                <Input
                    size="sm"
                    borderRadius="0"
                    onChange={(e) => validateInput(e.target.value)}
                    value={currentPage}
                    width={"50px"}
                />
                &nbsp;/&nbsp;
                <Text display={"inline"}>{allPagesNumber}</Text>
            </Box>
            <Button
                ml="5px"
                bgColor="#c0d5eb"
                size="sm"
                borderRadius="0"
                disabled={currentPage >= allPagesNumber}
                onClick={() => onNextPage()}
            >
                Next
            </Button>
            <Button
                ml="5px"
                bgColor="#c0d5eb"
                size="sm"
                borderRadius="0"
                disabled={currentPage >= allPagesNumber}
                onClick={() => onLastPage()}
            >
                Last
            </Button>
        </Box>
    );
};

export default PaginationComponent;
