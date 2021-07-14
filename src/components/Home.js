import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import ImageTile from './ImageTile/ImageTile'
import ImageGrid from './ImageGrid/ImageGrid'
import UserService from "../services/user.service";
import ImportExportIcon from '@material-ui/icons/ImportExport';
import Button from '@material-ui/core/Button';
import Pagination from "react-js-pagination";
import Select from 'react-select'
import Skeleton from 'react-loading-skeleton';

import '../index.css'
const Home = (props) => {
  const [instaPosts, setInstaPosts] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [itemTotalCount, setItemTotalCount] = useState(0)
  const [order, setOrder] = useState('latest');
  const [isLoading, setLoading] = React.useState(false);
  const [user, setUser] = useState(null);
  const [pageCount, setPageCount] = useState(1)
  const handlePageChange = (pageNumber) => {
    setPageCount(pageNumber);
  }
  const handelChangeSelect = (e) => {
    setUser(e)
  }
  const toggleOrder = () => {
    if (order == "latest") {
      setOrder("earliest")
    }
    else {
      setOrder("latest")
    }
  };
  useEffect(() => {
    if (!localStorage.getItem('access')) {
      props.history.push("/login");
    } else {
      setLoading(true)
      var offset = (pageCount - 1) * 6
      UserService.getPosts({ "order": order, "offset": offset, "user": user }).then(
        (response) => {
          setInstaPosts(response.data.results);
          setLoading(false)
          setItemTotalCount(response.data.count)
        }
      );
    }
  }, [order, pageCount, user]);
  useEffect(() => {
    UserService.getUsers().then(
      (response) => {
        console.log(response)
        let userArray = [];
        response.data && response.data.length > 0 &&
          response.data.map((item) => {
            let newList = { value: item.id, label: item.username };
            userArray.push(newList);
          })
        setUserOptions(userArray)
      }
    );
  }, []);

  return (
    <div className="container">


      <Button
        style={{ float: 'left' }}
        variant="contained"
        color="primary"
        onClick={() => toggleOrder()}
        startIcon={<ImportExportIcon />}
      >
        {order} First
      </Button>
      <Select
        placeholder={'Filter by user'}
        name="user"
        isClearable={true}
        onChange={e => handelChangeSelect(e)}
        options={userOptions}
        className="basic basic-select"
        classNamePrefix="select"
      />
      <br /><br /><br />
      {
        isLoading ?
          <Skeleton count={10} />
          :
          <React.Fragment>
            {
              instaPosts && instaPosts.length > 0 ?
                <div className="">
                  <Row>
                    {instaPosts.map((item, key) => (
                      <Col md={4}>
                        <ImageGrid item={item} />
                        <br />
                      </Col>
                    ))}
                  </Row>
                  <Pagination
                    activePage={pageCount}
                    itemsCountPerPage={6}
                    totalItemsCount={itemTotalCount}
                    onChange={handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </div>
                :
                <h3>No Results Found</h3>
            }
          </React.Fragment>
      }

    </div>
  );
};

export default Home;
