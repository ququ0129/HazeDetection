<template>
  <div name="Index">
    <h1>雾霾探测系统</h1>
    <p>根据当前ip获取定位：{{ location }}</p>
    <div class="box">
      <h2>天气情况</h2>
      <ul>
        <li>温度:{{ temp }}</li>
        <li>体感温度:{{ feelsLike }}</li>
        <li>天气情况:{{ text }}</li>
        <li>风向:{{ windDir }}</li>
        <li>风力:{{ windScale }}</li>
        <li>风速:{{ windSpeed }}</li>
        <li>相对湿度:{{ humidity }}</li>
        <li>能见度：{{ vis }}</li>
        <li>云量:{{ cloud }}</li>
      </ul>
    </div>
    <div class="box">
      <h2>空气质量</h2>
      <ul>
        <li>质量指数:{{ aqi }}</li>
        <li>指数等级:{{ level }}</li>
        <li>指数级别:{{ category }}</li>
        <li>主要污染物:{{ primary }}</li>
        <li>PM10:{{ pm10 }}</li>
        <li>PM2.5:{{ pm2p5 }}</li>
        <li>二氧化氮:{{ no2 }}</li>
        <li>二氧化硫:{{ so2 }}</li>
        <li>一氧化碳:{{ co }}</li>
        <li>臭氧:{{ o3 }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { getLocation } from "@/request/api";
import { getWeatherCondition } from "@/request/api";
import { getAirCondition } from "@/request/api";
export default {
  name: "Index",
  data() {
    return {
      location: "",
      temp: "",
      feelsLike: "",
      text: "",
      windDir: "",
      windScale: "",
      windSpeed: "",
      humidity: "",
      vis: "",
      cloud: "",
      aqi: "",
      level: "",
      category: "",
      primary: "",
      pm10: "",
      pm2p5: "",
      no2: "",
      so2: "",
      co: "",
      o3: "",
    };
  },
  mounted: function () {
    this.getCurrentLocation();
    this.getCurrentWeather();
    this.getCurrentAir();
  },
  methods: {
    getCurrentLocation: function () {
      getLocation({ lang: "zh-CN" }).then((response) => {
        this.location = response.city;
        localStorage.lat = response.lat;
        localStorage.lon = response.lon;
      });
    },
    getCurrentWeather: function () {
      var data = {
        location: localStorage.lon + "," + localStorage.lat,
        key: "5c91cb9403384ca88f859860eee30b1e",
      };
      getWeatherCondition(data).then((response) => {
        this.temp = response.now.temp;
        this.feelsLike = response.now.feelsLike;
        this.text = response.now.text;
        this.windDir = response.now.windDir;
        this.windScale = response.now.windScale;
        this.windSpeed = response.now.windSpeed;
        this.humidity = response.now.humidity;
        this.vis = response.now.vis;
        this.cloud = response.now.cloud;
      });
    },
    getCurrentAir: function () {
      var data = {
        location: localStorage.lon + "," + localStorage.lat,
        key: "5c91cb9403384ca88f859860eee30b1e",
      };
      getAirCondition(data).then((response) => {
        this.aqi = response.now.aqi;
        this.level = response.now.level;
        this.category = response.now.category;
        this.primary = response.now.primary;
        this.pm10 = response.now.pm10;
        this.pm2p5 = response.now.pm2p5;
        this.no2 = response.now.no2;
        this.so2 = response.now.so2;
        this.co = response.now.co;
        this.o3 = response.now.o3;
      });
    },
  },
};
</script>



<style>
h1 {
  text-align: justify;
  padding-left: 20%;
}
p {
  text-align: justify;
  padding-top: 1%;
  padding-left: 20%;
}
h2 {
  text-align: justify;
  padding-bottom: 5%;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
ul li {
  text-align: left;
}
* {
  box-sizing: border-box;
}

.box {
  float: left;
  width: 50%;
  padding-top: 5%;
  padding-left: 20%;
}

.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
</style>