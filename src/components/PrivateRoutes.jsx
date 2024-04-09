// https://www.youtube.com/watch?v=2k8NleFjG7I
// https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c

import { Navigate, Outlet } from "react-router-dom"
// import { useParams } from "react-router-dom";

const PrivateRoutes = (props) => {
// const PrivateRoutes = () => {
    // const {id} = useParams()
    // let user = id
    // let user = 'Ywl4ZznDusMIpqjm7tQuXJZm6uG3'
    // console.log(props);
    console.log(props.user);
    return(
        // props ? <Outlet /> : <Navigate to='/login' />
        props.user ? <Outlet /> : <Navigate to='/login' />
    ) 
}

export default PrivateRoutes