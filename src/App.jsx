import React from 'react'
import csvFile from './assets/46路-0056.csv?raw'

class MapComp extends React.Component {
  render() {
    return <div id="map_container"></div>
  }
  componentDidMount() {
    const map = initMap({
      tilt: 60,
      heading: 0,
      // TODO 地图中心位置
      center: [118.73933, 31.99809],
      zoom: 14,
      displayOptions: {
        poi: false,
      },
      style: purpleStyle,
      skyColors: [
        // 地面颜色
        'rgba(226, 237, 248, 0)',
        // 天空颜色
        'rgba(186, 211, 252, 1)',
      ],
    })

    const view = new mapvgl.View({
      map: map,
    })

    const carlineLayer = new mapvgl.CarLineLayer({
      url: '/car.gltf',
      autoPlay: true,
      step: 0.2,
      scale: 100,
    })

    // data template
    // const template = [
    //   {
    //     geometry: {
    //       type: 'LineString',
    //       coordinates: [
    //         [116.308528, 40.050574],
    //         [116.307378, 40.052314],
    //         [116.306175, 40.054274],
    //         [116.30515, 40.056608],
    //         [116.304809, 40.058955],
    //         [116.304055, 40.060611],
    //       ],
    //     },
    //   },
    // ]

    let data = []
    const dataSet = mapv.csv.getDataSet(csvFile)
    const car = {
      geometry: {
        type: 'LineString',
        coordinates: [],
      },
    }
    dataSet._data.some((row, idx) => {
      if (idx < 100)  {
        // TODO 字段名
        car.geometry.coordinates.push([Number(row.pm2d5), Number(row.lon)])
      } else {
        return true
      }
    })
    data = [car]

    view.addLayer(carlineLayer)
    carlineLayer.setData(data)

    map.setDefaultCursor('default')
  }
}

function App() {
  return <MapComp />
}

export default App
