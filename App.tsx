import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button,Image,Pressable } from 'react-native';

export default function App() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [weatherData, setWeatherData] = useState<any | null>(null);

  type WeatherData = {
    weather: {
      description: string;
    }[];
  };

  async function fetchWeather() {
    const API_KEY = '51a0dc2dc328b3d7a9f0cb1fe6c2fb55';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
      console.log('data', data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Latitude"
            value={lat}
            onChangeText={(text) => setLat(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Longitude"
            value={lon}
            onChangeText={(text) => setLon(text)}
          />

<Pressable
  style={styles.button} 
  onPress={fetchWeather}
>
  <Text style={styles.buttonText} >Ver clima </Text> 
</Pressable>
        </View>

        {weatherData && (
          <View style={styles.weather}>

            <Text style={styles.weatherTextw}>
             Estado del tiempo Actual:
            </Text>
            <Text style={styles.weatherText}>
          {weatherData.weather[0].description}
            </Text>


            <Text style={styles.weatherTextw}>
              Ubicacion:
            </Text>
            <Text style={styles.weatherText}>
              {weatherData.name}, {weatherData.sys.country}
            </Text>

            <Text style={styles.weatherTextw}>
             País:
            </Text>
            <Text style={styles.weatherText}>{weatherData.sys.country}</Text>

            <Text style={styles.weatherTextw}>
             Sensación termica:
            </Text>
            <Text style={styles.weatherText}>
              Sensación térmica(Farenheit): {weatherData.main.feels_like}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  main: {
    flex: 1,
    backgroundColor: '#212121',
    borderRadius: 10,
    padding: 20,
  },
  inputs: {
    marginBottom: 20,
   
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  weather: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#212121',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#39FF14',
    borderRadius: 38,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 3,
    marginBottom: 10,
    width: '100%',
  },
  weatherText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#39FF14',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Futura',
  },
  weatherTextw: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Futura',
  },
  buttonText: {
    fontSize: 16,
  
    color: 'black',
    fontFamily: 'Futura',
    letterSpacing: 1.2,
    flex: 1,
    textAlign: 'center',
  }
});
