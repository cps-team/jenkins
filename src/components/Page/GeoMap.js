import React, { useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import '../../css/GeoMap.css';
import 'mapbox-gl/dist/mapbox-gl.css'
import axios from 'axios';
import { Modal, List, Avatar, Button, Drawer, Tooltip, Image } from 'antd';
import { RightOutlined } from '@ant-design/icons';

import { CloseOutlined } from '@ant-design/icons';
import factoryIcon from '../../img/factoryIcon2.png'


function GeoMap() {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContents, setModalContents] = useState([]);
  const [drawerContent, setDrawerContent] = useState([]);

  const CloseButton = <CloseOutlined style={{ color: 'white' }} />;

  const showDrawer = (data) => {

    setOpen(true);
    let districtListData = data.districtData.map((district) => (
      { code: district.Code, name: district.Name, url: district.Url, imgSrc: district.Img }
    ))
    sessionStorage.setItem('blockCode', data.blockCode);
    let districtList = (
      <List
        dataSource={districtListData}
        renderItem={(item) =>
          <List.Item style={{ textAlign: 'center' }}>
            <Tooltip placement="right"
              title={<Image
                width={150}
                src={item.imgSrc}
                fallback="https://i.ibb.co/0QxVdTq/noImage.png"
              />}>
              <a href={item.url} onClick={() => sessionStorage.setItem('districtCode', item.code)}>{item.name}
              </a>
            </Tooltip>
          </List.Item >
        }
      />
    )
    setDrawerContent(districtList)
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let standardInfo;
    let listElement;


    const map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1Ijoiam9obmdyZWVlbiIsImEiOiJjbGF1bTl2cGQwN3NmM25tdm1oc2cwcDM3In0.g--GHlOlr-rsA5DjOSphlw',
      container: 'map',
      center: [90, 35.8],
      style: 'mapbox://styles/johngreeen/clavutscw000115qd4zyiczzx',
      zoom: 2,
    });
    map.addControl(new mapboxgl.FullscreenControl());



    let accessibleGeoJson = {
      'type': 'FeatureCollection',
      'features': []
    };

    let inAccessibleGeoJson = {
      'type': 'FeatureCollection',
      'features': []
    };

    // 로그인한 사용자가 속해있는 회사의 기준정보 가져오기
    axios.post('/User/StandardInfo', {
      'CompanyCode': sessionStorage.getItem('companyCode')
    })
      .then(res => {
        standardInfo = res.data;
      })

    // 접근 가능 지역리스트 받아오기
    axios.post('/User/accessibleLocationInfo', null, {
      params: {
        'userId': sessionStorage.getItem('userId')
      }
    })
      .then(res => {

        for (let resRow of res.data) {
          accessibleGeoJson.features.push({
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [resRow.c_longitude, resRow.c_latitude]
            },
            'properties': {
              'title': resRow.c_name,
              'factoryCode': resRow.c_code
            }
          })
        }

      });

    // 접근 불가능 지역리스트 받아오기
    axios.post('/User/inAccessibleLocationInfo', null, {
      params: {
        'userId': sessionStorage.getItem('userId')
      }
    })
      .then(res => {
        for (let resRow of res.data) {
          inAccessibleGeoJson.features.push({
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [resRow.c_longitude, resRow.c_latitude]
            },
            'properties': {
              'title': resRow.c_name,
              'factoryCode': resRow.c_code
            }
          })
        }
      });

    map.on('load', () => {

      async function flyTo() {
        await delay(1000);

        map.flyTo({
          center: [127, 35.8],
          zoom: 4.5,
          duration: 3000,
          essential: true,
        });

      }

      flyTo();

      map.loadImage(
        'https://i.ibb.co/gjzyksF/mapbox-marker-icon-20px-blue.png',
        (error, image) => {
          if (error) throw error;

          map.addImage('accessibleMarker', image);

          map.addSource('places', {
            'type': 'geojson',
            'data': accessibleGeoJson
          });

          map.addLayer({
            'id': 'places',
            'type': 'symbol',
            'source': 'places',
            'layout': {
              'icon-image': 'accessibleMarker',
              'icon-size': 1.2,
              'icon-offset': [0, 10]
            }
          });
        });

      map.loadImage(
        'https://i.ibb.co/t4jjq9h/mapbox-marker-icon-20px-gray.png',
        (error, image) => {
          if (error) throw error;
          map.addImage('inAccessibleMarker', image);

          map.addSource('places2', {
            'type': 'geojson',
            'data': inAccessibleGeoJson
          });

          map.addLayer({
            'id': 'places2',
            'type': 'symbol',
            'source': 'places2',
            'layout': {
              'icon-image': 'inAccessibleMarker',
              'icon-size': 1.2,
            },
            'paint': {
              'icon-opacity': 0.5,
            }
          });
        });

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      map.on('mouseenter', 'places', (e) => {
        map.getCanvas().style.cursor = 'pointer';

        const coordinates = e.features[0].geometry.coordinates.slice();
        const title = e.features[0].properties.title;


        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        popup.setLngLat(coordinates)
          .setHTML(
            `
            <div id='popupTop'>
            <p id='popupTitle'>${title}</p>
            </div>
            `
          )
          .addTo(map);
      });

      map.on('mouseleave', 'places', function () {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });

      // 줌 레벨에 따라 마커 visibility 변경
      map.on('zoom', () => {
        if (map.getLayer('places') && map.getLayer('places2')) {
          const zoomLevel = map.getZoom();
          if (zoomLevel > 4.5) {
            map.setLayoutProperty('places', 'visibility', 'visible');
            map.setLayoutProperty('places2', 'visibility', 'visible');
          } else {
            map.setLayoutProperty('places', 'visibility', 'none');
            map.setLayoutProperty('places2', 'visibility', 'none');
          }
        }
      });

      map.on('click', 'places', (e) => {
        const clickedFeature = e.features[0];
        setModalTitle(clickedFeature.properties.title);
        setIsOpen(true);
        for (let factory of standardInfo.Factories) {
          if (clickedFeature.properties.factoryCode === factory.Code) {
            sessionStorage.setItem("factoryCode", factory.Code);

            let blockListData = [];
            for (let block of factory.Blocks) {
              let districtListData = [];
              for (let district of block.Districts) {
                districtListData.push(district);
              }
              blockListData.push({ title: block.Name, description: block.Desc, blockCode: block.Code, districtData: districtListData })
            }

            listElement =
              <List
                itemLayout="horizontal"
                dataSource={blockListData}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={factoryIcon} />}
                      title={item.title}
                      description={item.description}
                    />
                    <Button icon={<RightOutlined />} onClick={() => showDrawer({ blockCode: item.blockCode, districtData: item.districtData })} />
                  </List.Item>
                )}
              />
            setModalContents(listElement);
          }
        }
      });
    })
  }, [])

  return (
    <>
      <Modal
        title={<span style={{ color: 'white', fontWeight: 'bold' }}>{modalTitle}</span>}
        centered
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        className="test_modal"
        closeIcon={CloseButton}
      >
        {modalContents}
        <Drawer
          title={(
            <h5>세부정보<Button style={{ float: "right" }} onClick={onClose} icon={<CloseOutlined />} /></h5>
          )}
          placement="right"
          onClose={onClose}
          closable={false}
          open={open}
          getContainer={false}
        >
          {drawerContent}
        </Drawer>
      </Modal>

      <div id='map_container'>
        <div id="map" />
      </div >
    </>
  );
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default GeoMap;