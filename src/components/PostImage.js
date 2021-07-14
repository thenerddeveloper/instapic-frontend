import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import { Row, Col, Button } from 'react-bootstrap';
import ImageGrid from './ImageGrid/ImageGrid'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const PostImage = (props) => {
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)
    const [myPosts, setMyPosts] = useState([]);
    const [open, setOpen] = React.useState(false);
    const createPost = () => {
        if (description && image) {
            setOpen(true);
            const formData = new FormData();
            formData.append(
                "description",
                description
            );
            formData.append(
                "image",
                image
            );
            UserService.createPost(formData).then(
                (response) => {
                    setOpen(false);
                    setDescription("")
                    setImage(null)
                    UserService.getMyUploads().then(
                        (response) => {
                            setMyPosts(response.data);
                        }
                    );
                }
            );
        } else {
            alert("All inputs are required")
        }

    }
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        if (!localStorage.getItem('access')) {
            props.history.push("/login");
        } else {
            setOpen(true);
            UserService.getMyUploads().then(

                (response) => {
                    setOpen(false);
                    setMyPosts(response.data);
                }
            );
        }
    }, []);
    return (
        <div className="container">
            <Row>
                <Col md={4}>
                    <h3>New Post</h3>
                    <br/>
                    <Card>
                        <CardContent>
                            <div>
                                <br />
                                <label>Title:</label>
                                <input
                                    style={{width:"100%"}}
                                    type="text"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                />
                            </div>
                            <div>
                                <br />
                                <label>Image:</label>
                                <input
                                    type="file"
                                    id="image"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    name="image"
                                    required />
                            </div>
                            <br />
                            <Button style={{width:"100%"}} color="primary" onClick={createPost}>Post</Button>
                        </CardContent>
                    </Card>

                </Col>
                <Col md={8}>
                    <h3>My Uploads</h3>
                    <br />
                    {
                        myPosts && myPosts.length > 0 &&
                        <Row>
                            {myPosts.map((item, key) => (
                                <Col md={6}>
                                    <ImageGrid item={item} />
                                    <br />
                                </Col>
                            ))}
                        </Row>
                    }
                </Col>
            </Row>
            <Backdrop style={{ zIndex: 999 }} open={open} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default PostImage;
