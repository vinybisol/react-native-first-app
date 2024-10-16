import { StyleSheet, View } from 'react-native';
import CustomerListView from './src/componentes/home/customer-list-view';


export default function App() {

  return (
    <View style={styles.container}>
      <CustomerListView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

