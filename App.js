import React from 'react';
import { StyleSheet, Text, View, Button, TextInput ,ImageBackground ,FlatList ,ActivityIndicator ,Image,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';




class DetailsScreen extends React.Component {
 
   static navigationOptions = {
    title: 'SEARCH IT',
  };
  

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }   
    render() {
    return (
      <View style={{ flex:1,backgroundColor:'#b0c4de'}}>

       

      <View style={{ flexDirection: 'row',marginLeft: 60}}>
        {/* other code from before here */}
       <TextInput value={this.state.text}
       placeholder='SEARCH'
       placeholderTextColor='gray'
      style={{width: "50%",height: 40}}
      onChangeText={(text) => this.setState({text})}/>
      <Button
          title="find"
          onPress={() => this.props.navigation.navigate('Inside',{search_text: this.state.text})}/>
        </View>
    
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
          title="GO BACK"
          onPress={() => this.props.navigation.navigate('Home')}/>

      </View>



      </View>
      
    );
  }
}

class InsideScreen extends React.Component {
  constructor(props){
    super(props)
    const search_text = this.props.navigation.getParam("search_text", "");
    this.state = {
      isLoading: true,
      search_text: search_text
    }
  }

  static navigationOptions = {
    title: 'Results',
  };

  componentDidMount(){
    let url = "https://www.googleapis.com/books/v1/volumes?q="+ this.state.search_text
      return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          let raw_data = responseJson.items;
          let books = []
          for(let i=0;i<10;i++){
            books.push(raw_data[i])
          }
          this.setState({
            isLoading: false,
            data: books,
          }, function(){

          });

        })
        .catch((error) =>{
          console.error(error);
        });
    }


  render() {

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>RELATED RESULTS ARE</Text>
        <Text>{this.state.search_text}</Text>
        <FlatList data = {this.state.data} 
        renderItem={({item}) => <BookItem title={item.volumeInfo.title}
        author={item.volumeInfo.authors}
        thumbnail={item.volumeInfo.imageLinks.thumbnail}/>}  />
      </View>
    );
  }
}

class HomeScreen extends React.Component {
   
   static navigationOptions = {
    title: 'TO READ',
  };
  
  render() {
    return (

        <ImageBackground source={require('bunny.jpeg')} style={{width: '100%', height:           '100%'}}>
                        <View style={styles.inner}> 
                     <Text>SEARCH THE BOOKS U WANT</Text>
        <Button
        
          title="SEARCH"
          onPress={() => this.props.navigation.navigate('Details')}
        />                     
                        </View>
  </ImageBackground>

      
    );
  }
}
          

     
class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Setting',
  };

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }   
    render() {
    return (
      <View style={{ flexDirection: 'row',}}>
        {/* other code from before here */}
       <TextInput value={this.state.text}
       placeholder='SEARCH'
       
      style={{width: "60%",height: 40,}}
      onChangeText={(text) => this.setState({text})}/>
      <Button
          title="find"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class FinalScreen extends React.Component {
  static navigationOptions = {
    title: 'DONE'
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* other code from before here */}
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}/>
      </View>
    );
  }
}


class BookItem extends React.Component {

  render() {

    return (
      <View style={styles.item}>
          <Image
          source={{uri: this.props.thumbnail}}
          resizeMode="stretch" style={styles.thumb}
          />
        <View style={styles.details}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.author}>{this.props.author}</Text>
        </View>
      </View>
    );
  }
}




const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
  Inside: InsideScreen
});

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  Details: DetailsScreen,
  Inside: InsideScreen
});

const FinalStack = createStackNavigator({
  Final: FinalScreen,
  Details: DetailsScreen,
  Inside: InsideScreen
});



export default createAppContainer(createBottomTabNavigator(
  {
    Home: HomeStack,
    Settings: SettingsStack,
    Final: FinalStack,
  },
   {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options`;
        } else if (routeName === 'Final') {
          iconName = `ios-albums`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
));


const styles = StyleSheet.create({
container:{
      backgroundColor:'#00FFFF',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
},
inner:{
  flex: 1,
  width:"100%",
  height:"80%",
  backgroundColor:"rgba(255, 255, 255, .7 )",
  justifyContent: 'center',
      alignItems: 'center',
},
item: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
  },
  thumb: {
    height: 50,
    width: 50,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    color: 'white',
    fontWeight: 'bold',
  },
  details: {
    margin: 16,
  },
  title: {
    fontSize: 18,
    color: 'black',
  },
  author: {
    fontSize: 16,
    color: '#999',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0, 0, 0, .08)',
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
