import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import AdminSide from '../../components/adminSide'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const UpdateNotice = () => {
  const navigate = useNavigate();
  const params = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [catagory, setCatagory] = useState('')
  const [photo, setPhoto] = useState('')

  const getData = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/notice/getSingleNotice/${params.id}`)
      setTitle(data?.data.title)
      setDescription(data?.data.description)
      setDate(data?.data.date)
      setCatagory(data?.data.catagory)
      setPhoto(data?.data.photo)

    } catch (error) {
      console.log(error)



    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const updateData = new FormData();
      updateData.append('title', title)
      updateData.append('description', description)
      updateData.append('catagory', catagory)
      updateData.append('date', date)
      updateData.append('photo', photo)
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/notice/updateNotice/${params.id}`, updateData)

      if (data.success) {
        navigate('/admin/dashboard/notice-detail')
        setTimeout(() => {
          toast.success('Data Updated SuccessFully')
        }, 100)
      }

    } catch (error) {
      console.log(error)


    }
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <Layout>
      <>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <AdminSide />
            </div>

            <div className="col-8">
              <div className="container mt-3 w-75">
                <h4 className="text-center mb-3">Enter Detail To Add a Student</h4>
                <form>
                  <div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Title"
                        required
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter catagory"
                        required
                        value={catagory}
                        onChange={(e) => {
                          setCatagory(e.target.value);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <textarea cols='30' rows='10'
                        type="text"
                        className="form-control"
                        placeholder="Enter description"
                        required
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}>

                      </textarea>
                    </div>
                    {date != '1' ? <div className="mb-3">
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Enter Phone no"
                        required
                        value={date}
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                      />
                    </div> :
                      'Unlimited'
                    }


                    <div className="mb-3">
                      {photo ?
                        (
                          <div className="text-center">
                            <img src={URL.createObjectURL(photo)} alt="photo" className="img img-responsive" height={"200px"} />
                          </div>
                        ) :
                        (
                          <div className="text-center">
                            <img src={`${process.env.REACT_APP_API_URL}/api/v1/notice/get-photo/${params.id}`} alt="NO PHOTO IS ADDED" className="img img-responsive" height={"200px"} />
                          </div>

                        )
                      }
                    </div>
                    <div className="mb-3">
                      <label className="btn btn-outline-secondary col-mb-12">
                        {photo ? photo.name : "Change photo"}
                        <input
                          type="file"
                          name="photo"
                          accept="images/*"
                          onChange={(e) => {
                            setPhoto(e.target.files[0]);
                          }}
                          hidden></input>
                      </label>
                    </div>

                    <button className="btn btn-primary" onClick={handleSubmit}>Update</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  )
}

export default UpdateNotice