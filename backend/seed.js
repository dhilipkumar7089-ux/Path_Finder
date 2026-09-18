const mysql = require('mysql2/promise');
require('dotenv').config();
console.log('Password loaded:', process.env.DB_PASSWORD); 

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  try {
    console.log('Seeding database...');

    // Clear existing data
    await connection.execute('DELETE FROM career_roadmaps');
    await connection.execute('DELETE FROM course_cutoffs');
    await connection.execute('DELETE FROM courses');
    await connection.execute('DELETE FROM bookmarks');
    await connection.execute('DELETE FROM quiz_responses');
    await connection.execute('DELETE FROM quiz_questions');
    await connection.execute('DELETE FROM colleges');
    await connection.execute('DELETE FROM students');

    // Insert Quiz Questions
    const questions = [
      {
        question: 'Which subject fascinates you the most?',
        domain: 'engineering',
        option_a: 'Mathematics and Physics',
        option_b: 'Biology and Chemistry',
        option_c: 'Accounting and Economics',
        option_d: 'Literature and History',
        correct_answer: 'A'
      },
      {
        question: 'What type of problems do you enjoy solving?',
        domain: 'medical',
        option_a: 'Building and designing things',
        option_b: 'Understanding human body and diseases',
        option_c: 'Analyzing financial data',
        option_d: 'Understanding human behavior',
        correct_answer: 'B'
      },
      {
        question: 'Which career path appeals to you?',
        domain: 'commerce',
        option_a: 'Software Engineer',
        option_b: 'Doctor',
        option_c: 'Chartered Accountant',
        option_d: 'Journalist',
        correct_answer: 'C'
      },
      {
        question: 'What kind of projects do you prefer?',
        domain: 'arts',
        option_a: 'Building apps and websites',
        option_b: 'Conducting lab experiments',
        option_c: 'Creating business plans',
        option_d: 'Writing stories and articles',
        correct_answer: 'D'
      },
      {
        question: 'Which field would you like to explore further?',
        domain: 'engineering',
        option_a: 'Artificial Intelligence',
        option_b: 'Medical Research',
        option_c: 'Investment Banking',
        option_d: 'Creative Writing',
        correct_answer: 'A'
      }
    ];

    for (const q of questions) {
      await connection.execute(
        'INSERT INTO quiz_questions (question, domain, option_a, option_b, option_c, option_d, correct_answer) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [q.question, q.domain, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_answer]
      );
    }

    console.log('Quiz questions seeded');

    // Insert Colleges
    const colleges = [
      {
        name: 'Anna University',
        district: 'Chennai',
        state: 'Tamil Nadu',
        description: 'Premier technical university in Tamil Nadu with excellent placement records.',
        infrastructure: 'State-of-the-art labs, modern library, sports complex, hostels',
        website: 'https://www.annauniv.edu',
        image1: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400',
        image2: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400',
        image3: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400'
      },
      {
        name: 'Madras Medical College',
        district: 'Chennai',
        state: 'Tamil Nadu',
        description: 'One of the oldest medical colleges in India with world-class healthcare facilities.',
        infrastructure: 'Attached government hospital, research labs, modern classrooms',
        website: 'https://www.tnmgrmu.ac.in',
        image1: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400',
        image2: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
        image3: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400'
      },
      {
        name: 'Loyola College',
        district: 'Chennai',
        state: 'Tamil Nadu',
        description: 'Premier arts and science college known for academic excellence and holistic development.',
        infrastructure: 'Modern campus, well-equipped labs, library, sports facilities',
        website: 'https://www.loyolacollege.edu',
        image1: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400',
        image2: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400',
        image3: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=400'
      },
      {
        name: 'PSG College of Arts & Science',
        district: 'Coimbatore',
        state: 'Tamil Nadu',
        description: 'Reputed institution offering diverse programs with strong industry connections.',
        infrastructure: 'Spacious campus, digital library, research centers',
        website: 'https://www.psgcas.ac.in',
        image1: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
        image2: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400',
        image3: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400'
      },
      {
        name: 'SRM University',
        district: 'Kanchipuram',
        state: 'Tamil Nadu',
        description: 'Private university with world-class infrastructure and global partnerships.',
        infrastructure: 'Smart classrooms, research labs, international hostel facilities',
        website: 'https://www.srmist.edu.in',
        image1: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400',
        image2: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400',
        image3: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400'
      },
      {
        name: 'Christian Medical College',
        district: 'Vellore',
        state: 'Tamil Nadu',
        description: 'Top-ranked medical institution with exceptional healthcare and research facilities.',
        infrastructure: 'Teaching hospital, advanced medical equipment, research centers',
        website: 'https://www.cmch-vellore.edu',
        image1: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400',
        image2: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
        image3: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400'
      },
      {
        name: 'Stella Maris College',
        district: 'Chennai',
        state: 'Tamil Nadu',
        description: 'Women\'s college offering quality education in arts, science, and commerce.',
        infrastructure: 'Beautiful campus, modern facilities, focus on women empowerment',
        website: 'https://www.stellamariscollege.edu',
        image1: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400',
        image2: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400',
        image3: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=400'
      },
      {
        name: 'SASTRA University',
        district: 'Thanjavur',
        state: 'Tamil Nadu',
        description: 'Deemed university known for engineering and technology programs with excellent placements.',
        infrastructure: 'Tech-enabled campus, innovation centers, incubation facilities',
        website: 'https://www.sastra.edu',
        image1: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400',
        image2: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400',
        image3: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400'
      },
      // Erode Engineering Colleges
      {
        name: 'Government College of Engineering, Erode (formerly IRTT)',
        district: 'Erode',
        state: 'Tamil Nadu',
        description: 'Premier government engineering college with excellent academic record and placements.',
        infrastructure: 'Modern labs, library, computer centers, sports facilities, hostel, auditorium',
        website: 'https://www.gceerode.ac.in',
        image1: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400',
        image2: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400',
        image3: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400'
      },
      {
        name: 'Kongu Engineering College',
        district: 'Erode',
        state: 'Tamil Nadu',
        description: 'Top-ranked autonomous engineering college with excellent infrastructure and placements.',
        infrastructure: 'State-of-the-art labs, modern library, sports complex, hostels, research centers',
        website: 'https://www.kongu.edu',
        image1: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400',
        image2: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400',
        image3: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400'
      },
      {
        name: 'Bannari Amman Institute of Technology',
        district: 'Erode',
        state: 'Tamil Nadu',
        description: 'Reputed engineering college known for quality education and industry partnerships.',
        infrastructure: 'Advanced labs, library, sports facilities, hostels, innovation center',
        website: 'https://www.bitsathy.ac.in',
        image1: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
        image2: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400',
        image3: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400'
      },
      {
        name: 'Erode Sengunthar Engineering College',
        district: 'Erode',
        state: 'Tamil Nadu',
        description: 'Engineering college with focus on practical learning and skill development.',
        infrastructure: 'Modern labs, computer centers, library, sports facilities, transport',
        website: 'https://www.esec.ac.in',
        image1: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400',
        image2: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400',
        image3: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400'
      },
      {
        name: 'Velalar College of Engineering and Technology',
        district: 'Erode',
        state: 'Tamil Nadu',
        description: 'Engineering college with emphasis on research and innovation.',
        infrastructure: 'Well-equipped labs, library, sports complex, hostels, research facilities',
        website: 'https://www.velalarengg.ac.in',
        image1: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400',
        image2: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400',
        image3: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400'
      },
      {
        name: 'Nandha Engineering College',
        district: 'Erode',
        state: 'Tamil Nadu',
        description: 'Engineering college with strong placement record and industry connections.',
        infrastructure: 'Modern infrastructure, labs, library, sports facilities, hostels',
        website: 'https://www.nandhaengg.ac.in',
        image1: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
        image2: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400',
        image3: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400'
      },
      // Erode Arts, Science and Medical Colleges
      {
        name: 'Erode Arts and Science College',
        district: 'Erode',
        state: 'Tamil Nadu',
        description: 'Premier arts and science college with excellent academic reputation.',
        infrastructure: 'Modern classrooms, library, computer labs, sports facilities, auditorium',
        website: 'https://www.easc.ac.in',
        image1: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400',
        image2: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400',
        image3: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=400'
      },
      {
        name: 'Kongu Arts and Science College',
        district: 'Erode',
        state: 'Tamil Nadu',
        description: 'Reputed arts and science college with diverse programs and good facilities.',
        infrastructure: 'Spacious campus, modern labs, library, sports facilities, hostels',
        website: 'https://www.konguarts.ac.in',
        image1: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400',
        image2: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400',
        image3: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400'
      },
      {
        name: 'Vellalar College for Women',
        district: 'Erode',
        state: 'Tamil Nadu',
        description: 'Premier women\'s college offering quality education in arts and science.',
        infrastructure: 'Beautiful campus, modern facilities, library, sports complex, hostels',
        website: 'https://www.vellalarcollege.org',
        image1: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
        image2: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400',
        image3: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400'
      },
      {
        name: 'Chikkaiah Naicker College',
        district: 'Erode',
        state: 'Tamil Nadu',
        description: 'Established arts and science college with strong academic tradition.',
        infrastructure: 'Traditional campus with modern facilities, library, computer labs, sports',
        website: 'https://www.cncerode.ac.in',
        image1: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400',
        image2: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400',
        image3: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=400'
      },
      {
        name: 'Government Erode Medical College',
        district: 'Erode',
        state: 'Tamil Nadu',
        description: 'Government medical college with excellent hospital facilities and training.',
        infrastructure: 'Government hospital attached, modern labs, research facilities, hostels',
        website: 'https://www.gemcerode.in',
        image1: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400',
        image2: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
        image3: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400'
      },
      {
        name: 'Bharathidasan University',
        district: 'Trichy',
        state: 'Tamil Nadu',
        description: 'Reputed university offering diverse programs in arts, science, and engineering.',
        infrastructure: ' sprawling campus, research facilities, modern classrooms',
        website: 'https://www.bdu.ac.in',
        image1: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400',
        image2: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400',
        image3: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=400'
      },
      {
        name: 'National Institute of Technology',
        district: 'Trichy',
        state: 'Tamil Nadu',
        description: 'Premier technical institute with national reputation and excellent placements.',
        infrastructure: 'Advanced labs, research centers, hostels, sports complex',
        website: 'https://www.nitt.edu',
        image1: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400',
        image2: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400',
        image3: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400'
      },
      {
        name: 'K.S.R. College of Engineering',
        district: 'Namakkal',
        state: 'Tamil Nadu',
        description: 'Leading engineering college with strong industry partnerships and good placements.',
        infrastructure: 'Modern infrastructure, labs, library, hostel facilities',
        website: 'https://www.ksrce.ac.in',
        image1: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
        image2: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400',
        image3: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400'
      },
      {
        name: 'Madurai Medical College',
        district: 'Madurai',
        state: 'Tamil Nadu',
        description: 'Government medical college with excellent hospital facilities and training.',
        infrastructure: 'Government hospital attached, modern labs, research facilities',
        website: 'https://www.maduraimec.gov.in',
        image1: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400',
        image2: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
        image3: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400'
      },
      {
        name: 'Thiagarajar College of Engineering',
        district: 'Madurai',
        state: 'Tamil Nadu',
        description: 'Autonomous engineering college with excellent academic record and placements.',
        infrastructure: 'Modern campus, advanced labs, library, sports facilities',
        website: 'https://www.tce.edu',
        image1: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400',
        image2: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400',
        image3: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400'
      },
      {
        name: 'Sona College of Technology',
        district: 'Salem',
        state: 'Tamil Nadu',
        description: 'Premier engineering college with strong focus on research and innovation.',
        infrastructure: 'State-of-the-art labs, research centers, modern classrooms',
        website: 'https://www.sonatech.ac.in',
        image1: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400',
        image2: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400',
        image3: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400'
      },
      {
        name: 'Government Arts College',
        district: 'Salem',
        state: 'Tamil Nadu',
        description: 'Reputed government college offering quality education in arts and science.',
        infrastructure: 'Spacious campus, library, computer labs, sports facilities',
        website: 'https://www.gacsalem.ac.in',
        image1: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400',
        image2: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400',
        image3: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=400'
      },
      {
        name: 'Manonmaniam Sundaranar University',
        district: 'Tirunelveli',
        state: 'Tamil Nadu',
        description: 'University offering diverse programs with focus on research and development.',
        infrastructure: 'Modern campus, research facilities, library, hostels',
        website: 'https://www.msuniv.ac.in',
        image1: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
        image2: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400',
        image3: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400'
      }
    ];

    const collegeIds = [];
    for (const college of colleges) {
      const [result] = await connection.execute(
        'INSERT INTO colleges (name, district, state, description, infrastructure, website, image1, image2, image3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [college.name, college.district, college.state, college.description, college.infrastructure, college.website, college.image1, college.image2, college.image3]
      );
      collegeIds.push(result.insertId);
    }

    console.log('Colleges seeded');

    // Insert Courses
    const courses = [
      // Original colleges courses
      { college_id: collegeIds[0], name: 'B.Tech Computer Science', domain: 'engineering', duration: '4 years', description: 'Study of computer systems, programming, and software development.' },
      { college_id: collegeIds[0], name: 'B.Tech Mechanical Engineering', domain: 'engineering', duration: '4 years', description: 'Study of mechanical systems, machines, and manufacturing.' },
      { college_id: collegeIds[1], name: 'MBBS', domain: 'medical', duration: '5.5 years', description: 'Bachelor of Medicine and Bachelor of Surgery.' },
      { college_id: collegeIds[1], name: 'BDS', domain: 'medical', duration: '5 years', description: 'Bachelor of Dental Surgery.' },
      { college_id: collegeIds[2], name: 'B.Com Computer Applications', domain: 'commerce', duration: '3 years', description: 'Commerce with focus on computer applications.' },
      { college_id: collegeIds[2], name: 'B.A. English Literature', domain: 'arts', duration: '3 years', description: 'Study of English language and literature.' },
      { college_id: collegeIds[3], name: 'B.Sc Physics', domain: 'arts', duration: '3 years', description: 'Study of physics principles and applications.' },
      { college_id: collegeIds[3], name: 'B.Com Corporate Secretaryship', domain: 'commerce', duration: '3 years', description: 'Commerce with corporate law focus.' },
      { college_id: collegeIds[4], name: 'B.Tech Artificial Intelligence', domain: 'engineering', duration: '4 years', description: 'Study of AI and machine learning systems.' },
      { college_id: collegeIds[4], name: 'B.Tech Biotechnology', domain: 'engineering', duration: '4 years', description: 'Study of biological systems and technology.' },
      { college_id: collegeIds[5], name: 'MBBS', domain: 'medical', duration: '5.5 years', description: 'Bachelor of Medicine and Bachelor of Surgery.' },
      { college_id: collegeIds[5], name: 'B.Sc Nursing', domain: 'medical', duration: '4 years', description: 'Bachelor of Science in Nursing.' },
      { college_id: collegeIds[6], name: 'B.A. Economics', domain: 'arts', duration: '3 years', description: 'Study of economic theories and policies.' },
      { college_id: collegeIds[6], name: 'B.Com General', domain: 'commerce', duration: '3 years', description: 'General commerce program.' },
      { college_id: collegeIds[7], name: 'B.Tech Electronics & Communication', domain: 'engineering', duration: '4 years', description: 'Study of electronic systems and communication.' },
      { college_id: collegeIds[7], name: 'B.Tech Civil Engineering', domain: 'engineering', duration: '4 years', description: 'Study of construction and infrastructure.' },
      
      // Erode Engineering Colleges courses (collegeIds[8] to collegeIds[13])
      { college_id: collegeIds[8], name: 'B.Tech Computer Science', domain: 'engineering', duration: '4 years', description: 'Study of computer systems, programming, and software development.' },
      { college_id: collegeIds[8], name: 'B.Tech Mechanical Engineering', domain: 'engineering', duration: '4 years', description: 'Study of mechanical systems, machines, and manufacturing.' },
      { college_id: collegeIds[8], name: 'B.Tech Civil Engineering', domain: 'engineering', duration: '4 years', description: 'Study of construction and infrastructure.' },
      { college_id: collegeIds[8], name: 'B.Tech Electronics & Communication', domain: 'engineering', duration: '4 years', description: 'Study of electronic systems and communication.' },
      
      { college_id: collegeIds[9], name: 'B.Tech Computer Science', domain: 'engineering', duration: '4 years', description: 'Study of computer systems, programming, and software development.' },
      { college_id: collegeIds[9], name: 'B.Tech Mechanical Engineering', domain: 'engineering', duration: '4 years', description: 'Study of mechanical systems, machines, and manufacturing.' },
      { college_id: collegeIds[9], name: 'B.Tech Information Technology', domain: 'engineering', duration: '4 years', description: 'Study of information systems and technology.' },
      { college_id: collegeIds[9], name: 'B.Tech Biotechnology', domain: 'engineering', duration: '4 years', description: 'Study of biological systems and technology.' },
      
      { college_id: collegeIds[10], name: 'B.Tech Computer Science', domain: 'engineering', duration: '4 years', description: 'Study of computer systems, programming, and software development.' },
      { college_id: collegeIds[10], name: 'B.Tech Mechanical Engineering', domain: 'engineering', duration: '4 years', description: 'Study of mechanical systems, machines, and manufacturing.' },
      { college_id: collegeIds[10], name: 'B.Tech Electrical & Electronics', domain: 'engineering', duration: '4 years', description: 'Study of electrical and electronic systems.' },
      
      { college_id: collegeIds[11], name: 'B.Tech Computer Science', domain: 'engineering', duration: '4 years', description: 'Study of computer systems, programming, and software development.' },
      { college_id: collegeIds[11], name: 'B.Tech Mechanical Engineering', domain: 'engineering', duration: '4 years', description: 'Study of mechanical systems, machines, and manufacturing.' },
      { college_id: collegeIds[11], name: 'B.Tech Civil Engineering', domain: 'engineering', duration: '4 years', description: 'Study of construction and infrastructure.' },
      
      { college_id: collegeIds[12], name: 'B.Tech Computer Science', domain: 'engineering', duration: '4 years', description: 'Study of computer systems, programming, and software development.' },
      { college_id: collegeIds[12], name: 'B.Tech Mechanical Engineering', domain: 'engineering', duration: '4 years', description: 'Study of mechanical systems, machines, and manufacturing.' },
      { college_id: collegeIds[12], name: 'B.Tech Electronics & Communication', domain: 'engineering', duration: '4 years', description: 'Study of electronic systems and communication.' },
      
      { college_id: collegeIds[13], name: 'B.Tech Computer Science', domain: 'engineering', duration: '4 years', description: 'Study of computer systems, programming, and software development.' },
      { college_id: collegeIds[13], name: 'B.Tech Mechanical Engineering', domain: 'engineering', duration: '4 years', description: 'Study of mechanical systems, machines, and manufacturing.' },
      { college_id: collegeIds[13], name: 'B.Tech Civil Engineering', domain: 'engineering', duration: '4 years', description: 'Study of construction and infrastructure.' },
      
      // Erode Arts, Science and Medical Colleges courses (collegeIds[14] to collegeIds[18])
      { college_id: collegeIds[14], name: 'B.Sc Computer Science', domain: 'arts', duration: '3 years', description: 'Study of computer science principles and programming.' },
      { college_id: collegeIds[14], name: 'B.Com Computer Applications', domain: 'commerce', duration: '3 years', description: 'Commerce with focus on computer applications.' },
      { college_id: collegeIds[14], name: 'B.A. English Literature', domain: 'arts', duration: '3 years', description: 'Study of English language and literature.' },
      
      { college_id: collegeIds[15], name: 'B.Sc Computer Science', domain: 'arts', duration: '3 years', description: 'Study of computer science principles and programming.' },
      { college_id: collegeIds[15], name: 'B.Com General', domain: 'commerce', duration: '3 years', description: 'General commerce program.' },
      { college_id: collegeIds[15], name: 'B.Sc Mathematics', domain: 'arts', duration: '3 years', description: 'Study of mathematical theories and applications.' },
      
      { college_id: collegeIds[16], name: 'B.Sc Computer Science', domain: 'arts', duration: '3 years', description: 'Study of computer science principles and programming.' },
      { college_id: collegeIds[16], name: 'B.Com Computer Applications', domain: 'commerce', duration: '3 years', description: 'Commerce with focus on computer applications.' },
      { college_id: collegeIds[16], name: 'B.A. Economics', domain: 'arts', duration: '3 years', description: 'Study of economic theories and policies.' },
      
      { college_id: collegeIds[17], name: 'B.Sc Computer Science', domain: 'arts', duration: '3 years', description: 'Study of computer science principles and programming.' },
      { college_id: collegeIds[17], name: 'B.Com General', domain: 'commerce', duration: '3 years', description: 'General commerce program.' },
      { college_id: collegeIds[17], name: 'B.Sc Physics', domain: 'arts', duration: '3 years', description: 'Study of physics principles and applications.' },
      
      { college_id: collegeIds[18], name: 'MBBS', domain: 'medical', duration: '5.5 years', description: 'Bachelor of Medicine and Bachelor of Surgery.' },
      { college_id: collegeIds[18], name: 'B.Sc Nursing', domain: 'medical', duration: '4 years', description: 'Bachelor of Science in Nursing.' },
      { college_id: collegeIds[18], name: 'B.Pharm', domain: 'medical', duration: '4 years', description: 'Bachelor of Pharmacy.' },
      
      // Other district colleges courses
      { college_id: collegeIds[19], name: 'M.Sc Computer Science', domain: 'engineering', duration: '2 years', description: 'Advanced study of computer science and applications.' },
      { college_id: collegeIds[19], name: 'B.Sc Biotechnology', domain: 'arts', duration: '3 years', description: 'Study of biological processes and technology.' },
      { college_id: collegeIds[20], name: 'B.Tech Computer Science', domain: 'engineering', duration: '4 years', description: 'Study of computer systems, programming, and software development.' },
      { college_id: collegeIds[20], name: 'B.Tech Mechanical Engineering', domain: 'engineering', duration: '4 years', description: 'Study of mechanical systems, machines, and manufacturing.' },
      { college_id: collegeIds[21], name: 'B.Tech Computer Science', domain: 'engineering', duration: '4 years', description: 'Study of computer systems, programming, and software development.' },
      { college_id: collegeIds[21], name: 'B.Tech Information Technology', domain: 'engineering', duration: '4 years', description: 'Study of information systems and technology.' },
      { college_id: collegeIds[22], name: 'MBBS', domain: 'medical', duration: '5.5 years', description: 'Bachelor of Medicine and Bachelor of Surgery.' },
      { college_id: collegeIds[22], name: 'B.Pharm', domain: 'medical', duration: '4 years', description: 'Bachelor of Pharmacy.' },
      { college_id: collegeIds[23], name: 'B.Tech Mechanical Engineering', domain: 'engineering', duration: '4 years', description: 'Study of mechanical systems, machines, and manufacturing.' },
      { college_id: collegeIds[23], name: 'B.Tech Civil Engineering', domain: 'engineering', duration: '4 years', description: 'Study of construction and infrastructure.' },
      { college_id: collegeIds[24], name: 'B.Tech Electronics & Communication', domain: 'engineering', duration: '4 years', description: 'Study of electronic systems and communication.' },
      { college_id: collegeIds[24], name: 'B.Tech Mechanical Engineering', domain: 'engineering', duration: '4 years', description: 'Study of mechanical systems, machines, and manufacturing.' },
      { college_id: collegeIds[25], name: 'B.Sc Mathematics', domain: 'arts', duration: '3 years', description: 'Study of mathematical theories and applications.' },
      { college_id: collegeIds[25], name: 'B.Com Computer Applications', domain: 'commerce', duration: '3 years', description: 'Commerce with focus on computer applications.' },
      { college_id: collegeIds[26], name: 'M.Sc Physics', domain: 'arts', duration: '2 years', description: 'Advanced study of physics principles.' },
      { college_id: collegeIds[26], name: 'B.Sc Chemistry', domain: 'arts', duration: '3 years', description: 'Study of chemical principles and applications.' }
    ];

    const courseIds = [];
    for (const course of courses) {
      const [result] = await connection.execute(
        'INSERT INTO courses (college_id, name, domain, duration, description) VALUES (?, ?, ?, ?, ?)',
        [course.college_id, course.name, course.domain, course.duration, course.description]
      );
      courseIds.push({ id: result.insertId, domain: course.domain });
    }

    console.log('Courses seeded');

    // Insert Course Cutoffs
    const categories = ['OC', 'BC', 'BCM', 'MBC', 'SC', 'SCA', 'ST'];
    
    // Define college tiers for realistic cutoffs
    const getCollegeTier = (collegeIndex) => {
      // Government colleges (Anna University, GCE Erode, NIT Trichy, Govt Medical Colleges)
      if ([0, 8, 20, 18, 22].includes(collegeIndex)) return 'tier1';
      // Top private colleges (Kongu, Bannari Amman, SRM, CMC Vellore)
      if ([9, 10, 4, 5].includes(collegeIndex)) return 'tier2';
      // Other good colleges
      if ([3, 7, 11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 24, 25, 26].includes(collegeIndex)) return 'tier3';
      return 'tier4';
    };
    
    for (let i = 0; i < courseIds.length; i++) {
      const courseId = courseIds[i].id;
      const domain = courseIds[i].domain;
      
      // Find which college this course belongs to
      const courseIndex = i;
      let collegeIndex = 0;
      if (courseIndex < 16) {
        collegeIndex = Math.floor(courseIndex / 2); // First 8 colleges
      } else if (courseIndex < 32) {
        collegeIndex = 8 + Math.floor((courseIndex - 16) / 4); // Erode engineering colleges
      } else if (courseIndex < 47) {
        collegeIndex = 14 + Math.floor((courseIndex - 32) / 3); // Erode arts/science colleges
      } else {
        collegeIndex = 18 + Math.floor((courseIndex - 47) / 2); // Other colleges
      }
      
      const tier = getCollegeTier(collegeIndex);
      
      for (const category of categories) {
        let baseCutoff;
        
        // Base cutoffs by domain and category
        if (domain === 'engineering') {
          const ocBase = tier === 'tier1' ? 198 : tier === 'tier2' ? 192 : tier === 'tier3' ? 185 : 175;
          baseCutoff = category === 'OC' ? ocBase :
                       category === 'BC' ? ocBase - 5 :
                       category === 'BCM' ? ocBase - 6 :
                       category === 'MBC' ? ocBase - 10 :
                       category === 'SC' ? ocBase - 20 :
                       category === 'SCA' ? ocBase - 21 : ocBase - 25;
        } else if (domain === 'medical') {
          const ocBase = tier === 'tier1' ? 200 : tier === 'tier2' ? 198 : tier === 'tier3' ? 195 : 190;
          baseCutoff = category === 'OC' ? ocBase :
                       category === 'BC' ? ocBase - 2 :
                       category === 'BCM' ? ocBase - 3 :
                       category === 'MBC' ? ocBase - 5 :
                       category === 'SC' ? ocBase - 10 :
                       category === 'SCA' ? ocBase - 11 : ocBase - 15;
        } else {
          // Arts and Commerce
          const ocBase = tier === 'tier1' ? 185 : tier === 'tier2' ? 180 : tier === 'tier3' ? 175 : 165;
          baseCutoff = category === 'OC' ? ocBase :
                       category === 'BC' ? ocBase - 5 :
                       category === 'BCM' ? ocBase - 6 :
                       category === 'MBC' ? ocBase - 10 :
                       category === 'SC' ? ocBase - 20 :
                       category === 'SCA' ? ocBase - 21 : ocBase - 25;
        }
        
        // Seat count varies by college tier and category
        const baseSeats = tier === 'tier1' ? 60 : tier === 'tier2' ? 50 : tier === 'tier3' ? 40 : 30;
        const seats = category === 'OC' ? baseSeats :
                      category === 'BC' ? baseSeats + 10 :
                      category === 'BCM' ? baseSeats + 5 :
                      category === 'MBC' ? baseSeats + 15 :
                      category === 'SC' ? baseSeats + 20 :
                      category === 'SCA' ? baseSeats + 8 : baseSeats + 12;
        
        await connection.execute(
          'INSERT INTO course_cutoffs (course_id, category, cutoff_mark, seat_count) VALUES (?, ?, ?, ?)',
          [courseId, category, baseCutoff, seats]
        );
      }
    }

    console.log('Course cutoffs seeded');

    // Insert Career Roadmaps
    const roadmaps = [
      { course_id: courseIds[0].id, step_number: 1, step_title: 'Foundation Year', step_description: 'Learn programming basics, mathematics, and computer fundamentals.', duration: '1 year' },
      { course_id: courseIds[0].id, step_number: 2, step_title: 'Core Programming', step_description: 'Master data structures, algorithms, and object-oriented programming.', duration: '1 year' },
      { course_id: courseIds[0].id, step_number: 3, step_title: 'Specialization', step_description: 'Choose specialization: AI/ML, Web Development, or Systems.', duration: '1 year' },
      { course_id: courseIds[0].id, step_number: 4, step_title: 'Internship & Projects', step_description: 'Gain industry experience through internships and capstone projects.', duration: '6 months' },
      { course_id: courseIds[0].id, step_number: 5, step_title: 'Placement', step_description: 'Campus placements or higher studies (M.Tech/MS).', duration: '6 months' },
      
      { course_id: courseIds[2].id, step_number: 1, step_title: 'Pre-Clinical', step_description: 'Study anatomy, physiology, and biochemistry.', duration: '1.5 years' },
      { course_id: courseIds[2].id, step_number: 2, step_title: 'Para-Clinical', step_description: 'Learn pathology, microbiology, pharmacology, and forensic medicine.', duration: '1 year' },
      { course_id: courseIds[2].id, step_number: 3, step_title: 'Clinical Rotations', step_description: 'Hands-on training in hospitals across all departments.', duration: '2 years' },
      { course_id: courseIds[2].id, step_number: 4, step_title: 'Internship', step_description: 'Compulsory rotating internship in hospital departments.', duration: '1 year' },
      { course_id: courseIds[2].id, step_number: 5, step_title: 'Specialization', step_description: 'Pursue MD/MS or start practice as General Physician.', duration: '3+ years' },
      
      { course_id: courseIds[4].id, step_number: 1, step_title: 'Foundation', step_description: 'Learn accounting principles, business mathematics, and economics.', duration: '1 year' },
      { course_id: courseIds[4].id, step_number: 2, step_title: 'Core Commerce', step_description: 'Study corporate accounting, cost accounting, and taxation.', duration: '1 year' },
      { course_id: courseIds[4].id, step_number: 3, step_title: 'Computer Applications', step_description: 'Learn Tally, Excel, and accounting software.', duration: '1 year' },
      { course_id: courseIds[4].id, step_number: 4, step_title: 'CA Preparation', step_description: 'Prepare for CA Foundation and Intermediate exams.', duration: 'Ongoing' },
      { course_id: courseIds[4].id, step_number: 5, step_title: 'Career Start', step_description: 'Start as accountant, auditor, or pursue CA final.', duration: 'After graduation' }
    ];

    for (const roadmap of roadmaps) {
      await connection.execute(
        'INSERT INTO career_roadmaps (course_id, step_number, step_title, step_description, duration) VALUES (?, ?, ?, ?, ?)',
        [roadmap.course_id, roadmap.step_number, roadmap.step_title, roadmap.step_description, roadmap.duration]
      );
    }

    console.log('Career roadmaps seeded');
    console.log('Database seeded successfully!');

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await connection.end();
  }
}

seed();
