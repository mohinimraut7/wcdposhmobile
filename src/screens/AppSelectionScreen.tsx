import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const apps = [
  {
    id: '1',
    name: 'नारीशक्ती दूत',
    image: require('../assets/narishaktidut.jpeg'), // dummy image
    active: false,
  },
  {
    id: '2',
    name: 'Grievance',
    image: require('../assets/maziladkibahin.jpeg'), // dummy image
    active: false,
  },
  
  {
    id: '3',
    name: 'eKYC',
    image: require('../assets/ekycimg.jpeg'), // dummy image
    active: false,
  },
  {
    id: '4',
    name: 'MahaPOSH',
    image: require('../assets/poshimg.jpeg'), // dummy image
    active: true,
  },
];

const AppSelectionScreen = () => {
  const navigation = useNavigation<any>();

  const handlePress = (item: typeof apps[0]) => {
    if (!item.active) {
      Alert.alert('Coming Soon', 'हे module लवकरच उपलब्ध होईल.');
      return;
    }
    navigation.navigate('CompanyLogin');
  };

  const renderItem = ({ item }: { item: typeof apps[0] }) => (
    <TouchableOpacity
      style={[styles.card, !item.active && styles.cardDisabled]}
      onPress={() => handlePress(item)}
      activeOpacity={item.active ? 0.8 : 1}
    >
      <View style={[styles.imageBox, !item.active && styles.imageBoxDisabled]}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        {!item.active && <View style={styles.overlay} />}
      </View>
      <Text style={[styles.label, !item.active && styles.labelDisabled]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ॲप्लिकेशन निवडा</Text>
      <View style={styles.divider} />

      <FlatList
        data={apps}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />

      <TouchableOpacity
        style={styles.proceedBtn}
        onPress={() => navigation.navigate('CompanyLogin')}
      >
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#DDD',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  grid: {
    paddingHorizontal: 16,
    gap: 16,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#FFF',
    borderRadius: 12,
    alignItems: 'center',
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardDisabled: {
    opacity: 0.5,
  },
  imageBox: {
    width: 80,
    height: 80,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: '#EEE',
  },
  imageBoxDisabled: {
    backgroundColor: '#DDD',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  labelDisabled: {
    color: '#999',
  },
  proceedBtn: {
    backgroundColor: '#E07B39',
    margin: 16,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  proceedText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default AppSelectionScreen;