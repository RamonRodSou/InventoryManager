import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'


const ExcluirConfirm = ({Msg, OnPCancel, OnPConfirm}) => {
    return (
        <View style={styles.confirmDeleteContainer}>
            <View style={styles.confirmDeleteContent}>
                <Text style={styles.confirmDeleteText}>{Msg}</Text>
                <View style={styles.confirmDeleteButtons}>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={OnPCancel}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={OnPConfirm}>
                        <Text style={styles.buttonText}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    confirmDeleteContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    confirmDeleteContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    confirmDeleteText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    confirmDeleteButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: '#ff0000',
    },
    button: {
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
})
export default ExcluirConfirm