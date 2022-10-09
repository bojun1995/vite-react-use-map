import React from 'react'
import csvObj from './car.csv'

class MapComp extends React.Component {
  render() {
    return <div id="map_container"></div>
  }
  componentDidMount() {
    const map = initMap({
      tilt: 60,
      heading: 0,
      center: [106.521831, 29.571811],
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

    const data = [
      {
        geometry: {
          type: 'LineString',
          coordinates: [],
        },
      },
      {
        geometry: {
          type: 'LineString',
          coordinates: [],
        },
      },
    ]

    const carlineLayer = new mapvgl.CarLineLayer({
      url: '/car.gltf',
      autoPlay: true,
      step: 0.2,
      scale: 100,
    })

    setTimeout(() => {
      view.addLayer(carlineLayer)
      carlineLayer.setData(data)
    }, 500)

    map.setDefaultCursor('default')
  }
}

function App() {
  return <MapComp />
}

export default App
