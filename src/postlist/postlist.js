
import React from "react";
import { Link } from 'react-router-dom';

class PostList extends React.Component{
  
    state={
        list_data: [],
        user_data: [],
        comm_data: [],
        search:''
    }
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(async (result) => {
                this.setState({
                    list_data: result,
                    comm_data:fetch('https://jsonplaceholder.typicode.com/users/'+this.state.list_data.map((userid)=>(userid.userId)))
                    .then(resu => resu.json())
                    .then(async (resultu) => {
                        // this.setState({
                        this.state.list_data.map((postlists, i) => {
                            resultu.map((userdatas, index) => {
                                if (userdatas.id === postlists.userId) {
                                    // var obj = Object.assign({}, postlists, {'username':userdatas.username});
                                    // console.log(obj); 
                                    this.state.user_data.push(Object.assign({},postlists,{'username':userdatas.username}));
                                }
                                return true;
                            });
                            return true;
                        });
                        this.setState({
                                        
                        });
                        // });
                    }),
                });
            });
        
    };
    editSearchTerm = (e) => {
        this.setState({search: e.target.value})
    }

    render(){
        const searchPost = this.state.user_data.filter(userName => {
            return userName.username.toLowerCase().includes(this.state.search.toLowerCase())
        });
        const searchBox = {
            width: "59%",
            padding: "0 10px",
        };
        // console.log(searchPost);
        return(
            <div className="row col-md-12">
                <div style = {{textAlign: 'center', margin: '10vh 0'}}>
                    <input type='search' value={this.state.search} onChange={this.editSearchTerm} placeholder='Search for a name!' style={searchBox}/>
                </div>
                {searchPost.map((post,index)=><Post key={index} data={post}/>)}
            </div>
        );
    }
}
class Post extends React.Component{
    render(){
        // console.log(this.props.data);
        return(
            
            <div className="col-md-3 card" style={{marginLeft:"20px",border: "1px solid gray",padding: "22px 22px"}}>
                <div className="card-body">
                    <h5 className="card-title">{this.props.data.title}</h5>
                    <p className="card-text">{this.props.data.body}</p>
                    <Link to={`/view/${this.props.data.id}`} style={{float:"left"}} className="btn btn-primary">Post Preview</Link>
                    <Link to={`/user/${this.props.data.userId}`} className="btn btn-primary" style={{marginLeft:"20px"}}>{this.props.data.username}</Link>
                </div>
            </div>
            
        );
    }
}
export default PostList;