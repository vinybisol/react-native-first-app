import { useEffect, useState } from "react";
import { Text, TextInput, Pressable, View, StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';


export default function CustomerDataModal({ customer, setModalVisible, saveCustomer }: any) {
    const [name, setName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [gender, setGender] = useState<string>('')

    const [openDate, setOpenDate] = useState(false)

    useEffect(() => {
        if (customer) {
            setName(customer.name)
            setLastName(customer.lastName)
            setDate(new Date(customer.birthDate))
            setGender(customer.gender)
        }
    }, [customer])

    function saveOrEditCustomer() {
        const newCustomer = {
            id: customer?.id,
            name: name,
            lastName: lastName,
            birthDate: date,
            gender: gender
        }
        saveCustomer(newCustomer)
    }

    return (
        <View style={styles.modalView}>
            <View style={styles.content}>
                <Text style={styles.modalText}>Cliente: </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    maxLength={30}
                    value={name}
                    onChangeText={(text) => setName(text)}
                    keyboardType="name-phone-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Sobrenome"
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                    maxLength={30}
                    keyboardType="name-phone-pad"
                />
                <Pressable
                    style={styles.input}
                    onPress={() => setOpenDate(true)}>
                    <Text>{date?.toLocaleDateString()}</Text>
                    {
                        openDate &&
                        <DateTimePicker
                            value={date!}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setDate(selectedDate)
                                setOpenDate(false)
                            }} />
                    }
                </Pressable>
                <TextInput
                    style={styles.input}
                    placeholder="Genero"
                    value={gender}
                    onChangeText={(text) => setGender(text.toUpperCase())}
                    maxLength={1}
                    keyboardType="name-phone-pad"
                />
                <View style={styles.buttonArea}>
                    <Pressable
                        style={styles.button}
                        onPress={() => setModalVisible(false)}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonSalvar]}
                        onPress={() => {

                            saveOrEditCustomer()
                            setModalVisible(false)
                        }}>
                        <Text style={styles.buttonText} >Salvar</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: 20,
        margin: 20,
    },
    content: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    modalText: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    input: {
        width: "80%",
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        height: 40,
        margin: 10,
        padding: 5
    },
    buttonArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "80%",
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderRadius: 8,
    },
    buttonSalvar: {
        backgroundColor: 'blue',
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
    }
});
