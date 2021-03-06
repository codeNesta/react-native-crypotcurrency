//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, Button} from 'react-native';
import Result from './Result';

// create a component
class MyClass extends Component {

  state={
    cryptoCurrenciesList:[],
    currency:'US',
    crypto:'BITCOIN',
    results:'',
    requested:false
   
  }

  async componentDidMount(){
    const url = await fetch('https://api.coinmarketcap.com/v1/ticker/');

    // Return this as a json
    const cryptoCurrencies = await url.json();

    // return the object
     this.setState({
       cryptoCurrenciesList:cryptoCurrencies
     })
  }


 queryApi =async  () =>{
   this.setState({
     requested:false
   })
    const url = await fetch(`https://api.coinmarketcap.com/v1/ticker/${this.state.crypto}/?convert=${this.state.currency}`);
    const result = await url.json();

    this.setState({
      results:result,
      requested:true
    })
  }


  render() {

    return (
      <View style={styles.container}>
               <View style={{elevation:7, borderRadius:10, padding:15, backgroundColor:'#ecf0f1' ,width:'100%',alignItems:'center', marginBottom:20}}>
                    <View style={{marginBottom:10}}>
                      <Text style={{textAlign:'center', fontSize:22, fontWeight:'bold'}}>Cryptocurrencies Rate Converter</Text>   
                    </View>  
                    <Picker
                            selectedValue={this.state.currency}
                            style={{  width: "60%" ,}}
                            onValueChange={(itemValue, itemIndex) =>
                              
                              this.setState({
                                currency: itemValue,
                                requested:false
                              })
                              
                              }>
                              {/* <Picker.Item label="select currency" /> */}
                              <Picker.Item label="USD" value="USD" />
                              <Picker.Item label="GBP" value="GBP" />
                              <Picker.Item label="EURO" value="EURO" />
                              <Picker.Item label="CAD" value="CAD" />
                              <Picker.Item label="PHP" value="PHP" />
                              <Picker.Item label="AUD" value="AUD" />
                              <Picker.Item label="HKD" value="HKD"/>
                      </Picker>


                      <Picker
                            selectedValue={this.state.crypto}
                            style={{  width: "60%"}}
                            onValueChange={(itemValue, itemIndex) =>
                            this.setState({ 
                              crypto: itemValue,
                              requested:false
                              })}>
                             
                              {
                                this.state.cryptoCurrenciesList.map((list) => (
                                  <Picker.Item key={list.id} label={list.id} value={list.name} />
                                ))
                              }
                      </Picker>
                      <Button color="#45aaf2" onPress={this.queryApi} title="Submit" style={{ margin:30,  fontSize:30, }} />
               </View>
      
               {

                 this.state.requested &&
                  <View style={{marginTop:10, width:'100%'}}>
                  <Result resultss={this.state.results} currency={this.state.currency} crypto={this.state.crypto} />
             
             </View>
               }
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
     
    alignItems:'center',
    margin:15,
    marginTop:20,
  },
});

//make this component available to the app
export default MyClass;
