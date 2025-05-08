import { useEffect, useState } from "react"
import { getAllStudents } from "../API/index"
export default function DisplayStudents() {
  const [studentData, setStudentData] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')


  useEffect(() => {
    setLoading(false)
    const getStudents = async () => {
      try {
        const { data } = await getAllStudents()
        setStudentData(data.data)
        // console.log(data.data)
        // setStudentData("yes")
        setLoading(false)

      } catch (error) {
        console.log(error)
      }


    }
git
   
    getStudents()
  }, [])
  function handleSearch(e) {
    setSearch(e.target.value)
  }

  return (
    <>
      <div className="search">
        <input type="search" name="" id="" onChange={handleSearch} />
      </div>
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
          {studentData.filter((item) => {
            return search.toLowerCase() === '' ? item : item.first_name.toLowerCase().includes(search) ||
              search.toUpperCase() === '' ? item : item.first_name.toUpperCase().includes(search)

          })
            .map((data, index) =>
              <tr key={index}>
                {loading === true ? 'Loading...' : ''}

                <td>{data.id}</td>
                <td>{data.first_name}</td>
                <td>{data.last_name}</td>
                <td>{data.student_id}</td>
                <td>{data.email}</td>
                <td>{data.date_of_birth}</td>
                <td>{data.contact_number}</td>
                <td>{data.enrollment_date}</td>
                <td>{data.profile_picture}</td>
              </tr>
            )}
        </tbody>
      </table>
    </>
  )
}