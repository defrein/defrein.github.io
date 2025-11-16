export const resumeData = {
	personal: {
		name: "Wahni Adnani",
        nickname: "DEF",
		title: "AI Engineer | Software Engineer",
		phone: "+6289636327090",
		email: "adnaniwahni@gmail.com",
		linkedin: "linkedin.com/in/wahni-adnani",
		github: "github.com/defrein",
		location: "Banjarmasin, Indonesia",
		summary: "Software Engineer with 5+ years building full-stack applications and AI-driven systems. Specialized in ML, NLP, computer vision, and robotics. Proven track record designing intelligent solutions across web development, automation systems, and AI model implementation.",
		availability: "Currently available for opportunities"
	},
	
	experience: [
		{
			title: "AI Engineer",
			company: "Open Journal Theme (JATSeditor.com)",
			location: "Banjarmasin, Indonesia",
			period: "Nov 2024 - Present",
			current: true,
			responsibilities: [
				"Designed and deployed AI services for intelligent JATS file conversion and automated document processing",
				"Implemented ML, NLP, and LLMs to optimize processing pipelines and improve publication accuracy",
				"Fine-tuned models and integrated AI tools into existing platforms for enhanced capabilities"
			],
			technologies: ["Python", "NLP", "LLMs", "Machine Learning", "JATS/XML"]
		},
		{
			title: "Software Engineer",
			company: "Open Journal Theme",
			location: "Banjarmasin, Indonesia",
			period: "Dec 2023 - Nov 2024",
			current: false,
			responsibilities: [
				"Architected monitoring and infrastructure management systems for government agencies at district and provincial levels",
				"Created JATS Editor platform enabling publishers to create and edit JATS/XML files for scientific publications",
				"Enhanced JATS/XML Viewer with accessibility improvements and contributed to technical architecture"
			],
			technologies: ["PHP", "Laravel", "JavaScript", "MySQL", "JATS/XML"]
		},
		{
			title: "Programmer (Self-employed)",
			company: "Freelance",
			location: "",
			period: "Dec 2020 - Nov 2023",
			current: false,
			isFreelance: true,
			projects: [
				{
					name: "Robotics Competition (KRI National 2023)",
					description: "Engineered autonomous navigation system using compass and distance sensors with custom algorithms, enabling robot to complete complex obstacle courses and perform multi-stage tasks",
					technologies: ["Arduino", "C++", "Sensor Integration", "Autonomous Navigation"]
				},
				{
					name: "Smart Robot System (PLN Competition 2022)",
					description: "Led 2-member team to 3rd place finish, developing Raspberry Pi-based robot with Computer Vision and Voice Recognition capabilities; implemented real-time colored object tracking using Python OpenCV and speech-to-command navigation system",
					technologies: ["Raspberry Pi", "Python", "OpenCV", "Computer Vision", "Voice Recognition"],
					achievement: "3rd Place"
				},
				{
					name: "Fuzzy Logic Production Forecasting",
					description: "Built book production prediction system using Fuzzy Logic algorithms to optimize manufacturing decisions based on current stock levels and sales data, improving production planning efficiency",
					technologies: ["Python", "Fuzzy Logic", "Data Analysis", "Algorithm Design"]
				}
			]
		}
	],
	
	education: [
		{
			institution: "Asia Cyber University",
			degree: "Bachelor of Informatics",
			period: "2025 - 2026",
			gpa: "3.90/4.00",
			current: true
		},
		{
			institution: "Politeknik Negeri Banjarmasin",
			degree: "Diploma in Informatics Engineering",
			period: "2020 - 2023",
			gpa: "3.84/4.00",
			current: false
		}
	],
	
	skills: {
		languages: ["Python", "PHP", "JavaScript", "HTML", "CSS", "Go"],
		frameworks: ["Laravel", "CodeIgniter", "Svelte"],
		aiml: ["Machine Learning", "NLP", "Computer Vision", "LLMs", "Model Fine-tuning"],
		database: ["MySQL", "Database Design & Optimization"],
		tools: ["Git", "GitHub", "API Development", "JATS/XML Processing", "RESTful API Design"],
		robotics: ["Raspberry Pi", "Arduino", "Sensor Integration"]
	},
	
	competencies: [
		"Problem Solving",
		"Team Leadership",
		"Agile Development",
		"Technical Documentation",
		"Continuous Learning"
	],
	
	languages: {
		Indonesian: "Native",
		English: "Professional Working Proficiency"
	},
	
	interests: ["Robotics", "Internet of Things (IoT)", "Smart Systems", "Bioinformatics"],
	
	featuredProjects: [
        {
			title: "JATS Editor Platform",
			description: "The #first JATS editor. Creating JATS file for your scholar publication never been easier & most affordable as before. With the JATS editor, you/your team can create, modify and publish JATS file with ease.  Creating JATS file as easy as uploading docx file to the editor. For OJS user, plugin also included, you can import the essential metadata to the editor seamlessly with single-click import.",
			image: "/projects/jats-editor.jpg",
			technologies: ["PHP", "Laravel", "JavaScript", "JATS/XML", "NLP", "AI", "LLMs", "Machine Learning"],
			category: ["web"],
			featured: true,
			link: "https://jatseditor.com"
		},
		{
			title: "Autonomous Navigation Robot - KRI 2024",
			description: "This robot has a mission to go to a certain area to pick up a ball of a certain color and then put it in a silo according to the rules of Abu Robocon 2024.",
			image: "/projects/kri-robot-krai.png",
			technologies: ["Raspberry Pi", "Python", "OpenCV", "Machine Learning"],
			category: "robotics",
			featured: true,
		},
		{
			title: "Autonomous Navigation Robot - KRI 2023",
			description: "This robot simulates real-life rescue missions in earthquake and landslide scenarios, aiming to help in disaster situations.",
			image: "/projects/kri-robot.jpeg",
			technologies: ["Arduino", "C++", "Sensor Integration"],
			category: "robotics",
			featured: true,
            achievement: "National Competition Participant"
		},
		{
			title: "Sistem Informasi Percetakan Digital Berbasis Web",
			description: "Platform for managing and tracking printing orders. The site provides real-time order status updates, detailed job tracking, and secure employee access. It features intuitive interfaces that enhance user experience, streamline operations, and improve customer engagement. The project involved integrating order management systems, ensuring secure login functionalities, and optimizing the user interface for efficient navigation.",
			image: "/projects/project_digital_printing_web.png",
			technologies: ["PHP", "Laravel", "MySQL", "JavaScript"],
			category: "web",
			featured: true
		},
		{
			title: "Fuzzy Logic Production System",
			description: "Web-based system for predicting book production that uses CodeIgniter 3 and fuzzy logic algorithm. It forecasts production based on remaining stock and demand data.",
			// image: "/projects/fuzzy-logic.jpg",
			technologies: ["Python", "Fuzzy Logic", "Data Analysis"],
			category: "ai",
			featured: false
		},
		{
			title: "Term Payment Management App",
			description: "The Term Payment Management Application is a system designed to manage and track installment-based payments efficiently.",
			// image: "/projects/term-payment-management.jpg",
			technologies: ["PHP", "Laravel", "MySQL", "JavaScript"],
			category: "web",
			featured: false
		},
        {
			title: "Analisis Kerusakan Bangunan App",
			description: "This application helps the in recording, analyzing, and managing information related to building conditions, especially public facilities.",
			// image: "/projects/gov-system.jpg",
			technologies: ["PHP", "Laravel", "MySQL", "JavaScript"],
			category: "web",
			featured: false
		}
	],
	
	stats: {
		yearsExperience: "5+",
		projectsCompleted: "15+",
		technologiesMastered: "20+",
		competitionsWon: "2"
	}
};
