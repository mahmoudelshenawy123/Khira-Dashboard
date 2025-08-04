import { ChangeEvent, useEffect } from "react";
import usePlacesAutocomplete, { getDetails, getGeocode, getLatLng } from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from "@reach/combobox";

import "@reach/combobox/styles.css";
// import Script from "next/script"
import './GoogleSearchBox.css'
export default function GoogleSearchBox(props:any) {
    const {setLongitude,setLatitude} = props
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue
  } = usePlacesAutocomplete();

    const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setValue(e.target.value);
        console.log(e.target.value)
    };

    const handleSelect = (val: string): void => {
        setValue(val, false);
        console.log('valvalval',val)
        const parameter = {
            address: val,
          };
        getGeocode(parameter).then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            console.log("Coordinates: ", { lat, lng });
            setLatitude(lat)
            setLongitude(lng)
        });
        getDetails(val)
        .then((details) => {
            console.log("Details: ", details);
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
    };
    // useEffect(() => {
    //     const script = document.createElement("script")
    
    //     script.src =
    //     `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`
    
    //     script.async = true
    
    //     // script.integrity =
    //     //   "sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
    
    //     // script.crossOrigin = "anonymous"
    
    //     document.body.appendChild(script)
    
    //     return () => {
    //       // clean up the script when the component in unmounted
    //       document.body.removeChild(script)
    //     }
    //   }, [])
    const renderSuggestions = (): JSX.Element => {
        const suggestions = data.map(({ place_id, description }: any) => (
        <ComboboxOption key={place_id} value={description}  onClick={()=>{handleSelect(place_id)}}/>
        ));

        // useEffect(() => {
        //     ;<Script
        //       src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`}
        //     />
        //   }, [])
         
        return (
        <>
            {suggestions}
            <li className="logo">
            {/* <img
                src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png"
                alt="Powered by Google"
            /> */}
            </li>
        </>
        );
    };

  return (
      <Combobox onSelect={handleSelect} aria-labelledby="demo" className='comboo'>
        <ComboboxInput
          style={{ width: 300, maxWidth: "90%" }}
          value={value}
          onChange={handleInput}
          disabled={!ready}
          className='form-control form-control-solid mb-5 ps-14 w-100 mw-100'
        />
        <ComboboxPopover>
          <ComboboxList>{status === "OK" && renderSuggestions()}</ComboboxList>
        </ComboboxPopover>
      </Combobox>
  );
}
