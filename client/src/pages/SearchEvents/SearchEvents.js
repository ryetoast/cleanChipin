import React, { Component } from 'react';
import { Col, Row, Container } from "../../components/Grid";
import { form, Input, FormBtn } from "../../components/Form/Formitems";
import SearchList from '../../components/SearchList';
import API from '../../utils/API.js';
import "./SearchEvents.css"



class SearchEvents extends Component {
    state = {
        results: [],
        id: "",
        title: "",
        body: "",
        contact: "",
        location: "",
        keyword: "",
        searchloc: ""
    };

    componentDidMount() {
        this.loadActivities();
    };

    loadActivities = () => {
        API.getActivities()
            .then(res => this.setState({ results: res.data, id: "", title: "", body: "", contact: "", location: "" })
            )
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.keyword && this.state.searchloc) {
            this.searchKeyLoc();
        }else if (this.state.keyword && !this.state.searchloc){
            this.searchKey();
        }else if (this.state.searchloc && !this.state.keyword) {
            this.searchLoc();
        }else {
            this.loadActivities();
        }
    };

    searchKeyLoc = () => {
        console.log("search for keword and location");
        API.getKeywordLocation(this.state.keyword, this.state.searchloc)
            // .then( res => console.log(res))
            .then(res => this.setState({ results: res.data, id: "", title: "", body: "", contact: "", location: "" })
            )
            .catch(err => console.log(err));
    };

    searchKey = () => {
        console.log("search keyword only");
        API.getKeyword(this.state.keyword)
            .then(res => this.setState({ results: res.data, id: "", title: "", body: "", contact: "", location: "" })
            )
            .catch(err => console.log(err));
    };

    searchLoc = () => {
        console.log("search location only");
        API.getLocation(this.state.searchloc)
            .then(res => this.setState({ results: res.data, id: "", title: "", body: "", contact: "", location: "" })
            )
            .catch(err => console.log(err));
    };



    // submit search function for future filtered search of activities
    // submitSearch = (searchData) => {
    //     console.log(searchData);

    //     API.searchActivites(searchData)
    //         .then(res => {
    //             this.setState({ results: res.data.response.docs });
    //             console.log(this.state.results)
    //         }
    //         )
    //         .catch(err => console.log(err));
    // };


    render() {
        return (
            <div className="container search-container">
                <nav className="navbar navbar-expand-lg navbar-dark searchBarRow" align="left">
                    <button className="navbar-toggler navbtn" type="button" data-toggle="collapse" data-target="#dropdown" aria-controls="dropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="fa fa-search" aria-hidden="true"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="dropdown">
                        <ul className="navbar-nav nabarRow justify-content-center">
                            <li>
                                <div className="input-group">
                                    <div class="input-prepend icon-search">
                                        <span class="input-group-text" id="basic-addon1"><i className="fa fa-search"></i></span>
                                    </div>
                                <Input 
                                name="keyword" 
                                value={this.state.keyword}
                                onChange={this.handleInputChange} 
                                className="searchInput" 
                                type="search" 
                                placeholder="Keyword" 
                                aria-label="Search" />
</div>
                            </li>
                            <li>
                                <div className="input-group">
                                    <div class="input-prepend icon-search">
                                        <span class="input-group-text" id="basic-addon1"><i className="fa fa-map-marker"></i></span>
                                    </div>
                                <Input 
                                name="searchloc" 
                                value={this.state.searchloc}
                                onChange={this.handleInputChange} 
                                className="locationInput" 
                                type="search" 
                                placeholder="Location" 
                                aria-label="Search" />
                                </div>                           
                            </li>
                            <li>
                                <div className="input-group">
                                <button 
                                onClick={this.handleFormSubmit}
                                className="searchBtn" 
                                type="submit">Search</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Row>
                    <Col size="md-12 sm-12">
                        <div className="mx-auto resultsList">
                            <SearchList>{this.state.results}</SearchList>
                        </div>
                    </Col>
                </Row>



            </div>
        );
    };

};

export default SearchEvents;

