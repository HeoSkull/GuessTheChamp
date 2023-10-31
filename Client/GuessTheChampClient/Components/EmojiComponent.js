import React, { Component, useState } from "react";
import { Pressable, StyleSheet, View, Text, Card, Image, TextInput, Button  } from "react-native";

class Emoji extends Component {
    state = {
        value: "",
      };
    
      handleChange = (event) => {
        this.setState({
          value: event.target.value,
        });
      };

  render() {
    
    return (
      <View style={styles.container}>
       <View style={{ display: 'flex',flexDirection: 'colum', justifyContent: 'center', alignItems:'center'}}>
          <View style={{ width: 400, height: 70,  flexDirection: "row", justifyContent: "space-between",  }}>
            <Button title="<"></Button>
            <Image style={{ width: 200, height: 70, }} source={require("../assets/logo.png")} />
            <View style={styles.circle} />
          </View>
          <Image style={{ width: 50, height: 50, }} source={require("../assets/steak.png")} />

      </View>
       <Pressable
        style={styles.note}
      >
        <View style={styles.text}>
          <Text style={{ fontSize: 20, color: 'white' }}>Which champion do these emojis describe?</Text>
          <Text style={{ fontSize: 20, color: 'white' }}>"The ............."</Text>
        </View>
      </Pressable>
      <View style={styles.inputt}>
       
        
      <TextInput
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="Type champion name ..."
          style={{  backgroundColor: 'grey', width: 250, height: 50,borderWidth: 2, borderColor: "blue" }}
        />
        
        <Pressable
          style={{  backgroundColor: 'grey', borderWidth: 3, borderColor: "yellow" }}
           borderRadius={80}
          >
          <Text style={{ fontSize: 20, color: 'yellow'}}>Submit</Text>
        </Pressable>
      </View>
        
        <Text>people already found out!</Text>
        <Text>Yesterday's champion</Text>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  note:{
    backgroundColor: 'grey',
    width: 350,
    height: 200,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'yellow',
  },
  inputt:{
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  
   button: {
    
    width: 350,
    height: 100,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    
    flexDirection: 'colum',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: "red",
  },
});

export default Emoji;
