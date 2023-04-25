import React, {FC, useState} from 'react';
import {Box, Text, Flex, Button} from '@chakra-ui/react';
import { mintAnimalTokenContract } from '../contracts';


interface MainProps {
    // string 타입만 받음
    account : string
}

// Generic => MainProps
const Main: FC<MainProps> = ({account}) => {
    const [newAnimalCard, setNewAnimalCard] = useState<string>() // 초기값 null

    const onClickMint = async () => {
        try {
            // 계정이 없는 경우 바로 return
            if ( account ) return

            // 계정이 있는 경우
            const response = await mintAnimalTokenContract.methods
            .mintAnimalToken() // 컨트랙트 함수
            .send({ from: account})
            
            console.log(response)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Flex 
            w="full"
            h="100vh"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            >
            <Box>
                {newAnimalCard ? (
                    <div>AnimalCard</div>
                ) : (
                    // 에러 발생 무시
                    <Text>Let's mint Animal Card!!!</Text>
                )}
            </Box>
            <Button mt={4} size='sm' colorScheme='blue' onClick={onClickMint}>Mint</Button>
        </Flex>
    );
};

export default Main