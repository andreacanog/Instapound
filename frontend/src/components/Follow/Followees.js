import React from "react";
import { useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getUser } from "../../store/user";
import "./follow.css"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/user";
import { useHistory, Redirect } from "react-router-dom";


const Followees = () => {
    let {userId} = useParams();
    let user = useSelector(getUser(userId));
    let sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        dispatch(fetchUser(userId))
    }, [])


    const closeModalFollows = (e) => {
        e.preventDefault();
        let modal = document.getElementById('follows-modal-followees');
        modal.style.display = 'none';
        // return;
    }

    const hanldeUserLinkClick = (e, id) => {
        e.preventDefault()
        closeModalFollows(e);
        return (<Redirect to={`/users/${id}`}></Redirect>)
        // history.push(`/users/${id}`);
        // .then(() => {history.push(`/users/${id}`)})
    }

    return (
        <div className="modal-followees-users" id="follows-modal-followees">
            <div className="modal-followees-users-header">
            <h1 className="followees-title">Users that you follow</h1>
            {user && user.followees.map(followee => {
                return followee.id !== sessionUser.id ? (
                    <div className="followees-container">
                        <button className="followee-show-profile-link" onClick={e => hanldeUserLinkClick(e, followee.id)}>{followee.profilePictureUrl ? <img className="followee-show-profile-link"  src={followee.profilePictureUrl} alt="profile"  /> : <></>}</button>
                        <h2 className="followee-username">{followee.username}</h2>
                    </div>
                ) : <></>
            })}
            <button id="modal-close-button-followees" className='modal-close-button-followees' onClick={closeModalFollows}>Close Followings</button>
            </div>
        </div>
    )
}

export default Followees;