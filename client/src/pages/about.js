import React from 'react'
import Layout from './components/Layout'

const AboutUs = () => {
  return (
   
     <Layout>
          <div>
  <section className="about">
    <h1>About Us</h1>
    <p style={{fontWeight: 'bold'}}>
      GeeksforGeeks is a leading platform...
    </p>
    <div className="about-info">
      <div className="about-img">
        <img src="images/logo1.png" alt="Geeksforgeeks" />
      </div>
      <div>
      <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in venenatis enim. Integer euismod risus non nisi malesuada, a luctus libero vehicula. Curabitur at elit non nunc volutpat viverra.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in venenatis enim. Integer euismod risus non nisi malesuada, a luctus libero vehicula. Curabitur at elit non nunc volutpat viverra.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in venenatis enim. Integer euismod risus non nisi malesuada, a luctus libero vehicula. Curabitur at elit non nunc volutpat viverra.
        </p>
        

        <button>Home</button>
      </div>
    </div>
  </section>
  <section className="team">
    <h1>Meet Our Team</h1>
    <div className="team-cards">
      {/* Cards here */}
      {/* Card 1 */}
      <div className="card">
        <div className="card-img">
          <img src="images/about1.jpg" alt="User 1" />
        </div>
        <div className="card-info">
          <h2 className="card-name">Jane</h2>
          <p className="card-role">CEO and Founder</p>
          <p className="card-email">jane@example.com</p>
          <p><button className="button">Contact</button></p>
        </div>
      </div>
      {/* Card 2 */}
      <div className="card">
        <div className="card-img">
          <img src="images/about2.jpg" alt="User 2" />
        </div>
        <div className="card-info">
          <h2 className="card-name">Miller</h2>
          <p className="card-role">Co-Founder</p>
          <p className="card-email">Miller@example.com</p>
          <p><button className="button">Contact</button></p>
        </div>
      </div>
      {/* Card 3 */}
      <div className="card">
        <div className="card-img">
          <img src="images/about3.jpg" alt="User 3" />
        </div>
        <div className="card-info">
          <h2 className="card-name">Joe</h2>
          <p className="card-role">Co-Founder</p>
          <p className="card-email">Joe@example.com</p>
          <p><button className="button">Contact</button></p>
        </div>
      </div>
    </div>
  </section>
</div>

     </Layout>
  )
}

export default AboutUs