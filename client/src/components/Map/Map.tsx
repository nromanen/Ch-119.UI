import React, { FC, useCallback, useState } from 'react'
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  Autocomplete,
} from '@react-google-maps/api'
import { usePlacesWidget } from 'react-google-autocomplete'
import { Button } from 'react-bootstrap'
// import { Loader, LoaderOptions } from '@googlemaps/js-api-loader'
const apiKey = 'AIzaSyBmvdkcqvY-aunh7iZBuV9xkz9f0XWOhoc'
// declare var google: any;

// async function loadMap() {
//   const options: LoaderOptions = {
//     apiKey,
//   }
//   const loader: Loader = new Loader(options)
//   const google = await loader.load()
//   const map = new google.maps.Map(
//     document.getElementById('map') as HTMLElement,
//     {
//       center: { lat: -34.397, lng: 150.644 },
//       zoom: 8,
//     }
//   )
// }

export const Map: FC = () => {
  const containerStyle = {
    width: '100%',
    height: '400px',
  }

  const { ref } = usePlacesWidget<HTMLInputElement>({
    apiKey: apiKey,
    onPlaceSelected: (place) => console.log('from ', place),
  })

  const center = {
    lat: 48.3098624,
    lng: 26.0079615,
  }

  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [autocomplete, setAutocomplete] = useState(null)

  const request = {
    origin: from,
    destination: to,
    travelMode: 'DRIVING',
  }
  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: apiKey,
  // })

  // const [map, setMap] = useState(null)

  // const onLoad = useCallback(function callback(map) {
  //   const bounds = new google.maps.LatLngBounds()
  //   map.fitBounds(bounds)
  //   setMap(map)
  // }, [])

  // const onUnmount = useCallback(function callback(map) {
  //   setMap(null)
  // }, [])

  const directionsServiceCallback = (result: any, status: any) => {
    console.log(result, 'result')
    console.log(status, 'status')
  }

  const onLoad = (autocompleteValue: any) => {
    console.log('autocomplete: ', autocompleteValue)

    setAutocomplete(autocompleteValue)
  }

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      // console.log(autocomplete!.getPlace!())
      console.log(autocomplete)
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  return (
    <>
      <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          // onLoad={onLoad}
          // onUnmount={onUnmount}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <></>

          {/* <DirectionsService
          callback={directionsServiceCallback}
          options={request}
        ></DirectionsService> */}
          <DirectionsRenderer></DirectionsRenderer>

          <div className="jumbotron">
            <div className="container-fluid">
              <h1>Distance between two places</h1>

              <form className="form-horizontal">
                <div className="form-group">
                  <label className="col-xs-2" htmlFor="from">
                    From:
                  </label>
                  <div className="col-xs-4">
                    <Autocomplete
                      onLoad={onLoad}
                      onPlaceChanged={onPlaceChanged}
                    >
                      <input
                        type="text"
                        name="from"
                        id="from"
                        placeholder="Origin"
                      />
                    </Autocomplete>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-xs-2" htmlFor="to">
                    To:
                  </label>
                  <div className="col-xs-4">
                    <input
                      type="text"
                      name="to"
                      id="to"
                      placeholder="Destination"
                    />
                  </div>
                </div>
              </form>
              <div className="col-xs-offset-2 col-xs-10">
                <Button>Calculate</Button>
              </div>
            </div>
          </div>
        </GoogleMap>
      </LoadScript>
    </>
  )
}
