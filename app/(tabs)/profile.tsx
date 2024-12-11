import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useUserStore } from '@/stores/userStore';

export default function ProfileScreen() {

const { addUser, fetchUsers, users } = useUserStore();
useEffect(() => {
    fetchUsers();
}, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      {users.map((user) => (
        <Text key={user.id}>{user.name}</Text>  
      ))}
      <Button title="Add User" onPress={() => addUser({ name: 'John Doe', email: 'john@example.com', age: 30 })} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f4f4f4',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  });

  