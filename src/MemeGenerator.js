import React, { Component } from 'react';
import axios from 'axios';


class MemeGenerator extends Component{

    constructor(){
        super();
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImage:[]
        };
    };
    componentDidMount(){
        axios.get("https://api.imgflip.com/get_memes")
            .then(res =>{
                const {memes} = res.data.data;
                console.log(memes[0]);
                this.setState({allMemeImage:memes})
            })
            .catch(e=>e)

    }

    handleChange = (event) => {
        const {name,value} = event.target;
        this.setState({[name]:value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const randomNum = Math.floor(Math.random()*101);
        const randomImg = this.state.allMemeImage[randomNum].url;
        console.log(randomImg);
        this.setState({randomImg});
    };

    render(){
        console.log(this.state.allMemeImage[0])
        return(
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>

                    <input type="text" name="topText" placeholder="Top Text" value={this.state.topText} onChange={this.handleChange}/>
                    <input type="text" name="bottomText" placeholder="Bottom Text" value={this.state.bottomText} onChange={this.handleChange}/>

                    <button>Generate</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt=""/>
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
};

export default MemeGenerator;