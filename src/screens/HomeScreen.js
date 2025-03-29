import {Text, StyleSheet, View, Button, TouchableOpacity} from "react";

const HomeScreen= ()=> {
    return (
        <View>
            <Text style={styles.text}>Hi there</Text>
                <Button
                onPress={()=>console.log('Button Pressed')}
                title="Go to components Demo" 
                />
        </View>
    )
}
