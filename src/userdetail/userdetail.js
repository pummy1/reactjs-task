import React from 'react';
import { Link } from 'react-router-dom';

class UserDetail extends React.Component{
    state={
        users:[],
        addresss:[],
        companies:[]
    }

    componentDidMount = async () => {
        var ids = this.props.match.params.id;
    
        fetch('https://jsonplaceholder.typicode.com/users/'+ids)
            .then(res => res.json())
            .then(result => {
                    this.setState({
                        users: result,
                        addresss: result.address,
                        companies: result.company
                    });
            });
    };
    render(){
        // console.log(this.props.match.params.id);
        const { users,companies,addresss } = this.state;
        return(
            <div className="card" style={{width: "18rem",marginLeft:"20px",border: "1px solid gray",padding: "22px 22px"}}>
                {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
                <div className="card-body">
                    <h5 className="card-title">Full Name : {users.name}</h5>
                    <p className="card-text">User Name : {users.username}</p>
                    <p className="card-text">Email : {users.email}</p>
                    <p className="card-text">Address : {addresss.street+' '+addresss.suite+' '+addresss.city+' '+addresss.zipcode}</p>
                    <p className="card-text">Company Address : {companies.name+' '+companies.catchPhrase+' '+companies.bs}</p>
                    <p>Website : <Link to={users.website} target="_blank" className="nav-link">{users.website}</Link></p>
                    <Link to={'/'} className="btn btn-primary" style={{marginLeft:"20px"}}>Back to List</Link>
                </div>
            </div>
            // <div>
            //     {users.map((user,i)=><Users key={i} data={user}/>)}
            // </div>
        );
    }
}
export default UserDetail;