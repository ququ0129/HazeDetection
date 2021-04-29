<template>
  <el-container>
    <el-header style="text-align: left; font-size: 50px; margin-left: 15%">
      雾霾探测系统示例
    </el-header>
    <el-divider></el-divider>
    <el-main style="margin-left: 15%; margin-right: 15%">
      <el-row>
        <el-card class="box-card">
          <div align="left">
            <span>根据当前ip获取位置:{{ location }}</span>
          </div>
        </el-card>
      </el-row>
      <el-row>
        <el-card class="box-card">
          <div slot="header" class="clearfix" align="left">
            <span>天气情况</span>
          </div>
          <div>
            <el-table :data="tableDataWeather" style="width: 100%">
              <el-table-column prop="temp" label="温度"></el-table-column>
              <el-table-column prop="text" label="天气情况"> </el-table-column>
              <el-table-column prop="windDir" label="风向"> </el-table-column>
              <el-table-column prop="windScale" label="风力"> </el-table-column>
              <el-table-column prop="windSpeed" label="风速"> </el-table-column>
              <el-table-column prop="humidity" label="相对湿度">
              </el-table-column>
              <el-table-column prop="vis" label="能见度"> </el-table-column>
              <el-table-column prop="cloud" label="云量"> </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-row>
      <el-row>
        <el-card class="box-card">
          <div slot="header" class="clearfix" align="left">
            <span>空气质量</span>
          </div>
          <div>
            <el-table :data="tableDataAir" style="width: 100%">
              <el-table-column prop="aqi" label="质量指数"> </el-table-column>
              <el-table-column prop="level" label="指数等级"> </el-table-column>
              <el-table-column prop="category" label="指数级别">
              </el-table-column>
              <el-table-column prop="primary" label="主要污染物">
              </el-table-column>
              <el-table-column prop="pm10" label="PM10"> </el-table-column>
              <el-table-column prop="pm2p5" label="PM2.5"> </el-table-column>
              <el-table-column prop="no2" label="二氧化氮"> </el-table-column>
              <el-table-column prop="so2" label="二氧化硫"> </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
/* eslint-disable */
import { getLocation } from "@/request/api";
import { getWeatherCondition } from "@/request/api";
import { getAirCondition } from "@/request/api";
import { getWeatherHourly } from "@/request/api";

export default {
  name: "Index",
  data() {
    return {
      location: localStorage.location,
      tableDataWeather: [
        {
          temp: localStorage.temp,
          text: localStorage.text,
          windDir: localStorage.windDir,
          windScale: localStorage.windScale,
          windSpeed: localStorage.windSpeed,
          humidity: localStorage.humidity,
          vis: localStorage.vis,
          cloud: localStorage.cloud,
        },
      ],
      tableDataAir: [
        {
          aqi: localStorage.aqi,
          level: localStorage.level,
          category: localStorage.category,
          primary: localStorage.primary,
          pm10: localStorage.pm10,
          pm2p5: localStorage.pm2p5,
          no2: localStorage.no2,
          so2: localStorage.so2,
        },
      ],
    };
  },
  mounted: function () {
    setInterval(this.getCurrentLocation, 60 * 30 * 1000);
    setInterval(this.getCurrentWeather, 60 * 30 * 1000);
    setInterval(this.getCurrentAir, 60 * 30 * 1000);
  },
  methods: {
    getCurrentLocation: function () {
      getLocation({ lang: "zh-CN" }).then((response) => {
        localStorage.location = response.city;
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
        localStorage.temp = response.now.temp;
        localStorage.text = response.now.text;
        localStorage.windDir = response.now.windDir;
        localStorage.windScale = response.now.windScale;
        localStorage.windSpeed = response.now.windSpeed;
        localStorage.humidity = response.now.humidity;
        localStorage.vis = response.now.vis;
        localStorage.cloud = response.now.cloud;
      });
    },
    getCurrentAir: function () {
      var data = {
        location: localStorage.lon + "," + localStorage.lat,
        key: "5c91cb9403384ca88f859860eee30b1e",
      };
      getAirCondition(data).then((response) => {
        localStorage.aqi = response.now.aqi;
        localStorage.level = response.now.level;
        localStorage.category = response.now.category;
        localStorage.primary = response.now.primary;
        localStorage.pm10 = response.now.pm10;
        localStorage.pm2p5 = response.now.pm2p5;
        localStorage.no2 = response.now.no2;
        localStorage.so2 = response.now.so2;
      });
    },
  },
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
</style>