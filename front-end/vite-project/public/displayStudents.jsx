import { useState } from "react"
import { getAllStudents } from "../API/index"
export default function DisplayStudents() {

  const getStudents = async () => {
    const { data } = await getAllStudents();
    console.log(data)
  }
  getStudents()
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