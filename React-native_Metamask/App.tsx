import { StyleSheet, Text, View, Pressable } from "react-native";
import {
    WalletConnectModal,
    useWalletConnectModal,
} from "@walletconnect/modal-react-native";

const projectId = "d264aa5454b0454f53fd71ebfb0450d5";

const providerMetadata = {
    name: "",
    description: "",
    url: "",
    icons: [""],
    redirect: {
        native: "",
        universal: "",
    },
};

export default function App() {
    const { open, isConnected, address, provider } = useWalletConnectModal();

    const handleButtonPress = async () => {
        if (isConnected) {
            return provider?.disconnect();
        }
        return open();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>WalletConnect</Text>
            <Text>{isConnected ? address : "No Wallet Connected"}</Text>
            <Pressable
                onPress={handleButtonPress}
                style={styles.pressableMargin}
            >
                <Text>{isConnected ? "Disconnect" : "Connect"}</Text>
            </Pressable>
            <WalletConnectModal
                explorerRecommendedWalletIds={[
                    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
                ]}
                explorerExcludedWalletIds={"ALL"}
                projectId={projectId}
                providerMetadata={providerMetadata}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
    },
    pressableMargin: {
        marginTop: 16,
    },
});
