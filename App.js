import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import {useState} from 'react';

// https://openweathermap.org/img/wn/02d@2x.png

export default function App() {
  Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
  }

  function getHoursString(dateTime) {
    let date = new Date(dateTime);
    let hours = date.getHours().pad();
    
    return hours;
  }

  const [weatherData, setWeatherData] = useState({
    name: "",
    temp: 0,
    description: ""
  });
  const [dayWeatherData, setDayWeatherData] = useState([]);

  let array = [];  
  
  const foo = array => setDayWeatherData(array)

  fetch("https://api.openweathermap.org/data/2.5/forecast?q=Moscow&appid=4d989581f4f5c9c60acf860fb8170f42")
  .then(resp => {return resp.json();})
  .then(data => {   
    for (i in data.list.slice(0, 6)) {
      array.push({
        time:  i == 0 ? 'now' : getHoursString(data.list[i].dt * 1000) + ':00',
        temp: Math.round(data.list[i].main.temp - 273),
        description: data.list[i].weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`
      })
    }
    foo(array) 
  })
  return (
    <View style={styles.container}>
      <Text style={styles.title}>weather application☁️</Text>
      <Text>made by Egor Burkenya</Text>
      <Text style={{...styles.title, marginTop: 20}}>Moscow</Text>
      {/* <Text>{dayWeatherData.length}</Text> */}
      <View style={{flex: 1}}>
        <FlatList 
        data={dayWeatherData}
        renderItem={({item}) => 
        <View style={styles.weahterCard}>
        <View style={{borderBottomColor: 'black', borderBottomWidth: 1}}>
          <Text style={styles.title}>{item.time}</Text>
        </View>
          <Text>today</Text>
        <Text style={styles.weather}>{item.temp}&deg;</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 15}}>{item.description}</Text>
          <Image 
            style={styles.tinyLogo}
            source={{uri: item.icon}} />
        </View>
      </View>} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
  },
  weather: {
    fontSize: 30,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    
  },
  weahterCard: {
    backgroundColor: "beige",
    borderWidth: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
    flex: 0.25,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 40
  },
  title: {
    fontSize: 24,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
    justifyContent: 'flex-start'
  },
});
