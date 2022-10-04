import { useState, useEffect } from "react";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const Sports_dropdown = ({value}) => {
  useEffect(() => {
    handleSports();
  }, []);

  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  const [sportsCenter, setSportsCenter] = useState()
  const [sports, setSports] = useState([]);
  const handleSports = async (e) => {
    const resp = await axios.get(
      baseURL + "sports/sports-center/sports-center-owner/"
    );
    setSports(resp.data);
  };

  const onInputChange = (e) =>{
    setSportsCenter(e.target.value);
  }


    return (
      <Select
        margin="normal"
        fullWidth
        name="sportcenter"
        onChange={(e) => onInputChange(e)}
        autoComplete="sportcenter"
        variant="outlined"
        value={sportsCenter}
        placeholder="Select Sport Center"
      >
        {sports?.map((val) => {
          const { id, center_name } = val;
          return (
            <MenuItem value={id} key={id}>
              {center_name}
            </MenuItem>
          );
        })}
      </Select>
    );
};

export default Sports_dropdown;
