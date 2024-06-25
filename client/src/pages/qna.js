import React from 'react'
import Layout from './components/Layout'

const Qna = () => {
  return (
    <Layout>
<div className='main-qna'>
  <div className="faq-header">Frequently Asked Questions</div>
  <div className="faq-content">
      <div className="faq-question">
        <input id="q1" type="checkbox" className="panel" />
        <div className="plus">+</div>
        <label htmlFor="q1" className="panel-title">What is the motto of My School?</label>
        <div className="panel-content">
          The motto of My School is "Learning today, leading tomorrow." It reflects our commitment to providing a nurturing environment where students can grow academically and personally to become future leaders.
        </div>
      </div>
      <div className="faq-question">
        <input id="q2" type="checkbox" className="panel" />
        <div className="plus">+</div>
        <label htmlFor="q2" className="panel-title">How many students attend My School?</label>
        <div className="panel-content">
          My School has approximately 1000 students. We believe in maintaining a conducive teacher-to-student ratio to ensure personalized attention and effective learning outcomes.
        </div>
      </div>
      <div className="faq-question">
        <input id="q3" type="checkbox" className="panel" />
        <div className="plus">+</div>
        <label htmlFor="q3" className="panel-title">Who founded My School?</label>
        <div className="panel-content">
          My School was founded by Mr. John Smith in 1990. His vision was to establish an institution that blends traditional values with modern educational practices, preparing students for success in a globalized world.
        </div>
      </div>
      <div className="faq-question">
        <input id="q4" type="checkbox" className="panel" />
        <div className="plus">+</div>
        <label htmlFor="q4" className="panel-title">What are the school hours at My School?</label>
        <div className="panel-content">
          School hours at My School are from 8:00 AM to 3:00 PM. Our structured schedule allows for a balanced curriculum of academics, arts, and sports, fostering holistic development.
        </div>
      </div>
      <div className="faq-question">
        <input id="q5" type="checkbox" className="panel" />
        <div className="plus">+</div>
        <label htmlFor="q5" className="panel-title">Where is My School located?</label>
        <div className="panel-content">
          My School is located in the heart of [City Name], [Country Name]. Our campus provides a safe and stimulating environment for students to learn and explore their potential.
        </div>
      </div>
      <div className="faq-question">
        <input id="q6" type="checkbox" className="panel" />
        <div className="plus">+</div>
        <label htmlFor="q6" className="panel-title">What are the extracurricular activities offered at My School?</label>
        <div className="panel-content">
          My School offers a wide range of extracurricular activities, including sports such as basketball, soccer, and swimming, as well as clubs for debate, music, and community service. These activities enrich the student experience and promote leadership and teamwork.
        </div>
      </div>
      <div className="faq-question">
        <input id="q7" type="checkbox" className="panel" />
        <div className="plus">+</div>
        <label htmlFor="q7" className="panel-title">Does My School have a uniform policy?</label>
        <div className="panel-content">
          Yes, My School has a mandatory uniform policy for all students. Uniforms promote a sense of unity and equality among students, emphasizing the importance of discipline and respect within our school community.
        </div>
      </div>
      <div className="faq-question">
        <input id="q8" type="checkbox" className="panel" />
        <div className="plus">+</div>
        <label htmlFor="q8" className="panel-title">What languages are taught at My School?</label>
        <div className="panel-content">
          At My School, students learn English, Spanish, and French. We believe in equipping our students with linguistic skills that enhance their communication abilities and broaden their global perspective.
        </div>
      </div>
      <div className="faq-question">
        <input id="q9" type="checkbox" className="panel" />
        <div className="plus">+</div>
        <label htmlFor="q9" className="panel-title">Does My School have a library?</label>
        <div className="panel-content">
          Yes, My School has a well-stocked library with over 10,000 books covering various genres and subjects. The library serves as a hub for research, reading, and academic enrichment, supporting our students' intellectual growth.
        </div>
      </div>
      <div className="faq-question">
        <input id="q10" type="checkbox" className="panel" />
        <div className="plus">+</div>
        <label htmlFor="q10" className="panel-title">What is the school mascot of My School?</label>
        <div className="panel-content">
          The school mascot of My School is the Eagles. The eagle symbolizes strength, resilience, and soaring high, reflecting the spirit of determination and achievement we instill in our students.
        </div>
      </div>
    </div>
</div>


    </Layout>
  )
}

export default Qna