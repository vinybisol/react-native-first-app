import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from "react-native"

export default function CustomerItemView({ customer, onPressOpenModal, deleteItem }: any) {
    function onPressOpenModalItem(e: GestureResponderEvent) {
        onPressOpenModal(true, customer)
    }
    function onDelete() {
        deleteItem(customer)
    }
    return (
        <View>
            <Pressable style={styles.container} onPress={onPressOpenModalItem} onLongPress={onDelete}>
                <Text style={styles.title}>{customer.name} {customer.lastName} </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    title: {
        fontSize: 32,
        fontFamily: 'Roboto',
    },
})