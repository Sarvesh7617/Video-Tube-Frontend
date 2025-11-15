import React,{useEffect} from "react";
import {getUserChannelSubscribers} from "../../store/Slices/subscriptionSlice"
import {useDispatch,useSelector} from "react-redux";
import {Avatar,Button} from "../../components";
import {Link} from "react-router-dom";




const ChannelSubscribers=()=>{
    const dispatch=useDispatch();
    const subscribers=useSelector((state)=>state.subscription?.channelSubscribers)
    const channelId=useSelector((state)=>state.user.profileData?._id)

    useEffect(()=>{
        dispatch(getUserChannelSubscribers(channelId))
    },[channelId])

    return(
        <>
            {subscribers?.map((subscriber)=>(
                <Link
                    to={`/channel/${subscriber?.subscriber?._id}`}
                    key={subscriber?.subscriber?._id}
                >
                    <div>
                        <Avatar
                            src={subscriber?.subscriber?.avatar.url}
                            channelName={subscriber?.subscriber?.username}
                        />
                        <div>
                            <p>{subscriber?.subscriber?.username}</p>
                            <span>{subscriber?.subscriber?.subscribersCount} Subscribers</span>
                        </div>
                    </div>
                    <div>
                        <Button>
                            {subscriber?.subscriber?.subscribedToSubscriber?"Unsubscribe":"Subscribe"}
                        </Button>
                    </div>
                </Link>
            ))}
        </>
    )

}

export default ChannelSubscribers;