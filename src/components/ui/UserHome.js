import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Carousel from 'react-material-ui-carousel'
import { LangContext, ThemeContext, UserContext } from '../../App'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Consts } from '../../Consts'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Labels } from '../../lang/Labels'

export default function UserHome(){
    
    const { theme } = useContext(ThemeContext)
    const { user } = useContext(UserContext)
    const { lang } = useContext(LangContext)
    const [limit, setLimit] = useState(100)
    var [refreshVar, setRefreshVar] = useState("")
    var [likedIds, setLikedIds] = useState([])

    var [highlightedVersesData, setHighlightedVersesData] = useState([])

    const getHighlightedVerses = () => {
        axios.post(Consts["api_url"]+"bible/getHighlightedVerses", {
            username: user["username"],
            email: user["email"],
            limit: limit
        }).then(response=>{
            if(response.status === 200){
                setHighlightedVersesData(response.data)
                console.log(response.data)
            }
        })
    }

    useEffect(() => {
        try{
            getHighlightedVerses()
        }catch(e){}
    
      return () => {
         
      }
    }, [user, refreshVar])
    

    const addOneLike = (event, id) => {
        axios.post(Consts["api_url"]+"bible/addLikeToHighlightedVerse", {
            username: user["username"],
            email: user["email"],
            id: id
        }).then((response)=>{
            document.getElementById("likes"+id).innerHTML = response.data.likes
            setRefreshVar(Math.random().toString())
            document.getElementById("buttonLike"+id).disabled = true
        })
    }

    const Item = (props) => {
        return (
            <>
            <div style={{borderRadius: "5px", borderColor: theme === "dark" ? "white" : "black", borderStyle: "solid", borderSize: "2px"}}>
                <Container>
                    <h2>{props.item.verseTitle}</h2>
                    <p style={{fontSize: "23px"}}>{props.item.verseData}</p>
        
                    <Row className="justify-content-md-center">
                        <Col md={4}>
                        <button style={{fontSize: "20px"}} id={"buttonLike"+props.item._id} onClick={(event)=>{addOneLike(event, props.item._id)}} className="btn btn-outline-primary">
                            <div id={"likes"+props.item._id}>{props.item.likes}</div> <FavoriteBorderIcon/>
                        </button>&nbsp;&nbsp;
                        
                        <button style={{fontSize: "20px"}} className="btn btn-outline-primary">
                            افتح الاصحاح
                        </button>&nbsp;&nbsp;
                        <button style={{fontSize: "20px"}} className="btn btn-outline-primary">
                            افتح الايه
                        </button>
                        <br/>
                        <br/>
                        </Col>
                    </Row>
                </Container>
            </div>
            </>
        )
    }

    return (
        <Container>
            <br/>
            <Carousel autoPlay={false} animation="slide">
                {
                    highlightedVersesData.map( (item, i) => <Item key={i} item={item} /> )
                }
            </Carousel>
            <br/>
            <br/>
            <br/>
            <Link to="/viewbible" className="btn btn-outline-primary">{ Labels.viewBible[lang] }</Link><br/>
            <br/>
            <br/>
            <br/>
        </Container>
    )

    
}
