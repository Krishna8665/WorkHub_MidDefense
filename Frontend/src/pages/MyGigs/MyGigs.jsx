import React from "react";
import { Link } from "react-router-dom";
import "./myGigs.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyGigs() {
  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();
console.log(currentUser)
  const { isLoading,  data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`gig/single/${currentUser.id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  if(!data){
    return <h1>
      data not found
    </h1>
  }
 
  return (
    <div className="myGigs">
      {isLoading ? (
        "loading"
      )  : (
        <div className="container">
          <div className="title">
            <h1>Gigs</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button>Add New Gig</button>
              </Link>
            )}
          </div>
          <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
            </thead>
             
            <tbody>

           
            {

              data.gig ? (

                <tr>
                  <td>
                    <img src={"https://i.ibb.co/qF53C6g/tiger-jpg.jpg"}  width={70} height={50} alt="" />
                  </td>
                  <td>
                    {data.gig.title}
                  </td>
                  <td>
                    {data.gig.sales}
                  </td>
                  <td>
                    
                      {data.gig.price}
                    

                  </td>
                  <td>
                  <img
                    className="delete"
                    src="./img/delete.png"
                    alt=""
                    onClick={() => handleDelete(gig._id)}
                  />
                  </td>
                </tr>
              )
              :(<tr>
                <td>
                  not Found
                </td>
              </tr>)
            }
             </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyGigs;
