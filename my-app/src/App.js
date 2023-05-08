//import logo from './logo.svg';
import { useEffect, useState } from "react";
import axios from 'axios';
import { Container, Table } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { getBeers } from './redux/reducers/beerSlice';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import DatePicker from "react-datepicker";  
import "react-datepicker/dist/react-datepicker.css";


import './App.css';
// require("bootstrap/less/bootstrap.less");

function App() {

  const [getData, setGetdata] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [buttonClicked, setButtonClicked] = useState(false);
  const getbeerData = useSelector((state) => state.beerReducer.pages);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let input ={};
      input.pageNo =1;
      const check1 = await  axios.get('https://api.punkapi.com/v2/beers?page='+input.pageNo+'&per_page=10');
     console.log('ccc',check1);
     const dataPage = [{
      pages:input.pageNo,
      data: check1.data
     }]
     dispatch({ type:'pages', payload: dataPage})
     setGetdata(check1.data)
    }

    fetchData()
      .catch(console.error);
  }, [])



  const handleClick = async() => {
    // setButtonClicked(true);
    
      let input ={};
      input.pageNo =1;
      const check1 = await  axios.get('https://api.punkapi.com/v2/beers?page='+input.pageNo+'&per_page=10');
     console.log('ccc',check1);
     const dataPage = [{
      pages:input.pageNo,
      data: check1.data
     }]
     dispatch({ type:'pages', payload: dataPage})
     setGetdata(check1.data)  
  };


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDateChange1 = (date) => {
    setStartDate(date);
  };


  const column = [
    {
      name: "Id",
      selector: row => row.id,
    },
    {
      name: "Name",
      selector: row => row.name,
    },
    {
      name: "Tagline",
      selector: row => row.tagline,
    },
    {
      name: " First_brewed",
      selector: row => row.first_brewed,
    },
    {
      name: "Description",
      selector: row => row.description,
    }
  ]
  const handlePageClick = async(event) => {
    const newOffset = (event * 10) % 10;
    let input ={};
    input.pageNo =event;
    const duplicateCheck = getbeerData?.find((data)=> data.pages === input.pageNo)
    console.log('duplicate',duplicateCheck)
    if(!duplicateCheck){
       const check1 = await  axios.get('https://api.punkapi.com/v2/beers?page='+input.pageNo+'&per_page=10');
       const dataPages = {
        pages:input.pageNo,
        data: check1.data
       }
       const getbeerDatas = [...getbeerData,dataPages]
      console.log('final',getbeerDatas)
       dispatch({ type:'pages', payload: getbeerDatas})
       setGetdata(check1?.data)
     } else {
      setGetdata(duplicateCheck?.data)
     }
     
  }

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleBeforeBrewed = async (event) => {
    event.preventDefault();
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();
    const brewedBefore = `${month}-${year}`;
    const response = await  axios.get(`https://api.punkapi.com/v2/beers?brewed_before=${brewedBefore}&abv_gt=6`);
    console.log("before response---------------",response.data);
    setGetdata(response.data)

  };

  
  const handleAfterBrewed = async (event) => {
    event.preventDefault();
    const month = startDate.getMonth() + 1;
    const year = startDate.getFullYear();
    const afterBefore = `${month}-${year}`;
    const response = await  axios.get(`https://api.punkapi.com/v2/beers?brewed_after=${afterBefore}&abv_gt=6`);
    console.log("after response---------------",response.data);
    setGetdata(response.data)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let result = getData.filter(function(item)
 {
  var name = item.name.toUpperCase();
  var serchKey = inputValue.toUpperCase();
  if(name.includes(serchKey)){
    return item
  }
 });
    setGetdata(result)
  }
  return (
    <div className="APP">
      <div className="container">
        <Container>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input value={inputValue} onChange={handleChange} />
            <button type="submit">Search</button>
            <input type="button" onClick={handleClick} value="Reset" />
          </form>
        <div className="form1">
        <form onSubmit={handleBeforeBrewed}>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
        />
        <button type="submit">Before brewed</button>
      </form>
      </div>

      <div className="form2">
        <form onSubmit={handleAfterBrewed}>
        <DatePicker
          selected={startDate}
          onChange={handleDateChange1}
        />
        <button type="submit">After brewed</button>
      </form>
      </div>
      </div>
          <Table className="table table-success table-striped">
            <thead>
              <tr>
                {column && column.map((item, i) => {
                  return (
                    <th key={i}>{item.name}</th>
                  )
                })}
              </tr>
            </thead>
            <tbody>

              {getData && getData.map((field, i) => {
                return (
                  <tr key={i}>
                    <td>{field.id}</td>
                    <td>{field.name}</td>
                    <td>{field.tagline}</td>
                    <td>{field.first_brewed}</td>
                    <td>{field.description}</td>
                  </tr>
                )
              })}

              {/* )
          })} */}
            </tbody>
          </Table>
          <Pagination
            activePage={2}
            itemsCountPerPage={10}
            totalItemsCount={450}
            pageRangeDisplayed={5}
            onChange={handlePageClick}
          />
        </Container>

      </div>

    </div>
  )

}


export default App;
