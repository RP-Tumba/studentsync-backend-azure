import { useEffect, useState } from "react"
import { getAllStudents } from "../API/index"
export default function DisplayStudents() {
  const [fetched,setfetched] =  useState([]);
  useEffect(() => {
    const getStudents = async () => {
      try {
       const  { data }  =  await getAllStudents();
       console.log(data.data)
      } catch (e) {
       console.log("no found");
      }
      
    }  
   getStudents() 
    
  })
  
  
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Student_id</th>
            <th>Email</th>
            <th>dob</th>
            <th>contact_number</th>
            <th>en_dat</th>
            <th>profile picture</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  )
}