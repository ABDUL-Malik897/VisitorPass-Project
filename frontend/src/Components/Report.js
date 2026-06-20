import React from 'react'
import { useVisitorsContext } from '../Hooks/useVisitorContext'
import { useNavigate } from 'react-router-dom'
import { useComplaintContext } from '../Hooks/useComplaintContext'
import '../index.css'



const Report = () => {
const { visitors } = useVisitorsContext() 
const navigate = useNavigate()
const { complaints } = useComplaintContext()


const today = new Date().toISOString().split("T")[0]
const week = new Date()
week.setDate(week.getDate() - 7)

const purposeCount = {}
visitors?.forEach(visitor => {
  const purpose = visitor.Purpose
  if (purposeCount[purpose]) {
    purposeCount[purpose] ++
  } else {
    purposeCount[purpose] = 1
  }
})

const typeofComplaints = {}
complaints?.forEach(complaint => {
  const complaintType = complaint.ComplaintType
  if (typeofComplaints[complaintType]) {
    typeofComplaints[complaintType] ++
  } else {
    typeofComplaints[complaintType] = 1
  }
})


const handleback = () => {
  navigate("/admin")
}

const mostCommonPurpose = Object.keys(purposeCount).reduce((a,b) => purposeCount[a] > purposeCount[b] ? a:b,Object.keys(purposeCount)[0]) || "N/A"

const mostCommonType = Object.keys(typeofComplaints).reduce((a,b) => typeofComplaints[a] > typeofComplaints[b] ? a:b,Object.keys(typeofComplaints)[0]) || "N/A"


const  todayVisitor = visitors?.filter(v => v.VisitDate === today).length || 0;

const weeklyVisitors = visitors?.filter(v => new Date(v.createdAt) >= week).length || 0;

  return ( 
    <>
    <div className='report'>
      <button onClick={handleback} className='Back'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill=" rgb(0, 153, 255)"><path d="m330-444 201 201-51 51-288-288 288-288 51 51-201 201h438v72H330Z"/></svg></button>
    <div className='report-card'>
      <h2>Report</h2>
      <p>
        Today's Visitors : {todayVisitor}
      </p>
      <p>
        Total Visitors This Week : {weeklyVisitors}
      </p>
      <p>
        Most Common Visit Purpose : {mostCommonPurpose}
      </p>
      <p>
        Most Common Complaints Type : {mostCommonType}
      </p>
    </div>
    </div>
    </>
  )
}

export default Report