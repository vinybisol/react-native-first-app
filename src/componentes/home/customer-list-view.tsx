
import { FlatList, Modal, StyleSheet, View, Text, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import ICustomerInterface from '../../model/customer-interface';
import customerHook from '../../hooks/people-hook';
import CustomerItemView from './customer-item-view';
import CustomerDataModal from '../modal/customer-data-modal';

export default function CustomerListView() {
    const [listOfCustomer, setListOfCustomer] = useState<ICustomerInterface[]>([]);
    const [customer, setCustomer] = useState<ICustomerInterface>();
    const [modalVisible, setModalVisible] = useState(false);
    const { getCustomerAsync, upsertCustomerAsync, deleteCustomerAsync } = customerHook();

    useEffect(() => {
        const fetchData = async () => {
            await getCustomer();
        };
        fetchData();
    }, []);

    async function getCustomer() {
        const listOfPeople = await getCustomerAsync();
        setListOfCustomer(listOfPeople);
    }

    function openModal(canOpemModal: boolean, customer: ICustomerInterface) {
        setCustomer(customer);
        setModalVisible(canOpemModal);
    };

    function saveCustomer(customer: ICustomerInterface) {
        const save = async () => {
            if (customer) {
                await upsertCustomerAsync(customer);
                setModalVisible(false);
                await getCustomer();
            }
        }
        save();
    }

    function deleteCustomer(customer: ICustomerInterface) {
        const del = async () => {
            await deleteCustomerAsync(customer);
            await getCustomer();
        }
        del();
    }

    function addCustomer() {
        setCustomer(undefined);
        setModalVisible(true);
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={listOfCustomer}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                renderItem={({ item }) => <CustomerItemView customer={item} onPressOpenModal={openModal} deleteItem={deleteCustomer} />}
            />

            <Modal
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <CustomerDataModal customer={customer} setModalVisible={setModalVisible} saveCustomer={saveCustomer} />
            </Modal>

            <View style={styles.buttonAdd}>
                <Pressable onPress={() => addCustomer()}>
                    <Text>Adicionar</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonAdd: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 50,
    }
});

