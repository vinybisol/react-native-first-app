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
                <Text style={styles.modalText}>Edição </Text>
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
                <TextInput
                    style={styles.input}
                    placeholder="Genero"
                    value={gender}
                    onChangeText={(text) => setGender(text.toUpperCase())}
                    maxLength={1}
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
                <View style={styles.buttonArea}>
                    <Pressable
                        style={[styles.button, styles.buttonSalvar]}
                        onPress={() => {

                            saveOrEditCustomer()
                            setModalVisible(false)
                        }}>
                        <Text style={styles.buttonText} >SALVAR</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonCancelar]}
                        onPress={() => setModalVisible(false)}>
                        <Text style={[styles.buttonText, { color: 'white' }]}>CANCELAR</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        alignItems: 'center',
    },
    content: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        borderRadius: 8,
    },
    modalText: {
        marginTop: 50,
        fontSize: 36,
        marginBottom: 50
    },
    input: {
        width: "90%",
        borderColor: 'black',
        borderWidth: 2,
        height: 50,
        margin: 10,
        padding: 10
    },
    buttonArea: {
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "90%",
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 2,
        height: 50,
        borderRadius: 5
    },
    buttonCancelar: {
        marginLeft: 5,
        backgroundColor: 'black',
    },
    buttonSalvar: {
        marginRight: 5,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 13,
        fontFamily: 'Roboto',
        fontWeight: 'bold'
    }
});
